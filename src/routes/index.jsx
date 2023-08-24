import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthProvider';

import Home from '../views/Home';
import Login from '../views/Login';
import Tes from '../views/Tes';
import SuratMasuk from '../views/SuratMasuk';
import SuratKeluar from '../views/SuratKeluar';

const renderAuthElement = (element) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return element;
  }
};

const RoutesIndex = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/" element={renderAuthElement(<Home />)} />
      <Route path="/surat-masuk" element={renderAuthElement(<SuratMasuk />)} />
      <Route path="/surat-keluar" element={renderAuthElement(<SuratKeluar />)} />
      <Route path="/tes" element={renderAuthElement(<Tes />)} />
    </Routes>
  );
};

export default RoutesIndex;