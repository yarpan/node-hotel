const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT b.*, g.full_name, r.room_number
      FROM bookings b
      JOIN guests g ON g.id = b.guest_id
      JOIN rooms r ON r.id = b.room_id
      ORDER BY b.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT b.*, g.full_name, r.room_number
       FROM bookings b
       JOIN guests g ON g.id = b.guest_id
       JOIN rooms r ON r.id = b.room_id
       WHERE b.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { guest_id, room_id, check_in, check_out } = req.body;
    const result = await db.query(
      `INSERT INTO bookings (guest_id, room_id, check_in, check_out)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [guest_id, room_id, check_in, check_out]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { guest_id, room_id, check_in, check_out } = req.body;

    const result = await db.query(
      `UPDATE bookings
       SET guest_id = $1, room_id = $2, check_in = $3, check_out = $4
       WHERE id = $5 RETURNING *`,
      [guest_id, room_id, check_in, check_out, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailableRooms = async (req, res) => {
  try {
    const { date } = req.query;

    const result = await db.query(
      `
      SELECT * FROM rooms
      WHERE id NOT IN (
        SELECT room_id FROM bookings
        WHERE DATE($1) BETWEEN check_in AND check_out
      )
      ORDER BY id
      `,
      [date]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRevenue = async (req, res) => {
  try {
    const { month } = req.query;
    const result = await db.query(
      `
      SELECT SUM(r.price) AS total_revenue
      FROM bookings b
      JOIN rooms r ON r.id = b.room_id
      WHERE TO_CHAR(b.check_in, 'YYYY-MM') = $1
      `,
      [month]
    );

    res.json({ revenue: result.rows[0].total_revenue || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `DELETE FROM bookings WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully', booking: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

