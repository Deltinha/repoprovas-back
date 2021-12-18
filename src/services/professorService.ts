import { getRepository } from 'typeorm';
import Professor from '../entities/Professor';

export async function getProfessors() {
  const professors = await Promise.all(
    (
      await getRepository(Professor).find()
    ).map(async (prof) => prof.getProfessors())
  );

  return professors;
}
