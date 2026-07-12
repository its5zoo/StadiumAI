import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { AppContext } from '../context/AppContext';
import { TrendingUp, Activity, AlertTriangle } from 'lucide-react';

const statusColors = {
  HIGH: { color: '#ef4444', bg: 'rgba(239,68,68,0.15)', label: 'CONGESTED' },
  MODERATE: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', label: 'MODERATE' },
  MEDIUM: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', label: 'MODERATE' },
  LOW: { color: '#10b981', bg: 'rgba(16,185,129,0.15)', label: 'SAFE' },
};

export default function OrganizerHeatmap() {
  const { selectedStadium, heatmapData } = useContext(AppContext);
  const fallbackZones = selectedStadium?.zones || [];
  const zonesToRender = heatmapData.length > 0 ? heatmapData : fallbackZones;

  const zonePositions = zonesToRender.map((z, i) => ({
    ...z,
    x: z.x || (15 + (i * 18) % 70),
    y: z.y || (15 + (i * 22) % 70),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(245,158,11,0.2))', border: '1px solid rgba(239,68,68,0.3)' }}>
          <Activity size={20} className="text-danger" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Live Crowd Heatmap</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-accent font-semibold">Real-time data</span>
          </div>
        </div>
      </div>

      {/* Heatmap Canvas */}
      <div className="glass-card p-0 overflow-hidden relative" style={{ height: '600px' }}>
        {/* Background gradient */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.03), transparent)' }} />

        {/* Stadium SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="300" cy="300" rx="270" ry="230" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="10 5" />
          <ellipse cx="300" cy="300" rx="190" ry="155" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" strokeWidth="1.5" />
          <line x1="110" y1="300" x2="490" y2="300" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <circle cx="300" cy="300" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx="300" cy="300" r="5" fill="rgba(255,255,255,0.2)" />
          <rect x="240" y="145" width="120" height="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <rect x="240" y="405" width="120" height="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        </svg>

        {/* Heat zones */}
        {zonePositions.map((zone, i) => {
          const density = zone.density || 0;
          const statusKey = zone.status?.toUpperCase() || (density > 80 ? 'HIGH' : density > 50 ? 'MODERATE' : 'LOW');
          const { color, bg } = statusColors[statusKey] || statusColors.LOW;
          const pct = density > 0 ? density : (statusKey === 'HIGH' ? 82 : statusKey === 'MODERATE' ? 55 : 28);

          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="absolute flex flex-col items-center gap-1"
              style={{ top: `${zone.y}%`, left: `${zone.x}%`, transform: 'translate(-50%, -50%)' }}
            >
              {/* Pulsing heat blob */}
              <div className="absolute rounded-full pointer-events-none"
                style={{ width: `${Math.max(60, pct)}px`, height: `${Math.max(60, pct)}px`, background: `radial-gradient(circle, ${color}40, ${color}08)`, filter: 'blur(20px)', transform: 'translate(-50%,-50%)', top: '50%', left: '50%' }} />

              {/* Center indicator */}
              <div className="w-8 h-8 rounded-xl border-2 flex items-center justify-center z-10"
                style={{ background: bg, borderColor: color, boxShadow: `0 0 15px ${color}50` }}>
                <AlertTriangle size={14} style={{ color }} />
              </div>

              {/* Label */}
              <div className="px-2 py-1 rounded-lg text-[9px] font-bold whitespace-nowrap z-10"
                style={{ background: 'rgba(2,8,23,0.92)', border: `1px solid ${color}40`, color }}>
                {zone.zone || zone.name} · {pct}%
              </div>
            </motion.div>
          );
        })}

        {/* Legend overlay */}
        <div className="absolute bottom-4 right-4 glass-card p-3 space-y-1.5">
          {[
            { color: '#10b981', label: 'Safe < 50%' },
            { color: '#f59e0b', label: 'Moderate 50-80%' },
            { color: '#ef4444', label: 'Congested > 80%' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-subtle">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Safe Zones', color: '#10b981', key: 'LOW', count: zonesToRender.filter(z => !z.status || z.status === 'LOW').length },
          { label: 'Moderate Zones', color: '#f59e0b', key: 'MODERATE', count: zonesToRender.filter(z => z.status === 'MODERATE' || z.status === 'MEDIUM').length },
          { label: 'Congested Zones', color: '#ef4444', key: 'HIGH', count: zonesToRender.filter(z => z.status === 'HIGH').length },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="glass-card p-5 text-center"
            style={{ borderColor: `${item.color}25`, background: `${item.color}05` }}
          >
            <p className="text-3xl font-black mb-1" style={{ color: item.color }}>{item.count}</p>
            <p className="text-sm text-subtle">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
