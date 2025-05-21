import React, { useState } from 'react';
import { Typography, Button, TextField, Alert } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const AvailableBuilders = ({ builders, onAssignProject, projects, setProjects }) => {
  const [availability, setAvailability] = useState({
    start_datetime: null,
    end_datetime: null,
  });
  const [projectDetails, setProjectDetails] = useState({
    requirements: '',
  });
  const [error, setError] = useState('');

  // Add verified field to builders (for now, assume some are verified)
  const buildersWithVerification = builders.map(builder => ({
    ...builder,
    verified: builder.id === 1, // Example: only John Doe is verified
  }));

  const handleAssignProject = (builder) => {
    if (!availability.start_datetime || !availability.end_datetime || !projectDetails.requirements) {
      setError('Please fill in all fields');
      return;
    }
    if (!builder.verified) {
      setError('This builder is not verified by the admin.');
      return;
    }
    const newProject = {
      id: projects.length + 1,
      client: 'Current Client', // Replace with actual client data
      builder: `${builder.first_name} ${builder.last_name}`,
      date: availability.start_datetime.format('YYYY-MM-DD'),
      requirements: projectDetails.requirements,
      progress: '0%',
      notes: 'Project initiated',
    };
    onAssignProject(builder, projectDetails);
    setProjects([...projects, newProject]);
    setAvailability({ start_datetime: null, end_datetime: null });
    setProjectDetails({ requirements: '' });
    setError('');
  };

  return (
    <div className="space-y-4">
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Available Builders
      </Typography>
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        <Typography variant="h6" className="mb-4 text-gray-700">
          Book a Builder
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DateTimePicker
            label="Start Time"
            value={availability.start_datetime}
            onChange={(newValue) =>
              setAvailability({ ...availability, start_datetime: newValue })
            }
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <DateTimePicker
            label="End Time"
            value={availability.end_datetime}
            onChange={(newValue) =>
              setAvailability({ ...availability, end_datetime: newValue })
            }
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </div>
        <TextField
          label="Project Requirements"
          value={projectDetails.requirements}
          onChange={(e) =>
            setProjectDetails({ ...projectDetails, requirements: e.target.value })
          }
          fullWidth
          className="mb-4"
        />
        <div className="space-y-4">
          {buildersWithVerification.map((builder) => (
            <div key={builder.id} className="p-4 border rounded">
              <Typography>Name: {builder.first_name} {builder.last_name}</Typography>
              <Typography>Specialization: {builder.specialization}</Typography>
              <Typography>Company: {builder.company}</Typography>
              <Typography>Status: {builder.verified ? 'Verified' : 'Not Verified'}</Typography> {/* Added */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAssignProject(builder)}
                className="mt-2"
              >
                Assign Project
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableBuilders;