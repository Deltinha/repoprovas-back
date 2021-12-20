import supertest from 'supertest';
import { getConnection, getRepository } from 'typeorm';
import { clearDatabase, populateDatabase } from '../utils/database';
import app, { init } from '../../src/app';
import { createExamDB } from './factories/examFactory';
import Class from '../../src/entities/Class';

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

describe('get classes', () => {
  it('should answer with status 200', async () => {
    const response = await agent.get('/classes');
    expect(response.status).toBe(200);
  });

  it('should return classes with expected body', async () => {
    const response = await agent.get('/classes');
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          year: expect.any(String),
          professors: expect.arrayContaining([expect.any(Object)]),
          exams: expect.any(Array),
        }),
      ])
    );
  });
});

describe('get exams from a speficic class', () => {
  it('should answer with status 200', async () => {
    await createExamDB();
    const _class = await getRepository(Class).findOne();

    const response = await agent.get(`/classes/${_class.id}`);
    expect(response.status).toBe(200);
  });
});
