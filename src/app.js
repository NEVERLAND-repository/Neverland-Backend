const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// create an express app
const app = express()

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// routes

module.exports = app;