import { createContext, useState, useEffect } from "react";
import { User, AuthProviderProps } from "../../../utils/Interfaces";
import { configurePersistence, getCurrentUser } from "../../../utils/database";
import { db } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

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
    const initializeAuth = async () => {
      try {
        await configurePersistence();
        const currentUser = await getCurrentUser();
        if (currentUser) {
          const uid = currentUser.uid;
          const userRef = doc(db, "users", uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(userData as User);
            console.log("logged user:", { ...user, ...userData });
            console.log("User signed with persistence");
          }
        }
      } catch (error) {
        console.error("Error initializing authentication:", error);
      }
    };

    initializeAuth();
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, [user]);

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
