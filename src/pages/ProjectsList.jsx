import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Typography, Box, LinearProgress, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
  const [activeSection, setActiveSection] = useState('projectRequirementChecker');
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
    const totalProgress = projects.reduce((sum, project) => sum + (parseInt(project.progress) || 0), 0);
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
    projects: (
      <ProjectsSection
        projects={projects}
        builders={dummyBuilders}
        onAssignProject={bookProject}
        selectedSlots={selectedSlots}
        setSelectedSlots={setSelectedSlots}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    ),
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-dark-purple"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-cream-bg">
        <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>
      </div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="min-h-screen bg-cream-bg">
        <Header userType="client" activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="p-6 md:ml-64">
          <Typography variant="h4" className="mb-6 text-gray-800">Project Dashboard</Typography>
          <Box className="mb-6">
            <Typography variant="h6">Project Progress Tracker</Typography>
            <LinearProgress variant="determinate" value={progress} className="mt-2" />
            <Typography>{progress.toFixed(1)}% Complete</Typography>
          </Box>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {sections[activeSection] || <p className="text-dark-purple">Select a section to view details.</p>}
          </div>
          <Button variant="contained" color="secondary" onClick={logout} className="mt-6">Logout</Button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default ProjectList;