const db = require('../config/db');

exports.findAvailableRooms = async (date) => {
  const result = await db.query(`
    SELECT * FROM rooms
    WHERE is_active = true
    AND id NOT IN (
      SELECT room_id FROM bookings
      WHERE $1 BETWEEN check_in AND check_out - INTERVAL '1 day'
    )
  `, [date]);
  return result.rows;
};
