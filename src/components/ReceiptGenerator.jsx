import React from 'react';
import { aiSendNotification } from '../utils/aiAutomation';

const ReceiptGenerator = ({ client, builder, amount }) => {
  const handleGenerateReceipt = () => {
    if (!builder || !client) return null;
    const receipt = {
      receiptId: `REC-${Math.floor(Math.random() * 1000000)}`,
      client: { email: client.email },
      builder: { first_name: builder.first_name, last_name: builder.last_name, email: builder.email },
      amount: amount || 0,
      date: new Date().toISOString(),
      status: 'Processed',
    };

    // Notify admin and builder after client receives
    aiSendNotification('admin@construction.com', `Receipt processed: ${receipt.receiptId}, Amount: ${receipt.amount} KES for ${client.email}`);
    aiSendNotification(builder.email, `Receipt received: ${receipt.receiptId}, Amount: ${receipt.amount} KES for ${client.email}`);

    return receipt;
  };

  const receipt = (builder && client) ? handleGenerateReceipt() : {
    receiptId: 'N/A',
    client: { email: client?.email || 'Unknown' },
    builder: { first_name: 'Unknown', last_name: 'Unknown' },
    amount: amount || 0,
    date: new Date().toISOString(),
    status: 'Pending',
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-2">
      <h3 className="text-lg font-semibold text-primary-blue">Payment Receipt</h3>
      <p className="text-text-gray">Receipt ID: {receipt.receiptId}</p>
      <p className="text-text-gray">Client: {receipt.client.email}</p>
      <p className="text-text-gray">Builder: {receipt.builder.first_name} {receipt.builder.last_name}</p>
      <p className="text-text-gray">Amount: {receipt.amount} KES</p>
      <p className="text-text-gray">Date: {receipt.date}</p>
      <p className="text-text-gray">Status: {receipt.status}</p>
    </div>
  );
};

export default ReceiptGenerator;