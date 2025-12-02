import React, { createContext, useState } from "react";

export const webData = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <webData.Provider value={{ user, setUser }}>
      {children}
    </webData.Provider>
  );
};

