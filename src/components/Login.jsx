import React, { useState, useEffect, useContext } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Box,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log(isAuthenticated)
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post("http://localhost:8000/login", {
        username: email,
        password: password,
      }, {
        withCredentials: true,
      });
  
      // Assuming response.data contains the user information
      const userData = response.data;
  
      // console.log(userData);
  
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData.data));
  
      // Fix: Check if the user is not authenticated before updating the state
      if (!isAuthenticated && !localStorage.getItem('user')) {
        setIsAuthenticated(true);
  
        // Set sessionStorage to true after successful login
        sessionStorage.setItem('sessionAuthenticated', 'true');
      }
    } catch (err) {
      setError(err.response?.data);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Box maxW="500px" mx="auto" mt={20} >
      <Text fontSize="4xl" textAlign="center" mb="8">
        Sign in your Account
      </Text>
      {error && (
        <Alert status="error" mb={8}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleLogin}>
        <Stack spacing="4">
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blackAlpha" isLoading={isLoading}>
            Sign In
          </Button>
        </Stack>
      </form>
      <Link to='/signup'>
        <Text m={5}>New User? Register</Text>
      </Link>
    </Box>
  );
};

export default Login;
