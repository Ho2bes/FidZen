const request = require('supertest');
const app = require('../backend/app');

describe('Cards API', () => {
  test('GET /api/cards - should retrieve all cards', async () => {
    const response = await request(app).get('/api/cards');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/cards - should add a new card', async () => {
    const response = await request(app)
      .post('/api/cards')
      .send({
        number: '1234567890',
        store: 'Test Store',
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('number', '1234567890');
  });

  test('PUT /api/cards/:id - should update a card', async () => {
    const response = await request(app)
      .put('/api/cards/1')
      .send({
        store: 'Updated Store',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('store', 'Updated Store');
  });

  test('DELETE /api/cards/:id - should delete a card', async () => {
    const response = await request(app).delete('/api/cards/1');
    expect(response.statusCode).toBe(204);
  });
});
