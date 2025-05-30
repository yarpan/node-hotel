const db = require('../config/db');

exports.createBooking = async ({ guest_id, room_id, check_in, check_out }) => {
  const nightsResult = await db.query(`
    SELECT price_per_night FROM rooms WHERE id = $1
  `, [room_id]);

  if (nightsResult.rows.length === 0) throw new Error('Room not found');

  const price = parseFloat(nightsResult.rows[0].price_per_night);

  const nights = (new Date(check_out) - new Date(check_in)) / (1000 * 60 * 60 * 24);
  if (nights <= 0) throw new Error('Invalid date range');

  const total_price = price * nights;

  const result = await db.query(`
    INSERT INTO bookings (guest_id, room_id, check_in, check_out, total_price)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [guest_id, room_id, check_in, check_out, total_price]);

  return result.rows[0];
};

exports.calculateMonthlyRevenue = async (month, year) => {
  const result = await db.query(`
    SELECT SUM(total_price) AS revenue
    FROM bookings
    WHERE EXTRACT(MONTH FROM check_in) = $1
      AND EXTRACT(YEAR FROM check_in) = $2
  `, [month, year]);

  return result.rows[0].revenue || 0;
};
