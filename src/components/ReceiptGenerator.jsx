import React from 'react';
import { Typography } from '@mui/material';
import { aiGenerateReceipt, aiSendNotification } from '../utils/aiAutomation';

const ReceiptGenerator = ({ patient, doctor, amount }) => {
  // Generate receipt only if doctor is defined
  const handleGenerateReceipt = () => {
    if (!doctor) return null;
    const receipt = aiGenerateReceipt(patient, doctor, amount, new Date().toISOString());
    aiSendNotification(patient.email, `Receipt generated: ID ${receipt.receiptId}, Amount: ${receipt.amount}`);
    aiSendNotification('admin@hospital.com', `Payment received from ${patient.email}: ${receipt.amount}`);
    return receipt;
  };

  const receipt = doctor ? handleGenerateReceipt() : {
    receiptId: 'N/A',
    patient: patient || { email: 'Unknown' },
    doctor: { first_name: 'Unknown', last_name: 'Unknown' },
    amount: amount || 0,
    date: new Date().toISOString(),
    status: 'Pending',
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-2">
      <Typography variant="h6">Payment Receipt</Typography>
      <Typography>Receipt ID: {receipt.receiptId}</Typography>
      <Typography>Patient: {receipt.patient.email || 'Unknown'}</Typography>
      <Typography>Doctor: {receipt.doctor.first_name || 'Unknown'} {receipt.doctor.last_name || 'Unknown'}</Typography>
      <Typography>Amount: {receipt.amount}</Typography>
      <Typography>Date: {receipt.date}</Typography>
      <Typography>Status: {receipt.status}</Typography>
    </div>
  );
};

export default ReceiptGenerator;