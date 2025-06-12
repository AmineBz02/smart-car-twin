import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import { GeoPoint } from '../types/VehicleData';

interface LocationMapProps {
  gpsLocation: GeoPoint | null;
}

// Custom component to update map view when coordinates change
const MapUpdater: React.FC<{center: LatLngExpression}> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const LocationMap: React.FC<LocationMapProps> = ({ gpsLocation }) => {
  const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09]);

  useEffect(() => {
    if (gpsLocation && gpsLocation.coordinates) {
      // Convert from [longitude, latitude] to [latitude, longitude] for Leaflet
      setPosition([gpsLocation.coordinates[1], gpsLocation.coordinates[0]]);
    }
  }, [gpsLocation]);

  // Custom icon for the marker
  const carIcon = new Icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-lg h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="text-blue-500" size={20} />
        <h2 className="text-white text-lg font-medium">GPS Location</h2>
      </div>
      
      <div className="flex-1 rounded-md overflow-hidden">
        {gpsLocation ? (
          <MapContainer 
            center={position} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={carIcon} />
            <MapUpdater center={position} />
          </MapContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-slate-700 text-slate-400">
            No GPS data available
          </div>
        )}
      </div>
      
      {gpsLocation && (
        <div className="mt-2 text-center text-sm text-slate-400">
          Coordinates: {gpsLocation.coordinates[1].toFixed(6)}, {gpsLocation.coordinates[0].toFixed(6)}
        </div>
      )}
    </div>
  );
};

export default LocationMap;