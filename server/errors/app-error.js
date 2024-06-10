// server\errors\app-error.js

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  toJson() {
    return {
      status: this.status,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

module.exports = AppError;
