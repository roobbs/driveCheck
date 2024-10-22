import { createContext, useState } from "react";
import { User, AuthProviderProps } from "../../../utils/Interfaces";

interface AuthContextType {
  user: User | null;
  addUser: (user: User) => void;
  logOutUser: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  addUser: () => {},
  logOutUser: () => {},
});

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const addUser = (user: User) => {
    setUser(user);
  };

  const logOutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        addUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
