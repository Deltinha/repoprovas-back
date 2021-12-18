import { NextFunction, Request, Response } from 'express';
import * as classService from '../services/classService';

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
