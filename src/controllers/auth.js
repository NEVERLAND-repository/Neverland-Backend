const { User } = require('../models');
const { createSendToken } = require('../services');

// Signup Controller
const signup = async (req, res, next) => {
  const { fullName, username, password } = req.body;

  if (!fullName || !username || !password) {
    const message = 'Empty field';
    return createSendToken({}, 'error', message, res);
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

  await new User(userData).save();
  const message = 'Account created successfully';
  return createSendToken({}, 'success', message, res);
};

// Login Controller
const login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  let user = null;

  if (username) {
    user = await User.findOne({ username });
    if (!user) {
      const message = 'User does not exist';
      return createSendToken({}, 'error', message, res);
    }
  } else {
    const message = 'username is empty';
    return createSendToken({}, 'error', message, res);
  }

  const isValidPassword = await user.comparePassword(password, user.password);

  if ((user && password) && isValidPassword) {
    const message = 'Logged in successfully';
    return createSendToken(user, 'success', message, res);
  }
  const message = 'User detail missing';
  return createSendToken({}, 'error', message, res);
};

module.exports = {
  signup,
  login,
};
