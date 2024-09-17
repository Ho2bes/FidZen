const request = require('supertest');
const app = require('../index'); // Correction pour le chemin vers index.js

describe('Product Recalls API', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  it('should retrieve all product recalls', async () => {
    const res = await request(app).get('/api/product-recalls');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should add a new product recall', async () => {
    const res = await request(app)
      .post('/api/product-recalls')
      .send({
        productId: '123456',
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
