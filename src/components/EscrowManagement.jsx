import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { aiSendNotification } from '../utils/aiAutomation';

const EscrowManagement = ({ projects, builders }) => {
  const [escrowAmount, setEscrowAmount] = useState(1000);

  const handleEscrowPayment = () => {
    const project = projects[0]; // Use the first project for simplicity
    const builder = builders.find((b) => `${b.first_name} ${b.last_name}` === project?.builder) || {};
    aiSendNotification('escrow@bank.com', `Escrow payment request: ${escrowAmount} for ${project?.client} to ${builder.company}`);
    aiSendNotification(builder.email || 'admin@construction.com', `Escrow payment of ${escrowAmount} received for ${project?.client}`);
  };

  return (
    <div className="space-y-4 mt-4">
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Escrow Payment Management
      </Typography>
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <TextField
          label="Escrow Amount (KES)"
          type="number"
          value={escrowAmount}
          onChange={(e) => setEscrowAmount(e.target.value)}
          fullWidth
          variant="outlined"
          className="mb-4"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleEscrowPayment}
          className="w-full"
        >
          Process Escrow Payment
        </Button>
      </div>
    </div>
  );
};

export default EscrowManagement;