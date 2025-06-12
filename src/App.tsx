import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { Car } from 'lucide-react';

function App() {
  const [ipAddress, setIpAddress] = useState<string>('');

  // Load saved IP address from localStorage on initial render
  useEffect(() => {
    const savedIpAddress = localStorage.getItem('orionIpAddress');
    if (savedIpAddress) {
      setIpAddress(savedIpAddress);
    }
  }, []);

  // Save IP address to localStorage when it changes
  const handleIpAddressChange = (newIpAddress: string) => {
    setIpAddress(newIpAddress);
    localStorage.setItem('orionIpAddress', newIpAddress);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 mb-6">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center gap-3">
            <Car size={24} className="text-blue-500" />
            <h1 className="text-xl font-bold">Smart Car Digital Twin</h1>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main>
        <Dashboard ipAddress={ipAddress} onIpAddressChange={handleIpAddressChange} />
      </main>
      
      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <p className="text-slate-500 text-sm text-center">
            Smart Car Digital Twin Dashboard - Built by Amine Bouazzi 
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;