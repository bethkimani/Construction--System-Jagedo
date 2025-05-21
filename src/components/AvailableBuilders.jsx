import React from 'react';
import { Typography, TextField, Grid, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

const AvailableBuilders = ({ builders, onAssignProject, selectedSlots, setSelectedSlots, searchTerm, setSearchTerm }) => {
  console.log('AvailableBuilders props:', { builders, searchTerm, selectedSlots });

  const safeBuilders = Array.isArray(builders) ? builders : [];
  const safeSearchTerm = typeof searchTerm === 'string' ? searchTerm : '';

  const filteredBuilders = safeBuilders.filter((builder) => {
    console.log('Filtering builder:', builder);
    if (!builder || typeof builder !== 'object' || !builder.id) {
      console.warn('Invalid builder object:', builder);
      return false;
    }

    const specialization = typeof builder.specialization === 'string' ? builder.specialization : '';
    const firstName = typeof builder.first_name === 'string' ? builder.first_name : '';

    console.log('Specialization:', specialization, 'First Name:', firstName);

    return (
      specialization.toLowerCase().includes(safeSearchTerm.toLowerCase()) ||
      firstName.toLowerCase().includes(safeSearchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-4">
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Available Builders
      </Typography>
      <TextField
        label="Search builders by name or specialization"
        value={safeSearchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        variant="outlined"
        className="mb-4"
      />
      <Grid container spacing={3}>
        {filteredBuilders.map((builder) => (
          <Grid key={`builder-${builder.id}`} sx={{ width: '100%', maxWidth: { xs: '100%', sm: '50%', md: '33.33%' } }}>
            <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <Typography variant="h6" className="text-gray-800">
                {builder.first_name || 'Unknown'} {builder.last_name || ''}
              </Typography>
              <Typography className="text-gray-600">{builder.specialization || 'N/A'}</Typography>
              <Typography className="text-gray-600">{builder.email || 'N/A'}</Typography>
              <Typography className="text-gray-600">{builder.phone || 'N/A'}</Typography>
              <Typography className="text-gray-600">{builder.company || 'N/A'}</Typography>
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
                onClick={() => onAssignProject(builder.id, { requirements: 'New Project' })}
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