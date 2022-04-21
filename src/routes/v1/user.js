const express = require('express');
const { userControllers } = require('../../controllers');
const { protect } = require('../../services');

const router = express.Router();

router.post('/library', protect, userControllers.library);
router.post('/profile', protect, userControllers.profile);

module.exports = router;
