const request = require('supertest');
const app = require('../index'); // Correction pour le chemin vers index.js

describe('Receipts API', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  it('should retrieve all receipts linked to loyalty cards', async () => {
    const res = await request(app).get('/api/receipts');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should add a new receipt', async () => {
    const res = await request(app)
      .post('/api/receipts')
      .send({
        purchaseDetails: 'Sample purchase',
        date: '2024-09-15',
        cardId: '123456'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should retrieve a specific receipt by ID', async () => {
    const res = await request(app).get('/api/receipts/123456');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should update a receipt', async () => {
    const res = await request(app)
      .put('/api/receipts/123456')
      .send({
        totalAmount: 60.00
      });
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a receipt', async () => {
    const res = await request(app).delete('/api/receipts/123456');
    expect(res.statusCode).toEqual(200);
  });

  it('should export a receipt in PDF format', async () => {
    const res = await request(app).get('/api/receipts/123456/export');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toBe('application/pdf');
  });
});
