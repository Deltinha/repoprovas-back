import faker from 'faker';
import { getRandomClassProfessorId, getRandomType } from '../../utils/database';

export default async function createExamBody() {
  const classProfessor = await getRandomClassProfessorId();
  return {
    name: '2020.1',
    professorId: classProfessor.professorId,
    classId: classProfessor.classId,
    typeId: await getRandomType(),
    link: `${faker.internet.url()}/${faker.system.commonFileName('pdf')}`,
  };
}
