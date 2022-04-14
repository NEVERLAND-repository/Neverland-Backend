const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  const verfiedToken = jwt.verify(token, process.env.JWT_SECRET);
  return verfiedToken;
};

const createSendData = (data, statusCode, message, res) => {
  res.status(statusCode).json({
    status: 'success',
    statusCode,
    message,
    data,
  });
};

module.exports = {
  verifyToken,
  createSendData,
};
