const express = require('express');
const { userControllers } = require('../../controllers');
const { protect } = require('../../services');

const router = express.Router();

router.get('/library', protect, userControllers.library);
router.get('/search', protect, userControllers.search);
router.post('/profile', protect, userControllers.profile);

module.exports = router;
