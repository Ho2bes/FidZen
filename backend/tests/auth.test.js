const request = require('supertest');
const app = require('../backend/app');

describe('Authentication API', () => {
  test('POST /api/auth/register - should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  test('POST /api/auth/login - should authenticate a user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
