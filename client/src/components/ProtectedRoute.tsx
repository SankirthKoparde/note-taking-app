import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();

  if (!token) {
    // If user is not logged in, redirect to the signin page
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;