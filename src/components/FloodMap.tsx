import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Region {
  name: string;
  lat: number;
  lng: number;
  risk: 'low' | 'medium' | 'high' | 'critical';
  temp: number;
  precip: number;
}

const regions: Region[] = [
  { name: 'Астана', lat: 51.1694, lng: 71.4491, risk: 'low', temp: 5, precip: 2.1 },
  { name: 'Алматы', lat: 43.2220, lng: 76.8512, risk: 'medium', temp: 12, precip: 15.3 },
  { name: 'Шымкент', lat: 42.3417, lng: 69.5901, risk: 'low', temp: 18, precip: 5.2 },
  { name: 'Караганда', lat: 49.8047, lng: 73.1094, risk: 'high', temp: 8, precip: 28.7 },
  { name: 'Актобе', lat: 50.2839, lng: 57.1670, risk: 'medium', temp: 10, precip: 12.4 },
  { name: 'Тараз', lat: 42.9000, lng: 71.3667, risk: 'critical', temp: 15, precip: 45.2 },
  { name: 'Павлодар', lat: 52.2873, lng: 76.9674, risk: 'medium', temp: 7, precip: 18.9 },
  { name: 'Усть-Каменогорск', lat: 49.9484, lng: 82.6283, risk: 'high', temp: 9, precip: 32.1 },
];

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'low': return '#22c55e';
    case 'medium': return '#eab308';
    case 'high': return '#ef4444';
    case 'critical': return '#dc2626';
    default: return '#94a3b8';
  }
};

const getRiskLabel = (risk: string) => {
  switch (risk) {
    case 'low': return 'Норма';
    case 'medium': return 'Внимание';
    case 'high': return 'Опасность';
    case 'critical': return 'Критично';
    default: return 'Неизвестно';
  }
};

function MapUpdater() {
  const map = useMap();
  
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  
  return null;
}

const FloodMap = () => {
  return (
    <MapContainer
      center={[48.0196, 66.9237]}
      zoom={5}
      style={{ height: '600px', width: '100%', borderRadius: '0.75rem' }}
      className="z-0"
    >
      <MapUpdater />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {regions.map((region, index) => (
        <CircleMarker
          key={index}
          center={[region.lat, region.lng]}
          radius={region.risk === 'critical' ? 20 : region.risk === 'high' ? 15 : region.risk === 'medium' ? 12 : 10}
          pathOptions={{
            fillColor: getRiskColor(region.risk),
            fillOpacity: 0.7,
            color: getRiskColor(region.risk),
            weight: 2,
          }}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-lg mb-2">{region.name}</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Уровень риска:</span>
                  <span className="font-semibold" style={{ color: getRiskColor(region.risk) }}>
                    {getRiskLabel(region.risk)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Температура:</span>
                  <span className="font-semibold">{region.temp}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Осадки:</span>
                  <span className="font-semibold">{region.precip} мм</span>
                </div>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default FloodMap;