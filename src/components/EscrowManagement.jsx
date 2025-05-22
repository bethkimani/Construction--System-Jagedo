import React, { useState } from 'react';
import { aiSendNotification, aiGenerateReceipt } from '../utils/aiAutomation';
import ReceiptGenerator from './ReceiptGenerator';

const EscrowManagement = ({ projects, builders, user }) => {
  const [escrowAmount, setEscrowAmount] = useState(1000);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState(null);

  const handleEscrowPayment = () => {
    if (escrowAmount < 0) {
      setError("Fraud detected: Negative amount not allowed!");
      return;
    }
    if (!projects.length || !builders.length) {
      setError("No project or builder available for escrow payment.");
      return;
    }

    const project = projects[0];
    const builder = builders.find((b) => b.email === project.builder.split(' ')[0]) || {};
    const client = user || { email: 'client@example.com' }; // Default to logged-in user

    if (!builder.email || !client.email) {
      setError("Invalid client or builder email.");
      return;
    }

    const newReceipt = aiGenerateReceipt(client, builder, escrowAmount, new Date().toISOString());
    setReceipt(newReceipt);

    // Notify admin and builder
    aiSendNotification('admin@construction.com', `Escrow payment request: ${escrowAmount} KES for ${project.client} to ${builder.company}, Receipt ID: ${newReceipt.receiptId}`);
    aiSendNotification(builder.email, `Escrow payment of ${escrowAmount} KES received for ${project.client}, Receipt ID: ${newReceipt.receiptId}`);
    aiSendNotification(client.email, `Your payment of ${escrowAmount} KES has been processed, Receipt ID: ${newReceipt.receiptId}`);

    setError('');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary-blue">Escrow Payment Management</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <input
          type="number"
          value={escrowAmount}
          onChange={(e) => setEscrowAmount(Number(e.target.value))}
          placeholder="Escrow Amount (KES)"
          className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue mb-4"
        />
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
        <button
          onClick={handleEscrowPayment}
          className="w-full bg-primary-blue text-white p-2 rounded hover:bg-blue-800"
        >
          Process Escrow Payment
        </button>
        {receipt && <ReceiptGenerator client={user} builder={builders.find(b => b.email === receipt.builder.email)} amount={escrowAmount} />}
      </div>
    </div>
  );
};

export default EscrowManagement;