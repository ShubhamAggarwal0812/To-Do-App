// server/models/todo-db.js

const mongoose = require("mongoose");
const { TODO_STATUS, TODO_TYPE } = require("../constants");

const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(TODO_TYPE),
      default: TODO_TYPE.PERSONAL,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(TODO_STATUS),
      default: TODO_STATUS.TODO,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add additional indexes if needed
todoSchema.index({ dueDate: 1 });

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

module.exports = Todo;
