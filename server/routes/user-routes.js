const express = require('express');
const { createUser, loginUser, getUserProfile } = require('../controllers/user-controller');
const { ensureAccess } = require('../middleware/auth-middleware');
const router = express.Router();

router.post('/accounts', createUser); // This route handles registration
router.post('/access-tokens', loginUser); // This route handles login
router.get('/profile', ensureAccess, getUserProfile);

module.exports = router;
