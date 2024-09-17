const request = require('supertest');
const app = require('../index'); // Correction pour le chemin vers index.js

describe('Products API', () => {
  test('GET /api/products - should retrieve all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});


  test('POST /api/products - should add a new product', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({
        name: 'New Product',
        price: 100,
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', 'New Product');
  });

  test('PUT /api/products/:id - should update a product', async () => {
    const response = await request(app)
      .put('/api/products/1')
      .send({
        price: 120,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('price', 120);
  });

  test('DELETE /api/products/:id - should delete a product', async () => {
    const response = await request(app).delete('/api/products/1');
    expect(response.statusCode).toBe(204);
  });
