// ===================================
// models/userProfileModel.js - Second Model
const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    // Basic Info (from profile step)
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: 50
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [18, 'Must be at least 18 years old'],
        max: [120, 'Age must be realistic']
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other', 'prefer-not-to-say']
    },
    bio: {
        type: String,
        maxlength: [200, 'Bio must be 200 characters or less'],
        trim: true
    },
    occupation: {
        type: String,
        maxlength: [200, 'Occupation must be 200 characters or less'],
        trim: true
    },
    // Location (from location step)
    location: {
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true
        },
        state: {
            type: String,
            required: [true, 'State is required'],
            trim: true
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
            trim: true
        },
        postalCode: {
            type: String,
            required: [true, 'Postal code is required'],
            trim: true
        },
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    // Personality Traits (from personality step)
    personalityTraits: [{
        type: String,
        enum: [
            'adventurous', 'analytical', 'creative', 'empathetic',
            'organized', 'outgoing', 'relaxed', 'ambitious',
            'thoughtful', 'practical', 'curious', 'reliable'
        ]
    }],
    // Connection Preferences (from preferences step)
    connectionPurposes: [{
        type: String,
        enum: ['friendship', 'dating', 'networking', 'activities']
    }],
    interests: [{
        type: String,
        trim: true
    }],
    // Availability (from availability step)
    availability: {
        days: [{
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }],
        timePreferences: [{
            type: String,
            enum: ['morning', 'afternoon', 'evening', 'night']
        }]
    },
    // Profile Photos
    profilePhotos: [{
        url: {
            type: String,
            required: true
        },
        publicId: String, // For cloud storage reference
        isPrimary: {
            type: Boolean,
            default: false
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    // Community memberships
    communities: [{
        communityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        },
        role: {
            type: String,
            enum: ['member', 'moderator', 'admin'],
            default: 'member'
        }
    }],
    // Onboarding status
    onboardingStep: {
        type: Number,
        default: 0,
        min: 0,
        max: 7
    },
    onboardingCompleted: {
        type: Boolean,
        default: false
    },
    onboardingCompletedAt: Date,
    // Metadata
    profileCompleteness: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Indexes for better query performance
userProfileSchema.index({ userId: 1 });
userProfileSchema.index({ 'location.coordinates': '2dsphere' });
userProfileSchema.index({ 'communities.communityId': 1 });
userProfileSchema.index({ onboardingCompleted: 1 });

// Calculate profile completeness
userProfileSchema.methods.calculateCompleteness = function() {
    let completeness = 0;
    const weights = {
        basicInfo: 20,
        location: 15,
        personality: 15,
        preferences: 15,
        availability: 10,
        photos: 15,
        community: 10
    };

    // Basic info
    if (this.firstName && this.lastName && this.age && this.gender) {
        completeness += weights.basicInfo;
    }

    // Location
    if (this.location && this.location.city && this.location.country) {
        completeness += weights.location;
    }

    // Personality traits
    if (this.personalityTraits && this.personalityTraits.length > 0) {
        completeness += weights.personality;
    }

    // Preferences
    if (this.connectionPurposes.length > 0 && this.interests.length > 0) {
        completeness += weights.preferences;
    }

    // Availability
    if (this.availability.days.length > 0 && this.availability.timePreferences.length > 0) {
        completeness += weights.availability;
    }

    // Photos
    if (this.profilePhotos && this.profilePhotos.length > 0) {
        completeness += weights.photos;
    }

    // Community
    if (this.communities && this.communities.length > 0) {
        completeness += weights.community;
    }

    this.profileCompleteness = completeness;
    return completeness;
};

// Update the updatedAt timestamp
userProfileSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    this.calculateCompleteness();
    next();
});

module.exports = mongoose.model('UserProfile', userProfileSchema);