const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/db');

beforeEach(async () => {
  await db.query('DELETE FROM users');
});

describe('POST /api/users', () => {
  it('should create a new user and return 201 with id, name, email', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };

    const res = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(newUser.name);
    expect(res.body.email).toBe(newUser.email);

    const dbRes = await db.query('SELECT * FROM users WHERE id = $1', [res.body.id]);
    expect(dbRes.rows.length).toBe(1);
    expect(dbRes.rows[0].email).toBe(newUser.email);
  });
});

