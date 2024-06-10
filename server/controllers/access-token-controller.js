// server/controllers/access-token-controller.js

const User = require("../models/user-db");
const { compareHash } = require("../utils/account-util");
const { generateToken } = require("../utils/token-util");
const { UnauthorizedError } = require("../errors/user-errors");

const createAccessToken = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await compareHash(password, user.password))) {
      throw new UnauthorizedError();
    }

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error("Unexpected Error:", error);
      res.status(500).json({ message: "Failed to generate access token" });
    }
  }
};

module.exports = {
  createAccessToken,
};
