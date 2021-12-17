import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as examController from '../controllers/examController';
import Exam from '../entities/Exam';

const router = express.Router();

router.post('/', examController.postExam);

router.get('/', async (req: Request, res: Response) => {
  const exams = (await getRepository(Exam).find()).map((exam) =>
    exam.getExam()
  );

  return res.send(exams).status(200);
});

export default router;
