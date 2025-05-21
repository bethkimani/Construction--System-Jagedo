import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, TextField, Typography, Button, Alert } from '@mui/material';
import Header from '../components/Header';

const ProfileEdit = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    specialization: '',
    company: '',
    license_number: '',
    id_number: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        specialization: user.specialization || '',
        company: user.company || '',
        license_number: user.license_number || '',
        id_number: user.id_number || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...user,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        specialization: formData.specialization,
        company: formData.company,
        license_number: formData.license_number,
        id_number: formData.id_number,
        address: formData.address,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccess('Profile updated successfully');
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };

  return (
    <div className="p-4">
      <Header />
      <div className="mt-4 max-w-md mx-auto">
        <Typography variant="h5">Edit User Profile</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            fullWidth
            className="mt-4"
          />
          <TextField
            label="Last Name"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            fullWidth
            className="mt-4"
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
            className="mt-4"
          />
          <TextField
            label="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            fullWidth
            className="mt-4"
          />
          {user?.user_type === 'builder' && (
            <>
              <TextField
                label="Specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                fullWidth
                className="mt-4"
              />
              <TextField
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                fullWidth
                className="mt-4"
              />
            </>
          )}
          {user?.user_type === 'client' && (
            <>
              <TextField
                label="License Number"
                value={formData.license_number}
                onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                fullWidth
                className="mt-4"
              />
              <TextField
                label="ID Number"
                value={formData.id_number}
                onChange={(e) => setFormData({ ...formData, id_number: e.target.value })}
                fullWidth
                className="mt-4"
              />
              <TextField
                label="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                fullWidth
                className="mt-4"
              />
            </>
          )}
          {error && <Alert severity="error" className="mt-4">{error}</Alert>}
          {success && <Alert severity="success" className="mt-4">{success}</Alert>}
          <Button type="submit" variant="contained" fullWidth className="mt-4">
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;