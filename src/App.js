import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const PrivateRoute = ({ children }) => {
    return authenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/user/:userId" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
