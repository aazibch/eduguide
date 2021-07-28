const AppError = require('../utils/AppError');

const createValidationError = (err) => {
    const errorMessages = [];
    Object.values(err.errors).forEach((el) => errorMessages.push(el.message));
    return new AppError(400, errorMessages.join(' ').trim());
};

const createDuplicateFieldError = (err) => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    return new AppError(
        400,
        `Duplicate value: ${value}. Please use a different value.`
    );
};

const createCastError = (err) =>
    new AppError(
        400,
        `Invalid value of "${err.value}" for the path "${err.path}".`
    );

const sendError = (err, req, res) => {
    if (err.isOperational)
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });

    // console.log('ERROR', err);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong.'
    });
};

module.exports = (err, req, res, next) => {
    console.log('ERROR', err);
    if (err.name === 'ValidationError') err = createValidationError(err);
    if (err.name === 'CastError') err = createCastError(err);
    if (err.code === 11000) err = createDuplicateFieldError(err);

    sendError(err, req, res);
};
