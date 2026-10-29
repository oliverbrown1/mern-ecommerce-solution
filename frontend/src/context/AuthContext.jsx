import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) => {
        const navigate = useNavigate();
        const [user, setUser] = useState(null); //user info, null when logged out
        const [authLoading, setAuthLoading] = useState(true) //prevent page loading when auth in progress
        const [token, setToken] = useState(localStorage.getItem("authtoken") || null); // token sent with API requests, can be invalid

        // verify token with use effect
        useEffect(() => {
            const authenticate = async () => {
                setAuthLoading(true);
                await verifyToken();
            }
            authenticate();
        }, [token]);


        // store token locally -> localStorage.getItem("authtoken")
        // first verify token, if so then set user
        // use effect to verify token whenever token changes.
        const verifyToken = async () => {

            const token = localStorage.getItem("authtoken");
            if (!token) {
                setAuthLoading(false);
                return;
            }
            
            try {
                const response = await axios.post('/auth/verify-token', 
                    {},
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                

                setUser(response.data.user);
            }
            catch(error){
                console.log(error);
                const msg = error?.response?.data?.message || "Session expired. Please log in again.";
                localStorage.removeItem("authtoken");
                setToken(null);
                setUser(null);
            }
            finally{
                setAuthLoading(false);
            }
        }

        const register = async (email, username, pwd) => {
            const response = await axios.post("/auth/signup", {
                email : email,
                user: username,
                pwd: pwd
            });
        }

        const login = async (email, pwd) => {
            const response = await axios.post("/auth/login", {
                email: email,
                pwd: pwd
            }, {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            });
            
            setToken(response?.data?.token)
            localStorage.setItem("authtoken", response.data.token);
            console.log("auth-token stored: ",localStorage.getItem("authtoken"))
        };

        const logout = () => {
            localStorage.removeItem("authtoken");
            setToken(null);
            setUser(null);
        };

        const forgotPassword= async (email, username, useUsername) => {
            const response = await axios.post("/auth/forgot", {
                email: email,
                user: username,
                useUser: useUsername
            });

        }; 

        const resetPassword = async (id, resetToken, confirmPwd ) => {
            const response = await axios.post("/auth/reset-password", {
                id: id,
                token: resetToken,
                pwd: confirmPwd
            });
        };


        const redirect = () => {
            if(!user || !token){
                navigate("/login");
                return true;
            }
            return false
        }

        return(
            <AuthContext.Provider value={{user, setUser, token, authLoading, register, login, logout, forgotPassword, resetPassword, redirect}}>
                {children}
            </AuthContext.Provider>
        );
}