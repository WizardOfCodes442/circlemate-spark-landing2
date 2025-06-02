const UserProfile = require('../models/userProfileModel');
const Community = require('../models/communityModel');
const User = require('../models/userModel');
const createError = require('../utils/appError');
const logger = require('../utils/logger');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (you'll need to add these to your .env)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 8 // Max 8 files
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

// Helper function to get or create user profile
const getOrCreateProfile = async (userId) => {
    let profile = await UserProfile.findOne({ userId });
    
    if (!profile) {
        profile = new UserProfile({ userId });
        await profile.save();
    }
    
    return profile;
};

// 1. Community Selection
exports.selectCommunity = async (req, res, next) => {
    try {
        const { communityId, inviteCode } = req.body;
        const userId = req.user._id;

        logger.info(`User ${userId} selecting community`);

        let community;

        // Join by invite code
        if (inviteCode) {
            community = await Community.findOne({ 
                inviteCode: inviteCode.toUpperCase(),
                isActive: true 
            });
            
            if (!community) {
                return next(new createError('Invalid invite code', 400));
            }
        } 
        // Join by community ID
        else if (communityId) {
            community = await Community.findById(communityId);
            
            if (!community || !community.isActive) {
                return next(new createError('Community not found or inactive', 404));
            }
        } else {
            return next(new createError('Please provide either communityId or inviteCode', 400));
        }

        // Get or create user profile
        const profile = await getOrCreateProfile(userId);

        // Check if already a member
        const isMember = profile.communities.some(
            c => c.communityId.toString() === community._id.toString()
        );

        if (isMember) {
            return next(new createError('You are already a member of this community', 400));
        }

        // Add user to community
        profile.communities.push({
            communityId: community._id,
            joinedAt: new Date(),
            role: 'member'
        });
        
        // Add user to community members list
        if (!community.members.includes(userId)) {
            community.members.push(userId);
            community.memberCount = community.members.length;
            await community.save();
        }

        // Update onboarding step
        profile.onboardingStep = Math.max(profile.onboardingStep, 1);
        await profile.save();

        res.status(200).json({
            status: 'success',
            message: 'Successfully joined community',
            data: {
                community: {
                    _id: community._id,
                    name: community.name,
                    memberCount: community.memberCount
                },
                onboardingStep: profile.onboardingStep
            }
        });
    } catch (error) {
        logger.error('Community selection error:', error);
        next(error);
    }
};

// 2. Profile Information (UPDATED)
exports.updateProfile = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { 
            firstName, 
            lastName, 
            age, 
            gender, 
            bio, 
            occupation,
            temperament,
            matchingStyle,
            ageRange,
            educationLevel
        } = req.body;

        // Validation
        if (!firstName || !lastName || !age || !gender || !temperament || 
            !matchingStyle || !ageRange || !educationLevel) {
            return next(new createError('All required fields must be provided', 400));
        }

        const profile = await getOrCreateProfile(userId);

        // Update profile fields
        profile.firstName = firstName;
        profile.lastName = lastName;
        profile.age = parseInt(age);
        profile.gender = gender;
        profile.bio = bio || '';
        profile.occupation = occupation || '';
        profile.temperament = temperament;
        profile.matchingStyle = matchingStyle;
        profile.ageRange = ageRange;
        profile.educationLevel = educationLevel;

        // Update onboarding step
        profile.onboardingStep = Math.max(profile.onboardingStep, 2);
        await profile.save();

        // Also update the main User model
        await User.findByIdAndUpdate(userId, {
            firstName,
            lastName
        });

        res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
            data: {
                profile: {
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    age: profile.age,
                    gender: profile.gender,
                    bio: profile.bio,
                    occupation: profile.occupation,
                    temperament: profile.temperament,
                    matchingStyle: profile.matchingStyle,
                    ageRange: profile.ageRange,
                    educationLevel: profile.educationLevel
                },
                onboardingStep: profile.onboardingStep
            }
        });
    } catch (error) {
        logger.error('Profile update error:', error);
        next(error);
    }
};

// 3. Location Information
exports.updateLocation = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { city, state, country, postalCode, latitude, longitude } = req.body;

        // Validation
        if (!city || !state || !country || !postalCode) {
            return next(new createError('All location fields are required', 400));
        }

        const profile = await getOrCreateProfile(userId);

        // Update location
        profile.location = {
            city,
            state,
            country,
            postalCode,
            coordinates: {
                latitude: latitude || null,
                longitude: longitude || null
            }
        };

        // Update onboarding step
        profile.onboardingStep = Math.max(profile.onboardingStep, 3);
        await profile.save();

        res.status(200).json({
            status: 'success',
            message: 'Location updated successfully',
            data: {
                location: profile.location,
                onboardingStep: profile.onboardingStep
            }
        });
    } catch (error) {
        logger.error('Location update error:', error);
        next(error);
    }
};

// 4. Personality Traits
exports.updatePersonality = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { personalityTraits } = req.body;

        // Validation
        if (!personalityTraits || !Array.isArray(personalityTraits) || personalityTraits.length === 0) {
            return next(new createError('Please select at least one personality trait', 400));
        }

        if (personalityTraits.length > 5) {
            return next(new createError('You can select up to 5 personality traits', 400));
        }

        const profile = await getOrCreateProfile(userId);

        // Update personality traits
        profile.personalityTraits = personalityTraits;

        // Update onboarding step
        profile.onboardingStep = Math.max(profile.onboardingStep, 4);
        await profile.save();

        res.status(200).json({
            status: 'success',
            message: 'Personality traits updated successfully',
            data: {
                personalityTraits: profile.personalityTraits,
                onboardingStep: profile.onboardingStep
            }
        });
    } catch (error) {
        logger.error('Personality update error:', error);
        next(error);
    }
};

// 5. Connection Preferences (UPDATED)
exports.updatePreferences = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { connectionPurposes, interests, preferredAges } = req.body;

        // Validation
        if (!connectionPurposes || !Array.isArray(connectionPurposes) || connectionPurposes.length === 0) {
            return next(new createError('Please select at least one connection purpose', 400));
        }

        if (!interests || !Array.isArray(interests) || interests.length === 0) {
            return next(new createError('Please select at least one interest', 400));
        }

        const profile = await getOrCreateProfile(userId);

        // Update preferences
        profile.connectionPurposes = connectionPurposes;
        profile.interests = interests;
        
        // Update age preferences for each connection purpose
        if (preferredAges && typeof preferredAges === 'object') {
            profile.connectionAgePreferences = new Map();
            
            for (const [purpose, ageRange] of Object.entries(preferredAges)) {
                if (connectionPurposes.includes(purpose) && ageRange.min && ageRange.max) {
                    profile.connectionAgePreferences.set(purpose, {
                        min: parseInt(ageRange.min),
                        max: parseInt(ageRange.max)
                    });
                }
            }
        }

        // Update onboarding step
        profile.onboardingStep = Math.max(profile.onboardingStep, 5);
        await profile.save();

        res.status(200).json({
            status: 'success',
            message: 'Preferences updated successfully',
            data: {
                connectionPurposes: profile.connectionPurposes,
                interests: profile.interests,
                connectionAgePreferences: Object.fromEntries(profile.connectionAgePreferences || new Map()),
                onboardingStep: profile.onboardingStep
            }
        });
    } catch (error) {
        logger.error('Preferences update error:', error);
        next(error);
    }
};

// 6. Availability
exports.updateAvailability = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { days, timePreferences } = req.body;

        // Validation
        if (!days || !Array.isArray(days) || days.length === 0) {
            return next(new createError('Please select at least one day', 400));
        }

        if (!timePreferences || !Array.isArray(timePreferences) || timePreferences.length === 0) {
            return next(new createError('Please select at least one time preference', 400));
        }

        const profile = await getOrCreateProfile(userId);

        // Update availability
        profile.availability = {
            days,
            timePreferences
        };

        // Update onboarding step
        profile.onboardingStep = Math.max(profile.onboardingStep, 6);
        await profile.save();

        res.status(200).json({
            status: 'success',
            message: 'Availability updated successfully',
            data: {
                availability: profile.availability,
                onboardingStep: profile.onboardingStep
            }
        });
    } catch (error) {
        logger.error('Availability update error:', error);
        next(error);
    }
};

// 7. Profile Photos Upload
exports.uploadPhotos = [
    upload.array('photos', 8),
    async (req, res, next) => {
        try {
            const userId = req.user._id;
            const files = req.files;

            if (!files || files.length === 0) {
                return next(new createError('Please upload at least one photo', 400));
            }

            const profile = await getOrCreateProfile(userId);

            // Upload to Cloudinary
            const uploadPromises = files.map(async (file, index) => {
                const b64 = Buffer.from(file.buffer).toString('base64');
                const dataURI = `data:${file.mimetype};base64,${b64}`;
                
                const result = await cloudinary.uploader.upload(dataURI, {
                    folder: `user_profiles/${userId}`,
                    resource_type: 'auto',
                    transformation: [
                        { width: 800, height: 800, crop: 'limit' },
                        { quality: 'auto' }
                    ]
                });

                return {
                    url: result.secure_url,
                    publicId: result.public_id,
                    isPrimary: index === 0 && profile.profilePhotos.length === 0
                };
            });

            const uploadedPhotos = await Promise.all(uploadPromises);
            
            // Add photos to profile
            profile.profilePhotos.push(...uploadedPhotos);

            // Update onboarding step
            profile.onboardingStep = Math.max(profile.onboardingStep, 7);
            profile.onboardingCompleted = true;
            profile.onboardingCompletedAt = new Date();
            
            await profile.save();

            res.status(200).json({
                status: 'success',
                message: 'Photos uploaded successfully',
                data: {
                    photos: profile.profilePhotos,
                    onboardingStep: profile.onboardingStep,
                    onboardingCompleted: profile.onboardingCompleted
                }
            });
        } catch (error) {
            logger.error('Photo upload error:', error);
            next(error);
        }
    }
];

// Delete a photo
exports.deletePhoto = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { photoId } = req.params;

        const profile = await UserProfile.findOne({ userId });
        
        if (!profile) {
            return next(new createError('Profile not found', 404));
        }

        const photo = profile.profilePhotos.id(photoId);
        
        if (!photo) {
            return next(new createError('Photo not found', 404));
        }

        // Delete from Cloudinary
        if (photo.publicId) {
            await cloudinary.uploader.destroy(photo.publicId);
        }

        // Remove from profile
        profile.profilePhotos.pull(photoId);
        await profile.save();

        res.status(200).json({
            status: 'success',
            message: 'Photo deleted successfully'
        });
    } catch (error) {
        logger.error('Photo deletion error:', error);
        next(error);
    }
};

// Get onboarding status
exports.getOnboardingStatus = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const profile = await UserProfile.findOne({ userId })
            .populate('communities.communityId', 'name memberCount');

        if (!profile) {
            return res.status(200).json({
                status: 'success',
                data: {
                    onboardingStep: 0,
                    onboardingCompleted: false,
                    profileCompleteness: 0
                }
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                onboardingStep: profile.onboardingStep,
                onboardingCompleted: profile.onboardingCompleted,
                profileCompleteness: profile.profileCompleteness,
                profile: profile
            }
        });
    } catch (error) {
        logger.error('Get onboarding status error:', error);
        next(error);
    }
};

// Get available communities
exports.getCommunities = async (req, res, next) => {
    try {
        const { search } = req.query;
        
        let query = { isActive: true };
        
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const communities = await Community.find(query)
            .select('name description memberCount')
            .sort({ memberCount: -1 })
            .limit(20);

        res.status(200).json({
            status: 'success',
            data: {
                communities
            }
        });
    } catch (error) {
        logger.error('Get communities error:', error);
        next(error);
    }
};

// Complete onboarding
exports.completeOnboarding = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const profile = await UserProfile.findOne({ userId });

        if (!profile) {
            return next(new createError('Profile not found', 404));
        }

        // Check if all steps are completed
        if (profile.onboardingStep < 6) {
            return next(new createError('Please complete all onboarding steps', 400));
        }

        profile.onboardingCompleted = true;
        profile.onboardingCompletedAt = new Date();
        await profile.save();

        // Update user's main record
        await User.findByIdAndUpdate(userId, {
            onboardingCompleted: true
        });

        res.status(200).json({
            status: 'success',
            message: 'Onboarding completed successfully',
            data: {
                onboardingCompleted: true,
                profileCompleteness: profile.profileCompleteness
            }
        });
    } catch (error) {
        logger.error('Complete onboarding error:', error);
        next(error);
    }
};