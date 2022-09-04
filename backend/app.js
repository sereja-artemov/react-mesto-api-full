// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');

const { login, createUser, logout} = require('./controllers/users');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFoundError = require('./error/NotFoundError');
const errCode = require('./const');
const { signupValidation, signinValidation } = require('./middlewares/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const options = {
  origin: [
    'http://localhost:3005',
    'http://localhost:3000',
    'https://frontend.mesto.students.nomorepartiesxyz.ru',
    'https://sereja-artemov.github.io/',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(requestLogger);

app.use(cookieParser());


// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, (err) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB!!!');
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', signupValidation, createUser);

app.post('/signin', signinValidation, login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.delete('/logout', logout);

app.use('*', (req, res) => {
  try {
    throw new NotFoundError('Страница не найдена');
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(errCode.NotFoundError).send({ message: err.message });
    }
  }
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(error);

app.listen(3000);
