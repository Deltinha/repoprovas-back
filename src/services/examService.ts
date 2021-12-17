import { getRepository } from 'typeorm';
import ClassToProfessor from '../entities/ClassToProfessor';
import Exam from '../entities/Exam';
import Type from '../entities/Type';
import NotFoundError from '../errors/NotFoundError';
import SyntaxError from '../errors/SyntaxError';

export async function uploadExam(exam: any) {
  await getRepository(Exam).insert(exam);
}

export async function examBodyValidation(exam: any) {
  if (
    !exam.name ||
    !exam.classId ||
    !exam.professorId ||
    !exam.typeId ||
    !exam.link
  ) {
    throw new SyntaxError('missing property in request body');
  }
  // joi aqui
  const classProfessor = await getRepository(ClassToProfessor).findOne({
    where: { class: exam.classId, professor: exam.professorId },
  });

  if (Object.keys(classProfessor).length === 0)
    throw new NotFoundError(
      'given combination of professor and class does not exists'
    );

  const type = await getRepository(Type).findOne({
    where: { id: exam.typeId },
  });
  if (Object.keys(type).length === 0) {
    throw new NotFoundError('exam type does not exist');
  }
  return {
    ...exam,
    classProfessorId: classProfessor.id,
  };
}
