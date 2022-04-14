const express = require('express');
const { homeControllers } = require('../controllers');

const router = express.Router();

router.post('/home', homeControllers.home);
router.post('/search', homeControllers.search);

module.exports = router;
