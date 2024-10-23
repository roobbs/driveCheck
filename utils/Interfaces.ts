import { ReactNode } from "react";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}
