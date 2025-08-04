// AdminModeContext.jsx
import { createContext, useContext, useState } from 'react';

const AdminModeContext = createContext();

export const AdminModeProvider = ({ children }) => {
  const [adminMode, setAdminMode] = useState(false);

  return (
    <AdminModeContext.Provider value={{ adminMode, setAdminMode }}>
      {children}
    </AdminModeContext.Provider>
  );
};

export const useAdminMode = () => useContext(AdminModeContext);
