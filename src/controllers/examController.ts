import { NextFunction, Request, Response } from 'express';
import * as examService from '../services/examService';

export async function postExam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await examService.examBodyValidation(req.body);

    await examService.uploadExam(req.body);

    return res.sendStatus(201);
  } catch (err) {
    if (err instanceof SyntaxError) {
      return res.sendStatus(400);
    }
    if (err.name === 'NotFoundError') {
      return res.sendStatus(404);
    }
    return next(err);
  }
}

export async function getExamTypes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const types = await examService.getExamTypes();
    return res.send(types).status(200);
  } catch (err) {
    return next(err);
  }
}
