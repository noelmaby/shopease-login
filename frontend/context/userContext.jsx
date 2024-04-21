import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({ user: null, setUser: () => {} }); // Ensure setUser is initialized

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/profile')
      .then(({ data }) => {
        setUser(data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []); // Run once when component mounts

  return (
    <UserContext.Provider value={{ user, setUser }}> {/* Pass setUser as part of the context value */}
      {children}
    </UserContext.Provider>
  );
}
