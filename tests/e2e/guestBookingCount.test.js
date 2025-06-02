const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/db');

describe('GET /guest/:id/bookings/count', () => {
  const testGuests = {
    withBookings: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
    },
    withoutBookings: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '0987654321',
    },
  };

  const testRoom = {
    number: '101',
    type: 'single',
    price: 100,
  };

  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'testpassword123',
  };

  let guestIdWithBookings;
  let guestIdWithoutBookings;
  let token;

  beforeAll(async () => {
    // Insert test guests
    const res1 = await db.query(
      `INSERT INTO guests (name, email, phone) VALUES ($1, $2, $3) RETURNING id`,
      [testGuests.withBookings.name, testGuests.withBookings.email, testGuests.withBookings.phone]
    );
    guestIdWithBookings = res1.rows[0].id;

    const res2 = await db.query(
      `INSERT INTO guests (name, email, phone) VALUES ($1, $2, $3) RETURNING id`,
      [testGuests.withoutBookings.name, testGuests.withoutBookings.email, testGuests.withoutBookings.phone]
    );
    guestIdWithoutBookings = res2.rows[0].id;

    // Insert test room
    const roomResult = await db.query(
      `INSERT INTO rooms (number, type, price) VALUES ($1, $2, $3) RETURNING id`,
      [testRoom.number, testRoom.type, testRoom.price]
    );
    const roomId = roomResult.rows[0].id;

    // Add bookings for guest with bookings
    await db.query(
      `INSERT INTO bookings (guest_id, room_id, check_in_date, check_out_date) VALUES 
       ($1, $2, '2025-06-01', '2025-06-03'),
       ($1, $2, '2025-06-10', '2025-06-12')`,
      [guestIdWithBookings, roomId]
    );

    // Register and login user
    await request(app).post('/api/auth/register').send(testUser);

    const loginRes = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    token = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await db.query(`DELETE FROM bookings`);
    await db.query(`DELETE FROM guests`);
    await db.query(`DELETE FROM rooms`);
    await db.query(`DELETE FROM users`);
    await db.end();
  });

  test('Returns correct booking count for existing guest with bookings', async () => {
    const response = await request(app)
      .get(`/api/guest/${guestIdWithBookings}/bookings/count`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(2);
  });

  test('Returns 0 for guest with no bookings', async () => {
    const response = await request(app)
      .get(`/api/guest/${guestIdWithoutBookings}/bookings/count`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(0);
  });

  test('Returns 404 for non-existing guest', async () => {
    const response = await request(app)
      .get(`/api/guest/999999/bookings/count`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
