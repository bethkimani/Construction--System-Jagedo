import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { dummyProjects } from '../data/dummyData';
import BuilderAvailability from './BuilderAvailability';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Projects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);
  const [activeSection, setActiveSection] = useState('projects');

  useEffect(() => {
    if (!user || user.user_type !== 'builder') {
      navigate('/login');
      return;
    }
    // Filter projects for the current builder
    const builderProjects = dummyProjects.filter((proj) => proj.builder === `${user.first_name} ${user.last_name}`);
    setProjects(builderProjects);
  }, [user, navigate]);

  const updateProject = async (projectId) => {
    try {
      setLoading(true);
      if (!newStartDate || !newEndDate) {
        throw new Error('Please select both start and end dates');
      }
      const updatedProjects = projects.map((proj) =>
        proj.id === projectId
          ? { ...proj, scheduled_datetime: newStartDate.toISOString(), end_datetime: newEndDate.toISOString() }
          : proj
      );
      setProjects(updatedProjects);
      setSuccess('Project updated successfully!');
      setError(null);
      setEditProject(null);
      setNewStartDate(null);
      setNewEndDate(null);
    } catch (err) {
      setError(err.message || 'Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      setLoading(true);
      const updatedProjects = projects.filter((proj) => proj.id !== projectId);
      setProjects(updatedProjects);
      setSuccess('Project deleted successfully!');
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  const sections = {
    projects: (
      <div>
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{success}</div>}
        {loading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-blue mx-auto"></div>
        ) : (
          <div>
            {projects.length === 0 ? (
              <p className="text-text-gray">No projects assigned to you yet.</p>
            ) : (
              projects.map((project) => (
                <div key={`project-${project.id}`} className="mb-4 p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-primary-blue">Builder: {project.builder}</h3>
                  <p className="text-text-gray">Client: {project.client}</p>
                  <p className="text-text-gray">Requirements: {project.requirements}</p>
                  <p className="text-text-gray">
                    Start Date: {project.scheduled_datetime ? new Date(project.scheduled_datetime).toLocaleString() : 'N/A'}
                  </p>
                  <p className="text-text-gray">
                    End Date: {project.end_datetime ? new Date(project.end_datetime).toLocaleString() : 'N/A'}
                  </p>
                  <p className="text-text-gray">Status: {project.status || 'N/A'}</p>
                  {editProject === project.id ? (
                    <div className="mt-4">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Update Start Date"
                          value={newStartDate ? dayjs(newStartDate) : null}
                          onChange={(newValue) => setNewStartDate(newValue ? newValue.toDate() : null)}
                          className="mb-4 w-full"
                          slotProps={{ textField: { variant: 'outlined' } }}
                        />
                        <DateTimePicker
                          label="Update End Date"
                          value={newEndDate ? dayjs(newEndDate) : null}
                          onChange={(newValue) => setNewEndDate(newValue ? newValue.toDate() : null)}
                          className="mb-4 w-full"
                          slotProps={{ textField: { variant: 'outlined' } }}
                        />
                      </LocalizationProvider>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateProject(project.id)}
                          className="bg-primary-blue text-white px-4 py-2 rounded hover:bg-blue-800"
                          disabled={!newStartDate || !newEndDate}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditProject(null);
                            setNewStartDate(null);
                            setNewEndDate(null);
                          }}
                          className="bg-gray-300 text-text-gray px-4 py-2 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => {
                          setEditProject(project.id);
                          setNewStartDate(project.scheduled_datetime ? new Date(project.scheduled_datetime) : null);
                          setNewEndDate(project.end_datetime ? new Date(project.end_datetime) : null);
                        }}
                        className="bg-primary-blue text-white px-4 py-2 rounded hover:bg-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    ),
    setAvailability: <BuilderAvailability />,
  };

  return (
    <div className="flex">
      <div className="md:ml-64 flex-1 p-6">
        <Header userType="builder" activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-primary-blue mb-6">Builder Dashboard</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {sections[activeSection]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;