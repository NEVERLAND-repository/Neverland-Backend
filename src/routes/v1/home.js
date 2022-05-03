const express = require('express');
const { homeControllers } = require('../../controllers');

const router = express.Router();

router.get('/search', homeControllers.search);
router.get('/', homeControllers.home);

module.exports = router;
