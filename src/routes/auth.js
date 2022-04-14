const express = require('express');
const { authControllers } = require('../controllers');

const router = express.Router();

router.post('/signup', authControllers.signup);
// router.post('/signup', (req, res) => res.send('......'));
router.post('/login', authControllers.login);

module.exports = router;
