import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, Box, Alert, Typography, CircularProgress } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import Header from '../components/Header';

const BuilderAvailability = () => {
  const { user } = useAuth();
  const [availability, setAvailability] = useState({
    start_datetime: null,
    end_datetime: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!availability.start_datetime || !availability.end_datetime) {
      setError('Please select both start and end times');
      return;
    }
    try {
      setLoading(true);
      const start = new Date(availability.start_datetime).toISOString();
      const end = new Date(availability.end_datetime).toISOString();
      if (start >= end) {
        throw new Error('End time must be after start time');
      }
      setSuccess('Availability added successfully');
      setError('');
      setAvailability({ start_datetime: null, end_datetime: null });
    } catch (err) {
      setError(err.message || 'Failed to add availability');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Header />
      <div className="mt-4 max-w-md mx-auto">
        <Typography variant="h4">Set Builder Availability</Typography>
        <form onSubmit={handleSubmit}>
          <DateTimePicker
            label="Start Time"
            value={availability.start_datetime}
            onChange={(newValue) =>
              setAvailability({ ...availability, start_datetime: newValue })
            }
            className="mt-4 w-full"
          />
          <DateTimePicker
            label="End Time"
            value={availability.end_datetime}
            onChange={(newValue) =>
              setAvailability({ ...availability, end_datetime: newValue })
            }
            minDateTime={availability.start_datetime}
            className="mt-4 w-full"
          />
          {error && <Alert severity="error" className="mt-4">{error}</Alert>}
          {success && <Alert severity="success" className="mt-4">{success}</Alert>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading || !availability.start_datetime || !availability.end_datetime}
            className="mt-4"
          >
            {loading ? <CircularProgress size={24} /> : 'Add Availability'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BuilderAvailability;