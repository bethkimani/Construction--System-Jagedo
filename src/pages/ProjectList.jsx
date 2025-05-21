import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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

  const bookProject = (builder, projectDetails) => {
    const newProject = {
      id: projects.length + 1,
      client: user.email,
      builder: `${builder.first_name} ${builder.last_name}`,
      date: new Date().toISOString().split('T')[0],
      requirements: projectDetails.requirements,
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
    projects: <ProjectsSection projects={projects} builders={dummyBuilders} />,
    availableBuilders: <AvailableBuilders builders={dummyBuilders} onAssignProject={bookProject} projects={projects} setProjects={setProjects} />,
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
    <div className="min-h-screen bg-cream-bg">
      <Header userType="client" activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="p-6 md:ml-64">
        <h1 className="text-3xl font-bold text-dark-purple mb-6">Project Dashboard</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-dark-purple">Project Progress Tracker</h2>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div
              className="bg-dark-purple h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-dark-purple mt-1">{progress.toFixed(1)}% Complete</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {sections[activeSection] || <p className="text-dark-purple">Select a section to view details.</p>}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;