import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const localAuth = localStorage.getItem('username');
      const sessionAuth = sessionStorage.getItem('sessionAuthenticated');

      if ((localAuth && sessionAuth === 'true') && !isAuthenticated) {
        setIsAuthenticated(true);
      }
    };

    checkAuthentication();
  }, [isAuthenticated, setIsAuthenticated]); // Empty dependency array ensures the effect runs only once during mount

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
