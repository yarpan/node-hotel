const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM guests ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM guests WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Guest not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { full_name } = req.body;
    const result = await db.query(
      'INSERT INTO guests (full_name) VALUES ($1) RETURNING *',
      [full_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name } = req.body;

    const result = await db.query(
      'UPDATE guests SET full_name = $1 WHERE id = $2 RETURNING *',
      [full_name, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Guest not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM guests WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Guest not found' });
    }

    res.json({ message: 'Guest deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingCount = async (req, res) => {
  const { id } = req.params;
  try {
    const guestCheck = await db.query('SELECT id FROM guests WHERE id = $1', [id]);
    if (guestCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Guest not found' });
    }

    const result = await db.query(
      'SELECT COUNT(*) FROM bookings WHERE guest_id = $1',
      [id]
    );

    const count = parseInt(result.rows[0].count, 10);
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};