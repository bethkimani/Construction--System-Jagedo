import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, CircularProgress, Alert, Box, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import Header from '../components/Header';
import { dummyProjects } from '../data/dummyData';

const Projects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState(dummyProjects);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);

  const updateProject = async (projectId) => {
    try {
      setLoading(true);
      if (!newStartDate || !newEndDate) {
        throw new Error('Please select both start and end dates');
      }
      const updatedProjects = projects.map((proj) =>
        proj.id === projectId
          ? { ...proj, scheduled_datetime: newStartDate, end_datetime: newEndDate }
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

  return (
    <div className="p-4">
      <Header />
      <Box className="mt-4">
        <Typography variant="h4">Manage Projects</Typography>
        {error && <Alert severity="error" className="mt-2">{error}</Alert>}
        {success && <Alert severity="success" className="mt-2">{success}</Alert>}
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            <Button
              variant="contained"
              onClick={() => navigate('/builder-availability')}
              className="mt-2"
            >
              Set Builder Availability
            </Button>
            {projects.length === 0 ? (
              <Typography className="mt-2">No projects found.</Typography>
            ) : (
              projects.map((project) => (
                <Box key={`project-${project.id}`} className="mt-2 p-4 bg-white rounded-lg shadow-md">
                  <Typography variant="h6">Builder: {project.builder}</Typography>
                  <Typography variant="h6">Client: {project.client}</Typography>
                  <Typography>
                    Start Date: {new Date(project.scheduled_datetime).toLocaleString()}
                  </Typography>
                  <Typography>
                    End Date: {new Date(project.end_datetime).toLocaleString()}
                  </Typography>
                  <Typography>Status: {project.status}</Typography>
                  {editProject === project.id ? (
                    <Box className="mt-2">
                      <DateTimePicker
                        label="Update Start Date"
                        value={newStartDate}
                        onChange={(newValue) => setNewStartDate(newValue)}
                        className="mb-2 w-full"
                      />
                      <DateTimePicker
                        label="Update End Date"
                        value={newEndDate}
                        onChange={(newValue) => setNewEndDate(newValue)}
                        className="mb-2 w-full"
                      />
                      <Button
                        variant="contained"
                        onClick={() => updateProject(project.id)}
                        className="mr-2"
                        disabled={!newStartDate || !newEndDate}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setEditProject(null);
                          setNewStartDate(null);
                          setNewEndDate(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  ) : (
                    <Box className="mt-2">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setEditProject(project.id);
                          setNewStartDate(new Date(project.scheduled_datetime));
                          setNewEndDate(new Date(project.end_datetime));
                        }}
                        className="mr-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteProject(project.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  )}
                </Box>
              ))
            )}
          </div>
        )}
      </Box>
    </div>
  );
};

export default Projects;