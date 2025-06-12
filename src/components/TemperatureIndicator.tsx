import React from 'react';
import { Thermometer } from 'lucide-react';

interface TemperatureIndicatorProps {
  temperature: number;
}

const TemperatureIndicator: React.FC<TemperatureIndicatorProps> = ({ temperature }) => {
  // Determine temperature status
  const getStatus = () => {
    if (temperature < 70) return { color: 'text-blue-500', bg: 'bg-blue-500/20', status: 'Cold' };
    if (temperature < 90) return { color: 'text-green-500', bg: 'bg-green-500/20', status: 'Normal' };
    if (temperature < 110) return { color: 'text-yellow-500', bg: 'bg-yellow-500/20', status: 'Warning' };
    return { color: 'text-red-500', bg: 'bg-red-500/20', status: 'Critical' };
  };

  const { color, bg, status } = getStatus();

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg h-full">
      <div className="flex items-center gap-2 mb-3">
        <Thermometer className="text-blue-500" size={20} />
        <h2 className="text-white text-lg font-medium">Engine Temperature</h2>
      </div>
      
      <div className="flex flex-col items-center justify-center h-48">
        <div className="text-5xl font-bold text-white mb-2">
          {Math.round(temperature)}°C
        </div>
        
        <div className={`px-3 py-1 rounded-full ${bg} ${color} text-sm font-medium`}>
          {status}
        </div>
        
        <div className="w-full mt-6 bg-slate-700 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${Math.min(100, (temperature / 150) * 100)}%`,
              backgroundColor: temperature >= 110 ? '#ef4444' : temperature >= 90 ? '#f59e0b' : temperature >= 70 ? '#22c55e' : '#3b82f6'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TemperatureIndicator;