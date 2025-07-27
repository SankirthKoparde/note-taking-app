import { Response } from 'express';
import Note from '../models/note.model';
import { AuthRequest } from '../middleware/auth.middleware';

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.findAll({ 
      where: { userId: req.user!.id },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const newNote = await Note.create({
      content,
      userId: req.user!.id,
    });

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findByPk(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId !== req.user!.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await note.destroy();
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};