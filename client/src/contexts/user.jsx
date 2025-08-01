import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currUser, setCurrUserState] = useState(null);

  // Load from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem('currUser');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCurrUserState(parsed);
      } catch (err) {
        console.error('Failed to parse stored user:', err);
      }
    }
  }, []);

  // Update both state and localStorage
  const setCurrUser = (user) => {
    setCurrUserState(user);
    if (user) {
      localStorage.setItem('currUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currUser');
    }
  };

  return (
    <UserContext.Provider value={{ currUser, setCurrUser }}>
      {children}
    </UserContext.Provider>
  );
};
