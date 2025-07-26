import { Response } from 'express';
import Note from '../models/note.model';
import { AuthRequest } from '../middleware/auth.middleware';

// @desc    Create a new note
// @route   POST /api/notes
export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const newNote = await Note.create({
      content,
      userId: req.user!.id, // The user ID comes from the protect middleware
    });

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findByPk(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if the note belongs to the user trying to delete it
    if (note.userId !== req.user!.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await note.destroy();

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};