import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Fuel } from 'lucide-react';

Chart.register(...registerables);

interface FuelGaugeProps {
  fuelLevel: number;
}

const FuelGauge: React.FC<FuelGaugeProps> = ({ fuelLevel }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Ensure fuel level is within 0-100 range
  const normalizedFuelLevel = Math.max(0, Math.min(100, fuelLevel));

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Define colors based on fuel level
    let color = '#22c55e'; // Green
    if (normalizedFuelLevel <= 20) {
      color = '#ef4444'; // Red
    } else if (normalizedFuelLevel <= 40) {
      color = '#f59e0b'; // Yellow
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [normalizedFuelLevel, 100 - normalizedFuelLevel],
            backgroundColor: [
              color,
              'rgba(22, 27, 34, 0.6)',
            ],
            borderWidth: 0,
            circumference: 180,
            rotation: 270,
          },
        ],
      },
      options: {
        cutout: '75%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        animation: {
          duration: 500,
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [normalizedFuelLevel]);

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg h-full">
      <div className="flex items-center gap-2 mb-3">
        <Fuel className="text-blue-500" size={20} />
        <h2 className="text-white text-lg font-medium">Fuel Level</h2>
      </div>
      <div className="relative h-48">
        <canvas ref={chartRef} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">{Math.round(normalizedFuelLevel)}</span>
          <span className="text-slate-400 text-sm">%</span>
        </div>
      </div>
    </div>
  );
};

export default FuelGauge;