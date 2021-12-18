import { NextFunction, Request, Response } from 'express';
import * as professorService from '../services/professorService';

// eslint-disable-next-line import/prefer-default-export
export async function getProfessors(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const professors = await professorService.getProfessors();

    return res.send(professors).status(200);
  } catch (err) {
    return next(err);
  }
}
