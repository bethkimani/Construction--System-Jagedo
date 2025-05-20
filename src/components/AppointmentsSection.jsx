import React from 'react';
import { Typography, Box } from '@mui/material';
import ReceiptGenerator from './ReceiptGenerator';
import InsuranceManagement from './InsuranceManagement';

const AppointmentsSection = ({ appointments, doctors }) => {
  return (
    <div className="space-y-4">
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Your Appointments
      </Typography>
      <div className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((appointment) => {
            const doctor = doctors.find(
              (d) => `${d.first_name} ${d.last_name}` === appointment.doctor
            ) || { first_name: 'Unknown', last_name: 'Unknown' };
            return (
              <div key={`appointment-${appointment.id}`} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
                <Typography>Doctor: {appointment.doctor}</Typography>
                <Typography>Patient: {appointment.patient}</Typography>
                <Typography>Date: {new Date(appointment.scheduled_datetime).toLocaleString()}</Typography>
                <Typography>Status: {appointment.status}</Typography>
                <ReceiptGenerator
                  patient={{ email: appointment.patient }}
                  doctor={doctor}
                  amount={100}
                />
                <InsuranceManagement
                  patient={{ email: appointment.patient }}
                  doctor={doctor}
                  amount={100}
                />
              </div>
            );
          })
        ) : (
          <Typography>No appointments found.</Typography>
        )}
      </div>
    </div>
  );
};

export default AppointmentsSection;