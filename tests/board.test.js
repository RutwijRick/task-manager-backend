import request from 'supertest';
import app from '../server.js'; // ensure you export app from server.js
import sequelize from '../config/db.js';

beforeAll(async () => await sequelize.sync({ force: true }));

describe('Board APIs', () => {
    let token;

    beforeAll(async () => {
        await request(app).post('/api/auth/register').send({ email: "test@test.com", password: "123456" });
        const res = await request(app).post('/api/auth/login').send({ email: "test@test.com", password: "123456" });
        token = res.body.token;
    });

    it('should create a board', async () => {
        const res = await request(app)
            .post('/api/boards')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: "Test Board" });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });
});
