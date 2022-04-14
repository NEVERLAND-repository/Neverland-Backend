// const asyncHandler = require('express-async-handler');
// const { AppError } = require('../utilities');
const { User } = require('../models');
const { createSendToken } = require('../services');

// const signup = asyncHandler(async (req, res, next) => {
const signup = async (req, res, next) => {
  // destructure request body object
  const { fullName, username, password } = req.body;

  // check that all fields are filled
  if (!fullName || !username || !password) {
    const message = 'Empty field';
    return createSendToken({}, 'error', message, res);
  }

  // check if user exist
  const userExists = await User.findOne({ username });
  if (userExists) {
    const message = 'User exists';
    return createSendToken({}, 'error', message, res);
  }

  // create user
  const userData = {
    fullName,
    username,
    password,
  };
  await new User(userData).save();
  const message = 'Account created successfully';
  return createSendToken({}, 'success', message, res);
};

// Login Controller
const login = async (req, res, next) => {
  const { username, password } = req.body;

  // 1) if email and password is missing
  if (!username || !password) {
    const message = 'User detail missing';
    createSendToken({}, 'error', message, res);
  }

  // 2) check if user exists && password is correct
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password, user.password))) {
    const message = 'User password is incorrect';
    createSendToken({}, 'error', message, res);
  }

  // 3) if everything ok, send token to client
  const message = 'Logged in successfully';
  createSendToken(user, 'success', message, res);
};

module.exports = {
  signup,
  login,
};
