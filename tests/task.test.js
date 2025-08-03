import request from 'supertest';
import app from '../server.js';
import sequelize from '../config/db.js';

beforeAll(async () => await sequelize.sync({ force: true }));

describe('Task APIs', () => {
    let token, boardId, taskId;

    beforeAll(async () => {
        await request(app).post('/api/auth/register').send({ email: "task@test.com", password: "123456" });
        const res = await request(app).post('/api/auth/login').send({ email: "task@test.com", password: "123456" });
        token = res.body.token;

        const board = await request(app).post('/api/boards').set('Authorization', `Bearer ${token}`).send({ name: "Board for Task" });
        boardId = board.body.id;
    });

    it('should create a task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: "Test Task", boardId, createdBy: 1 });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        taskId = res.body.id;
    });

    it('should update a task', async () => {
        const res = await request(app)
            .put(`/api/tasks/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: "Updated Task" });
        expect(res.statusCode).toEqual(200);
    });
});
