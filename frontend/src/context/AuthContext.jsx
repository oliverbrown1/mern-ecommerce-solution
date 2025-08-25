import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) => {
        const [user, setUser] = useState(null);
        const [isLoading, setIsLoading] = useState(true)
        const [token, setToken] = useState(localStorage.getItem("authtoken") || null);

        // verify token with use effect
        useEffect(() => {
            const authenticate = async () => {
                await verifyToken();
            }
            authenticate();
        }, [token]);


        // store token locally -> localStorage.getItem("authtoken")
        // first verify token, if so then set user
        // use effect to verify token whenever new page loaded(?)
        const verifyToken = async () => {
            const token = localStorage.getItem("authtoken");
            if (!token) {
                setIsLoading(false);
                return;
            }
            
            try {
                const response = await axios.post('http://localhost:3001/auth/verify-token', 
                    {},
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                

                setUser(response.data.user.username);
                setIsLoading(false);
            }
            catch(error){
                console.log(error);
                alert(error.response.data.message);
                setToken(null)
            }
        }

        const logout = () => {
            localStorage.removeItem("authtoken");
            setToken(null);
            setUser(null);
        };

        return(
            <AuthContext.Provider value={{user, setUser, token, isLoading, logout}}>
                {children}
            </AuthContext.Provider>
        );
}