// frontend/src/context/AuthContext.js
import { createContext, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const register = async (firstName, lastName, username, email, phone, password) => {
    await axios.post('/api/auth/register', { firstName, lastName, username, email, phone, password });
  };

  const login = async (username, password) => {
    const { data } = await axios.post('/api/auth/login', { username, password });
    localStorage.setItem('token', data.token);
    return data;
  };

  return (
    <AuthContext.Provider value={{ register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
