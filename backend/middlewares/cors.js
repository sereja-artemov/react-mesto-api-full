const allowedCors = [
  'https://api.mesto.students.nomorepartiesxyz.ru',
  'http://api.mesto.students.nomorepartiesxyz.ru',
  'https://frontend.mesto.students.nomorepartiesxyz.ru',
  'http://frontend.mesto.students.nomorepartiesxyz.ru',
  'http://localhost:3000',
  'http://localhost:3005',
];

module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.status(200).send();
    return;
  }
  next();
});
