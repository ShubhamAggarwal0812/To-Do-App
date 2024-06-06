// server\controllers\user-controller.js

const User = require('../models/user-db');
const jwt = require('jsonwebtoken');
const { hashPassword, compareHash } = require('../utils/account-util');
const { UserNotFoundError, UserValidationError, UnauthorizedError } = require('../errors/user-errors');

const generateToken = (id) => {
    // Generate JWT token
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new UserValidationError('User already exists');
        }

        // Hash the user's password
        const hashedPassword = await hashPassword(password);

        // Create a new user
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
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // Check if password matches
        if (!user || !(await compareHash(password, user.password))) {
            throw new UnauthorizedError('Invalid email or password');
        }

        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        next(error);
    }
};

const getUserProfile = async (req, res, next) => {
    try {
        // Fetch user profile by ID
        const user = await User.findById(req.user.id);

        if (!user) {
            throw new UserNotFoundError();
        }

        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    loginUser,
    getUserProfile,
};
