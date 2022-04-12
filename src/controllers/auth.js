const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const AppError = require('../utilities/appError');
const { User } = require('../models');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  // remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const signup = asyncHandler(async (req, res, next) => {
  // distructure request body object
  const { fullName, username, password } = req.body;

  // check that all fields are filled
  if (!fullName || !username || !password) {
    return next(new AppError('field are incomplete', 400));
  }

  // check if user exist
  const userExists = await User.findOne({ username });
  if (userExists) {
    return next(new AppError(`User with ${username} already exist`, 400));
  }

  //   create user
  const userData = {
    fullName,
    username,
    password,
  };
  const newUser = await User.create(userData);
  createSendToken(newUser, 201, res);
});

const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  // 1) if email and password exist
  if (!username || !password) {
    return next(new AppError('please provide username and password', 404));
  }

  // 2) check if user exists && password is correct
  const user = await User.findOne({ username }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('incorrect username or password', 401));
  }
  // 3 if everything ok, send token to client
  createSendToken(user, 200, res);
});
const protect = asyncHandler(async (req, res, next) => {
  // get token and check if it is there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! please login to get access', 401)
    );
  }

  // validate signToken or verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // check if user still exist (important! especially if
  // the user has been deleted or changed its password after jwt has been issued)
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exist', 401)
    );
  }
  // check if user changed password after token was issued
  //   if (currentUser.changedPasswordAfter(decoded.iat)) {
  //     return next(
  //       new AppError("User recently changed password! please login again", 401)
  //     );
  //   }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

module.exports = {
  signup,
  protect,
  login,
};
