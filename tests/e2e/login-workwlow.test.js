const request = require('supertest');
const app = require('../../src/server'); 
const db = require('../../src/db');

describe('E2E: Auth flow', () => {
  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'testpassword123'
  };

  beforeAll(async () => {
    await db.query('DELETE FROM users WHERE email = $1', [testUser.email]);
  });

  afterAll(async () => {
    await db.query('DELETE FROM users WHERE email = $1', [testUser.email]);
    await db.end();
  });

  let token;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should login and return JWT token', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    token = res.body.accessToken;
  });

  it('should access protected route with token', async () => {
    const res = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', testUser.email);
  });

  it('should return 401 without token', async () => {
    const res = await request(app).get('/api/profile');
    expect(res.statusCode).toBe(401);
  });
});

