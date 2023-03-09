import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const checkLoginAdmin = localStorage.getItem('tokenPet') ? true : false;

  // if (loading) return null

  return checkLoginAdmin ? <Outlet /> : <Navigate to="/" replace />;
};
export default ProtectedRoute;
