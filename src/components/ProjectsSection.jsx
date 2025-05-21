import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const ProjectsSection = ({ builders, onAssignProject, projects, setProjects }) => {
  const [availability, setAvailability] = useState({ start_datetime: null, end_datetime: null });
  const [projectDetails, setProjectDetails] = useState({ requirements: '' });
  const [error, setError] = useState('');

  const buildersWithVerification = builders.map((builder) => ({
    ...builder,
    verified: builder.id === 1,
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
      client: 'Current Client',
      builder: `${builder.first_name} ${builder.last_name}`,
      date: availability.start_datetime.toISOString().split('T')[0],
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-dark-purple">Projects</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {projects.length === 0 ? (
          <p className="text-dark-purple">No projects available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={`project-${project.id}`}
                className="p-4 bg-cream-bg rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-dark-purple">Builder: {project.builder}</h3>
                <p className="text-dark-purple">Client: {project.client}</p>
                <p className="text-dark-purple">Date: {project.date}</p>
                <p className="text-dark-purple">Requirements: {project.requirements}</p>
                <p className="text-dark-purple">Progress: {project.progress}</p>
                <p className="text-dark-purple">Notes: {project.notes}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-dark-purple mb-4">Book a Builder</h3>
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <DateTimePicker
              label="Start Time"
              value={availability.start_datetime ? dayjs(availability.start_datetime) : null}
              onChange={(newValue) =>
                setAvailability({ ...availability, start_datetime: newValue ? newValue.toDate() : null })
              }
              slotProps={{ textField: { variant: 'outlined', fullWidth: true, className: 'rounded-lg border-gray-300' } }}
            />
            <DateTimePicker
              label="End Time"
              value={availability.end_datetime ? dayjs(availability.end_datetime) : null}
              onChange={(newValue) =>
                setAvailability({ ...availability, end_datetime: newValue ? newValue.toDate() : null })
              }
              slotProps={{ textField: { variant: 'outlined', fullWidth: true, className: 'rounded-lg border-gray-300' } }}
            />
          </div>
        </LocalizationProvider>
        <input
          type="text"
          placeholder="Project Requirements"
          value={projectDetails.requirements}
          onChange={(e) => setProjectDetails({ ...projectDetails, requirements: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-purple mb-4"
        />
        <div className="space-y-4">
          {buildersWithVerification.map((builder) => (
            <div key={`builder-${builder.id}`} className="p-4 bg-cream-bg rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <p className="text-dark-purple font-medium">{builder.first_name} {builder.last_name}</p>
                {builder.verified && <span className="text-green-500 text-sm">✔ Verified</span>}
              </div>
              <p className="text-dark-purple">Specialization: {builder.specialization || 'N/A'}</p>
              <p className="text-dark-purple">Company: {builder.company || 'N/A'}</p>
              <button
                onClick={() => handleAssignProject(builder)}
                className="mt-2 w-full bg-dark-purple text-white p-2 rounded-lg hover:bg-opacity-90 transition"
              >
                Assign Project
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;