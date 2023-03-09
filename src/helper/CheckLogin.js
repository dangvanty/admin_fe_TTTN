import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const CheckLogin = () => {
  const checkLoginAdmin = localStorage.getItem('tokenPet') ? true : false;

  // if (loading) return null

  return !checkLoginAdmin ? <Outlet /> : <Navigate to="/admin" replace />;
};
export default CheckLogin;
