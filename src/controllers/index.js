const globalErrorHandler = require('./error');
const authControllers = require('./auth');
const homeControllers = require('./home');
const bookControllers = require('./book');
const userControllers = require('./user');

module.exports = {
  globalErrorHandler,
  authControllers,
  homeControllers,
  bookControllers,
  userControllers,
};
