import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    user_type: 'client',
    first_name: '',
    last_name: '',
    specialization: '',
    company: '',
    storeName: '',
    fundiTrade: '',
    contractorLicense: '',
    location: '', // Added location field
  });
  const [loading, setLoading] = useState(false);
  const { signup, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const additionalInfo = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        location: formData.location, // Include location in additionalInfo
        ...(formData.user_type === 'builder' && {
          specialization: formData.specialization,
          company: formData.company,
        }),
        ...(formData.user_type === 'hardware' && { storeName: formData.storeName }),
        ...(formData.user_type === 'fundi' && { trade: formData.fundiTrade }),
        ...(formData.user_type === 'contractor' && { licenseNumber: formData.contractorLicense }),
      };

      await signup(formData.email, formData.password, formData.user_type, additionalInfo);
      // Navigation handled in AuthContext
    } catch (err) {
      console.error('Signup error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm">
        <Typography variant="h5" className="text-center mb-4">
          Sign Up for JaGedo
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
          <FormControl fullWidth className="mb-4">
            <InputLabel>User Type</InputLabel>
            <Select
              value={formData.user_type}
              onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
              label="User Type"
            >
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="builder">Builder</MenuItem>
              <MenuItem value="hardware">Hardware Supplier</MenuItem>
              <MenuItem value="fundi">Fundi</MenuItem>
              <MenuItem value="contractor">Contractor</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
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
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            fullWidth
            className="mb-4"
          />

          {/* Builder fields */}
          {formData.user_type === 'builder' && (
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

          {/* Hardware Supplier fields */}
          {formData.user_type === 'hardware' && (
            <TextField
              label="Store Name"
              value={formData.storeName}
              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              fullWidth
              required
              className="mb-4"
            />
          )}

          {/* Fundi fields */}
          {formData.user_type === 'fundi' && (
            <TextField
              label="Trade"
              value={formData.fundiTrade}
              onChange={(e) => setFormData({ ...formData, fundiTrade: e.target.value })}
              fullWidth
              required
              className="mb-4"
              placeholder="e.g., Plumbing, Electrical"
            />
          )}

          {/* Contractor fields */}
          {formData.user_type === 'contractor' && (
            <TextField
              label="License Number"
              value={formData.contractorLicense}
              onChange={(e) => setFormData({ ...formData, contractorLicense: e.target.value })}
              fullWidth
              required
              className="mb-4"
              placeholder="Enter contractor license number"
            />
          )}

          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;