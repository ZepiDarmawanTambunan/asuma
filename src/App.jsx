import React from 'react';
import './index.css';
import RoutesIndex from './routes';
import { Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <RoutesIndex />
    </AuthProvider>
  );
}

export default App;
