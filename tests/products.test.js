const request = require('supertest');
const app = require('../app'); // Remplace par le chemin vers ton fichier app.js

describe('Products API', () => {
  it('should retrieve all purchased products recorded in receipts', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should add a new product to a receipt', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Product 1',
        price: 10.99,
        receiptId: '123456'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should retrieve a specific product by ID', async () => {
    const res = await request(app).get('/api/products/123456');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should update a product', async () => {
    const res = await request(app)
      .put('/api/products/123456')
      .send({
        price: 12.99
      });
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a product', async () => {
    const res = await request(app).delete('/api/products/123456');
    expect(res.statusCode).toEqual(200);
  });
});
