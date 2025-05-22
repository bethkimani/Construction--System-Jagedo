import React, { useState } from 'react';
import { dummyBuilders, dummyProjects } from '../data/dummyData';

const PostProject = ({ setProjects, projects, user }) => {
  const [requirements, setRequirements] = useState('');
  const [error, setError] = useState('');

  const handlePostProject = () => {
    if (!requirements) {
      setError('Please enter project requirements');
      return;
    }
    // Simulate AI assignment by randomly selecting a builder
    const randomBuilder = dummyBuilders[Math.floor(Math.random() * dummyBuilders.length)];
    const newProject = {
      id: dummyProjects.length + 1,
      client: user.email,
      builder: `${randomBuilder.first_name} ${randomBuilder.last_name}`,
      date: new Date().toISOString().split('T')[0],
      requirements,
      progress: '0%',
      notes: 'Project initiated',
    };
    // Update shared dummyProjects
    dummyProjects.push(newProject);
    setProjects((prev) => [...prev, newProject]);
    setRequirements('');
    setError('');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary-blue">Post New Project</h2>
      <textarea
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
        placeholder="Enter project requirements"
        className="w-full p-2 border rounded"
      />
      {error && <div className="text-red-500">{error}</div>}
      <button onClick={handlePostProject} className="bg-blue-500 text-white px-4 py-2 rounded">
        Post Project
      </button>
    </div>
  );
};

export default PostProject;