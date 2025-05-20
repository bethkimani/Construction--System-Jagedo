import React, { useState } from 'react';
import { Typography, Box, Alert, CircularProgress } from '@mui/material';
import Header from '../components/Header';
import SymptomChecker from '../components/SymptomChecker';
import AppointmentsSection from '../components/AppointmentsSection';
import AvailableDoctors from '../components/AvailableDoctors';
import InsuranceManagement from '../components/InsuranceManagement';
import HealthLogs from '../components/HealthLogs';
import FAQs from '../components/FAQs';
import { useAuth } from '../context/AuthContext';
import { dummyDoctors, dummyAppointments } from '../data/dummyData';
import { aiAssignDoctor } from '../utils/aiAutomation';

const DoctorList = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('symptomChecker');
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [assignedDoctor, setAssignedDoctor] = useState(null);

  const bookAppointment = async (doctorId) => {
    const selectedSlot = selectedSlots[doctorId];
    if (!selectedSlot) {
      setError('Please select an appointment time');
      return;
    }

    try {
      setLoading(true);
      const doctor = dummyDoctors.find((d) => d.id === doctorId);
      if (!doctor) {
        throw new Error('Doctor not found');
      }
      const newAppointment = {
        id: appointments.length + 1,
        doctor: `${doctor.first_name} ${doctor.last_name}`,
        patient: user.email,
        scheduled_datetime: selectedSlot,
        status: 'booked',
      };
      setAppointments([...appointments, newAppointment]);
      setError('');
      alert('Appointment booked successfully!');
      setSelectedSlots((prev) => ({ ...prev, [doctorId]: null }));
    } catch (err) {
      setError(err.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorAssign = (doctor) => {
    setAssignedDoctor(doctor);
    if (doctor) {
      setSelectedSlots((prev) => ({ ...prev, [doctor.id]: new Date() }));
      bookAppointment(doctor.id);
    }
  };

  const sections = {
    symptomChecker: <SymptomChecker onDoctorAssign={handleDoctorAssign} />,
    appointments: <AppointmentsSection appointments={appointments} doctors={dummyDoctors} />,
    availableDoctors: <AvailableDoctors doctors={dummyDoctors} onBookAppointment={bookAppointment} selectedSlots={selectedSlots} setSelectedSlots={setSelectedSlots} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />,
    insuranceManagement: <InsuranceManagement appointments={appointments} doctors={dummyDoctors} />,
    healthLogs: <HealthLogs />,
    faqs: <FAQs />,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <Typography variant="h4" className="text-blue-800 font-bold mb-6">
          Healthcare System
        </Typography>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-4 border-b">
            {Object.keys(sections).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`py-2 px-4 font-medium ${
                  activeSection === section
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {section
                  .split(/(?=[A-Z])/)
                  .join(' ')
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {/* Error and Loading */}
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        {loading && <CircularProgress className="my-4" />}

        {/* Render Active Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {sections[activeSection]}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;