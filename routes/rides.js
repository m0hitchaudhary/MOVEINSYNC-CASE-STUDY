const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getRides, createRide, requestRide } = require('../controllers/rides');
const router = express.Router();

router.get('/getRides', getRides);
router.post('/createRide', protect, createRide);
router.put('/:id/request', protect, requestRide);

module.exports = router; 