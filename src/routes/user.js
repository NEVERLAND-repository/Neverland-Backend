const express = require('express');
const { authControllers, userControllers } = require('../controllers');

const router = express.Router();

router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);
router.post('/home', userControllers.home);

module.exports = router;
