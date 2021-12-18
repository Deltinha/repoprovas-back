import { getRepository } from 'typeorm';
import Professor from '../entities/Professor';

// eslint-disable-next-line import/prefer-default-export
export async function getProfessors() {
  const professors = getRepository(Professor).find();
  return professors;
}
