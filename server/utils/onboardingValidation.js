const Joi = require('joi');

// Validation schemas
const schemas = {
    communitySelection: Joi.object({
        communityId: Joi.string().hex().length(24),
        inviteCode: Joi.string().alphanum().length(8).uppercase()
    }).xor('communityId', 'inviteCode'), // One of them is required

    profileUpdate: Joi.object({
        firstName: Joi.string().min(2).max(50).required(),
        lastName: Joi.string().min(2).max(50).required(),
        age: Joi.number().integer().min(18).max(120).required(),
        gender: Joi.string().valid('male', 'female', 'other', 'prefer-not-to-say').required(),
        bio: Joi.string().max(200).allow(''),
        occupation: Joi.string().max(200).allow('')
    }),

    location: Joi.object({
        city: Joi.string().min(2).required(),
        state: Joi.string().min(2).required(),
        country: Joi.string().min(2).required(),
        postalCode: Joi.string().min(3).required(),
        latitude: Joi.number().min(-90).max(90).optional(),
        longitude: Joi.number().min(-180).max(180).optional()
    }),

    personality: Joi.object({
        personalityTraits: Joi.array()
            .items(Joi.string().valid(
                'adventurous', 'analytical', 'creative', 'empathetic',
                'organized', 'outgoing', 'relaxed', 'ambitious',
                'thoughtful', 'practical', 'curious', 'reliable'
            ))
            .min(1)
            .max(5)
            .required()
    }),

    preferences: Joi.object({
        connectionPurposes: Joi.array()
            .items(Joi.string().valid('friendship', 'dating', 'networking', 'activities'))
            .min(1)
            .required(),
        interests: Joi.array()
            .items(Joi.string().trim())
            .min(1)
            .required()
    }),

    availability: Joi.object({
        days: Joi.array()
            .items(Joi.string().valid(
                'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
                'Friday', 'Saturday', 'Sunday'
            ))
            .min(1)
            .required(),
        timePreferences: Joi.array()
            .items(Joi.string().valid('morning', 'afternoon', 'evening', 'night'))
            .min(1)
            .required()
    })
};

// Validation middleware factory
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));
            
            return res.status(400).json({
                status: 'FAILED',
                message: 'Validation failed',
                errors
            });
        }
    };
};

// Export validation middleware
module.exports = {
    validateCommunitySelection: validate(schemas.communitySelection),
    validateProfileUpdate: validate(schemas.profileUpdate),
    validateLocation: validate(schemas.location),
    validatePersonality: validate(schemas.personality),
    validatePreferences: validate(schemas.preferences),
    validateAvailability: validate(schemas.availability)
};