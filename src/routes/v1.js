const express = require('express');
const { baseRouter, authRouter, homeRouter } = require('./v1/index');

const app = express();

app.use('/auth', authRouter);
app.use('/home', homeRouter);
app.use('/', baseRouter);

module.exports = app;
