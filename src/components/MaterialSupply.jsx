import React, { useState } from 'react'; // Ensure this line is present
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import MaterialSupply from '../components/MaterialSupply';

const Materials = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('manageMaterials');

  if (user.user_type !== 'hardware') {
    return (
      <div className="p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded">
          Access Denied: This page is for Hardware Suppliers only.
        </div>
      </div>
    );
  }

  const sections = {
    manageMaterials: <MaterialSupply />,
  };

  return (
    <div className="flex">
      <div className="md:ml-64 flex-1 p-6">
        <Header userType="hardware" activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-primary-blue mb-6">
            Hardware Supplier Dashboard - {user.storeName}
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {sections[activeSection]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Materials;