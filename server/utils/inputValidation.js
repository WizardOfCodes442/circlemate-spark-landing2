const Joi = require('joi');

// Validation schemas
const schemas = {
    signup: Joi.object({
        userName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.min': 'Username must be at least 3 characters long',
                'string.max': 'Username cannot exceed 30 characters',
                'any.required': 'Username is required'
            }),
        firstName: Joi.string()
            .min(1)
            .max(50)
            .required()
            .messages({
                'any.required': 'First name is required'
            }),
        lastName: Joi.string()
            .min(1)
            .max(50)
            .required()
            .messages({
                'any.required': 'Last name is required'
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required'
            }),
        password: Joi.string()
            .min(8)
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)/)
            .required()
            .messages({
                'string.min': 'Password must be at least 8 characters long',
                'string.pattern.base': 'Password must contain at least one letter and one number',
                'any.required': 'Password is required'
            }),
        role: Joi.string()
            .valid('user', 'admin', 'Admin')
            .default('user')
    }),

    login: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required'
            }),
        password: Joi.string()
            .required()
            .messages({
                'any.required': 'Password is required'
            }),
        rememberMe: Joi.boolean().default(false)
    }),

    passwordReset: Joi.object({
        newPassword: Joi.string()
            .min(8)
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)/)
            .required()
            .messages({
                'string.min': 'Password must be at least 8 characters long',
                'string.pattern.base': 'Password must contain at least one letter and one number',
                'any.required': 'New password is required'
            }),
        confirmPassword: Joi.string()
            .valid(Joi.ref('newPassword'))
            .required()
            .messages({
                'any.only': 'Passwords do not match',
                'any.required': 'Please confirm your password'
            })
    }),

    forgotPassword: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required'
            })
    }),

    resendVerification: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required'
            })
    })
};

// Validation helper functions
const validateSignup = async (data) => {
    try {
        await schemas.signup.validateAsync(data, { abortEarly: false });
        return null;
    } catch (error) {
        return error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
        }));
    }
};

const validateLogin = async (data) => {
    try {
        await schemas.login.validateAsync(data, { abortEarly: false });
        return null;
    } catch (error) {
        return error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
        }));
    }
};

const validatePasswordReset = async (data) => {
    try {
        await schemas.passwordReset.validateAsync(data, { abortEarly: false });
        return null;
    } catch (error) {
        return error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
        }));
    }
};

const validateForgotPassword = async (data) => {
    try {
        await schemas.forgotPassword.validateAsync(data, { abortEarly: false });
        return null;
    } catch (error) {
        return error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
        }));
    }
};

// Middleware factory
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error) {
            const errors = error.details.map(detail => ({
                field: detail.path[0],
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
    validateSignup,
    validateLogin,
    validatePasswordReset,
    validateForgotPassword,
    
    // Middleware versions
    validateSignupMiddleware: validate(schemas.signup),
    validateLoginMiddleware: validate(schemas.login),
    validatePasswordResetMiddleware: validate(schemas.passwordReset),
    validateForgotPasswordMiddleware: validate(schemas.forgotPassword),
    validateResendVerificationMiddleware: validate(schemas.resendVerification)
};