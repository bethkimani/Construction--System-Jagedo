import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProjectList from './pages/ProjectsList';
import Projects from './pages/Projects';
import Materials from './pages/Materials';
import AdminDashboard from './pages/AdminDashboard';
import ProfileEdit from './pages/ProfileEdit';
import ConstructionChatbot from './components/ConstructionChatbot';
import ErrorBoundary from './components/ErrorBoundary';
import Homepage from './pages/Homepage';
import Mentorship from './components/Mentorship';
import ManageProjects from './components/ManageProjects';
import ManageUsers from './components/ManageUsers';
import { useAuth } from './context/AuthContext';
import { dummyBuilders } from './data/dummyData';

// Placeholder components
const FundiDashboard = () => <div className="p-6">Fundi Dashboard (Under Construction)</div>;
const ContractorDashboard = () => <div className="p-6">Contractor Dashboard (Under Construction)</div>;

const AppContent = () => {
  const { user } = useAuth();

  return (
    <div>
      <ConstructionChatbot />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/builders" element={<ProjectList />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<ProfileEdit />} />
        <Route path="/fundi-dashboard" element={<FundiDashboard />} />
        <Route path="/contractor-dashboard" element={<ContractorDashboard />} />
        <Route path="/mentorship" element={<Mentorship builders={dummyBuilders} />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;