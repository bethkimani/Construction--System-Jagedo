import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Alert, Typography } from '@mui/material';
import { dummyUsers } from '../data/dummyData';

const Signup = () => {
  const [userType, setUserType] = useState('client');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    specialization: '',
    company: '',
    license_number: '',
    id_number: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (dummyUsers.some((user) => user.email === formData.email)) {
        throw new Error('Email already exists. Please use a different email.');
      }

      const endpoint = userType === 'builder' ? '/builders/' : '/clients/';
      const newUser = {
        user: {
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          user_type: userType,
        },
        ...(userType === 'builder' && {
          phone: formData.phone,
          specialization: formData.specialization,
          company: formData.company,
        }),
        ...(userType === 'client' && {
          phone: formData.phone,
          license_number: formData.license_number,
          id_number: formData.id_number,
          address: formData.address,
        }),
      };
      const response = await api.post(endpoint, newUser);

      dummyUsers.push({
        id: response.data.id,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        user_type: userType,
        phone: formData.phone,
        ...(userType === 'builder' && {
          specialization: formData.specialization,
          company: formData.company,
        }),
        ...(userType === 'client' && {
          license_number: formData.license_number,
          id_number: formData.id_number,
          address: formData.address,
        }),
      });

      setSuccess(`${userType} added successfully`);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm">
        <Typography variant="h5" className="text-center mb-4">
          Sign up to Construction Management System
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth className="mb-4">
            <InputLabel>Account Type</InputLabel>
            <Select value={userType} onChange={(e) => setUserType(e.target.value)} label="Account Type">
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="builder">Builder</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Email"
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
          <TextField
            label="First Name"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            fullWidth
            required
            className="mb-4"
          />
          <TextField
            label="Last Name"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            fullWidth
            required
            className="mb-4"
          />
          <TextField
            label="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            fullWidth
            required
            className="mb-4"
          />
          {userType === 'builder' && (
            <>
              <TextField
                label="Specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                fullWidth
                required
                className="mb-4"
              />
              <TextField
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                fullWidth
                required
                className="mb-4"
              />
            </>
          )}
          {userType === 'client' && (
            <>
              <TextField
                label="License Number"
                value={formData.license_number}
                onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                fullWidth
                required
                className="mb-4"
              />
              <TextField
                label="ID Number"
                value={formData.id_number}
                onChange={(e) => setFormData({ ...formData, id_number: e.target.value })}
                fullWidth
                required
                className="mb-4"
              />
              <TextField
                label="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                fullWidth
                required
                className="mb-4"
              />
            </>
          )}
          {success && <Alert severity="success" className="mb-4">{success}</Alert>}
          {error && <Alert severity="error" className="mb-4">{error}</Alert>}
          <Button type="submit" variant="contained" fullWidth>
            Sign Up
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            Have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;