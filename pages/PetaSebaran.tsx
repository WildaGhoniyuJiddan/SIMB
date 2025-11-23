import React, { useEffect, useRef } from 'react';
import GlassCard from '../components/GlassCard';
import { MapLocation } from '../types';

// Declare Leaflet global type manually since we are using CDN
declare global {
  interface Window {
    L: any;
  }
}

const locations: MapLocation[] = [
  { name: "Yogyakarta (Bantul)", lat: -7.95, lng: 110.32, type: "Prehistorical", details: "Jejak deposit tsunami purba." },
  { name: "Cilacap", lat: -7.72, lng: 109.02, type: "Historical", details: "Rawan tsunami selatan Jawa." },
  { name: "Pacitan", lat: -8.2, lng: 111.1, type: "Prehistorical", details: "Zona subduksi aktif." },
  { name: "Padang", lat: -0.95, lng: 100.35, type: "Historical", details: "Zona Megathrust Mentawai." },
  { name: "Banda Aceh", lat: 5.55, lng: 95.32, type: "Historical", details: "Episentrum Tsunami 2004." },
  { name: "Ambon", lat: -3.7, lng: 128.2, type: "Prehistorical", details: "Sejarah tsunami Maluku." },
  { name: "Palu", lat: -0.89, lng: 119.87, type: "Historical", details: "Tsunami 2018 akibat longsoran." },
  { name: "Selat Sunda", lat: -6.10, lng: 105.42, type: "Historical", details: "Tsunami Vulkanik 2018." }
];

const PetaSebaran: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current && window.L) {
      // Initialize Map
      const map = window.L.map(mapContainer.current).setView([-2.5, 118], 5);
      
      // Add Dark Tile Layer for better aesthetic match
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Add Markers
      locations.forEach((loc) => {
        const color = loc.type === "Prehistorical" ? "#f43f5e" : "#38bdf8";
        
        const circle = window.L.circleMarker([loc.lat, loc.lng], {
          radius: 8,
          fillColor: color,
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(map);

        circle.bindPopup(`
          <div style="font-family: sans-serif; min-width: 150px;">
            <h3 style="font-weight: bold; color: #0f172a; margin-bottom: 4px;">${loc.name}</h3>
            <span style="background: ${color}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; text-transform: uppercase;">${loc.type}</span>
            <p style="font-size: 12px; color: #475569; margin-top: 8px;">${loc.details}</p>
          </div>
        `);
      });

      mapInstance.current = map;
    }

    return () => {
        // Cleanup if necessary, though simpler in this setup to leave it unless component unmounts fully
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Peta Persebaran</h1>
        <p className="text-slate-400">Titik rawan dan sejarah tsunami di Indonesia.</p>
      </div>

      <GlassCard className="flex-1 p-0 overflow-hidden border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
        <div ref={mapContainer} className="w-full h-[600px] z-10" />
      </GlassCard>

      <div className="flex gap-4 mt-6 justify-center">
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400 border border-white"></span>
            <span className="text-sm text-slate-300">Historical (Modern)</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 border border-white"></span>
            <span className="text-sm text-slate-300">Prehistorical (Purba)</span>
        </div>
      </div>
    </div>
  );
};

export default PetaSebaran;