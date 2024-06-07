// server\errors\todo-errors.js

const AppError = require("./app-error");

class TodoNotFoundError extends AppError {
  constructor(message = "Todo not found") {
    super(message, 404);
  }
}

module.exports = {
  TodoNotFoundError,
};
