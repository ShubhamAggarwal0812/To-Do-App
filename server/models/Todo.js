// server/models/Todo.js

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
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
        enum: ['Official', 'Personal', 'Hobby'],
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
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
