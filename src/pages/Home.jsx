import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ color: 'purple' }}>JaGedo</h1>
      <p style={{ fontSize: '1.5em', margin: '20px 0' }}>
        Join us today! Get special benefits and stay up-to-date.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <Link
          to="/login?type=client"
          style={{
            textDecoration: 'none',
            color: 'black',
            background: '#f0f0f0',
            padding: '10px 20px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span role="img" aria-label="Client">👤</span> Client
        </Link>
        <Link
          to="/login?type=builder"
          style={{
            textDecoration: 'none',
            color: 'black',
            background: '#f0f0f0',
            padding: '10px 20px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span role="img" aria-label="Builder">👷</span> Builder
        </Link>
        <Link
          to="/login?type=hardware"
          style={{
            textDecoration: 'none',
            color: 'black',
            background: '#f0f0f0',
            padding: '10px 20px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span role="img" aria-label="Hardware Supplier">🛠️</span> Hardware Supplier
        </Link>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Link
          to="/login"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
          }}
        >
          Log In (Clients, Builders, Suppliers, and Admins)
        </Link>
      </div>
      <p style={{ marginTop: '10px', color: '#666' }}>
        Admins: Use the Log In button above to access the admin dashboard.
      </p>
    </div>
  );
};

export default Home;