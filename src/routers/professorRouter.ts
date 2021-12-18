import express from 'express';
import * as professorController from '../controllers/professorController';

const router = express.Router();

// router.get('/', async (req: Request, res: Response) => {
//   const result = await getRepository(ClassToProfessor).find();

//   return res.send(result).status(200);
// });

router.get('/', professorController.getProfessors);

export default router;
