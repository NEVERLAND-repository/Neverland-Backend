const { createSendToken, protect } = require('./auth');
const { verifyToken, createSendData } = require('./home-auth');

module.exports = {
    createSendToken,
    protect,
    verifyToken,
    createSendData,
}