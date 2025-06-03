const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
  });
};

const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString('hex');
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
