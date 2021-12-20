import express from 'express';
import * as examController from '../controllers/examController';

const router = express.Router();

router.post('/', examController.postExam);

router.get('/types', examController.getExamTypes);

export default router;
