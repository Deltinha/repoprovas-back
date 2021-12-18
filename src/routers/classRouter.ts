import express from 'express';
import * as classController from '../controllers/classController';

const router = express.Router();

// router.get('/', async (req: Request, res: Response) => {
//   const result = await getRepository(ClassToProfessor).find();

//   return res.send(result).status(200);
// });

router.get('/', classController.getClasses);

export default router;
