const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  const verfiedToken = jwt.verify(token, process.env.JWT_SECRET);
  return verfiedToken;
};

const createSendData = (data, status, message, res) => {
  res.json({
    status,
    message,
    data,
  });
};

module.exports = {
  verifyToken,
  createSendData,
};
