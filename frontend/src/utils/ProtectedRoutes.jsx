import React from 'react'
import { Outlet, Navigate   } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoutes = () => {
    const {user, setUser} = useContext(AuthContext);
    return user ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes