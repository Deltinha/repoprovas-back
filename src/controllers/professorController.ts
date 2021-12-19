import { NextFunction, Request, Response } from 'express';
import * as professorService from '../services/professorService';
import * as examService from '../services/examService';

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

export async function getExamsFromProfessor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const professorId = parseInt(req.params.id, 10);
  try {
    if (!professorId) {
      return res.sendStatus(400);
    }
    const exams = await examService.getExamsFromProfessor(professorId);
    return res.send(exams).status(200);
  } catch (err) {
    return next(err);
  }
}
