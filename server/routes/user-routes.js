// server\routes\user-routes.js

const express = require('express');
const { createUser, loginUser, getUserProfile } = require('../controllers/user-controller');
const { ensureAccess } = require('../middleware/account-auth-middleware');
const router = express.Router();

// Route to create a new user
router.post('/accounts', createUser);

// Route to login a user
router.post('/access-tokens', loginUser);

// Route to get user profile
router.get('/profile', ensureAccess, getUserProfile);

module.exports = router;
