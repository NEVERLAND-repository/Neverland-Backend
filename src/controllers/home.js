const asyncHandler = require('express-async-handler');
const { Book } = require('../models');
const { verifyToken, createSendData } = require('../services');

// Homepage controller
const home = asyncHandler(async (req, res, next) => {
  const trendingBooks = await Book.aggregate().sample(3);
  let categoryBooks;

  if (
    req.query.category === 'comics'
    || req.query.category === 'manga'
    || req.query.category === 'novels'
  ) {
    categoryBooks = await Book.find({ category: req.query.category }).limit(6);
  } else {
    categoryBooks = await Book.find({ category: 'comics' }).limit(6);
  }

  const data = {
    trendingBooks,
    categoryBooks,
  };

  let token;

  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return createSendData(data, 'success', 'Unauthenticated', res);
  }

  if (token) {
    const isValidToken = verifyToken(token);
    if (isValidToken) {
      return createSendData(data, 'success', 'Authenticated', res);
    }
    return createSendData(data, 'success', 'Unauthenticated', res);
  }
});

const search = asyncHandler(async (req, res, next) => {
  let token;
  const searchResults = await Book.fuzzySearch(req.query.searchQuery).limit(5);
  if (searchResults.length !== 0) {
    if (
      req.headers.authorization
      && req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const isValidToken = verifyToken(token);
      if (isValidToken) {
        return createSendData(searchResults, 'success', 'Authenticated', res);
      }
      return createSendData(searchResults, 'success', 'Unauthenticated', res);
    }
    return createSendData(searchResults, 'success', 'Unauthenticated', res);
  }
  return createSendData(
    searchResults,
    'error',
    'Search query cannot be empty',
    res,
  );
});

module.exports = {
  home,
  search,
};
