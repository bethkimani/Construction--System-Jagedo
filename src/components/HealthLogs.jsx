import React from 'react';
import { Typography, Box } from '@mui/material';
import { dummyHealthLogs } from '../data/dummyData';

const HealthLogs = () => {
  return (
    <div className="space-y-4">
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Health Logs
      </Typography>
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        {dummyHealthLogs.length === 0 ? (
          <Typography>No health logs found.</Typography>
        ) : (
          dummyHealthLogs.map((log) => (
            <Box key={log.id} className="mt-2 space-y-1">
              <Typography>Date: {log.date}</Typography>
              <Typography>Symptoms: {log.symptoms}</Typography>
              <Typography>Diagnosis: {log.diagnosis}</Typography>
              <Typography>Treatment: {log.treatment}</Typography>
            </Box>
          ))
        )}
      </div>
    </div>
  );
};

export default HealthLogs;