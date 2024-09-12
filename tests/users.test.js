const request = require('supertest');
const app = require('../app'); // Remplace par le chemin vers ton fichier app.js

describe('User API', () => {
  it('should retrieve user information', async () => {
    const res = await request(app).get('/api/users/123456');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email');
  });

  it('should update user information', async () => {
    const res = await request(app)
      .put('/api/users/123456')
      .send({
        email: 'newemail@example.com'
      });
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a user account', async () => {
    const res = await request(app).delete('/api/users/123456');
    expect(res.statusCode).toEqual(200);
  });
});
