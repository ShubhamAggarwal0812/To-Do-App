const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ['Official', 'Personal', 'Hobby'],
    required: true,
  },
  dueDate: {
    type: Date,
    required: [true, 'Due Date is required'],
  },
  status: {
    type: String,
    enum: ['To Do', 'Done'],
    default: 'To Do',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Todo', todoSchema);
