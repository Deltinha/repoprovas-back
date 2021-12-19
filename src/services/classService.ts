import { getRepository } from 'typeorm';
import Class from '../entities/Class';

export async function getClasses() {
  const classes = (await getRepository(Class).find()).map((_class) =>
    _class.getClasses()
  );
  return classes;
}
