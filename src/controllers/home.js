const asyncHandler = require('express-async-handler');
const { AppError } = require('../utilities');
const { Book } = require('../models');
const { verifyToken, createSendData } = require('../services');

const home = asyncHandler(async (req, res, next) => {
  const trendingBooks = await Book.aggregate().sample(3);
  let categoryBooks;

  if (
    req.query.category === 'comics' ||
    req.query.category === 'manga' ||
    req.query.category === 'novels'
  ) {
    categoryBooks = await Book.find({ category: req.query }).limit(6);
  } else {
    categoryBooks = await Book.find({ category: 'comics' }).limit(6);
  }

  const data = {
    trendingBooks,
    categoryBooks,
  };

  // get token and check if it is there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return createSendData(data, 401, 'Unauthenticated', res);
  }

  if (token) {
    const isValidToken = verifyToken(token);
    if (isValidToken) {
      return createSendData(data, 200, 'Authenticated', res);
    }
    return createSendData(data, 401, 'Unauthenticated', res);
  }
});

const search = asyncHandler(async (req, res, next) => {
  const searchResults = await Book.fuzzySearch(req.query.searchQuery).limit(5);
  if (req.query.searchQuery) {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      return createSendData(searchResults, 401, 'Unauthenticated', res);
    }
  }

  if (token) {
    const isValidToken = verifyToken(token);
    if (isValidToken) {
      return createSendData(searchResults, 200, 'Authenticated', res);
    }
    return createSendData(searchResults, 401, 'Unauthenticated', res);
  }

  return next(new AppError('Search query cannot be empty', 400));
});

module.exports = {
  home,
  search,
};
