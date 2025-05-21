import React from 'react';
import { Typography, Box } from '@mui/material';
import { dummyProjectLogs } from '../data/dummyData';

const ProjectLogs = () => {
  return (
    <div className="space-y-4">
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Project Logs
      </Typography>
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        {dummyProjectLogs.length === 0 ? (
          <Typography>No project logs found.</Typography>
        ) : (
          dummyProjectLogs.map((log) => (
            <Box key={log.id} className="mt-2 space-y-1">
              <Typography>Date: {log.date}</Typography>
              <Typography>Requirements: {log.requirements}</Typography>
              <Typography>Progress: {log.progress}</Typography>
              <Typography>Notes: {log.notes}</Typography>
              <Typography>Material Source: {log.materialSource || 'Not specified'}</Typography> {/* Added */}
            </Box>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectLogs;