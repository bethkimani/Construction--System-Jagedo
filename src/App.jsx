import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProjectList from './pages/ProjectList';
import Projects from './pages/Projects';
import Materials from './pages/Materials';
import AdminDashboard from './pages/AdminDashboard';
import ConstructionChatbot from './components/ConstructionChatbot';

function App() {
  return (
    <Router> {/* Move Router outside AuthProvider */}
      <AuthProvider>
        <ConstructionChatbot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/builders" element={<ProjectList />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;