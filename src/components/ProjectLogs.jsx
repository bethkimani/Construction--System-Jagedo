import React from 'react';
import { dummyProjectLogs } from '../data/dummyData';

const ProjectLogs = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary-blue">Project Logs</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {dummyProjectLogs.length === 0 ? (
          <p className="text-text-gray">No project logs found.</p>
        ) : (
          dummyProjectLogs.map((log) => (
            <div key={log.id} className="mt-2 space-y-1">
              <p className="text-text-gray">Date: {log.date}</p>
              <p className="text-text-gray">Requirements: {log.requirements}</p>
              <p className="text-text-gray">Progress: {log.progress}</p>
              <p className="text-text-gray">Notes: {log.notes}</p>
              <p className="text-text-gray">Material Source: {log.materialSource || 'Not specified'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectLogs;