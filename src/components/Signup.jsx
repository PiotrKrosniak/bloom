import React, { useState } from 'react';
import { API, AUTH_TOKEN } from "../constants";
import { setToken, setUser, removeToken } from "../userActionHelper";
import { useNavigate } from "react-router-dom";

const Signup = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const userData = {
    "email": email,
    "password": password,
    "username": userName
  };
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + AUTH_TOKEN
        },
        body: JSON.stringify(userData),
      });
      removeToken();
      const data = await response.json();
      if (data?.error) {
        const errorMessage = !data.error.details.errors ? data.error.message : data.error.details?.errors[0]?.message;
        setError(errorMessage);
      } else {
        setToken(data.jwt);
        setUser({
          "email": data.user.email,
          "userName": data.user.username,
          "id": data.user.id
        });
        setAuthenticated(true);
        navigate(`/user/${data?.user?.id}`, { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-20 flex justify-center item-center">
      <div>
        <h2 className="text-2xl mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="border w-96 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">User Name</label>
            <input
              type="userName"
              className="border w-96 p-2"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="border w-96 p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="bg-blue-500 text-white p-2 rounded" type="submit">
            Sign Up
          </button>
        </form>
      </div>

    </div>
  );
};

export default Signup;
