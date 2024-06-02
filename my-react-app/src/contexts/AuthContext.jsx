import React, {createContext, useState} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] =  
    useState({
        isAuthenticated: false,
        token: null,
        email: null
    });
    const login = (email, token) =>
        {
            setAuth({ isAuthenticated:
                true, email, token
            });
        };
        const logout = () => {
            setAuth({isAuthenticated:
                true, email: null, token: null
            });
        };

        return (
            <AuthContext.Provider
            value = {{auth, login, logout}}>
                {children}
            </AuthContext.Provider>
        );

};

export { AuthContext } ;