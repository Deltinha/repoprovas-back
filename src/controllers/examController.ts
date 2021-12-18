/* eslint-disable import/prefer-default-export */
import { NextFunction, Request, Response } from 'express';
import * as examService from '../services/examService';

export async function postExam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const exam = await examService.examBodyValidation(req.body);

    await examService.uploadExam(exam);

    return res.sendStatus(201);
  } catch (err) {
    console.log('aaa');

    if (err instanceof SyntaxError) {
      return res.sendStatus(400);
    }
    if (err.name === 'NotFoundError') {
      return res.sendStatus(404);
    }
    return next(err);
  }
}
