import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { dummyBuilders } from '../data/dummyData';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [builders, setBuilders] = useState(dummyBuilders.map(builder => ({ ...builder, verified: false })));
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState(null);

  if (user.user_type !== 'admin') {
    return (
      <div className="p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded">
          Access Denied: This page is for Admins only.
        </div>
      </div>
    );
  }

  const handleVerifyBuilder = (builderId) => {
    setBuilders(builders.map(builder =>
      builder.id === builderId ? { ...builder, verified: true } : builder
    ));
  };

  return (
    <div className="flex">
      <div className="md:ml-64 flex-1 p-6">
        <Header userType="admin" activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-primary-blue mb-6">Admin Dashboard</h1>
          {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
          <h2 className="text-2xl font-semibold text-primary-blue mb-4">Manage Builders</h2>
          {builders.length === 0 ? (
            <p className="text-text-gray">No builders found.</p>
          ) : (
            builders.map((builder) => (
              <div key={builder.id} className="mb-4 p-6 border border-light-gray rounded">
                <p className="text-text-gray">Name: {builder.first_name} {builder.last_name}</p>
                <p className="text-text-gray">Specialization: {builder.specialization}</p>
                <p className="text-text-gray">Company: {builder.company}</p>
                <p className="text-text-gray">Status: {builder.verified ? 'Verified' : 'Not Verified'}</p>
                {!builder.verified && (
                  <button
                    onClick={() => handleVerifyBuilder(builder.id)}
                    className="mt-2 bg-primary-blue text-white px-4 py-2 rounded hover:bg-blue-800"
                  >
                    Verify Builder
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;