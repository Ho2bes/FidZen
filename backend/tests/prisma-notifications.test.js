const request = require('supertest');
const app = require('../index'); // Correction pour le chemin vers index.js
const prisma = require('../prisma'); // Correction du chemin vers prismaClient.js

describe('Prisma Notifications API', () => {
  afterAll(async () => {
    await prisma.$disconnect(); // Fermeture de la connexion Prisma
  });

  it('should retrieve notifications', async () => {
    const res = await request(app).get('/api/notifications');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

  it('should create a new notification using Prisma', async () => {
    const res = await request(app)
      .post('/api/prisma/notifications/')
      .send({
        userId: '123456',
        message: 'New notification via Prisma',
        status: 'unread'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should fetch all notifications for a user via Prisma', async () => {
    const res = await request(app).get('/api/prisma/notifications/123456');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  it('should delete a specific notification using Prisma', async () => {
    const notification = await prisma.notification.create({
      data: {
        userId: '654321',
        message: 'Notification to be deleted via Prisma',
        status: 'unread'
      }
    });
    const res = await request(app).delete(`/api/prisma/notifications/${notification.id}`);
    expect(res.statusCode).toEqual(200);
  });

