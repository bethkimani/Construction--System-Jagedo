import React, { useState } from 'react';
import { Typography, Box, Alert, CircularProgress, LinearProgress } from '@mui/material';
import Header from '../components/Header';
import ProjectRequirementChecker from '../components/ProjectRequirementChecker';
import ProjectsSection from '../components/ProjectsSection';
import AvailableBuilders from '../components/AvailableBuilders';
import EscrowManagement from '../components/EscrowManagement';
import ProjectLogs from '../components/ProjectLogs';
import FAQs from '../components/FAQs';
import { useAuth } from '../context/AuthContext';
import { dummyBuilders, dummyProjects } from '../data/dummyData';
import { aiAssignBuilder } from '../utils/aiAutomation';

const ProjectList = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('projectRequirementChecker');
  const [projects, setProjects] = useState(dummyProjects);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [assignedBuilder, setAssignedBuilder] = useState(null);
  const [progress, setProgress] = useState(0); // Real-time progress tracker (innovation)

  const bookProject = async (builderId) => {
    const selectedSlot = selectedSlots[builderId];
    if (!selectedSlot) {
      setError('Please select a project start time');
      return;
    }

    try {
      setLoading(true);
      const builder = dummyBuilders.find((b) => b.id === builderId);
      if (!builder) {
        throw new Error('Builder not found');
      }
      const newProject = {
        id: projects.length + 1,
        builder: `${builder.first_name} ${builder.last_name}`,
        client: user.email,
        scheduled_datetime: selectedSlot,
        end_datetime: new Date(selectedSlot).setDate(new Date(selectedSlot).getDate() + 30), // Dummy end date
        status: 'assigned',
      };
      setProjects([...projects, newProject]);
      setError('');
      alert('Project assigned successfully!');
      setSelectedSlots((prev) => ({ ...prev, [builderId]: null }));
      // Simulate progress update (innovation)
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to assign project');
    } finally {
      setLoading(false);
    }
  };

  const handleBuilderAssign = (builder) => {
    setAssignedBuilder(builder);
    if (builder) {
      setSelectedSlots((prev) => ({ ...prev, [builder.id]: new Date() }));
      bookProject(builder.id);
    }
  };

  const sections = {
    projectRequirementChecker: <ProjectRequirementChecker onBuilderAssign={handleBuilderAssign} />,
    projects: <ProjectsSection projects={projects} builders={dummyBuilders} />,
    availableBuilders: <AvailableBuilders builders={dummyBuilders} onAssignProject={bookProject} selectedSlots={selectedSlots} setSelectedSlots={setSelectedSlots} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />,
    escrowManagement: <EscrowManagement projects={projects} builders={dummyBuilders} />,
    projectLogs: <ProjectLogs />,
    faqs: <FAQs />,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <Typography variant="h4" className="text-blue-800 font-bold mb-6">
          Construction Management System
        </Typography>

        {/* Real-Time Progress Tracker (Innovation) */}
        {projects.length > 0 && (
          <Box className="mb-6">
            <Typography variant="h6">Project Progress Tracker</Typography>
            <LinearProgress variant="determinate" value={progress} className="mt-2" />
            <Typography>{progress}% Complete</Typography>
          </Box>
        )}

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-4 border-b">
            {Object.keys(sections).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`py-2 px-4 font-medium ${
                  activeSection === section
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {section
                  .split(/(?=[A-Z])/)
                  .join(' ')
                  .replace(/^\w/, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {/* Error and Loading */}
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        {loading && <CircularProgress className="my-4" />}

        {/* Render Active Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {sections[activeSection]}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;