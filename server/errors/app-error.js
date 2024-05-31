class AppError extends Error {
  constructor(message, statusCode, cause) {
    super(message);
    this.statusCode = statusCode;
    this.cause = cause;
    Error.captureStackTrace(this, this.constructor);
  }

  toJson() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      ...(this.cause && { cause: this.cause.toString() })
    };
  }
}

module.exports = AppError;
