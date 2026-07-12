import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle, DoorOpen, Activity, CheckCircle, BotMessageSquare, AlertOctagon, TrendingUp, Radio, ShieldCheck } from 'lucide-react';
import Card from '../components/Card';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MetricCard = ({ icon, label, value, color, glow, trend }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="glass-card p-5 relative overflow-hidden"
    style={{ borderColor: `${color}20` }}
  >
    <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 pointer-events-none"
      style={{ background: `radial-gradient(circle, ${color}, transparent)`, transform: 'translate(30%, -30%)' }} />
    <div className="flex items-start justify-between mb-4">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: `${color}15`, color, border: `1px solid ${color}25`, boxShadow: `0 0 15px ${color}30` }}>
        {icon}
      </div>
      {trend !== undefined && (
        <span className="text-xs font-medium" style={{ color: trend >= 0 ? '#10b981' : '#ef4444' }}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <p className="text-muted text-xs uppercase tracking-wider mb-1">{label}</p>
    <p className="text-2xl font-black text-white">{value}</p>
  </motion.div>
);

const DensityBar = ({ name, density, status }) => {
  const color = status === 'HIGH' ? '#ef4444' : status === 'MEDIUM' || status === 'MODERATE' ? '#f59e0b' : '#10b981';
  const pct = density > 0 ? density : (status === 'HIGH' ? 85 : status === 'MODERATE' ? 55 : 25);
  return (
    <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>{status}</span>
      </div>
      <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-1.5 rounded-full"
          style={{ background: `linear-gradient(to right, ${color}88, ${color})`, boxShadow: `0 0 8px ${color}50` }}
        />
      </div>
      <p className="text-right text-xs text-muted mt-1">{pct}% capacity</p>
    </div>
  );
};

export default function OrganizerDashboard() {
  const { selectedMatch, selectedStadium, heatmapData, recommendations, incidents } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({ fansInside: 0, gateUtilization: "0%", parkingOccupancy: "0%", emergencyCases: 0, activeAlerts: 0 });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/v1/organizer/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) setStats(data.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };
    fetchDashboard();
  }, []);

  const zoneData = heatmapData.length > 0 ? heatmapData : (selectedStadium?.zones || []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-muted text-sm mb-1">Operations Center · {user?.name || 'Organizer'}</p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-white">Mission Control</h1>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              LIVE
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/organizer/broadcast')} className="btn-gold flex items-center gap-2 text-dark text-sm font-bold">
            <Radio size={16} /> Broadcast
          </button>
          <button onClick={() => navigate('/organizer/heatmap')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <TrendingUp size={16} /> Heatmap
          </button>
        </div>
      </div>

      {/* Match Overview Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 md:p-6"
        style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(59,130,246,0.06))', borderColor: 'rgba(245,158,11,0.1)' }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Current Match', value: `${selectedMatch?.homeTeam || 'Home'} vs ${selectedMatch?.awayTeam || 'Away'}`, color: 'white' },
            { label: 'Venue', value: selectedStadium?.name || 'MetLife Stadium', color: '#3b82f6' },
            { label: 'Total Attendance', value: '82,500 / 82,500', color: 'white' },
            { label: 'Active Alerts', value: stats.activeAlerts, color: stats.activeAlerts > 0 ? '#ef4444' : '#10b981' },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-xs text-muted uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-lg font-bold" style={{ color: item.color }}>{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={<Users size={20} />} label="Fans Inside" value={stats.fansInside} color="#3b82f6" trend={5} />
        <MetricCard icon={<DoorOpen size={20} />} label="Gate Utilization" value={stats.gateUtilization} color="#10b981" trend={2} />
        <MetricCard icon={<Activity size={20} />} label="Parking Occ." value={stats.parkingOccupancy} color="#f59e0b" />
        <MetricCard icon={<AlertTriangle size={20} />} label="Emergency Cases" value={stats.emergencyCases} color="#ef4444" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Crowd + AI Recs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Crowd Status */}
          <Card title="Live Crowd Density">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {zoneData.length > 0 ? zoneData.map((zone, i) => {
                const density = zone.density || 0;
                const status = zone.status || (density > 80 ? 'HIGH' : density > 50 ? 'MODERATE' : 'LOW');
                return (
                  <DensityBar key={i} name={zone.zone || zone.name} density={density} status={status?.toUpperCase()} />
                );
              }) : (
                <div className="col-span-2 text-center py-8">
                  <Activity size={32} className="text-muted mx-auto mb-2 opacity-40" />
                  <p className="text-sm text-muted">Waiting for real-time crowd data...</p>
                </div>
              )}
            </div>
          </Card>

          {/* AI Recommendations */}
          <Card title={
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-subtle">
              <BotMessageSquare size={14} className="text-primary" />
              AI Decision Support
              <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}>Real-Time</span>
            </div>
          }>
            <div className="space-y-3 mt-2 max-h-64 overflow-y-auto scrollbar-hide">
              {recommendations.length > 0 ? recommendations.map((rec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-3 p-3 rounded-xl"
                  style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.12)' }}
                >
                  <BotMessageSquare className="text-primary mt-0.5 shrink-0" size={16} />
                  <p className="text-sm text-subtle leading-relaxed">{rec.message || rec}</p>
                </motion.div>
              )) : (
                <div className="text-center py-6">
                  <ShieldCheck size={28} className="text-primary mx-auto mb-2 opacity-60" />
                  <p className="text-sm text-muted">AI is monitoring crowd patterns...</p>
                  <p className="text-xs text-muted mt-1">Recommendations appear here in real-time</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right: Incidents */}
        <div className="space-y-6">
          <Card title="Live Incident Feed" glow="red">
            <div className="space-y-3 mt-2">
              {incidents.length > 0 ? incidents.map((inc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 rounded-xl"
                  style={{ borderLeft: '3px solid #f59e0b', background: 'rgba(245,158,11,0.05)' }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gold">{inc.zone}</span>
                    <span className="text-[10px] text-muted">{new Date(inc.time).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-sm text-subtle leading-relaxed">{inc.desc || inc.message}</p>
                </motion.div>
              )) : (
                <div className="flex flex-col items-center justify-center py-10">
                  <CheckCircle size={36} className="text-accent mb-3 opacity-60" />
                  <p className="text-sm text-muted">No active incidents</p>
                  <p className="text-xs text-muted mt-1">All zones are secure</p>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Heatmap', icon: <TrendingUp size={16} />, path: '/organizer/heatmap', color: '#3b82f6' },
              { label: 'Incidents', icon: <AlertOctagon size={16} />, path: '/organizer/incidents', color: '#ef4444' },
              { label: 'Broadcast', icon: <Radio size={16} />, path: '/organizer/broadcast', color: '#f59e0b' },
              { label: 'Analytics', icon: <Activity size={16} />, path: '/organizer/analytics', color: '#10b981' },
            ].map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ y: -2 }}
                onClick={() => navigate(item.path)}
                className="glass-card p-3 text-left flex items-center gap-2 text-xs font-semibold transition-all"
                style={{ color: item.color, borderColor: `${item.color}20` }}
              >
                {item.icon} {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
