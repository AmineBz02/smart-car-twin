export interface GeoPoint {
  type: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface VehicleData {
  id: string;
  type: string;
  speed: {
    type: string;
    value: number;
    metadata: Record<string, any>;
  };
  engineTemp: {
    type: string;
    value: number;
    metadata: Record<string, any>;
  };
  fuelLevel: {
    type: string;
    value: number;
    metadata: Record<string, any>;
  };
  gpsLocation: {
    type: string;
    value: GeoPoint;
    metadata: Record<string, any>;
  };
}

export interface DashboardData {
  speed: number;
  engineTemp: number;
  fuelLevel: number;
  gpsLocation: GeoPoint | null;
  lastUpdated: Date;
}