import React, { useState } from 'react';
import axios from 'axios';
import { API, AUTH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import { setToken, removeToken, setUser } from "../userActionHelper";

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  removeToken();
  setAuthenticated(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: 'post',
        url: `${API}/auth/local`,
        data: {
          "identifier": email,
          "password": password,
        },
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + AUTH_TOKEN
        }
      });

      setToken(response.data.jwt);
      setAuthenticated(true);
      setUser(
        {
          "email": response.data.user.email,
          "userName": response.data.user.username,
          "id": response.data.user.id
        }
      );
      navigate(`/user/${response.data.user.id}`, { replace: true });
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container mx-auto p-4 pt-20 flex justify-center item-center">
      <div>
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="border w-96 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="border w-96 p-2 "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="bg-purple-700 text-white p-2 rounded" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
