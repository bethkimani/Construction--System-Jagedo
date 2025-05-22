import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import EscrowManagement from '../components/EscrowManagement';
import { dummyProjects, dummyBuilders } from '../data/dummyData';

const ProjectList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('escrowManagement'); // Default to escrow for payment
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
      setLoading(false);
    }, 1000);
  }, [user, navigate]);

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

  const updateProgress = (projectId, newProgress) => {
    setProjects(projects.map(p => p.id === projectId ? { ...p, progress: newProgress } : p));
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
      <Header
        userType="client"
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onBuilderAssign={handleBuilderAssign}
        onOrderMaterial={handleOrderMaterial}
        projects={projects}
        setProjects={setProjects}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedSlots={selectedSlots}
        setSelectedSlots={setSelectedSlots}
        user={user}
      />
      <div className="md:ml-64 flex-1 p-6">
        <h2 className="text-2xl font-semibold text-primary-blue mb-4">Projects</h2>
        {projects.map((project) => (
          <div key={`project-${project.id}`} className="mb-4 p-6 bg-white rounded-lg shadow-md">
            <p className="text-text-gray">Client: {project.client}</p>
            <p className="text-text-gray">Builder: {project.builder}</p>
            <p className="text-text-gray">Requirements: {project.requirements}</p>
            <p className="text-text-gray">Progress: {project.progress}</p>
            <input
              type="range"
              min="0"
              max="100"
              value={parseInt(project.progress) || 0}
              onChange={(e) => updateProgress(project.id, `${e.target.value}%`)}
              className="w-full mt-2"
            />
            {activeSection === 'escrowManagement' && <EscrowManagement projects={projects} builders={dummyBuilders} user={user} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;