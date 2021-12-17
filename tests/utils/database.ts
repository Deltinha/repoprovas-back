import { createQueryBuilder, getRepository } from 'typeorm';
import ClassToProfessor from '../../src/entities/ClassToProfessor';
import Exam from '../../src/entities/Exam';
import Type from '../../src/entities/Type';

export async function clearDatabase() {
  await getRepository(Exam).delete({});
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
