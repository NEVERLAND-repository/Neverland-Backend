const globalErrorHandler = require('./error');
const authControllers = require('./auth');
const userControllers = require('./user');

module.exports = {
  globalErrorHandler,
  authControllers,
  userControllers,
};
