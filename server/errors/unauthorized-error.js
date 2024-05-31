const AppError = require('./app-error');

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, 401);
  }
}

module.exports = UnauthorizedError;
