const request = require('supertest');
const app = require('../backend/index');

describe('Notifications API', () => {
  test('GET /api/notifications - should retrieve all notifications', async () => {
    const response = await request(app).get('/api/notifications');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/notifications/:id - should retrieve a specific notification', async () => {
    const response = await request(app).get('/api/notifications/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  test('DELETE /api/notifications/:id - should delete a notification', async () => {
    const response = await request(app).delete('/api/notifications/1');
    expect(response.statusCode).toBe(204);
  });
});
