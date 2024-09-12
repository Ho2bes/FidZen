const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Remplace par le chemin vers ton fichier app.js
const Notification = require('../models/notification.model'); // Remplace par le chemin de ton modèle Notification

describe('Notifications API', () => {
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/fidzen_test`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a new notification', async () => {
    const res = await request(app)
      .post('/api/notifications/')
      .send({
        userId: '123456',
        message: 'New notification',
        status: 'unread'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch all notifications for a user', async () => {
    const res = await request(app).get('/api/notifications/123456');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  it('should delete a specific notification', async () => {
    const notification = await Notification.create({ userId: '654321', message: 'Notification to be deleted', status: 'unread' });
    const res = await request(app).delete(`/api/notifications/${notification._id}`);
    expect(res.statusCode).toEqual(200);
  });
});
