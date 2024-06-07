// server\server.js

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user-routes");
const todoRoutes = require("./routes/todo-routes");
const accessTokenRoutes = require("./routes/access-token-routes");
const { handleErrors } = require("./utils/error-handler");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// User routes
app.use("/api/users", userRoutes);

// Todo routes
app.use("/api/todos", todoRoutes);

app.use("/api/access-tokens", accessTokenRoutes);

// Error handling middleware
app.use(handleErrors);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
