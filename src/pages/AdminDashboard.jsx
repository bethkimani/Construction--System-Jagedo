import React, { useState } from 'react';
import { Typography, Button, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { dummyBuilders } from '../data/dummyData';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [builders, setBuilders] = useState(dummyBuilders.map(builder => ({ ...builder, verified: false })));
  const [error, setError] = useState('');

  if (user.user_type !== 'admin') {
    return (
      <div className="p-6">
        <Typography variant="h5" color="error">
          Access Denied: This page is for Admins only.
        </Typography>
      </div>
    );
  }

  const handleVerifyBuilder = (builderId) => {
    setBuilders(builders.map(builder =>
      builder.id === builderId ? { ...builder, verified: true } : builder
    ));
  };

  return (
    <div className="p-6">
      <Header />
      <Typography variant="h4" className="mb-6 text-gray-800">
        Admin Dashboard
      </Typography>
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      <Typography variant="h5" className="mb-4">
        Manage Builders
      </Typography>
      {builders.length === 0 ? (
        <Typography>No builders found.</Typography>
      ) : (
        builders.map((builder) => (
          <div key={builder.id} className="mb-4 p-4 border rounded">
            <Typography>Name: {builder.first_name} {builder.last_name}</Typography>
            <Typography>Specialization: {builder.specialization}</Typography>
            <Typography>Company: {builder.company}</Typography>
            <Typography>Status: {builder.verified ? 'Verified' : 'Not Verified'}</Typography>
            {!builder.verified && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleVerifyBuilder(builder.id)}
                className="mt-2"
              >
                Verify Builder
              </Button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;