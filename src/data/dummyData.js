// Simulated user database
export let dummyUsers = [
  {
    id: 1,
    email: 'patient1@example.com',
    password: 'password123',
    first_name: 'Jane',
    last_name: 'Smith',
    user_type: 'patient',
    phone: '123-456-7890',
    insurance_number: 'INS123',
    id_number: 'ID123',
    address: '123 Main St',
  },
  {
    id: 2,
    email: 'doctor1@example.com',
    password: 'password123',
    first_name: 'John',
    last_name: 'Doe',
    user_type: 'doctor',
    phone: '234-567-8901',
    specialization: 'Cardiologist',
    hospital: 'City Hospital',
  },
];

// Existing dummy data
export const dummyDoctors = [
  { id: 1, first_name: "John", last_name: "Doe", specialization: "Cardiologist", email: "john.doe@hospital.com", phone: "123-456-7890", hospital: "City Hospital" },
  { id: 2, first_name: "Sarah", last_name: "Smith", specialization: "Dentist", email: "sarah.smith@hospital.com", phone: "234-567-8901", hospital: "Dental Clinic" },
  { id: 3, first_name: "Emily", last_name: "Johnson", specialization: "Optician", email: "emily.johnson@hospital.com", phone: "345-678-9012", hospital: "Eye Care Center" },
];

export const dummyAppointments = [
  { id: 1, doctor: "Dr. John Doe", patient: "Jane Smith", scheduled_datetime: "2025-05-21T10:00:00", follow_up_datetime: "2025-05-28T10:00:00", status: "booked" },
];

export const dummyHealthLogs = [
  { id: 1, patient: "Jane Smith", date: "2025-05-15", symptoms: "Headache, Fever", diagnosis: "Common Cold", treatment: "Rest, Paracetamol" },
];

export const dummyFAQs = [
  { question: "How do I book an appointment?", answer: "Go to the Doctors page, select a doctor, and choose an available slot." },
  { question: "How can I check my health logs?", answer: "Visit the Health Logs section to view your medical history." },
];