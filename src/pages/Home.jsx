import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        maxWidth: '800px',
        width: '90%',
        background: '#fff',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}>
        <h1 style={{ color: '#6a1b9a', marginBottom: '20px', fontSize: '3rem', fontWeight: 'bold' }}>JaGedo</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#555' }}>
          Join us today! Get special benefits and stay up-to-date.
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '30px',
        }}>
          {[
            { to: "/login?type=client", label: "Client", icon: "👤" },
            { to: "/login?type=builder", label: "Builder", icon: "👷" },
            { to: "/login?type=hardware", label: "Hardware Supplier", icon: "🛠️" },
            { to: "/login?type=fundi", label: "Fundi", icon: "💼" },
            { to: "/login?type=contractor", label: "Contractor", icon: "🏗️" },
          ].map(({ to, label, icon }) => (
            <Link
              key={label}
              to={to}
              style={{
                textDecoration: 'none',
                color: '#333',
                background: '#f1f1f1',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s',
                border: '1px solid #ddd',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e0e0e0'}
              onMouseLeave={e => e.currentTarget.style.background = '#f1f1f1'}
            >
              <span>{icon}</span> {label}
            </Link>
          ))}
        </div>

        <Link
          to="/login"
          style={{
            display: 'inline-block',
            padding: '12px 30px',
            backgroundColor: '#1976d2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
            transition: 'background 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#115293'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1976d2'}
        >
          Log In (Clients, Builders, Suppliers, and Admins)
        </Link>

        <p style={{ marginTop: '20px', color: '#888', fontSize: '0.9rem' }}>
          Admins: Use the Log In button above to access the admin dashboard.
        </p>
      </div>
    </div>
  );
};

export default Home;
