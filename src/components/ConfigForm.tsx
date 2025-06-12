import React, { useState } from 'react';
import { Settings } from 'lucide-react';

interface ConfigFormProps {
  ipAddress: string;
  onSave: (ipAddress: string) => void;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ ipAddress, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(ipAddress);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(inputValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        aria-label="Open configuration"
      >
        <Settings size={18} />
        <span>Configure</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-72 bg-slate-800 border border-slate-700 rounded-md shadow-xl p-4 z-10 animate-fade-in">
          <h3 className="text-white font-medium mb-3">API Configuration</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="ipAddress" className="block text-sm font-medium text-slate-300 mb-1">
                Orion Context Broker IP Address
              </label>
              <input
                type="text"
                id="ipAddress"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g., 192.168.1.100"
                className="w-full px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="mt-1 text-xs text-slate-400">
                Enter the IP address of your FIWARE Orion Context Broker
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1.5 text-sm text-slate-300 bg-slate-700 rounded-md hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ConfigForm;