import express from 'express';
import * as classController from '../controllers/classController';

const router = express.Router();

router.get('/', classController.getClasses);
router.get('/:id', classController.getExamsFromClass);

export default router;
