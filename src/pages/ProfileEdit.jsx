import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const ProfileEdit = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    specialization: '',
    company: '',
    license_number: '',
    id_number: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        specialization: user.specialization || '',
        company: user.company || '',
        license_number: user.license_number || '',
        id_number: user.id_number || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...user,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        specialization: formData.specialization,
        company: formData.company,
        license_number: formData.license_number,
        id_number: formData.id_number,
        address: formData.address,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccess('Profile updated successfully');
      setError('');
      setTimeout(() => navigate(user.user_type === 'client' ? '/builders' : user.user_type === 'builder' ? '/projects' : '/materials'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-cream-bg">
      <Header userType={user?.user_type} activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="md:ml-64">
        <div className="max-w-md mx-auto p-6">
          <h1 className="text-3xl font-bold text-primary-blue mb-6">Edit User Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-text-gray mb-1">First Name</label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
                required
              />
            </div>
            <div>
              <label className="block text-text-gray mb-1">Last Name</label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
                required
              />
            </div>
            <div>
              <label className="block text-text-gray mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
                required
              />
            </div>
            <div>
              <label className="block text-text-gray mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
            </div>
            {user?.user_type === 'builder' && (
              <>
                <div>
                  <label className="block text-text-gray mb-1">Specialization</label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
                <div>
                  <label className="block text-text-gray mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
              </>
            )}
            {user?.user_type === 'client' && (
              <>
                <div>
                  <label className="block text-text-gray mb-1">License Number</label>
                  <input
                    type="text"
                    value={formData.license_number}
                    onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                    className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
                <div>
                  <label className="block text-text-gray mb-1">ID Number</label>
                  <input
                    type="text"
                    value={formData.id_number}
                    onChange={(e) => setFormData({ ...formData, id_number: e.target.value })}
                    className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
                <div>
                  <label className="block text-text-gray mb-1">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>
              </>
            )}
            {error && <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-4 rounded">{success}</div>}
            <button
              type="submit"
              className="w-full bg-primary-blue text-white p-2 rounded hover:bg-blue-800"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;