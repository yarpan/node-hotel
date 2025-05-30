const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

router.post('/', bookingsController.createBooking);
router.get('/revenue', bookingsController.getMonthlyRevenue);

module.exports = router;
