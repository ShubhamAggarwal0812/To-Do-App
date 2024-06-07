// server\routes\user-routes.js

const express = require("express");
const { createAccessToken } = require("../controllers/access-token-controller");
const router = express.Router();

// Route to login a user
router.post("/", createAccessToken);

module.exports = router;
