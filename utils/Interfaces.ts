import { ReactNode } from "react";

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  googleId: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}
