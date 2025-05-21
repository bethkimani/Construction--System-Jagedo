import React from 'react';
import { Typography, TextField, Grid, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

const AvailableDoctors = ({ doctors, onBookAppointment, selectedSlots, setSelectedSlots, searchTerm, setSearchTerm }) => {
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Available Doctors
      </Typography>
      <TextField
        label="Search doctors by name or specialization"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        variant="outlined"
        className="mb-4"
      />
      <Grid container spacing={3}>
        {filteredDoctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={`doctor-${doctor.id}`}>
            <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <Typography variant="h6" className="text-gray-800">
                Dr. {doctor.first_name} {doctor.last_name}
              </Typography>
              <Typography className="text-gray-600">{doctor.specialization}</Typography>
              <Typography className="text-gray-600">{doctor.email}</Typography>
              <Typography className="text-gray-600">{doctor.phone}</Typography>
              <Typography className="text-gray-600">{doctor.hospital}</Typography>
              <DateTimePicker
                label="Select Appointment Time"
                value={selectedSlots[doctor.id] || null}
                onChange={(newValue) =>
                  setSelectedSlots((prev) => ({ ...prev, [doctor.id]: newValue }))
                }
                className="mt-2 w-full"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-2"
                onClick={() => onBookAppointment(doctor.id)}
                disabled={!selectedSlots[doctor.id]}
              >
                Book Appointment
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AvailableDoctors;