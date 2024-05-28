// server/controllers/todoController.js

const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
};

const getTodoById = async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (todo && todo.user.toString() === req.user.id) {
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

const createTodo = async (req, res) => {
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
};

const updateTodo = async (req, res) => {
    const { title, description, type, dueDate, status } = req.body;

    const todo = await Todo.findById(req.params.id);

    if (todo && todo.user.toString() === req.user.id) {
        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.type = type || todo.type;
        todo.dueDate = dueDate || todo.dueDate;
        todo.status = status || todo.status;

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

const deleteTodo = async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (todo && todo.user.toString() === req.user.id) {
        await todo.remove();
        res.json({ message: 'Todo removed' });
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodoById,
};
