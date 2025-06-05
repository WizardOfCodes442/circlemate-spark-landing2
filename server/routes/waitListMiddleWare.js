const createError = require('../utils/appError');

// Store the admin code in environment variable
const ADMIN_CODE = process.env.WAITLIST_ADMIN_CODE || '3820';

// Simple authentication middleware for waitlist admin
exports.verifyAdminCode = (req, res, next) => {
    const adminCode = req.headers['x-admin-code'] || req.query.adminCode;
    
    if (!adminCode) {
        return next(new createError('Admin code is required', 401));
    }

    if (adminCode !== ADMIN_CODE) {
        return next(new createError('Invalid admin code', 401));
    }

    next();
};