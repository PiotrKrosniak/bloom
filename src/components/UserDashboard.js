import React from 'react';

const UserDashboard = ({ match }) => {
  const { userId } = match.params;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Welcome, {userId}</h2>
      <p>This is your dashboard.</p>
    </div>
  );
};

export default UserDashboard;
