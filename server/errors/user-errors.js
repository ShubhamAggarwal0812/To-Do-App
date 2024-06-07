// server\errors\user-errors.js

const AppError = require("./app-error");

class UserNotFoundError extends AppError {
  constructor(message = "User not found") {
    super(message, 404);
  }
}

class UserValidationError extends AppError {
  constructor(message = "User validation error", cause) {
    super(message, 400, cause);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super(message, 401);
  }
}

module.exports = {
  UserNotFoundError,
  UserValidationError,
  UnauthorizedError,
};
