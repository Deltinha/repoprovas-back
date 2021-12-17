import supertest from 'supertest';
import { getConnection } from 'typeorm';
import { clearDatabase } from '../utils/database';

import app, { init } from '../../src/app';
import createExamBody from '../factories/examFactory';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe('post /exams', () => {
  it('should answer with status 201', async () => {
    const exam = await createExamBody();

    const response = await supertest(app).post('/exams').send(exam);
    expect(response.status).toBe(201);
  });
});
