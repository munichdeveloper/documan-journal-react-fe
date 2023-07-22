import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Query from './components/Query';
import Journal from './components/Journal';
import Login from './components/Login';
import { AuthProvider } from './AuthContext';
import AuthenticatedComponent from './components/AuthenticatedComponent';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticatedComponent><Home /></AuthenticatedComponent>} />
          <Route path="/login" element={<Login />} />
          <Route path="/query" element={<AuthenticatedComponent><Query /></AuthenticatedComponent>} />
          <Route path="/journal" element={<AuthenticatedComponent><Journal /></AuthenticatedComponent>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
