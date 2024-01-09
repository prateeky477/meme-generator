import React, { useEffect, useContext, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function AuthRequired() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuthentication = async () => {
      console.log(process.env.REACT_APP_URL)
      try {
        const response = await axios.post("https://fastapi-meme.onrender.com/auth", null, {
          withCredentials: true,
        });

        const userData = response.data;

        // console.log(userData);

        // Get user data from localStorage
        const storedUserData = JSON.parse(localStorage.getItem('user'));

        // Check if localStorage data matches the response data
        if (storedUserData && JSON.stringify(storedUserData) === JSON.stringify(userData)) {
          setIsAuthenticated(true);

          // Set sessionStorage to true
          sessionStorage.setItem('sessionAuthenticated', 'true');
        }
      } catch (err) {
        setError(err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
    // console.log(isAuthenticated)
  }, [isAuthenticated, setIsAuthenticated]);

  if (loading) {
    // Display a loading indicator while checking authentication
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
}
