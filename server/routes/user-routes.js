// server/routes/user-routes.js

const express = require('express');
const { createUser, loginUser, getUserProfile } = require('../controllers/user-controller');
const { ensureAccess } = require('../middleware/auth-middleware');

const router = express.Router();

router.post('/accounts', createUser);
router.post('/access-tokens', loginUser);
router.get('/profile', ensureAccess, getUserProfile);

module.exports = router;
