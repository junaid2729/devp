// frontend/src/context/AuthContext.js
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (username, password, email, phone) => {
    await axios.post('/api/auth/register', { username, password, email, phone });
  };

  const login = async (username, password) => {
    const response = await axios.post('/api/auth/login', { username, password });
    setUser(response.data);
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
