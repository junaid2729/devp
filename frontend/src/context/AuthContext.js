// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to load user from local storage when the app initializes
  const loadUserFromToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Fetch user details based on the token
        const response = await axios.get('http://localhost:3001/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user); // Set the user data from the response
      } catch (error) {
        console.error('Error loading user from token:', error);
        logout(); // Log out if token is invalid or expired
      }
    }
  };

  // Call loadUserFromToken on component mount
  useEffect(() => {
    loadUserFromToken();
  }, []);

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
      alert('Registration successful! Please log in.');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed! Please try again.');
    }
  };

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password,
      });
      setUser(response.data.user); // Set the logged-in user
      localStorage.setItem('token', response.data.token); // Save token in local storage
      // alert('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed! Please check your credentials.');
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove token from local storage
    // alert('Logged out successfully.');
  };

  // Auth context value
  const value = {
    user,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
