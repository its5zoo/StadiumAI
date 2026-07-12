import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, BotMessageSquare, MapPin, Zap, Navigation, DoorOpen, Coffee, HeartPulse, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const zoneTypeConfig = {
  ENTRY_GATE: { icon: <DoorOpen size={14} />, defaultColor: '#10b981' },
  FOOD: { icon: <Coffee size={14} />, defaultColor: '#f59e0b' },
  MEDICAL: { icon: <HeartPulse size={14} />, defaultColor: '#3b82f6' },
  gate: { icon: <DoorOpen size={14} />, defaultColor: '#10b981' },
  food: { icon: <Coffee size={14} />, defaultColor: '#f59e0b' },
  medical: { icon: <HeartPulse size={14} />, defaultColor: '#3b82f6' },
};

const statusColors = {
  HIGH: '#ef4444',
  MODERATE: '#f59e0b',
  MEDIUM: '#f59e0b',
  LOW: '#10b981',
};

export default function FanMap() {
  const navigate = useNavigate();
  const { selectedStadium, selectedLanguage } = useContext(AppContext);
  const [activeZone, setActiveZone] = useState(null);
  const [routeAnalysis, setRouteAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const fallbackZones = [
    { id: 'gate-1', name: 'Gate 1 (North)',   type: 'ENTRY_GATE', status: 'LOW',      x: 50, y: 8  },
    { id: 'gate-4', name: 'Gate 4 (South)',   type: 'ENTRY_GATE', status: 'MODERATE', x: 50, y: 88 },
    { id: 'gate-5', name: 'Gate 5 (West)',    type: 'ENTRY_GATE', status: 'HIGH',     x: 8,  y: 50 },
    { id: 'food-a', name: 'Food Court A',     type: 'FOOD',       status: 'MODERATE', x: 28, y: 28 },
    { id: 'food-b', name: 'Food Court B',     type: 'FOOD',       status: 'LOW',      x: 72, y: 28 },
    { id: 'med-1',  name: 'Medical Tent 1',   type: 'MEDICAL',    status: 'LOW',      x: 72, y: 72 },
  ];

  const zonesToRender = selectedStadium?.zones?.length > 0
    ? selectedStadium.zones.map((z, i) => ({
        ...z,
        x: z.x || (20 + (i * 15) % 65),
        y: z.y || (20 + (i * 20) % 65),
      }))
    : fallbackZones;

  const handleZoneClick = async (zone) => {
    setActiveZone(zone);
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/v1/ai/voice/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          text: `How do I reach ${zone.name} from my current location?`,
          userLanguage: selectedLanguage,
          stadiumId: selectedStadium?.id,
        })
      });
      const data = await res.json();
      setRouteAnalysis(data.success ? data.data.response : "Unable to fetch route.");
    } catch (err) {
      setRouteAnalysis("Network error fetching route.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(59,130,246,0.25))', border: '1px solid rgba(16,185,129,0.3)' }}>
            <Compass size={20} className="text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Smart Stadium Map</h1>
            <p className="text-xs text-muted">{selectedStadium?.name || 'Select a match to view stadium'} · {zonesToRender.length} zones</p>
          </div>
        </div>
        <button onClick={() => navigate('/fan/assistant')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 4px 15px rgba(59,130,246,0.3)' }}>
          <Zap size={16} /> AI Route Help
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <div className="glass-card p-0 overflow-hidden" style={{ height: '580px', position: 'relative' }}>
            {/* Stadium background graphic */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(16,185,129,0.04), transparent)' }} />

            {/* Stadium outline SVG */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              {/* Outer oval */}
              <ellipse cx="200" cy="200" rx="180" ry="160" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="2" strokeDasharray="8 4" />
              {/* Inner field */}
              <ellipse cx="200" cy="200" rx="120" ry="100" fill="rgba(16,185,129,0.04)" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
              {/* Center circle */}
              <circle cx="200" cy="200" r="30" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
              {/* Center dot */}
              <circle cx="200" cy="200" r="4" fill="rgba(16,185,129,0.3)" />
              {/* Center line */}
              <line x1="80" y1="200" x2="320" y2="200" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
              {/* Penalty boxes */}
              <rect x="160" y="100" width="80" height="40" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="1" />
              <rect x="160" y="260" width="80" height="40" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="1" />
            </svg>

            {/* Zone dots */}
            {zonesToRender.map((zone, i) => {
              const statusColor = statusColors[zone.status?.toUpperCase()] || '#10b981';
              const typeConf = zoneTypeConfig[zone.type] || { icon: <MapPin size={14} />, defaultColor: '#3b82f6' };
              const isActive = activeZone?.id === zone.id;

              return (
                <motion.button
                  key={zone.id || i}
                  onClick={() => handleZoneClick(zone)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.2 }}
                  className="absolute flex flex-col items-center gap-1.5 z-10"
                  style={{ top: `${zone.y}%`, left: `${zone.x}%`, transform: 'translate(-50%, -50%)' }}
                >
                  {/* Heat aura */}
                  <div className="absolute w-10 h-10 rounded-full animate-ping-slow"
                    style={{ background: `${statusColor}30`, transform: 'scale(2)' }} />

                  {/* Dot */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${isActive ? 'scale-125' : ''}`}
                    style={{
                      background: `${statusColor}20`,
                      border: `2px solid ${statusColor}`,
                      color: statusColor,
                      boxShadow: isActive ? `0 0 20px ${statusColor}60` : `0 0 8px ${statusColor}30`,
                    }}>
                    {typeConf.icon}
                  </div>

                  {/* Label */}
                  <div className="px-2 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap"
                    style={{ background: 'rgba(2,8,23,0.9)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', backdropFilter: 'blur(8px)' }}>
                    {zone.name}
                  </div>
                </motion.button>
              );
            })}

            {/* Map label */}
            <div className="absolute bottom-4 left-4 text-xs text-muted">
              {selectedStadium?.name || 'MetLife Stadium'} · Tap zones to get route
            </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-4">
          {/* Route Info */}
          <Card title="AI Route Guide" glow="blue">
            <div className="mt-2 min-h-40">
              <AnimatePresence mode="wait">
                {!activeZone ? (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-8 text-center">
                    <Navigation size={36} className="text-muted mb-3 opacity-40" />
                    <p className="text-sm text-muted">Tap any zone on the map to get AI-powered route instructions</p>
                  </motion.div>
                ) : (
                  <motion.div key="route" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                    <div className="flex items-center gap-2 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <MapPin size={16} className="text-primary shrink-0" />
                      <span className="font-semibold text-white text-sm">{activeZone.name}</span>
                    </div>

                    {loading ? (
                      <div className="flex items-center gap-3 py-4">
                        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin shrink-0" />
                        <p className="text-sm text-muted">Calculating optimal route...</p>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl text-sm text-subtle leading-relaxed"
                        style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.12)' }}>
                        <div className="flex gap-2">
                          <BotMessageSquare size={16} className="text-primary mt-0.5 shrink-0" />
                          <p>{routeAnalysis}</p>
                        </div>
                      </div>
                    )}

                    <button onClick={() => navigate('/fan/assistant')}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all text-white"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      More Help → AI Assistant
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>

          {/* Legend */}
          <Card title="Map Legend">
            <div className="space-y-2 mt-2">
              {[
                { color: '#10b981', label: 'Entry Gates', icon: <DoorOpen size={14} /> },
                { color: '#f59e0b', label: 'Food Courts', icon: <Coffee size={14} /> },
                { color: '#3b82f6', label: 'Medical Tents', icon: <HeartPulse size={14} /> },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-subtle">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
                    {item.icon}
                  </div>
                  {item.label}
                </div>
              ))}
              <div className="pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs text-subtle mb-2 font-semibold">Crowd Status</p>
                {[
                  { color: '#10b981', label: 'Low — Safe' },
                  { color: '#f59e0b', label: 'Moderate — Busy' },
                  { color: '#ef4444', label: 'High — Crowded' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-subtle mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
