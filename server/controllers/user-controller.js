const User = require('../models/User');
const jwt = require('jsonwebtoken');
const AppError = require('../errors/app-error');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const createUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new AppError('User already exists', 'USER_EXISTS_ERR_01', 400));
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return next(new AppError('Invalid user data', 'INVALID_USER_DATA_ERR_01', 400));
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return next(new AppError('Invalid email or password', 'INVALID_LOGIN_ERR_01', 401));
    }
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      return next(new AppError('User not found', 'USER_NOT_FOUND_ERR_01', 404));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, loginUser, getUserProfile };
