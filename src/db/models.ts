// Define TypeScript types for Locations and Checklist items

export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
}

export interface ChecklistItem {
  id: string;
  locationId: string;
  name: string;
  done: boolean;
}
