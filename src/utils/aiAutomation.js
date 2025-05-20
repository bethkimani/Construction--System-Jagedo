// Simulated AI functions for automation
export const aiSymptomChecker = (symptoms) => {
  // Dummy AI logic for symptom checking
  if (symptoms.toLowerCase().includes('headache') || symptoms.toLowerCase().includes('fever')) {
    return { diagnosis: 'Possible Common Cold', recommendation: 'See a General Physician', severity: 'Mild' };
  } else if (symptoms.toLowerCase().includes('chest pain')) {
    return { diagnosis: 'Possible Heart Issue', recommendation: 'See a Cardiologist', severity: 'Severe' };
  } else if (symptoms.toLowerCase().includes('tooth pain')) {
    return { diagnosis: 'Dental Issue', recommendation: 'See a Dentist', severity: 'Moderate' };
  }
  return { diagnosis: 'Unknown', recommendation: 'Consult a doctor', severity: 'Unknown' };
};

export const aiAssignDoctor = (specialization, doctors) => {
  // Dummy AI logic to assign an available doctor
  const availableDoctor = doctors.find((doc) => doc.specialization.toLowerCase() === specialization.toLowerCase());
  return availableDoctor || doctors[0]; // Fallback to first doctor if no match
};

export const aiGenerateReceipt = (patient, doctor, amount, date) => {
  return {
    receiptId: Math.floor(Math.random() * 100000),
    patient,
    doctor,
    amount,
    date,
    status: 'Paid',
  };
};

export const aiSendNotification = (email, message) => {
  // Simulate sending email notification
  console.log(`Sending notification to ${email}: ${message}`);
  return { status: 'Sent', email, message };
};