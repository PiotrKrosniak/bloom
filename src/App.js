import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import PaymentSuccessPage from './components/PaymentSuccessPage';
import { getToken } from './userActionHelper';
import { UserProvider } from './context/UserProvider';
import { injectScript } from './constants'

function App() {
  // Call the function to inject the script
  injectScript();
  
  const isTokenSet = getToken();

  const [authenticated, setAuthenticated] = useState(isTokenSet ? true : false);

  const PrivateRoute = ({ children }) => {
    return authenticated ? children : <Navigate to="/login" />;
  };
  

  return (
    <UserProvider>
      <Router>
        <Navbar authenticated={authenticated}/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/signup" element={<Signup setAuthenticated={setAuthenticated}/>} />
            <Route path="/login" element={<Login setAuthenticated={setAuthenticated}/>} />
            <Route path="/user/:userId" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            <Route path="/payment-successfull" element={<PaymentSuccessPage />}/>
          </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
