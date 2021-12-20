import faker from 'faker';
import { getRepository } from 'typeorm';
import Exam from '../../../src/entities/Exam';
import { getRandomClassProfessorId, getRandomType } from '../../utils/database';

export async function createExamBody() {
  const classProfessor = await getRandomClassProfessorId();
  return {
    name: '2020.1',
    professorId: classProfessor.professorId,
    classId: classProfessor.classId,
    typeId: await getRandomType(),
    link: `${faker.internet.url()}/${faker.system.commonFileName('pdf')}`,
  };
}

export async function createExamDB() {
  const body = await createExamBody();

  let createdExamId: number;
  await getRepository(Exam)
    .insert(body)
    .then((result) => {
      createdExamId = result.identifiers[0].id;
    });

  return createdExamId;
}
