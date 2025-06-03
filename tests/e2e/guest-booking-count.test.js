const request = require('supertest');
const { app, server } = require('../../src/server');
const db = require('../../src/config/db');

describe('GET /guest/:id/bookings/count', () => {
  let guestWithBookingsId;
  let guestWithoutBookingsId;
  let roomId;
  let token;

  beforeAll(async () => {
    // Clean up
    await db.query('DELETE FROM bookings');
    await db.query('DELETE FROM guests');
    await db.query('DELETE FROM rooms');
    await db.query('DELETE FROM users');

    // Guest with bookings
    const guestWithBookings = await db.query(
      `INSERT INTO guests (full_name, email, phone) VALUES ($1, $2, $3) RETURNING id`,
      ['Test Guest With Bookings', 'withbookings@example.com', '1234567890']
    );
    guestWithBookingsId = guestWithBookings.rows[0].id;

    // Guest without bookings
    const guestWithoutBookings = await db.query(
      `INSERT INTO guests (full_name, email, phone) VALUES ($1, $2, $3) RETURNING id`,
      ['Guest Without Bookings', 'nobookings@example.com', '0987654321']
    );
    guestWithoutBookingsId = guestWithoutBookings.rows[0].id;

    // Room
    const room = await db.query(
      `INSERT INTO rooms (room_number, type, price_per_night) VALUES ($1, $2, $3) RETURNING id`,
      ['101', 'standard', 100.00]
    );
    roomId = room.rows[0].id;

    // Bookings
    await db.query(
      `INSERT INTO bookings (guest_id, room_id, check_in, check_out, total_price) VALUES
        ($1, $2, '2025-06-01', '2025-06-03', $3),
        ($1, $2, '2025-06-10', '2025-06-12', $3)`,
      [guestWithBookingsId, roomId, 200.00]
    );

    // Register & login user
    await request(app).post('/api/auth/register').send({
      username: 'admin',
      password: 'password123'
    });

    const loginRes = await request(app).post('/api/auth/login').send({
      username: 'admin',
      password: 'password123'
    });

    //console.log('LOGIN RESPONSE:', loginRes.statusCode, loginRes.body);
    token = loginRes.body.accessToken;
    expect(token).toBeDefined();

  });

  afterAll(async () => {
    await db.query('DELETE FROM bookings');
    await db.query('DELETE FROM guests');
    await db.query('DELETE FROM rooms');
    await db.query('DELETE FROM users');
    await db.end();
    server.close();
  });

  test('Returns correct booking count for existing guest with bookings', async () => {
    const res = await request(app)
      .get(`/api/guests/${guestWithBookingsId}/bookings/count`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ guestId: guestWithBookingsId, bookingCount: 2 });
  });

  test('Returns 0 for guest with no bookings', async () => {
    const res = await request(app)
      .get(`/api/guests/${guestWithoutBookingsId}/bookings/count`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ guestId: guestWithoutBookingsId, bookingCount: 0 });
  });

  test('Returns 404 for non-existing guest', async () => {
    const res = await request(app)
      .get(`/api/guests/99999/bookings/count`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

});
