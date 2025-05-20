import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

// Dummy user database (we'll populate this in dummyData.js)
import { dummyUsers } from '../data/dummyData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          // Simulate fetching user data
          const response = await api.get('/me/');
          setUser(response.data);
        }
      } catch (error) {
        localStorage.removeItem('access_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate login by checking dummy user data
      const foundUser = dummyUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (!foundUser) {
        throw new Error('Invalid credentials. Please try again.');
      }

      // Simulate token response
      const response = await api.post('/o/token/', {
        grant_type: 'password',
        username: email,
        password,
        client_id: 'dummy-client-id', // No need for env variables
        client_secret: 'dummy-client-secret',
      });

      // Store user in localStorage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);
      setError(null);
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);