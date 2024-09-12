const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Remplace par le chemin vers ton fichier app.js
const Log = require('../models/log.model'); // Remplace par le chemin de ton modèle Log

describe('Logs API', () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/fidzen_test`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a new log', async () => {
    const res = await request(app)
      .post('/api/logs/')
      .send({
        message: 'New log entry',
        level: 'info',
        userId: '123456'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch all logs', async () => {
    const res = await request(app).get('/api/logs/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  it('should delete a specific log', async () => {
    const log = await Log.create({ message: 'Log to be deleted', level: 'info', userId: '654321' });
    const res = await request(app).delete(`/api/logs/${log._id}`);
    expect(res.statusCode).toEqual(200);
  });
});
