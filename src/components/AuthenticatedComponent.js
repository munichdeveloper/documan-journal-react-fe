import { useAuth } from '../AuthContext';
import React from 'react';
import { Navigate } from 'react-router-dom';

function AuthenticatedComponent({ children }) {
  const { userIsAuthenticated } = useAuth()
  return userIsAuthenticated() ? children : <Navigate to="/login" />
}

export default AuthenticatedComponent