import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import NotesPage from './pages/NotesPage';
import ProtectedRoute from './components/ProtectedRoute'; // fixed path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
        {/* The NotesPage is now wrapped in the ProtectedRoute */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;