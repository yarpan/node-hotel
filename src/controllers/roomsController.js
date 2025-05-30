const roomsModel = require('../models/roomsModel');

exports.getAvailableRooms = async (req, res) => {
  try {
    const date = req.query.date;
    if (!date) return res.status(400).json({ error: 'Date is required' });

    const rooms = await roomsModel.findAvailableRooms(date);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
