import { createQueryBuilder, getRepository } from 'typeorm';
import faker from 'faker';
import ClassToProfessor from '../../src/entities/ClassToProfessor';
import Exam from '../../src/entities/Exam';
import Professor from '../../src/entities/Professor';
import Type from '../../src/entities/Type';
import Year from '../../src/entities/Years';
import Class from '../../src/entities/Class';

export async function clearDatabase() {
  await getRepository(Exam).delete({});
  await getRepository(ClassToProfessor).delete({});
  await getRepository(Class).delete({});
  await getRepository(Professor).delete({});
  await getRepository(Year).delete({});
  await getRepository(Type).delete({});
}

export async function populateDatabase() {
  let professorId: number;
  let yearId: number;
  let classId: number;

  await getRepository(Type).insert({
    name: faker.random.word(),
  });

  await getRepository(Year)
    .insert({
      name: faker.random.word(),
    })
    .then((result) => {
      yearId = result.identifiers[0].id;
    });

  await getRepository(Professor)
    .insert({
      name: faker.name.firstName(),
    })
    .then((result) => {
      professorId = result.identifiers[0].id;
    });

  await getRepository(Class)
    .insert({
      name: faker.random.words(2),
      yearId,
    })
    .then((result) => {
      classId = result.identifiers[0].id;
    });

  await getRepository(ClassToProfessor).insert({
    professorId,
    classId,
  });
}

export async function getRandomClassProfessorId() {
  const result = await createQueryBuilder(ClassToProfessor)
    .orderBy('random()')
    .limit(1)
    .execute();
  return {
    classId: result[0].ClassToProfessor_class_id,
    professorId: result[0].ClassToProfessor_professor_id,
  };
}

export async function getRandomType() {
  const result = await createQueryBuilder(Type)
    .orderBy('random()')
    .limit(1)
    .execute();
  return result[0].Type_id;
}
