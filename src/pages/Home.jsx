import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center p-12 bg-gradient-to-r from-accent-purple to-accent-orange min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-white mb-6">JaGedo</h1>
      <p className="text-2xl text-white mb-8">
        Join us today! Get special benefits and stay up-to-date.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Link
          to="/login?type=client"
          className="flex items-center gap-2 bg-white text-text-gray px-6 py-3 rounded-lg hover:bg-light-gray transition"
        >
          <span role="img" aria-label="Client">👤</span> Client
        </Link>
        <Link
          to="/login?type=builder"
          className="flex items-center gap-2 bg-white text-text-gray px-6 py-3 rounded-lg hover:bg-light-gray transition"
        >
          <span role="img" aria-label="Builder">👷</span> Builder
        </Link>
        <Link
          to="/login?type=hardware"
          className="flex items-center gap-2 bg-white text-text-gray px-6 py-3 rounded-lg hover:bg-light-gray transition"
        >
          <span role="img" aria-label="Hardware Supplier">🛠️</span> Hardware Supplier
        </Link>
      </div>
      <Link
        to="/login"
        className="bg-primary-blue text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
      >
        Log In (Clients, Builders, Suppliers, and Admins)
      </Link>
      <p className="mt-4 text-white">
        Admins: Use the Log In button above to access the admin dashboard.
      </p>
    </div>
  );
};

export default Home;