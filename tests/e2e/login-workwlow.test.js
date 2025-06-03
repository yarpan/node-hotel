const request = require('supertest');
const db = require('../../src/config/db');
const { app, server } = require('../../src/server');
let token;

const testUser = {
  username: 'testuser',
  password: 'password123'
};

describe('E2E: Auth flow', () => {

  beforeAll(async () => {
    await db.query('DELETE FROM refresh_tokens');
    await db.query('DELETE FROM users WHERE username = $1', [testUser.username]);
  });


  afterAll(async () => {
    await db.query('DELETE FROM refresh_tokens');
    await db.query('DELETE FROM users WHERE username = $1', [testUser.username]);
    await db.end();
    server.close();
  });


  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('username', testUser.username);
  });


  it('should login and return JWT token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: testUser.username,
        password: testUser.password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    token = res.body.accessToken;
  });


  it('should access protected route with token', async () => {
    const res = await request(app)
      .get('/api/guests') 
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); 
  });


  it('should return 401 without token', async () => {
    const res = await request(app).get('/api/guests');
    expect(res.statusCode).toBe(401);
  });

});
