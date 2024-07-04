import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/Home';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import PaymentSuccessPage from './components/PaymentSuccessPage';
import { getToken } from './userActionHelper';
import { UserProvider } from './context/UserProvider';
import { injectScript } from './constants';
import UserListPage from './components/UserListPage';
import { getUserRole, getUser } from './userActionHelper';

function App() {
  injectScript();
  
  const isTokenSet = getToken();

  const [authenticated, setAuthenticated] = useState(isTokenSet ? true : false);

  const PrivateRoute = ({ children }) => {
    return authenticated ? children : <Navigate to="/login" />;
  };

  const [currentRole, setCurrentRole] = useState(null);

  useEffect (() =>{
    if(authenticated){
      const user = getUser();
      const userRole = getUserRole(user?.id).then(roleId => {
        console.log('User role ID:', roleId);
        setCurrentRole(roleId);
      });
    }
  },[])
  

  return (
    <UserProvider>
      <Router>
        <Navbar authenticated={authenticated} currentRole={currentRole}/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/signup" element={<Signup setAuthenticated={setAuthenticated} handle/>} />
            <Route path="/login" element={<Login setAuthenticated={setAuthenticated}/>} />
            <Route path="/user/:userId" element={<PrivateRoute><UserDashboard authenticated={authenticated} setCurrentRole={setCurrentRole}/></PrivateRoute>} />
            <Route path="/payment-successfull" element={<PaymentSuccessPage />}/>
            <Route path="/user-list" element={<PrivateRoute><UserListPage /></PrivateRoute>}/>
          </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
