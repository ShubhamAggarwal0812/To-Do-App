// server\routes\todo-routes.js

const express = require('express');
const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodoById,
    toggleTodoStatus,
} = require('../controllers/todo-controller');
const { ensureAccess } = require('../middleware/account-auth-middleware');

const router = express.Router();

// Route to get all todos
router.route('/').get(ensureAccess, getTodos);

// Route to create a new todo
router.route('/').post(ensureAccess, createTodo);

// Route to get a todo by ID
router.route('/:id').get(ensureAccess, getTodoById);

// Route to update a todo by ID
router.route('/:id').put(ensureAccess, updateTodo);

// Route to delete a todo by ID
router.route('/:id').delete(ensureAccess, deleteTodo);

// Route to toggle the status of a todo by ID
router.route('/:id/status').patch(ensureAccess, toggleTodoStatus);

module.exports = router;
