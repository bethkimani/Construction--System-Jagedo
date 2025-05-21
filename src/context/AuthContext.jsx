import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const signup = (email, password, user_type, additionalInfo) => {
    if (!['client', 'builder', 'hardware', 'admin'].includes(user_type)) { // Added 'admin'
      setError('Invalid user type');
      return Promise.reject(new Error('Invalid user type'));
    }
    const userData = { email, password, user_type, ...additionalInfo };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setError('');
    return Promise.resolve();
  };

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      setError('');
      if (storedUser.user_type === 'client') {
        navigate('/builders');
      } else if (storedUser.user_type === 'builder') {
        navigate('/projects');
      } else if (storedUser.user_type === 'hardware') {
        navigate('/materials');
      } else if (storedUser.user_type === 'admin') { // Added
        navigate('/admin');
      } else {
        navigate('/');
      }
      return Promise.resolve();
    }
    setError('Invalid email or password');
    return Promise.reject(new Error('Invalid email or password'));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);