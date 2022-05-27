const baseRouter = require('./base');
const authRouter = require('./auth');
const homeRouter = require('./home');
const userRouter = require('./user');
const bookRouter = require('./book');

module.exports = {
  baseRouter,
  authRouter,
  homeRouter,
  userRouter,
  bookRouter,
};
