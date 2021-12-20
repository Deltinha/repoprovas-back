import supertest from 'supertest';
import { getConnection, getRepository } from 'typeorm';
import { clearDatabase, populateDatabase } from '../utils/database';
import app, { init } from '../../src/app';
import { createExamDB } from './factories/examFactory';
import Professor from '../../src/entities/Professor';

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

describe('get professors', () => {
  it('should answer with status 200', async () => {
    const response = await agent.get('/professors');
    expect(response.status).toBe(200);
  });

  it('should return professors with expected body', async () => {
    const response = await agent.get('/professors');
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          examsQty: expect.any(Number),
        }),
      ])
    );
  });
});

describe('get exams from a speficic professor', () => {
  it('should answer with status 200', async () => {
    await createExamDB();
    const professor = await getRepository(Professor).findOne();

    const response = await agent.get(`/professors/${professor.id}`);
    expect(response.status).toBe(200);
  });
});
