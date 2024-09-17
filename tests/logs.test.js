const request = require('supertest');
const app = require('../backend/app');

describe('Logs API', () => {
  test('POST /api/logs - should create a new log', async () => {
    const response = await request(app)
      .post('/api/logs')
      .send({
        action: 'User login',
        userId: 1,
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('action', 'User login');
  });

  test('GET /api/logs - should retrieve all logs', async () => {
    const response = await request(app).get('/api/logs');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('DELETE /api/logs/:id - should delete a log', async () => {
    const response = await request(app).delete('/api/logs/1');
    expect(response.statusCode).toBe(204);
  });
});
