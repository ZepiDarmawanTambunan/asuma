import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthProvider';

import Beranda from '../views/Beranda';
import Login from '../views/Login';
import Tes from '../views/Tes';
import SuratMasuk from '../views/SuratMasuk';
import SuratKeluar from '../views/SuratKeluar';
import SuratMasukDetail from '../views/SuratMasukDetail';
import SuratKeluarDetail from '../views/SuratKeluarDetail';
import LaporanSuratMasuk from '../views/LaporanSuratMasuk';
import LaporanSuratKeluar from '../views/LaporanSuratKeluar';
import Statistik from '../views/Statistik';
import Bagian from '../views/Bagian';
import Users from '../views/Users';

const renderAuthElement = (element) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const { pathname } = location;
  
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    if (!user) {
      return <Navigate to="/login" />;
    }
    if(pathname === '/users' || pathname === '/bagian'){
      if(user.email !== 'zefidarmawan@gmail.com'){
        return <Navigate to="/" />;
      }
    }
    return element;
  }
};

const RoutesIndex = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/" element={renderAuthElement(<Beranda />)} />
      <Route path="/surat-masuk" element={renderAuthElement(<SuratMasuk />)} />
      <Route path="/surat-masuk/:id" element={renderAuthElement(<SuratMasukDetail />)} />
      <Route path="/surat-keluar" element={renderAuthElement(<SuratKeluar />)} />
      <Route path="/surat-keluar/:id" element={renderAuthElement(<SuratKeluarDetail />)} />
      <Route path="/laporan-suratmasuk" element={renderAuthElement(<LaporanSuratMasuk />)} />
      <Route path="/laporan-suratkeluar" element={renderAuthElement(<LaporanSuratKeluar />)} />
      <Route path="/statistik" element={renderAuthElement(<Statistik />)} />
      <Route path="/bagian" element={renderAuthElement(<Bagian />)} />
      <Route path="/tes" element={renderAuthElement(<Tes />)} />
      <Route path="/users" element={renderAuthElement(<Users />)} />
    </Routes>
  );
};

export default RoutesIndex;