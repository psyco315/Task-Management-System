import React, { createContext, useContext, useState } from 'react';

const GroupContext = createContext();

export const useGroup = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
  const [currGroup, setCurrGroup] = useState('');
  
  return (
    <GroupContext.Provider value={{ currGroup, setCurrGroup }}>
      {children}
    </GroupContext.Provider>
  );
};
