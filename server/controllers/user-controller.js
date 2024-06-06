// server/controllers/user-controller.js

const User = require('../models/user-db');
const { hashPassword, compareHash } = require('../utils/account-util');
const { generateToken } = require('../utils/token-util');
const { UserValidationError, UnauthorizedError } = require('../errors/user-errors');

const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new UserValidationError('User already exists');
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
        if (error.name === 'ValidationError') {
            // Handle Mongoose validation errors
            const messages = Object.values(error.errors).map(val => val.message);
            next(new UserValidationError(messages.join(', ')));
        } else {
            next(error);
        }
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

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

module.exports = {
    createUser,
    loginUser,
};
