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
  unitOfMeasure: string;
}

export interface Car {
  summary: Summary;
  overview: OverviewEntry[];
  upcomingReminders: Reminder[];
  maintenanceHistory: MaintenanceRecord[];
  fuelRecords: FuelRecord[];
}

export interface FuelRecord {
  date: string;
  odometer: number;
  fuelAmount: number;
  cost: number;
}

export interface Summary {
  brand: string;
  model: string;
  year: number;
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
  odometer?: number;
}

export interface MaintenanceRecord {
  date: string;
  description: string;
  partCost: number;
  laborCost: number;
  odometer: number;
}
