import express from 'express';
import * as professorController from '../controllers/professorController';

const router = express.Router();

router.get('/', professorController.getProfessors);
router.get('/:id', professorController.getExamsFromProfessor);

export default router;
