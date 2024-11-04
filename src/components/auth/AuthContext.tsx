import { createContext, useState } from "react";
import { User, AuthProviderProps } from "../../../utils/Interfaces";

interface AuthContextType {
  user: User | null;
  addUser: (user: User) => void;
  deleteUserFromContext: () => void;
  language: string;
  changeLanguage: (language: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  addUser: () => {},
  deleteUserFromContext: () => {},
  language: "eng",
  changeLanguage: () => {},
});

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<string>("esp");

  const addUser = (user: User) => {
    setUser(user);
  };

  const deleteUserFromContext = () => {
    setUser(null);
  };

  const changeLanguage = (newLanguage: string) => {
    if (newLanguage === "esp") {
      setLanguage("esp");
    } else if (newLanguage === "eng") {
      setLanguage("eng");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        addUser,
        deleteUserFromContext,
        language,
        changeLanguage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
