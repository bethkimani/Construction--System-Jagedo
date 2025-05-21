import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userType = searchParams.get('type') || 'client';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-primary-blue text-center mb-4">Log In to JaGedo</h2>
        <p className="text-center text-text-gray mb-4">
          For {userType === 'client' ? 'Clients' : userType === 'builder' ? 'Builders' : userType === 'hardware' ? 'Hardware Suppliers' : 'Admins'}
        </p>
        <p className="text-center text-text-gray mb-4">
          All users (Clients, Builders, Suppliers, Admins) log in here. You’ll be redirected to the appropriate dashboard.
        </p>
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-gray mb-1">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
              required
            />
          </div>
          <div>
            <label className="block text-text-gray mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-blue text-white p-2 rounded hover:bg-blue-800"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white mx-auto"></div>
            ) : (
              'Log In'
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-primary-blue hover:underline">
            Don’t have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;