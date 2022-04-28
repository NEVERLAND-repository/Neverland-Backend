const express = require('express');
const {
  authRouter, homeRouter, userRouter, bookRouter,
} = require('./v1/index');

const app = express();

app.use('/auth', authRouter);
app.use('/home', homeRouter);
app.use('/user', userRouter);
app.use('/book', bookRouter);

module.exports = app;
