import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);

  const forceUpdate = () => {
    setUpdateFlag(!updateFlag);
  };

  return (
    <UserContext.Provider value={{ user, setUser, forceUpdate }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
