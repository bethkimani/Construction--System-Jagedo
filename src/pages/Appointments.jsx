import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, CircularProgress, Alert, Box, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import Header from '../components/Header';
import { dummyAppointments } from '../data/dummyData';

const Appointments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editAppointment, setEditAppointment] = useState(null);
  const [newScheduleDate, setNewScheduleDate] = useState(null);
  const [newFollowDate, setNewFollowDate] = useState(null);

  const updateAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      if (!newScheduleDate || !newFollowDate) {
        throw new Error('Please select both schedule and follow-up dates');
      }
      const updatedAppointments = appointments.map((appt) =>
        appt.id === appointmentId
          ? { ...appt, scheduled_datetime: newScheduleDate, follow_up_datetime: newFollowDate }
          : appt
      );
      setAppointments(updatedAppointments);
      setSuccess('Appointment updated successfully!');
      setError(null);
      setEditAppointment(null);
      setNewScheduleDate(null);
      setNewFollowDate(null);
    } catch (err) {
      setError(err.message || 'Failed to update appointment');
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      const updatedAppointments = appointments.filter((appt) => appt.id !== appointmentId);
      setAppointments(updatedAppointments);
      setSuccess('Appointment deleted successfully!');
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to delete appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Header />
      <Box className="mt-4">
        <Typography variant="h4">Book Appointments</Typography>
        {error && <Alert severity="error" className="mt-2">{error}</Alert>}
        {success && <Alert severity="success" className="mt-2">{success}</Alert>}
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <Button
              variant="contained"
              onClick={() => navigate('/doctor-availability')}
              className="mt-2"
            >
              Create Doctor Availability
            </Button>
            {appointments.length === 0 ? (
              <Typography className="mt-2">No appointments found.</Typography>
            ) : (
              appointments.map((appointment) => (
                <Box key={`appointment-${appointment.id}`} className="mt-2 p-4 bg-white rounded-lg shadow-md">
                  <Typography variant="h6">Doctor: {appointment.doctor}</Typography>
                  <Typography variant="h6">Patient: {appointment.patient}</Typography>
                  <Typography>
                    Date: {new Date(appointment.scheduled_datetime).toLocaleString()}
                  </Typography>
                  <Typography>
                    Follow-up: {new Date(appointment.follow_up_datetime).toLocaleString()}
                  </Typography>
                  <Typography>Status: {appointment.status}</Typography>
                  {editAppointment === appointment.id ? (
                    <Box className="mt-2">
                      <DateTimePicker
                        label="Update Appointment Time"
                        value={newScheduleDate}
                        onChange={(newValue) => setNewScheduleDate(newValue)}
                        className="mb-2 w-full"
                      />
                      <DateTimePicker
                        label="Update Follow-Up Time"
                        value={newFollowDate}
                        onChange={(newValue) => setNewFollowDate(newValue)}
                        className="mb-2 w-full"
                      />
                      <Button
                        variant="contained"
                        onClick={() => updateAppointment(appointment.id)}
                        className="mr-2"
                        disabled={!newScheduleDate || !newFollowDate}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setEditAppointment(null);
                          setNewScheduleDate(null);
                          setNewFollowDate(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  ) : (
                    <Box className="mt-2">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setEditAppointment(appointment.id);
                          setNewScheduleDate(new Date(appointment.scheduled_datetime));
                          setNewFollowDate(new Date(appointment.follow_up_datetime));
                        }}
                        className="mr-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteAppointment(appointment.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  )}
                </Box>
              ))
            )}
          </div>
        )}
      </Box>
    </div>
  );
};

export default Appointments;