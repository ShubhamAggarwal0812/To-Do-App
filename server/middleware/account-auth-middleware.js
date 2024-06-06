// server\middleware\account-auth-middleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user-db');
const AccessTokenExpiredError = require('../errors/access-token-error');

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
                next(new AccessTokenExpiredError());
            } else {
                res.status(401).json({ message: 'Not authorized, token failed' });
            }
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { ensureAccess };
