import React from 'react';
import { useParams } from 'react-router-dom';

const UserDashboard = () => {
  const { userId } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Welcome, {userId}</h2>
      <p>This is your dashboard.</p>
    </div>
  );
};

export default UserDashboard;
