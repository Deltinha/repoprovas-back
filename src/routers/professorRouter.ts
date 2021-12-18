import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ClassToProfessor from '../entities/ClassToProfessor';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const result = await getRepository(ClassToProfessor).find();

  return res.send(result).status(200);
});

export default router;
