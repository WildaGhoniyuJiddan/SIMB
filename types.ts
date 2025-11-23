import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export interface TsunamiEvent {
  id: number;
  year: number;
  location: string;
  magnitude: number;
  height: number; // in meters
  casualties: number;
  description: string;
  image: string;
}

export interface MitigationStep {
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export interface MapLocation {
  name: string;
  lat: number;
  lng: number;
  type: 'Historical' | 'Prehistorical';
  details: string;
}