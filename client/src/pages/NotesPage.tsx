import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNotes, createNote, deleteNote } from '../services/noteService';
import { Note } from '../types';

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // This line gets the user data from the context
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes();
        setNotes(response.data);
      } catch (err) {
        setError('Failed to fetch notes.');
      } finally {
        setLoading(false);
      }
    };
    // Only fetch notes if the user is logged in
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    try {
      const response = await createNote({ content: newNoteContent });
      setNotes([response.data, ...notes]);
      setNewNoteContent('');
    } catch (err) {
      setError('Failed to create note.');
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      setError('Failed to delete note.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="HD Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-800">Dashboard</span>
          </div>
          <button onClick={logout} className="text-sm font-semibold text-blue-600 hover:underline">
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-8">
        {/* This block displays the user's name and email */}
        {user && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Welcome, {user.name}!</h1>
            <p className="text-sm text-gray-500 mt-1">Email: {user.email}</p>
          </div>
        )}

        <form onSubmit={handleCreateNote} className="mb-8">
          <textarea
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <button type="submit" className="w-full mt-3 py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700">
            Create Note
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Notes</h2>
          {loading && <p className="text-gray-500">Loading notes...</p>}
          {error && <p className="text-red-500">{error}</p>}
          
          {notes.length > 0 ? (
            notes.map(note => (
              <div key={note.id} className="bg-white p-4 rounded-xl shadow-lg flex justify-between items-center">
                <p className="text-gray-800 break-all">{note.content}</p>
                <button onClick={() => handleDeleteNote(note.id)} className="text-gray-400 hover:text-red-500 flex-shrink-0 ml-4 p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            !loading && <p className="text-gray-500">You don't have any notes yet. Create one above!</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default NotesPage;