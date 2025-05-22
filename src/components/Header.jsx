import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ userType, activeSection, setActiveSection }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sections = {
    client: [
      { name: 'Requirement Checker', key: 'projectRequirementChecker', icon: '📋' },
      { name: 'Projects', key: 'projects', icon: '🏗️' },
      { name: 'Available Builders', key: 'availableBuilders', icon: '👷' },
      { name: 'Escrow Management', key: 'escrowManagement', icon: '💰' },
      { name: 'Project Logs', key: 'projectLogs', icon: '📜' },
      { name: 'FAQs', key: 'faqs', icon: '❓' },
      { name: 'Material Supply', key: 'materialSupply', icon: '🛠️' },
    ],
    builder: [
      { name: 'Manage Projects', key: 'manageProjects', icon: '🏗️' },
      { name: 'Set Availability', key: 'setAvailability', icon: '⏰' },
    ],
    hardware: [
      { name: 'Manage Materials', key: 'manageMaterials', icon: '🛠️' },
    ],
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-bg">
      {/* Top Navbar */}
      <nav className="bg-white p-6 flex justify-end items-center shadow-md border-b border-gray-200 mt-4">
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="text-text-dark hover:text-dark-purple transition">Profile</Link>
          <button
            onClick={handleLogout}
            className="bg-dark-purple text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="flex">
        <div
          className={`w-64 bg-dark-purple text-white h-screen p-6 shadow-lg fixed z-10 left-0 ${isSidebarOpen ? 'block' : 'hidden md:block'}`}
          style={{ boxShadow: '2px 0 10px rgba(0, 0, 0, 0.5)' }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Dashboard</h2>
          <ul className="space-y-6">
            {user && sections[userType]?.map((section) => (
              <li key={section.key}>
                <button
                  onClick={() => {
                    setActiveSection(section.key);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    activeSection === section.key
                      ? 'bg-custom-gradient text-white'
                      : 'hover:bg-custom-gradient hover:shadow-lg hover:shadow-red-500/50'
                  }`}
                >
                  <span className="text-xl transition-transform duration-300 hover:scale-110">
                    {section.icon}
                  </span>
                  <span>{section.name}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-6 border-t border-white/20">
            <a
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-custom-gradient hover:shadow-lg hover:shadow-red-500/50"
            >
              <span className="text-2xl">👤</span>
              <span className="text-sm">{user?.email || 'User'}</span>
            </a>
          </div>
        </div>

        {/* Toggle Button for Mobile */}
        <button
          className="md:hidden p-2 bg-dark-purple text-white fixed top-16 left-2 rounded-lg z-20"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <main>{/* Content will be injected here by parent component */}</main>
        </div>
      </div>
    </div>
  );
};

export default Header;