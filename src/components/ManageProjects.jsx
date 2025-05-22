import React, { useState } from 'react';

const ManageProjects = ({ projects }) => {
  const [progressUpdates, setProgressUpdates] = useState({});

  const handleProgressChange = (projectId, value) => {
    setProgressUpdates((prev) => ({ ...prev, [projectId]: value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary-blue">Manage Projects</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {projects.length === 0 ? (
          <p className="text-text-gray">No projects available.</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="mb-4 p-4 border border-light-gray rounded">
              <p className="text-text-gray">Client: {project.client}</p>
              <p className="text-text-gray">Builder: {project.builder}</p>
              <p className="text-text-gray">Date: {project.date}</p>
              <p className="text-text-gray">Requirements: {project.requirements}</p>
              <p className="text-text-gray">Progress: {progressUpdates[project.id] || project.progress}</p>
              <input
                type="range"
                min="0"
                max="100"
                value={parseInt(progressUpdates[project.id] || project.progress) || 0}
                onChange={(e) => handleProgressChange(project.id, `${e.target.value}%`)}
                className="w-full mt-2"
              />
              <p className="text-text-gray">Notes: {project.notes}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProjects;