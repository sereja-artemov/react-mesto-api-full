const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../error/UnauthorizedError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
