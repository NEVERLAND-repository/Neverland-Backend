const express = require('express');
const { homeControllers } = require('../controllers');

const router = express.Router();

router.post('/search', homeControllers.search);
router.post('/', homeControllers.home);

module.exports = router;
