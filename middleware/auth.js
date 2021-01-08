const jwt = require('jsonwebtoken');
const config = require('config');
const secretKey = config.get('secretKey');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer $TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    // verify token
    const decodedToken = jwt.verify(token, secretKey);
    // add user data from decoded token
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
