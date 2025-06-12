import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Gauge } from 'lucide-react';

Chart.register(...registerables);

interface SpeedometerProps {
  speed: number;
}

const Speedometer: React.FC<SpeedometerProps> = ({ speed }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [speed, 220 - speed], // Assuming max speed is 220 km/h
            backgroundColor: [
              speed > 180 ? '#ef4444' : speed > 120 ? '#f59e0b' : '#22c55e',
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
  }, [speed]);

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg h-full">
      <div className="flex items-center gap-2 mb-3">
        <Gauge className="text-blue-500" size={20} />
        <h2 className="text-white text-lg font-medium">Speed</h2>
      </div>
      <div className="relative h-48">
        <canvas ref={chartRef} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white">{Math.round(speed)}</span>
          <span className="text-slate-400 text-sm">km/h</span>
        </div>
      </div>
    </div>
  );
};

export default Speedometer;