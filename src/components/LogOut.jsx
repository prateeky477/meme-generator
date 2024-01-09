import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const LogOut = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      // Assuming you have stored the user data in localStorage with the key 'user'
      const userData = JSON.parse(localStorage.getItem('user'));

      if (!userData) {
        setIsLoading(false);
        return;
      }

      // Check if the user is authenticated before updating the state
      if (isAuthenticated) {
        // Remove user data from localStorage
        localStorage.removeItem('user');

        // Update authentication state
        setIsAuthenticated(false);
      }
    };

    const handleLogout = async () => {
      try {
        const response = await axios.post("https://fastapi-meme.onrender.com/logout", null, {
          withCredentials: true,
        });

        // Assuming response.data contains the user information
        const userData = response.data;
        // console.log(userData);
      } catch (err) {
        // console.error("Logout Error:", err);
        setError(err.response?.data);
      } finally {
        setIsLoading(false);
      }
    };

    const logout = async () => {
      await checkAuthentication();
      await handleLogout();
      // console.log(isAuthenticated);
    };

    logout();
  }, [isAuthenticated, setIsAuthenticated]);

  // Redirect to the home page after logging out
  return isLoading ? <div>Logging out...</div> : <Navigate to="/" />;
};

export default LogOut;
