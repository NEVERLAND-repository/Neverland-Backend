const express = require('express');
const { bookControllers } = require('../../controllers');
const { protect } = require('../../services');

const router = express.Router();

router.get('/overview/:id', bookControllers.overview);
router.post('/add', protect, bookControllers.add);
router.post('/remove', protect, bookControllers.remove);
router.get('/read', protect, bookControllers.read);

module.exports = router;
