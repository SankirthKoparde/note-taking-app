import { Router } from 'express';
import { createNote, deleteNote } from '../controllers/note.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Any request to these routes must first pass through the 'protect' middleware
router.route('/').post(protect, createNote);
router.route('/:id').delete(protect, deleteNote);

export default router;