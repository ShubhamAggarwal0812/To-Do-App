const AppError = require('./app-error');

class ValidationError extends AppError {
  constructor(message = 'Validation error', cause) {
    super(message, 400, cause);
  }
}

module.exports = ValidationError;
