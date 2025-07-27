import { Router } from 'express';
import { createNote, deleteNote, getNotes } from '../controllers/note.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.route('/')
  .get(protect, getNotes)
  .post(protect, createNote);
  
router.route('/:id')
  .delete(protect, deleteNote);

export default router;