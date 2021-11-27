class ErrorHandler extends Error{
    constructor(msg, statusCode) {
        super(msg);

        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

const AsyncError = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {ErrorHandler,  AsyncError };