module.exports = class extends (
    Error
) {
    constructor(statusCode, message) {
        super(message);

        this.statusCode = statusCode ? statusCode : 500;
        this.status = `${statusCode}`.startsWith('4') ? 'failure' : 'error';
        this.isOperational = true;
    }
};
