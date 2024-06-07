// server/controllers/user-controller.js

const User = require("../models/user-db");
const { hashPassword } = require("../utils/account-util");
const { generateToken } = require("../utils/token-util");
const {
  UserValidationError,
} = require("../errors/user-errors");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new UserValidationError("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      throw new UserValidationError(messages.join(", "));
    } else {
      throw error;
    }
  }
};

module.exports = {
  createUser,
};
