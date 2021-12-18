import { getRepository } from 'typeorm';
import Class from '../entities/Class';

export async function getClasses() {
  const classes = getRepository(Class).find();
  return classes;
}
