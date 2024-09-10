// src/context/AuthContext.js

import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Register function
  const register = async (firstName, lastName, username, email, phone, password) => {
    try {
      await axios.post('http://localhost:3001/api/auth/register', {
        firstName,
        lastName,
        username,
        email,
        phone,
        password,
      });
      // Do not set the user state here; registration is just for creating the account
      // You can optionally add a success message or handle redirection after registration
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error appropriately (e.g., set error state)
    }
  };

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password,
      });
      setUser(response.data.user); // Set the user state only on login
      localStorage.setItem('token', response.data.token); // Save the token for authentication
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error appropriately (e.g., set error state)
    }
  };

  // Logout function
  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem('token'); // Remove any stored tokens
    // Add any additional logout handling here, such as notifying the server
  };

  // Auth context value
  const value = {
    user,
    register,
    login,
    logout, // Include the logout function in the context value
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
