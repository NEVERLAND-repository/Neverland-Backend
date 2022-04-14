const asyncHandler = require('express-async-handler');
const { AppError } = require('../utilities');
const { User } = require('../models');
const { createSendToken } = require('../services');

const signup = asyncHandler(async (req, res, next) => {
  // destructure request body object
  const { fullName, username, password } = req.body;

  // check that all fields are filled
  if (!fullName || !username || !password) {
    return next(new AppError('fields are incomplete', 400));
  }

  // check if user exist
  const userExists = await User.findOne({ username });
  if (userExists) {
    return next(new AppError(`User with ${username} already exist`, 400));
  }

  // create user
  const userData = {
    fullName,
    username,
    password,
  };
  const newUser = await new User(userData).save();
  createSendToken(newUser, 201, res);
});

const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // 1) if email and password exist
  if (!username || !password) {
    return next(new AppError('Please provide username and password', 400));
  }

  // 2) check if user exists && password is correct
  const user = await User.findOne({ username }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect username or password', 400));
  }

  // 3) if everything ok, send token to client
  createSendToken(user, 200, res);
});

module.exports = {
  signup,
  login,
};
