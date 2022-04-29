const asyncHandler = require('express-async-handler');
const { User } = require('../models');
const { createSendToken } = require('../services');
const { createUserSchema, loginUserSchema } = require('../validators');

// Signup Controller
const signup = asyncHandler(async (req, res, next) => {
  const { fullName, username, password } = req.body;

  const validateUserInput = createUserSchema.validate({ fullName, username, password });

  if (validateUserInput.error) {
    return createSendToken({}, 'error', validateUserInput.error, res);
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    const message = 'User exists';
    return createSendToken({}, 'error', message, res);
  }

  const userData = {
    fullName,
    username,
    password,
  };

  const user = await new User(userData).save();
  const message = 'Account created successfully';
  return createSendToken(user, 'success', message, res);
});

// Login Controller
const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const validateUserInput = loginUserSchema.validate({ username, password });

  if (validateUserInput.error) {
    return createSendToken({}, 'error', validateUserInput.error, res);
  }

  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password, user.password))) {
    const message = 'Invalid username or password is incorrect';
    return createSendToken({}, 'error', message, res);
  }

  const message = 'Logged in successfully';
  return createSendToken(user, 'success', message, res);
});

module.exports = {
  signup,
  login,
};
