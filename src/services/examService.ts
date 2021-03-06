import { getRepository } from 'typeorm';
import ClassToProfessor from '../entities/ClassToProfessor';
import Exam from '../entities/Exam';
import Type from '../entities/Type';
import NotFoundError from '../errors/NotFoundError';
import { examSchema } from '../schemas/examSchema';

export async function uploadExam(exam: Exam) {
  await getRepository(Exam).insert(exam);
}

export async function examBodyValidation(exam: Exam) {
  if (
    !exam.name ||
    !exam.classId ||
    !exam.professorId ||
    !exam.typeId ||
    !exam.link
  )
    throw new SyntaxError('missing property in request body');

  const validation = examSchema.validate(exam);

  if (validation?.error) {
    throw new SyntaxError();
  }

  const classToProfessor = await getRepository(ClassToProfessor).findOne({
    where: { classId: exam.classId, professorId: exam.professorId },
  });

  if (!classToProfessor)
    throw new NotFoundError(
      'given combination of professor and class does not exists'
    );

  const type = await getRepository(Type).findOne({
    where: { id: exam.typeId },
  });

  if (!type) {
    throw new NotFoundError('exam type does not exist');
  }
}

export async function getExamsFromProfessor(professorId: number) {
  const exams = (
    await getRepository(Exam).find({
      where: { professorId },
    })
  ).map((exam) => exam.getExam());

  return exams;
}

export async function getExamsFromClass(classId: number) {
  const exams = (
    await getRepository(Exam).find({
      where: { classId },
    })
  ).map((exam) => exam.getExam());

  return exams;
}

export async function getExamTypes() {
  return getRepository(Type).find();
}
