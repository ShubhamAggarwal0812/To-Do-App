// server\errors\user-errors.js

const AppError = require("./app-error");

class UserNotFoundError extends AppError {
  constructor() {
    super("User not found", 404);
  }
}

class UserAlreadyExistsError extends AppError {
  constructor() {
    super("User already exists", 400);
  }
}

class UserValidationError extends AppError {
  constructor() {
    super("User validation error", 400);
  }
}

class UnauthorizedError extends AppError {
  constructor() {
    super("Unauthorized access", 401);
  }
}

module.exports = {
  UserNotFoundError,
  UserAlreadyExistsError,
  UserValidationError,
  UnauthorizedError,
};
