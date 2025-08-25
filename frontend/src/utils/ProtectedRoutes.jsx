import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoutes = () => {
    const auth = useContext(AuthContext);
    // console.log("ProtectedRoutes - ",auth.user)

    return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;