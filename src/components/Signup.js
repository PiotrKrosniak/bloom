import React, { useState } from 'react';

const Signup = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    // Handle signup logic (e.g., API call to backend)
    // After signup, redirect to user's prefixed URL space
    history.push(`/user/${email.split('@')[0]}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="border w-full p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="border w-full p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
