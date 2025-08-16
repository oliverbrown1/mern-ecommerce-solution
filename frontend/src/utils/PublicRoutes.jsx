import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = () => {
    const {user, setUser} = useContext(AuthContext);
    console.log("PublicRoutes - User:", user);
    // console.log(typeof(user))
    return user ? <Navigate to="/" /> : <Outlet />
}

export default PublicRoutes