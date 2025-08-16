import React, { useState, useEffect, useContext } from 'react'

export const AuthContext = React.createContext();

export const AuthContextProvider = ({children}) => {
        const [user, setUser] = useState(null);

        // store token locally -> localStorage.getItem("authtoken")
        // first verify token, if so then set user
        // use effect to verify token whenever user changes(?)

        return(
            <AuthContext.Provider value={{user, setUser}}>
                {children}
            </AuthContext.Provider>
        );
}