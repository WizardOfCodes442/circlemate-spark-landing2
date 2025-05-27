class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Alias for backward compatibility
class createError extends AppError {
    constructor(message, statusCode) {
        super(message, statusCode);
    }
}

module.exports = createError;
module.exports.AppError = AppError;