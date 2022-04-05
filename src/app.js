const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const { AppError } = require('./utilities');
const { globalErrorHandler } = require('./controllers');

// create an express app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(morgan('dev'));

// routes

app.use('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to Neverland API!' });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
