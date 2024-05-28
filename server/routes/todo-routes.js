const express = require('express');
const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodoById,
} = require('../controllers/todo-controller');
const { ensureAccess } = require('../middleware/auth-middleware');

const router = express.Router();

router.route('/')
    .get(ensureAccess, getTodos)
    .post(ensureAccess, createTodo);

router.route('/:id')
    .get(ensureAccess, getTodoById)
    .put(ensureAccess, updateTodo)
    .delete(ensureAccess, deleteTodo);

module.exports = router;
