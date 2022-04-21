const asyncHandler = require('express-async-handler');
const { User, UserBook } = require('../models');
const { createSendData } = require('../services');
const { updateUserSchema } = require('../validators');

// User Library Controller
const library = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    const message = 'Invalid user ID';
    return createSendData({}, 'error', message, res);
  }

  const keepReading = await UserBook.find({ userId: req.user.id }).where('pageNo').gt(0).sort('-updatedAt')
    .populate('bookId')
    .exec();

  const yetToRead = await UserBook.find({ userId: req.user.id, pageNo: 0 }).sort('-createdAt').populate('bookId').exec();

  const userData = {
    user,
    keepReading,
    yetToRead,
  };

  const message = 'User library fetched successfully';
  return createSendData(userData, 'success', message, res);
});

// User Profile Controller
const profile = asyncHandler(async (req, res, next) => {
  const { fullName, gender } = req.body;

  const validateUserInput = updateUserSchema.validate({ fullName, gender });

  if (validateUserInput.error) {
    return createSendData({}, 'error', validateUserInput.error, res);
  }

  const userData = {
    fullName,
    gender,
  };

  const updatedUser = await User.findByIdAndUpdate(req.user.id, userData, {
    new: true,
  }).select('-password');

  const message = 'User updated successfully';
  return createSendData(updatedUser, 'success', message, res);
});

module.exports = {
  library,
  profile,
};
