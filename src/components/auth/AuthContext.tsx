import { createContext, useState, useEffect } from "react";
import { User, AuthProviderProps } from "../../../utils/Interfaces";

interface AuthContextType {
  user: User | null;
  addUser: (user: User) => void;
  deleteUserFromContext: () => void;
  language: string;
  changeLanguage: (language: string) => void;
  updateUser: (updatedFields: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  addUser: () => {},
  deleteUserFromContext: () => {},
  language: "eng",
  changeLanguage: () => {},
  updateUser: () => {},
});

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<string>("esp");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const addUser = (user: User) => {
    setUser(user);
  };

  const deleteUserFromContext = () => {
    setUser(null);
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      return {
        ...prevUser,
        ...updatedFields,
      };
    });
  };

  const changeLanguage = (newLanguage: string) => {
    if (newLanguage === "esp") {
      setLanguage("esp");
      localStorage.setItem("language", "esp");
    } else if (newLanguage === "eng") {
      setLanguage("eng");
      localStorage.setItem("language", "eng");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        addUser,
        deleteUserFromContext,
        updateUser,
        language,
        changeLanguage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
