const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
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
            default: 'Personal',
        },
        status: {
            type: String,
            required: true,
            default: 'To Do',
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

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

module.exports = Todo;