const express = require('express');
const router = express.Router();
const guestsController = require('../controllers/guestsController');

router.post('/', guestsController.addGuest);

module.exports = router;
