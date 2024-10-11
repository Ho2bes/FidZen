const request = require('supertest');
const app = require('../backend/index');

describe('Users API', () => {
  test('GET /api/users/:id - should retrieve user information', async () => {
    const response = await request(app).get('/api/users/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('email');
  });

  test('PUT /api/users/:id - should update user information', async () => {
    const response = await request(app)
      .put('/api/users/1')
      .send({
        email: 'updated@example.com',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('email', 'updated@example.com');
  });

  test('DELETE /api/users/:id - should delete user account', async () => {
    const response = await request(app).delete('/api/users/1');
    expect(response.statusCode).toBe(204);
  });
});
