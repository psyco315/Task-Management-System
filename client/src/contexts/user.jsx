import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);

  return (
    <UserContext.Provider value={{ currUser, setCurrUser }}>
      {children}
    </UserContext.Provider>
  );
};
