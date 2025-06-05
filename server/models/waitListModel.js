const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    interest: {
        type: String,
        required: [true, 'Interest is required'],
        enum: {
            values: ['friendship', 'romance', 'professional', 'all'],
            message: '{VALUE} is not a valid interest'
        }
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'invited', 'joined']
    },
    invitedAt: {
        type: Date,
        default: null
    },
    joinedAt: {
        type: Date,
        default: null
    },
    source: {
        type: String,
        default: 'website'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
waitlistSchema.index({ createdAt: -1 });
waitlistSchema.index({ status: 1 });

// Prevent duplicate emails
waitlistSchema.pre('save', async function(next) {
    if (this.isNew) {
        const existingEntry = await this.constructor.findOne({ email: this.email });
        if (existingEntry) {
            const error = new Error('Email already exists in waitlist');
            error.status = 400;
            return next(error);
        }
    }
    next();
});

module.exports = mongoose.model('Waitlist', waitlistSchema);