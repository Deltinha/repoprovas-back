import supertest from 'supertest';
import { getConnection } from 'typeorm';
import faker from 'faker';
import { clearDatabase, populateDatabase } from '../utils/database';
import app, { init } from '../../src/app';
import { createExamBody } from './factories/examFactory';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await populateDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

const agent = supertest(app);

describe('post exam', () => {
  it('should answer with status 201', async () => {
    const exam = await createExamBody();

    const response = await agent.post('/exams').send(exam);

    expect(response.status).toBe(201);
  });

  it('should answer with status 400 if request body is not valid', async () => {
    const exam = {
      name: faker.datatype.number(),
      typeId: faker.random.word(),
    };
    const response = await agent.post('/exams').send(exam);
    expect(response.status).toBe(400);
  });

  it('should answer with status 404 if given combination of professor and class does not exists', async () => {
    const exam = await createExamBody();
    exam.professorId = 99;

    const response = await agent.post('/exams').send(exam);
    expect(response.status).toBe(404);
  });

  it('should answer with status 404 if exam type does not exist', async () => {
    const exam = await createExamBody();
    exam.typeId += 1;

    const response = await agent.post('/exams').send(exam);
    expect(response.status).toBe(404);
  });
});

describe('get exam types', () => {
  it('should answer with status 200', async () => {
    const response = await agent.get('/exams/types');
    expect(response.status).toBe(200);
  });

  it('should return exam types with expected body', async () => {
    const response = await agent.get('/exams/types');
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
        }),
      ])
    );
  });
});
