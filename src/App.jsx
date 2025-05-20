import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DoctorList from './pages/DoctorList';
import Appointments from './pages/Appointments';
import DoctorAvailability from './pages/DoctorAvailability';
import ProfileEdit from './pages/ProfileEdit';
import ProtectedRoute from './pages/ProtectedRoute';
import Chatbot from './components/Chatbot';
import { useAuth } from './context/AuthContext';

// Error Boundary Component
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
                    <Route path="/doctors" element={<DoctorList />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/doctor-availability" element={<DoctorAvailability />} />
                    <Route path="/profile" element={<ProfileEdit />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ErrorBoundary>
              <Chatbot />
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
  return user.user_type === 'patient' ? (
    <Navigate to="/doctors" replace />
  ) : (
    <Navigate to="/appointments" replace />
  );
};

export default App;