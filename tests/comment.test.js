import request from 'supertest';
import app from '../server.js';
import sequelize from '../config/db.js';

beforeAll(async () => await sequelize.sync({ force: true }));

describe('Comment APIs', () => {
  let token, taskId;

  beforeAll(async () => {
    await request(app).post('/api/auth/register').send({ email: "comment@test.com", password: "123456" });
    const res = await request(app).post('/api/auth/login').send({ email: "comment@test.com", password: "123456" });
    token = res.body.token;

    const board = await request(app).post('/api/boards').set('Authorization', `Bearer ${token}`).send({ name: "Board for Comments" });
    const task = await request(app).post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: "Task for comment", boardId: board.body.id, createdBy: 1 });
    taskId = task.body.id;
  });

  it('should add a comment to a task', async () => {
    const res = await request(app)
      .post('/api/comments')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: "This is a test comment", taskId });
    expect(res.statusCode).toEqual(201);
  });

  it('should get comments for a task', async () => {
    const res = await request(app)
      .get(`/api/comments/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
