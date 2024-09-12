const request = require('supertest');
const app = require('../app'); // Remplace par le chemin vers ton fichier app.js

describe('Product Recalls API', () => {
  it('should retrieve all product recalls', async () => {
    const res = await request(app).get('/api/product-recalls');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should add a new product recall', async () => {
    const res = await request(app)
      .post('/api/product-recalls')
      .send({
        productName: 'Product 1',
        recallReason: 'Safety Issue'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should retrieve a specific product recall by ID', async () => {
    const res = await request(app).get('/api/product-recalls/123456');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should retrieve notifications for a specific product recall', async () => {
    const res = await request(app).get('/api/product-recalls/123456/notifications');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
