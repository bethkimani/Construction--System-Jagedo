import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Typography, Box, Alert, CircularProgress, LinearProgress, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Added
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Added
import Header from '../components/Header';
import ProjectRequirementChecker from '../components/ProjectRequirementChecker';
import ProjectsSection from '../components/ProjectsSection';
import AvailableBuilders from '../components/AvailableBuilders';
import EscrowManagement from '../components/EscrowManagement';
import ProjectLogs from '../components/ProjectLogs';
import FAQs from '../components/FAQs';
import MaterialSupply from '../components/MaterialSupply';
import { dummyProjects, dummyBuilders } from '../data/dummyData';

const ProjectList = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlots, setSelectedSlots] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.user_type === 'builder') {
      navigate('/projects');
      return;
    }
    if (user.user_type === 'hardware') {
      navigate('/materials');
      return;
    }
    setTimeout(() => {
      setProjects(dummyProjects);
      setProgress(calculateProgress(dummyProjects));
      setLoading(false);
    }, 1000);
  }, [user, navigate]);

  const calculateProgress = (projects) => {
    if (projects.length === 0) return 0;
    const totalProgress = projects.reduce((sum, project) => {
      return sum + parseInt(project.progress) || 0;
    }, 0);
    return totalProgress / projects.length;
  };

  const handleBuilderAssign = (builder) => {
    setProjects((prev) => {
      const newProjects = [...prev];
      if (newProjects.length > 0) {
        newProjects[newProjects.length - 1].builder = `${builder.first_name} ${builder.last_name}`;
      }
      return newProjects;
    });
  };

  const bookProject = (builderId) => {
    const builder = dummyBuilders.find((b) => b.id === builderId);
    if (!builder) return;
    const newProject = {
      id: projects.length + 1,
      client: user.email,
      builder: `${builder.first_name} ${builder.last_name}`,
      date: new Date().toISOString().split('T')[0],
      requirements: 'New Project',
      progress: '0%',
      notes: 'Project initiated',
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const handleOrderMaterial = (material) => {
    setProjects((prev) => {
      const updatedProjects = [...prev];
      if (updatedProjects.length > 0) {
        updatedProjects[updatedProjects.length - 1].notes += ` | Ordered ${material.name} from ${material.supplier} for ${material.price} KES (Material Source: Eco-Friendly)`;
      }
      return updatedProjects;
    });
  };

  const sections = {
    projectRequirementChecker: <ProjectRequirementChecker onBuilderAssign={handleBuilderAssign} />,
    projects: <ProjectsSection
      projects={projects}
      builders={dummyBuilders}
      onAssignProject={bookProject}
      selectedSlots={selectedSlots}
      setSelectedSlots={setSelectedSlots}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />,
    availableBuilders: (
      <AvailableBuilders
        builders={dummyBuilders}
        onAssignProject={bookProject}
        selectedSlots={selectedSlots}
        setSelectedSlots={setSelectedSlots}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        projects={projects}
        setProjects={setProjects}
      />
    ),
    escrowManagement: <EscrowManagement projects={projects} builders={dummyBuilders} />,
    projectLogs: <ProjectLogs />,
    faqs: <FAQs />,
    materialSupply: <MaterialSupply onOrderMaterial={handleOrderMaterial} />,
  };

  console.log('ProjectList rendering sections:', sections);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}> {/* Wrap with LocalizationProvider */}
      <div className="p-6">
        <Header />
        <Typography variant="h4" className="mb-6 text-gray-800">
          Project Dashboard
        </Typography>
        <Box className="mb-6">
          <Typography variant="h6">Project Progress Tracker</Typography>
          <LinearProgress variant="determinate" value={progress} className="mt-2" />
          <Typography>{progress}% Complete</Typography>
        </Box>
        {Object.keys(sections).map((sectionKey) => (
          <Box key={sectionKey} className="mb-8">
            {sections[sectionKey]}
          </Box>
        ))}
        <Button variant="contained" color="secondary" onClick={logout} className="mt-6">
          Logout
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default ProjectList;