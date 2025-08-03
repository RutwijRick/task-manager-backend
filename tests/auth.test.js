
import request from 'supertest';
import app from '../server.js';

describe('Auth APIs', () => {
  it('should log in and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'admin123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
