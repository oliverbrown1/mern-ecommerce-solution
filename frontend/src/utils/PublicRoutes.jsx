import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = () => {
    const auth = useContext(AuthContext);
    // console.log("PublicRoutes - User:", user);
    // console.log(typeof(user))
    return auth.user ? <Navigate to="/" /> : <Outlet />
}

export default PublicRoutes