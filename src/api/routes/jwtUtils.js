const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate a random secret key for JWT
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Sign JWT token
const signToken = (payload, secretKey) => {
    return jwt.sign(payload, secretKey);
};

// Verify JWT token
const verifyToken = (token, secretKey) => {
    return jwt.verify(token, secretKey);
};

module.exports = { generateSecretKey, signToken, verifyToken };
