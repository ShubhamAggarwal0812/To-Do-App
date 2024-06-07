// server/middleware/account-auth-middleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user-db');
const AccessTokenExpiredError = require('../errors/access-token-error');
const UnauthorizedError = require('../errors/user-errors').UnauthorizedError;

const ensureAccess = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new AccessTokenExpiredError();
            } else {
                throw new UnauthorizedError('Not authorized, token failed');
            }
        }
    }

    if (!token) {
        throw new UnauthorizedError('Not authorized, no token');
    }
};

module.exports = { ensureAccess };
