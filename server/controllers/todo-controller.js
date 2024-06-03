const Todo = require('../models/todo-db');
const { TodoNotFoundError } = require('../errors/todo-errors');

const getTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos);
    } catch (error) {
        next(error);
    }
};

const getTodoById = async (req, res, next) => {
    try {
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

        const todo = new Todo({
            user: req.user.id,
            title,
            description,
            type,
            dueDate,
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

        const todo = await Todo.findById(req.params.id);

        if (!todo || todo.user.toString() !== req.user.id) {
            throw new TodoNotFoundError();
        }

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

const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo || todo.user.toString() !== req.user.id) {
            throw new TodoNotFoundError();
        }

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
};