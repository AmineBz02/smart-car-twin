import { useState, useEffect } from 'react';
import { DashboardData, GeoPoint } from '../types/VehicleData';

const SIMULATION_INTERVAL = 1000; // Update every second for smoother simulation

// Helper function to get random number within a range
const getRandomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// Helper function to get random coordinate offset (±0.001 degrees)
const getRandomCoordOffset = () => {
  return (Math.random() - 0.5) * 0.002;
};

export const useSimulatedData = () => {
  const [data, setData] = useState<DashboardData>({
    speed: 60,
    engineTemp: 85,
    fuelLevel: 75,
    gpsLocation: {
      type: 'Point',
      coordinates: [-0.118092, 51.509865], // London coordinates as default
    },
    lastUpdated: new Date(),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData(prevData => {
        // Simulate realistic vehicle behavior
        const newSpeed = Math.max(0, Math.min(220, prevData.speed + getRandomInRange(-5, 5)));
        const newTemp = Math.max(60, Math.min(130, prevData.engineTemp + getRandomInRange(-1, 1)));
        const newFuel = Math.max(0, Math.min(100, prevData.fuelLevel - 0.01)); // Slowly decrease fuel

        // Update GPS location with small random movements
        const [prevLong, prevLat] = prevData.gpsLocation?.coordinates || [-0.118092, 51.509865];
        const newLocation: GeoPoint = {
          type: 'Point',
          coordinates: [
            prevLong + getRandomCoordOffset(),
            prevLat + getRandomCoordOffset(),
          ],
        };

        return {
          speed: newSpeed,
          engineTemp: newTemp,
          fuelLevel: newFuel,
          gpsLocation: newLocation,
          lastUpdated: new Date(),
        };
      });
    }, SIMULATION_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return { data, loading: false, error: null, refetch: () => {} };
};