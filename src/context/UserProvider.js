import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken } from '../userActionHelper';
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({}); 
  const [authorization, setAuthorization] = useState(false);
  useEffect (() =>{
    const isTokenSet = getToken();
    if(isTokenSet){
      setAuthorization(true);
    }
  },[])
  const value = { user, setUser, authorization, setAuthorization};
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext)
};
