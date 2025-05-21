export const aiProjectRequirementChecker = (requirements) => {
  if (requirements.toLowerCase().includes('foundation') || requirements.toLowerCase().includes('concrete')) {
    return { recommendation: 'Consult a Civil Engineer', complexity: 'High' };
  } else if (requirements.toLowerCase().includes('plumbing')) {
    return { recommendation: 'Consult a Plumber', complexity: 'Moderate' };
  } else if (requirements.toLowerCase().includes('roofing')) {
    return { recommendation: 'Consult a Roofer', complexity: 'Moderate' };
  }
  return { recommendation: 'Consult a General Contractor', complexity: 'Unknown' };
};

export const aiAssignBuilder = (specialization, builders) => {
  const availableBuilder = builders.find((b) => b.specialization.toLowerCase() === specialization.toLowerCase());
  return availableBuilder || builders[0];
};

export const aiGenerateReceipt = (client, builder, amount, date) => {
  return {
    receiptId: Math.floor(Math.random() * 100000),
    client,
    builder,
    amount,
    date,
    status: 'Paid',
  };
};

export const aiSendNotification = (email, message) => {
  console.log(`Sending notification to ${email}: ${message}`);
  return { status: 'Sent', email, message };
};