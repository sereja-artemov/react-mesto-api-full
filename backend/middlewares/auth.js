const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../error/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  // const token = req.cookies.jwt;
  // let payload;
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // payload = jwt.verify(token, JWT_SECRET);
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'my-secret');
  } catch (err) {
    throw next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
