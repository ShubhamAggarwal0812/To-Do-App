// server/controllers/user-controller.js

const User = require("../models/user-db");
const { hashPassword } = require("../utils/account-util");
const { generateToken } = require("../utils/token-util");
const {
  UserValidationError,
  UserAlreadyExistsError,
} = require("../errors/user-errors");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    res.status(201).json({
      _id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      token: generateToken(savedUser._id),
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new UserValidationError();
    } else if (
      error instanceof UserAlreadyExistsError ||
      error instanceof UserValidationError
    ) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error("Unexpected Error:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  }
};

module.exports = {
  createUser,
};
