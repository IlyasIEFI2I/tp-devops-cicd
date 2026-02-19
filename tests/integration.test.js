const request = require('supertest');
const app = require('../src/app');
const { initDb, closePool } = require('../src/db');

describe('API Integration Tests', () => {
  beforeAll(async () => {
    await initDb();
  });

  afterAll(async () => {
    await closePool();
  });

  test('GET /health should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('POST /users should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'John Doe' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('John Doe');
  });

  test('GET /users should return list of users', async () => {
    await request(app)
      .post('/users')
      .send({ name: 'Jane Smith' });

    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('POST /users without name should fail', async () => {
    const res = await request(app)
      .post('/users')
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('name is required');
  });
});
