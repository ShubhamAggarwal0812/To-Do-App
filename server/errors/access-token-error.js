const AppError = require('./app-error');

class AccessTokenExpiredError extends AppError {
    constructor() {
        super('This token is expired. Please request a new one.', 401);
    }
}

module.exports = AccessTokenExpiredError;