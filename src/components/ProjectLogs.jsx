import React from 'react';
import { Typography, Box } from '@mui/material';
import { dummyProjectLogs } from '../data/dummyData'; // Updated import name

const ProjectLogs = () => {
  return (
    <div className="space-y-4">
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Project Logs
      </Typography>
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        {dummyProjectLogs.length === 0 ? ( // Updated variable name
          <Typography>No project logs found.</Typography>
        ) : (
          dummyProjectLogs.map((log) => ( // Updated variable name
            <Box key={log.id} className="mt-2 space-y-1">
              <Typography>Date: {log.date}</Typography>
              <Typography>Requirements: {log.requirements}</Typography>
              <Typography>Progress: {log.progress}</Typography>
              <Typography>Notes: {log.notes}</Typography>
            </Box>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectLogs;