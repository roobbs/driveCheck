import { ReactNode } from "react";

export interface AuthProviderProps {
  children: ReactNode;
}

export interface GoogleUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface User {
  uid: string;
  email: string;
  name: string;
  profilePicture: string;
  joinedAt: string;
  car: Car;
}

export interface Car {
  summary: Summary;
  overview: OverviewEntry[];
  upcomingReminders: Reminder[];
  maintenanceHistory: MaintenanceRecord[];
}

export interface Summary {
  brand: string;
  model: string;
  year: number;
  mileage: number;
}

export interface OverviewEntry {
  name: string;
  nameEs: string;
  level: string;
  date: string;
}

export interface Reminder {
  date: string;
  description: string;
  mileage?: number;
}

export interface MaintenanceRecord {
  date: string;
  description: string;
  cost: number;
  mileage: number;
}
