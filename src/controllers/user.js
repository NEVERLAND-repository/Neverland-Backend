const asyncHandler = require('express-async-handler');
const AppError = require('../utilities/appError');
const { User, Book } = require('../models');

const createSendData = (data, statusCode, res) => {
  res.status(statusCode).json({
    status: 'success',
    statusCode: statusCode,
    data: data,
  });
};

const home = asyncHandler(async (req, res, next) => {
  // get token and check if it is there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    const trendingBooks = await Book.aggregate().sample(3);
    createSendData(trendingBooks, 200, res);
  }
});

module.exports = {
  home,
};
