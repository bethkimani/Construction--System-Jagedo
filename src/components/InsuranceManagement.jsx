import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { aiSendNotification } from '../utils/aiAutomation';

const InsuranceManagement = ({ appointments, doctors }) => {
  const [insuranceAmount, setInsuranceAmount] = useState(100);

  const handleInsurancePayment = () => {
    const appointment = appointments[0]; // Use the first appointment for simplicity
    const doctor = doctors.find((d) => `${d.first_name} ${d.last_name}` === appointment?.doctor) || {};
    aiSendNotification('sha@insurance.com', `Payment request: ${insuranceAmount} for ${appointment?.patient} to ${doctor.hospital}`);
    aiSendNotification(doctor.email || 'admin@hospital.com', `Insurance payment of ${insuranceAmount} received for ${appointment?.patient}`);
  };

  return (
    <div className="space-y-4 mt-4">
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Insurance Management (SHA)
      </Typography>
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <TextField
          label="Insurance Amount"
          type="number"
          value={insuranceAmount}
          onChange={(e) => setInsuranceAmount(e.target.value)}
          fullWidth
          variant="outlined"
          className="mb-4"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleInsurancePayment}
          className="w-full"
        >
          Process Insurance Payment
        </Button>
      </div>
    </div>
  );
};

export default InsuranceManagement;