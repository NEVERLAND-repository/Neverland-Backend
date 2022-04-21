const asyncHandler = require('express-async-handler');
const { Book, UserBook, User } = require('../models');
const { createSendData, verifyToken, createSendToken } = require('../services');

const overview = asyncHandler(async (req, res, next) => {
  const { bookId } = req.query;

  if (!bookId) {
    const message = 'Missing book ID';
    return createSendData({}, 'error', message, res);
  }

  const book = await Book.findById(bookId);

  if (!book) {
    const message = 'Invalid book ID';
    return createSendData({}, 'error', message, res);
  }

  let token;

  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return createSendData(book, 'success', 'Unauthenticated', res);
  }

  if (token) {
    const decodedToken = verifyToken(token);
    if (decodedToken) {
      const userId = decodedToken.id;

      const currentUser = await User.findById(userId);

      if (!currentUser) return createSendToken({}, 'error', 'Invalid user ID', res);

      const userBook = await UserBook.findOne({ userId, bookId });

      return createSendData(userBook, 'success', 'Authenticated', res);
    }
    return createSendData(book, 'success', 'Unauthenticated', res);
  }
});

const add = asyncHandler(async (req, res, next) => {
  const { bookId } = req.query;

  if (!bookId) {
    const message = 'Missing book ID';
    return createSendData({}, 'error', message, res);
  }

  const book = await Book.findById(bookId);
  const user = await User.findById(req.user.id).select('-password');

  if (!book) {
    const message = 'Invalid book ID';
    return createSendData({}, 'error', message, res);
  }

  if (!user) {
    const message = 'Invalid user ID';
    return createSendData({}, 'error', message, res);
  }

  const userBook = await UserBook.findOne({ userId: req.user.id, bookId });

  if (userBook) {
    const message = 'Book already exists in user library';
    return createSendData({}, 'error', message, res);
  }

  const newUserBook = await new UserBook({
    userId: req.user.id,
    bookId,
  }).save();

  await user.books.push(bookId);

  await user.save();

  user.password = null;

  const bookData = {
    user,
    newUserBook,
  };

  const message = 'Book successfully added to user library';
  return createSendData(bookData, 'success', message, res);
});

const remove = asyncHandler(async (req, res, next) => {

});

const read = asyncHandler(async (req, res, next) => {

});

module.exports = {
  overview,
  add,
  remove,
  read,
};
