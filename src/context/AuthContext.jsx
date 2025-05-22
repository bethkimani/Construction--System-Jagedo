import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyUsers } from '../data/dummyData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const signup = (email, password, user_type, additionalInfo) => {
    if (!['client', 'builder', 'hardware', 'admin', 'fundi', 'contractor'].includes(user_type)) {
      setError('Invalid user type');
      return Promise.reject(new Error('Invalid user type'));
    }

    if (dummyUsers.some((u) => u.email === email)) {
      setError('Email already exists');
      return Promise.reject(new Error('Email already exists'));
    }

    if (!email || !password) {
      setError('Email and password are required');
      return Promise.reject(new Error('Email and password are required'));
    }

    if (!additionalInfo.first_name || !additionalInfo.last_name) {
      setError('First name and last name are required');
      return Promise.reject(new Error('First name and last name are required'));
    }

    if (user_type === 'builder' && (!additionalInfo.specialization || !additionalInfo.company)) {
      setError('Specialization and company are required for builders');
      return Promise.reject(new Error('Specialization and company are required for builders'));
    }

    if (user_type === 'hardware' && !additionalInfo.storeName) {
      setError('Store name is required for hardware suppliers');
      return Promise.reject(new Error('Store name is required for hardware suppliers'));
    }

    const newUser = {
      id: dummyUsers.length + 1,
      email,
      password,
      user_type,
      ...additionalInfo,
    };

    dummyUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setError('');
    navigate('/login');
    return Promise.resolve();
  };

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      console.log('Logged in from localStorage:', storedUser);
      console.log('User Details:', {
        email: storedUser.email,
        user_type: storedUser.user_type,
        first_name: storedUser.first_name,
        last_name: storedUser.last_name,
        location: storedUser.location || 'Not specified',
      });
      setError('');
      redirectUser(storedUser.user_type);
      return Promise.resolve();
    }

    const dummyUser = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (dummyUser) {
      setUser(dummyUser);
      console.log('Logged in from dummyUsers:', dummyUser);
      console.log('User Details:', {
        email: dummyUser.email,
        user_type: dummyUser.user_type,
        first_name: dummyUser.first_name,
        last_name: dummyUser.last_name,
        location: dummyUser.location || 'Not specified',
      });
      localStorage.setItem('user', JSON.stringify(dummyUser));
      setError('');
      redirectUser(dummyUser.user_type);
      return Promise.resolve();
    }

    setError('Invalid email or password');
    return Promise.reject(new Error('Invalid email or password'));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setError('');
    navigate('/login');
  };

  const redirectUser = (userType) => {
    if (userType === 'client') {
      navigate('/builders');
    } else if (userType === 'builder') {
      navigate('/projects');
    } else if (userType === 'hardware') {
      navigate('/materials');
    } else if (userType === 'admin') {
      navigate('/admin');
    } else if (userType === 'fundi') {
      navigate('/fundi-dashboard'); // Placeholder route
    } else if (userType === 'contractor') {
      navigate('/contractor-dashboard'); // Placeholder route
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, signup, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);