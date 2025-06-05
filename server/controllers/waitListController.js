const Waitlist = require('../models/waitListModel');
const createError = require('../utils/appError');
const logger = require('../utils/logger');
const { Parser } = require('json2csv');

// Submit waitlist entry
exports.submitWaitlist = async (req, res, next) => {
    try {
        const { firstName, lastName, email, interest } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !interest) {
            return next(new createError('All fields are required', 400));
        }

        // Check if email already exists
        const existingEntry = await Waitlist.findOne({ email: email.toLowerCase() });
        if (existingEntry) {
            return res.status(400).json({
                status: 'error',
                message: 'This email is already on our waitlist!'
            });
        }

        // Create new waitlist entry
        const newEntry = new Waitlist({
            firstName,
            lastName,
            email: email.toLowerCase(),
            interest
        });

        await newEntry.save();

        logger.info(`New waitlist entry: ${email}`);

        // You can add email notification here if needed
        // await sendWaitlistConfirmationEmail(email, firstName);

        res.status(201).json({
            status: 'success',
            message: 'Thank you for joining our waitlist! We\'ll notify you as soon as we launch.',
            data: {
                id: newEntry._id,
                firstName: newEntry.firstName,
                lastName: newEntry.lastName,
                email: newEntry.email,
                interest: newEntry.interest
            }
        });

    } catch (error) {
        logger.error('Waitlist submission error:', error);
        if (error.code === 11000) {
            return next(new createError('This email is already on our waitlist!', 400));
        }
        next(error);
    }
};

// Get all waitlist entries (protected route)
exports.getWaitlist = async (req, res, next) => {
    try {
        const { 
            page = 1, 
            limit = 50, 
            search = '', 
            status = 'all',
            sortBy = 'createdAt',
            order = 'desc' 
        } = req.query;

        // Build query
        let query = {};
        
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (status !== 'all') {
            query.status = status;
        }

        // Calculate pagination
        const skip = (page - 1) * limit;
        const sortOrder = order === 'desc' ? -1 : 1;

        // Execute query
        const [entries, total] = await Promise.all([
            Waitlist.find(query)
                .sort({ [sortBy]: sortOrder })
                .limit(limit * 1)
                .skip(skip)
                .lean(),
            Waitlist.countDocuments(query)
        ]);

        // Get statistics
        const stats = await Waitlist.aggregate([
            {
                $group: {
                    _id: '$interest',
                    count: { $sum: 1 }
                }
            }
        ]);

        const totalStats = await Waitlist.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: entries,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / limit)
            },
            stats: {
                byInterest: stats,
                byStatus: totalStats,
                total
            }
        });

    } catch (error) {
        logger.error('Get waitlist error:', error);
        next(error);
    }
};

// Export waitlist as CSV
exports.exportWaitlist = async (req, res, next) => {
    try {
        const entries = await Waitlist.find({})
            .sort({ createdAt: -1 })
            .lean();

        // Transform data for CSV
        const csvData = entries.map(entry => ({
            'First Name': entry.firstName,
            'Last Name': entry.lastName,
            'Email': entry.email,
            'Interest': entry.interest,
            'Status': entry.status,
            'Joined Date': new Date(entry.createdAt).toLocaleString()
        }));

        // Create CSV
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(csvData);

        // Set headers for file download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=waitlist.csv');
        
        res.status(200).send(csv);

    } catch (error) {
        logger.error('Export waitlist error:', error);
        next(error);
    }
};

// Update waitlist entry status
exports.updateWaitlistStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'invited', 'joined'].includes(status)) {
            return next(new createError('Invalid status', 400));
        }

        const entry = await Waitlist.findByIdAndUpdate(
            id,
            { 
                status,
                ...(status === 'invited' && { invitedAt: new Date() }),
                ...(status === 'joined' && { joinedAt: new Date() })
            },
            { new: true, runValidators: true }
        );

        if (!entry) {
            return next(new createError('Waitlist entry not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: entry
        });

    } catch (error) {
        logger.error('Update waitlist status error:', error);
        next(error);
    }
};

// Delete waitlist entry
exports.deleteWaitlistEntry = async (req, res, next) => {
    try {
        const { id } = req.params;

        const entry = await Waitlist.findByIdAndDelete(id);

        if (!entry) {
            return next(new createError('Waitlist entry not found', 404));
        }

        res.status(200).json({
            status: 'success',
            message: 'Waitlist entry deleted successfully'
        });

    } catch (error) {
        logger.error('Delete waitlist entry error:', error);
        next(error);
    }
};

// Get waitlist statistics
exports.getWaitlistStats = async (req, res, next) => {
    try {
        const stats = await Waitlist.aggregate([
            {
                $facet: {
                    byInterest: [
                        {
                            $group: {
                                _id: '$interest',
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    byStatus: [
                        {
                            $group: {
                                _id: '$status',
                                count: { $sum: 1 }
                            }
                        }
                    ],
                    byMonth: [
                        {
                            $group: {
                                _id: {
                                    year: { $year: '$createdAt' },
                                    month: { $month: '$createdAt' }
                                },
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { '_id.year': -1, '_id.month': -1 } },
                        { $limit: 12 }
                    ],
                    total: [
                        { $count: 'count' }
                    ]
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                byInterest: stats[0].byInterest,
                byStatus: stats[0].byStatus,
                byMonth: stats[0].byMonth,
                total: stats[0].total[0]?.count || 0
            }
        });

    } catch (error) {
        logger.error('Get waitlist stats error:', error);
        next(error);
    }
};