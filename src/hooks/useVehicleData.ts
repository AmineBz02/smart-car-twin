import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { VehicleData, DashboardData } from '../types/VehicleData';
import { useSimulatedData } from './useSimulatedData';

export const useVehicleData = (ipAddress: string, refreshInterval = 10000) => {
  const [data, setData] = useState<DashboardData>({
    speed: 0,
    engineTemp: 0,
    fuelLevel: 0,
    gpsLocation: null,
    lastUpdated: new Date(),
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [useSimulation, setUseSimulation] = useState<boolean>(false);
  
  // Get simulated data as fallback
  const simulatedData = useSimulatedData();

  const fetchData = useCallback(async () => {
    if (!ipAddress) {
      setError('IP address is required');
      setLoading(false);
      setUseSimulation(true);
      return;
    }

    try {
      setLoading(true);
      const url = `http://${ipAddress}:1026/v2/entities/urn:ngsi-ld:Vehicle:001`;
      const response = await axios.get<VehicleData>(url);
      
      setData({
        speed: response.data.speed.value,
        engineTemp: response.data.engineTemp.value,
        fuelLevel: response.data.fuelLevel.value,
        gpsLocation: response.data.gpsLocation.value,
        lastUpdated: new Date(),
      });
      
      setError(null);
      setUseSimulation(false);
    } catch (err) {
      console.error('Error fetching vehicle data:', err);
      setError('Failed to fetch vehicle data. Using simulated data instead.');
      setUseSimulation(true);
    } finally {
      setLoading(false);
    }
  }, [ipAddress]);

  useEffect(() => {
    // Initial fetch
    if (ipAddress) {
      fetchData();
    } else {
      setUseSimulation(true);
    }

    // Set up polling
    const intervalId = setInterval(() => {
      if (ipAddress) {
        fetchData();
      }
    }, refreshInterval);

    // Clean up
    return () => clearInterval(intervalId);
  }, [fetchData, ipAddress, refreshInterval]);

  // Return simulated data if real data is unavailable
  if (useSimulation) {
    return simulatedData;
  }

  return { data, loading, error, refetch: fetchData };
};