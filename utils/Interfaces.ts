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
  model: string;
  year: number;
  mileage: number;
  lastServiceDate: string;
}

export interface OverviewEntry {
  item: string;
  value: string;
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
