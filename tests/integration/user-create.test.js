const request = require('supertest');
const db = require('../../src/config/db');
const app = require('../../src/app');

beforeEach(async () => {
  await db.query('DELETE FROM users');
});

afterAll(async () => {
  await db.end();
});

describe('POST /api/auth/register', () => {
  it('should register a new user and return 201 with id and username', async () => {
    const newUser = {
      username: 'testuser',
      password: 'password123'
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('username', newUser.username);

    const dbRes = await db.query('SELECT * FROM users WHERE id = $1', [res.body.id]);
    expect(dbRes.rows.length).toBe(1);
    expect(dbRes.rows[0].username).toBe(newUser.username);
    
  });
  
});

