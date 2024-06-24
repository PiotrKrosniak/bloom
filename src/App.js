import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import { getToken } from './userActionHelper';

function App() {
  const isTokenSet = getToken();

  const [authenticated, setAuthenticated] = useState(isTokenSet ? true : false);

  const PrivateRoute = ({ children }) => {
    return authenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
    <Navbar authenticated={authenticated}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup setAuthenticated={setAuthenticated}/>} />
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/user/:userId" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
