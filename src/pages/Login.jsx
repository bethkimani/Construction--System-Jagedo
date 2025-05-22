import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userType = searchParams.get('type') || 'client';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setLoading(false);
    }
  };

  const roleNames = {
    client: 'Clients',
    builder: 'Builders',
    hardware: 'Hardware Suppliers',
    fundi: 'Fundis',
    contractor: 'Contractors',
    admin: 'Admins',
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm">
        <Typography variant="h5" className="text-center mb-4">
          Log In to JaGedo
        </Typography>

        <Typography variant="body2" className="text-center mb-4 text-gray-600">
          For {roleNames[userType] || 'Users'}
        </Typography>

        <Typography variant="body2" className="text-center mb-4 text-gray-600">
          All users (Clients, Builders, Fundis, Contractors, Suppliers, Admins) log in here. You’ll be redirected to your dashboard.
        </Typography>

        {error && <Alert severity="error" className="mb-4">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
            required
            className="mb-4"
          />
          <TextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            fullWidth
            required
            className="mb-4"
          />
          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Log In'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link to={`/signup?type=${userType}`} className="text-blue-500 hover:underline">
            Don’t have an account? Sign Up as {roleNames[userType] || 'User'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
