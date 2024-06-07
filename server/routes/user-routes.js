// server\routes\user-routes.js

const express = require("express");
const { createUser } = require("../controllers/user-controller");
const router = express.Router();

// Route to create a new user
router.post("/", createUser);

module.exports = router;
