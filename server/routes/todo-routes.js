const express = require('express');
const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodoById,
} = require('../controllers/todo-controller');
const { ensureAccess } = require('../middleware/account-auth-middleware');

const router = express.Router();

router.route('/').get(ensureAccess, getTodos);
router.route('/').post(ensureAccess, createTodo);

router.route('/:id').get(ensureAccess, getTodoById);
router.route('/:id').put(ensureAccess, updateTodo);
router.route('/:id').delete(ensureAccess, deleteTodo);

module.exports = router;