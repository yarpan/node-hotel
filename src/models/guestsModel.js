const db = require('../config/db');

exports.createGuest = async ({ full_name, email, phone }) => {
  const result = await db.query(
    'INSERT INTO guests (full_name, email, phone) VALUES ($1, $2, $3) RETURNING *',
    [full_name, email, phone]
  );
  return result.rows[0];
};
