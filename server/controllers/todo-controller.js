// server\controllers\todo-controller.js

const Todo = require('../models/todo-db');
const { TodoNotFoundError } = require('../errors/todo-errors');

const getTodos = async (req, res, next) => {
    try {
        // Fetch active todos for the authenticated user
        const todos = await Todo.find({ user: req.user.id, active: true });
        res.json(todos);
    } catch (error) {
        next(error);
    }
};

const getTodoById = async (req, res, next) => {
    try {
        // Fetch a single todo by ID
        const todo = await Todo.findById(req.params.id);

        if (!todo || todo.user.toString() !== req.user.id) {
            throw new TodoNotFoundError();
        }

        res.json(todo);
    } catch (error) {
        next(error);
    }
};

const createTodo = async (req, res, next) => {
    try {
        const { title, description, type, dueDate } = req.body;

        // Create a new todo for the authenticated user
        const todo = new Todo({
            user: req.user.id,
            title,
            description,
            type,
            dueDate,
            active: true,
        });

        const createdTodo = await todo.save();
        res.status(201).json(createdTodo);
    } catch (error) {
        next(error);
    }
};

const updateTodo = async (req, res, next) => {
    try {
        const { title, description, type, dueDate, status } = req.body;

        // Find and update a todo
        const todo = await Todo.findById(req.params.id);

        if (!todo || todo.user.toString() !== req.user.id) {
            throw new TodoNotFoundError();
        }

        // Update only the fields that are provided
        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.type = type || todo.type;
        todo.dueDate = dueDate || todo.dueDate;
        todo.status = status || todo.status;

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        next(error);
    }
};

const toggleTodoStatus = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo || todo.user.toString() !== req.user.id) {
            throw new TodoNotFoundError();
        }

        // Toggle status between 'To Do' and 'Done'
        todo.status = todo.status === 'To Do' ? 'Done' : 'To Do';

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        next(error);
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo || todo.user.toString() !== req.user.id) {
            throw new TodoNotFoundError();
        }

        // Soft delete the todo by setting active to false
        todo.active = false;
        const updatedTodo = await todo.save();
        res.json({ message: 'Todo removed', todo: updatedTodo });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodoById,
    toggleTodoStatus,
};
