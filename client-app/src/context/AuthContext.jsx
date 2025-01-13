// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

// AuthContext oluşturuluyor
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateScore = (newScore) => {
    setUser((prevUser) => ({ ...prevUser, score: newScore }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateScore }}>
      {children}
    </AuthContext.Provider>
  );
};
