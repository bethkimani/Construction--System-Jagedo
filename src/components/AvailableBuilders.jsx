import React from 'react';
import { Typography, TextField, Grid, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

const AvailableBuilders = ({ builders, onAssignProject, selectedSlots, setSelectedSlots, searchTerm, setSearchTerm }) => {
  const filteredBuilders = builders.filter((builder) => {
    // Safeguard against undefined properties
    const specialization = builder.specialization || '';
    const firstName = builder.first_name || '';
    return (
      specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-4">
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Available Builders
      </Typography>
      <TextField
        label="Search builders by name or specialization"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        variant="outlined"
        className="mb-4"
      />
      <Grid container spacing={3}>
        {filteredBuilders.map((builder) => (
          <Grid item xs={12} sm={6} md={4} key={`builder-${builder.id}`}>
            <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <Typography variant="h6" className="text-gray-800">
                {builder.first_name} {builder.last_name}
              </Typography>
              <Typography className="text-gray-600">{builder.specialization}</Typography>
              <Typography className="text-gray-600">{builder.email}</Typography>
              <Typography className="text-gray-600">{builder.phone}</Typography>
              <Typography className="text-gray-600">{builder.company}</Typography>
              <DateTimePicker
                label="Select Project Start Time"
                value={selectedSlots[builder.id] || null}
                onChange={(newValue) =>
                  setSelectedSlots((prev) => ({ ...prev, [builder.id]: newValue }))
                }
                className="mt-2 w-full"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-2"
                onClick={() => onAssignProject(builder.id)}
                disabled={!selectedSlots[builder.id]}
              >
                Assign Project
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AvailableBuilders;