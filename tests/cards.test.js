const request = require('supertest');
const app = require('../app'); // Remplace par le chemin vers ton fichier app.js

describe('Loyalty Cards API', () => {
  it('should retrieve all loyalty cards for the logged-in user', async () => {
    const res = await request(app).get('/api/cards');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should add a new loyalty card', async () => {
    const res = await request(app)
      .post('/api/cards')
      .send({
        cardNumber: '1234567890',
        storeName: 'Test Store',
        userId: '123456'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should retrieve a specific loyalty card by ID', async () => {
    const res = await request(app).get('/api/cards/123456');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should update a loyalty card', async () => {
    const res = await request(app)
      .put('/api/cards/123456')
      .send({
        storeName: 'Updated Store Name'
      });
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a loyalty card', async () => {
    const res = await request(app).delete('/api/cards/123456');
    expect(res.statusCode).toEqual(200);
  });
});
