import React, { useState } from 'react';
import { aiSendNotification } from '../utils/aiAutomation';

const EscrowManagement = ({ projects, builders }) => {
  const [escrowAmount, setEscrowAmount] = useState(1000);

  const handleEscrowPayment = () => {
    const project = projects[0];
    const builder = builders.find((b) => `${b.first_name} ${b.last_name}` === project?.builder) || {};
    aiSendNotification('escrow@bank.com', `Escrow payment request: ${escrowAmount} for ${project?.client} to ${builder.company}`);
    aiSendNotification(builder.email || 'admin@construction.com', `Escrow payment of ${escrowAmount} received for ${project?.client}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary-blue">Escrow Payment Management</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <input
          type="number"
          value={escrowAmount}
          onChange={(e) => setEscrowAmount(e.target.value)}
          placeholder="Escrow Amount (KES)"
          className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue mb-4"
        />
        <button
          onClick={handleEscrowPayment}
          className="w-full bg-primary-blue text-white p-2 rounded hover:bg-blue-800"
        >
          Process Escrow Payment
        </button>
      </div>
    </div>
  );
};

export default EscrowManagement;