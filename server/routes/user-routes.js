// server\routes\user-routes.js

const express = require('express');
const { createUser, loginUser } = require('../controllers/user-controller');
const router = express.Router();

// Route to create a new user
router.post('/accounts', createUser);

// Route to login a user
router.post('/access-tokens', loginUser);

module.exports = router;
