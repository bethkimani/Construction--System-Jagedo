import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProjectList from './pages/ProjectList';
import Projects from './pages/Projects';
import BuilderAvailability from './pages/BuilderAvailability';
import ProfileEdit from './pages/ProfileEdit';
import ProtectedRoute from './pages/ProtectedRoute';
import ConstructionChatbot from './components/ConstructionChatbot';
import { useAuth } from './context/AuthContext';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router>
            <div className="min-h-screen bg-gray-100">
              <ErrorBoundary>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomeRedirect />} />
                    <Route path="/builders" element={<ProjectList />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/builder-availability" element={<BuilderAvailability />} />
                    <Route path="/profile" element={<ProfileEdit />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ErrorBoundary>
              <ConstructionChatbot />
            </div>
          </Router>
        </LocalizationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const HomeRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return user.user_type === 'client' ? (
    <Navigate to="/builders" replace />
  ) : (
    <Navigate to="/projects" replace />
  );
};

export default App;