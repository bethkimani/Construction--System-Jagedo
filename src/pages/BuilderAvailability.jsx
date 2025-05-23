import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { DateTimePicker } from '@mui/x-date-pickers';

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
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary-blue">Set Builder Availability</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <DateTimePicker
          label="Start Time"
          value={availability.start_datetime}
          onChange={(newValue) =>
            setAvailability({ ...availability, start_datetime: newValue })
          }
          renderInput={(params) => (
            <input
              {...params}
              className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          )}
        />
        <DateTimePicker
          label="End Time"
          value={availability.end_datetime}
          onChange={(newValue) =>
            setAvailability({ ...availability, end_datetime: newValue })
          }
          minDateTime={availability.start_datetime}
          renderInput={(params) => (
            <input
              {...params}
              className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
            />
          )}
        />
        {error && <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-4 rounded">{success}</div>}
        <button
          type="submit"
          className="w-full bg-primary-blue text-white p-2 rounded hover:bg-blue-800"
          disabled={loading || !availability.start_datetime || !availability.end_datetime}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white mx-auto"></div>
          ) : (
            'Add Availability'
          )}
        </button>
      </form>
    </div>
  );
};

export default BuilderAvailability;