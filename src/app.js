const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const { globalErrorHandler } = require('./controllers');
const { baseRouter, authRouter, homeRouter } = require('./routes');

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
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/home', homeRouter);
app.use('/', baseRouter);

app.use(globalErrorHandler);
module.exports = app;
