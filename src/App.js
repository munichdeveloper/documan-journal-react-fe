import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './AuthContext';
import AuthenticatedComponent from './components/AuthenticatedComponent';
import Home from './components/Home';
import Journal from './components/Journal';
import Login from './components/Login';
import Query from './components/Query';

function App() {

  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AuthenticatedComponent><Home /></AuthenticatedComponent>} />
          <Route path="/login" element={<Login />} />
          <Route path="/query" element={<AuthenticatedComponent><Query /></AuthenticatedComponent>} />
          <Route path="/journal" element={<AuthenticatedComponent><Journal /></AuthenticatedComponent>} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
