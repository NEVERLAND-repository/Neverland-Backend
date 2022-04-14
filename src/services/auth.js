const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { User } = require('../models');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN,
});

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  // if process.env.NODE_ENV === 'production' cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  // remove password from output
  user.password = null;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: user,
  });
};

const protect = asyncHandler(async (req, res, next) => {
  // get token and check if it is there
  let token;
  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res
      .status(401)
      .json({ message: 'You are not logged in! Please login to get access' });
  }

  // validate signToken or verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  /* check if user still exist (important! especially if the user has been deleted after jwt has been issued) */
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      message: 'The user that this token belongs to no longer exists',
    });
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

module.exports = {
  createSendToken,
  protect,
};
