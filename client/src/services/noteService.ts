import api from './api';
import { Note } from '../types';

interface NewNote {
  content: string;
}

export const getNotes = () => {
  return api.get<Note[]>('/notes');
};

export const createNote = (data: NewNote) => {
  return api.post<Note>('/notes', data);
};

export const deleteNote = (id: number) => {
  return api.delete(`/notes/${id}`);
};