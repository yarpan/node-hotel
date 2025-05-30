const bookingsModel = require('../models/bookingsModel');

exports.createBooking = async (req, res) => {
  try {
    const booking = await bookingsModel.createBooking(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMonthlyRevenue = async (req, res) => {
  try {
    const { month, year } = req.query;
    if (!month || !year) return res.status(400).json({ error: 'Month and year are required' });

    const revenue = await bookingsModel.calculateMonthlyRevenue(month, year);
    res.json({ revenue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
