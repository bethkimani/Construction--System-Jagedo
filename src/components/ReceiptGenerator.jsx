import React from 'react';
import { Typography } from '@mui/material';
import { aiGenerateReceipt, aiSendNotification } from '../utils/aiAutomation';

const ReceiptGenerator = ({ client, builder, amount }) => {
  const handleGenerateReceipt = () => {
    if (!builder) return null;
    const receipt = aiGenerateReceipt(client, builder, amount, new Date().toISOString());
    aiSendNotification(client.email, `Receipt generated: ID ${receipt.receiptId}, Amount: ${receipt.amount}`);
    aiSendNotification('admin@construction.com', `Payment received from ${client.email}: ${receipt.amount}`);
    return receipt;
  };

  const receipt = builder ? handleGenerateReceipt() : {
    receiptId: 'N/A',
    client: client || { email: 'Unknown' },
    builder: { first_name: 'Unknown', last_name: 'Unknown' },
    amount: amount || 0,
    date: new Date().toISOString(),
    status: 'Pending',
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-2">
      <Typography variant="h6">Payment Receipt</Typography>
      <Typography>Receipt ID: {receipt.receiptId}</Typography>
      <Typography>Client: {receipt.client.email || 'Unknown'}</Typography>
      <Typography>Builder: {receipt.builder.first_name || 'Unknown'} {receipt.builder.last_name || 'Unknown'}</Typography>
      <Typography>Amount: {receipt.amount} KES</Typography>
      <Typography>Date: {receipt.date}</Typography>
      <Typography>Status: {receipt.status}</Typography>
    </div>
  );
};

export default ReceiptGenerator;