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
            <h3 className="text-lg font-medium text-text-gray mb-4">Add New Material</h3>
            <input
              type="text"
              placeholder="Material Name"
              value={newMaterial.name}
              onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
              className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue mb-4"
            />
            <input
              type="number"
              placeholder="Price (KES)"
              value={newMaterial.price}
              onChange={(e) => setNewMaterial({ ...newMaterial, price: e.target.value })}
              className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue mb-4"
            />
            <button
              onClick={handleAddMaterial}
              className="w-full bg-primary-blue text-white p-2 rounded hover:bg-blue-800"
            >
              Add Material
            </button>
            {error && <div className="bg-red-100 text-red-700 p-4 rounded mt-4">{error}</div>}
          </>
        ) : (
          <h3 className="text-lg font-medium text-text-gray mb-4">Available Materials</h3>
        )}
        <div className="mt-4">
          {materials.length === 0 ? (
            <p className="text-text-gray">No materials available.</p>
          ) : (
            materials.map((material) => (
              <div key={material.id} className="mb-2 p-4 border border-light-gray rounded">
                <p className="text-text-gray">Name: {material.name}</p>
                <p className="text-text-gray">Price: {material.price} KES</p>
                <p className="text-text-gray">Supplier: {material.supplier}</p>
                {user.user_type === 'client' && (
                  <button
                    onClick={() => handleOrderMaterial(material)}
                    className="mt-2 w-full bg-primary-blue text-white p-2 rounded hover:bg-blue-800"
                  >
                    Order Material
                  </button>
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