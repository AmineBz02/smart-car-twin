import React from 'react';
import Speedometer from './Speedometer';
import TemperatureIndicator from './TemperatureIndicator';
import FuelGauge from './FuelGauge';
import LocationMap from './LocationMap';
import ConfigForm from './ConfigForm';
import { useVehicleData } from '../hooks/useVehicleData';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface DashboardProps {
  ipAddress: string;
  onIpAddressChange: (ipAddress: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ ipAddress, onIpAddressChange }) => {
  const { data, loading, error, refetch } = useVehicleData(ipAddress);
  console.log({ data, loading, error, refetch })

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Smart Car Dashboard</h1>
          <p className="text-slate-400">
            {ipAddress ? (
              <>Connected to {ipAddress}</>
            ) : (
              <>Using simulated data - configure connection settings to use real data</>
            )}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={refetch}
            className="flex items-center gap-2 px-3 py-2 text-white bg-slate-700 rounded-md hover:bg-slate-600 transition-colors"
            disabled={  loading || !ipAddress}
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
          
          <ConfigForm ipAddress={ipAddress} onSave={onIpAddressChange} />
        </div>
      </div>
      
      {error && (
        <div className="bg-blue-900/50 border border-blue-800 text-white p-4 rounded-md mb-6 flex items-start gap-3">
          <AlertTriangle className="text-blue-400 shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="font-medium">Using Simulated Data</h3>
            <p className="text-blue-200">{error}</p>
          </div>
        </div>
      )}
      
      {!ipAddress && !error && (
        <div className="bg-blue-900/50 border border-blue-800 text-white p-4 rounded-md mb-6">
          <p>Using simulated data. Configure the Orion Context Broker IP address to use real vehicle data.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Speedometer speed={data.speed} />
        <TemperatureIndicator temperature={data.engineTemp} />
        <FuelGauge fuelLevel={data.fuelLevel} />
        <div className="lg:col-span-3 h-80">
          <LocationMap gpsLocation={data.gpsLocation} />
        </div>
      </div>
      
      <div className="mt-6 text-right text-sm text-slate-500">
        Last updated: {formatDateTime(data.lastUpdated)}
      </div>
    </div>
  );
};

export default Dashboard;