import React from 'react';
import { Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import MaterialSupply from '../components/MaterialSupply';

const Materials = () => {
  const { user } = useAuth();

  if (user.user_type !== 'hardware') {
    return (
      <div className="p-6">
        <Typography variant="h5" color="error">
          Access Denied: This page is for Hardware Suppliers only.
        </Typography>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Header />
      <Typography variant="h4" className="mb-6 text-gray-800">
        Manage Materials - {user.storeName}
      </Typography>
      <MaterialSupply />
    </div>
  );
};

export default Materials;