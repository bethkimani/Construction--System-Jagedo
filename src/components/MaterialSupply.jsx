import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const MaterialSupply = ({ onOrderMaterial }) => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Cement', price: 500, supplier: 'Hardware Store A' },
    { id: 2, name: 'Steel Bars', price: 1000, supplier: 'Hardware Store A' },
  ]);
  const [newMaterial, setNewMaterial] = useState({ name: '', price: '' });
  const [error, setError] = useState('');

  const handleAddMaterial = () => {
    if (!newMaterial.name || !newMaterial.price) {
      setError('Please fill in all fields');
      return;
    }
    setMaterials([
      ...materials,
      {
        id: materials.length + 1,
        name: newMaterial.name,
        price: parseFloat(newMaterial.price),
        supplier: user?.storeName || 'Unknown Supplier',
      },
    ]);
    setNewMaterial({ name: '', price: '' });
    setError('');
  };

  const handleOrderMaterial = (material) => {
    if (onOrderMaterial) {
      onOrderMaterial(material);
    }
  };

  // If user is not loaded, show a loading state or redirect
  if (!user) {
    return (
      <div className="space-y-4">
        <Typography variant="h5" className="text-gray-800 font-semibold">
          Material Supply
        </Typography>
        <Typography>Loading user data...</Typography>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Material Supply
      </Typography>
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        {user.user_type === 'hardware' ? (
          <>
            <Typography variant="h6" className="mb-4 text-gray-700">
              Add New Material
            </Typography>
            <TextField
              label="Material Name"
              value={newMaterial.name}
              onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Price (KES)"
              type="number"
              value={newMaterial.price}
              onChange={(e) => setNewMaterial({ ...newMaterial, price: e.target.value })}
              fullWidth
              className="mb-4"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddMaterial}
              className="w-full"
            >
              Add Material
            </Button>
            {error && <Alert severity="error" className="mt-4">{error}</Alert>}
          </>
        ) : (
          <Typography variant="h6" className="mb-4 text-gray-700">
            Available Materials
          </Typography>
        )}
        <div className="mt-4">
          {materials.length === 0 ? (
            <Typography>No materials available.</Typography>
          ) : (
            materials.map((material) => (
              <div key={material.id} className="mb-2 p-2 border rounded">
                <Typography>Name: {material.name}</Typography>
                <Typography>Price: {material.price} KES</Typography>
                <Typography>Supplier: {material.supplier}</Typography>
                {user.user_type === 'client' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOrderMaterial(material)}
                    className="mt-2"
                  >
                    Order Material
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialSupply;