import React from 'react';

const ManageUsers = ({ users }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary-blue">Manage Users</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {users.length === 0 ? (
          <p className="text-text-gray">No users available.</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="mb-4 p-4 border border-light-gray rounded">
              <p className="text-text-gray">Name: {user.first_name} {user.last_name}</p>
              <p className="text-text-gray">Email: {user.email}</p>
              <p className="text-text-gray">User Type: {user.user_type}</p>
              <p className="text-text-gray">Location: {user.location || 'N/A'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageUsers;