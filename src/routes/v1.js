const express = require('express');
const { baseRouter, authRouter, homeRouter } = require('./index');

const app = express();

app.use('/auth', authRouter);
app.use('/home', homeRouter);
app.use('/', baseRouter);

module.exports = app;
