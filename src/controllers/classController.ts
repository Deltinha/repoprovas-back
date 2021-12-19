import { NextFunction, Request, Response } from 'express';
import * as classService from '../services/classService';
import * as examService from '../services/examService';

export async function getClasses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const classes = await classService.getClasses();

    return res.send(classes).status(200);
  } catch (err) {
    return next(err);
  }
}

export async function getExamsFromClass(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const classId = parseInt(req.params.id, 10);

  try {
    if (!classId) {
      return res.sendStatus(400);
    }
    const classes = await examService.getExamsFromClass(classId);

    return res.send(classes).status(200);
  } catch (err) {
    return next(err);
  }
}
