// GlobalProvider.tsx
import User from "@/models/user";
import React, { createContext, useState, ReactNode } from "react";

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  removeUser: () => void;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  removeUser: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const removeUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
