import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Compass, BotMessageSquare, AlertTriangle, MapPin, Coffee, Phone, Mic, CloudRain, Navigation, Bell, Wifi } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import socketService from '../services/socket.service';
import { AppContext } from '../context/AppContext';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function FanDashboard() {
  const navigate = useNavigate();
  const { selectedMatch, selectedStadium, isListening, setIsListening, broadcasts } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/alerts');
        const data = await res.json();
        if (data.success) setAlerts(data.data);
      } catch (e) { console.error("Failed to fetch alerts", e); }
    };
    fetchAlerts();

    const socket = socketService.connect();
    if (socket) {
      socket.on('emergency-broadcast', (data) => {
        toast((t) => (
          <div className="flex flex-col gap-2">
            <span className="font-bold text-red-500">🚨 EMERGENCY BROADCAST</span>
            <span>{data.message}</span>
            <button onClick={() => toast.dismiss(t.id)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm w-full">Acknowledge</button>
          </div>
        ), { duration: 30000, style: { border: '2px solid red', backgroundColor: '#0a1628', color: '#fff' } });
        setAlerts(prev => [{ id: Date.now(), message: data.message, time: "Just now", type: "error" }, ...prev]);
      });
    }
    return () => { if (socket) socket.off('emergency-broadcast'); };
  }, []);

  const triggerVoice = () => {
    setIsListening(true);
    toast("Listening... Speak your query.", { icon: '🎤' });
    setTimeout(() => setIsListening(false), 3000);
  };

  const kickoffTime = selectedMatch?.kickoff ? new Date(selectedMatch.kickoff) : null;

  const quickActions = [
    { icon: <Compass size={24} />, label: 'Find Seat', color: '#3b82f6', onClick: () => navigate('/fan/map') },
    { icon: <Navigation size={24} />, label: 'Washroom', color: '#10b981', onClick: () => navigate('/fan/assistant') },
    { icon: <Coffee size={24} />, label: 'Food Court', color: '#f59e0b', onClick: () => navigate('/fan/assistant') },
    { icon: <Phone size={24} />, label: 'Emergency', color: '#ef4444', onClick: () => toast('Contacting Medical Team...', { icon: '🚑' }) },
    { icon: <BotMessageSquare size={24} />, label: 'AI Help', color: '#8b5cf6', onClick: () => navigate('/fan/assistant') },
    { icon: <MapPin size={24} />, label: 'Parking', color: '#06b6d4', onClick: () => navigate('/fan/map') },
    { icon: <Wifi size={24} />, label: 'WiFi Info', color: '#a3e635', onClick: () => toast('Stadium WiFi: Matchday_Guest', { icon: '📶' }) },
    { icon: <Bell size={24} />, label: 'Alerts', color: '#fb923c', onClick: () => toast('No new alerts', { icon: '🔔' }) },
  ];

  const allAlerts = [...broadcasts.map(b => ({ ...b, source: 'live' })), ...alerts];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-muted text-sm mb-1">Welcome back, {user?.name || 'Fan'} 👋</p>
          <h1 className="text-3xl font-black text-white">Fan Dashboard</h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={triggerVoice}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            isListening
              ? 'bg-danger/20 text-danger border border-danger/30 animate-pulse'
              : 'text-white'
          }`}
          style={!isListening ? { background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', boxShadow: '0 4px 20px rgba(59,130,246,0.3)' } : {}}
        >
          <Mic size={18} />
          {isListening ? 'Listening...' : 'Ask AI'}
        </motion.button>
      </div>

      {/* Match Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 md:p-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))' }}
      >
        {/* Decorative blob */}
        <div className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', transform: 'translate(40%, -40%)' }} />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                {selectedMatch?.tournamentPhase || 'Group Stage'}
              </p>
              <h2 className="text-2xl font-bold text-white mb-1">{selectedStadium?.name || 'MetLife Stadium'}</h2>
              <p className="text-sm text-muted">{selectedMatch?.city || 'New York/New Jersey'}</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl self-start"
              style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}>
              <CloudRain size={16} className="text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">72°F · Light Rain</span>
            </div>
          </div>

          {/* Score display */}
          <div className="glass-card p-6 md:p-8" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <div className="flex items-center justify-between">
              <div className="flex-1 text-center">
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  {selectedMatch?.homeTeam || 'Home'}
                </h3>
                <p className="text-xs text-muted uppercase tracking-wider mt-2">Home</p>
              </div>
              <div className="flex flex-col items-center px-6">
                <span className="text-gold font-black text-2xl tracking-widest mb-2">VS</span>
                {kickoffTime && (
                  <div className="px-3 py-1.5 rounded-lg text-center" style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)' }}>
                    <p className="text-xs text-muted">Kickoff</p>
                    <p className="text-sm font-bold text-primary font-mono">
                      {kickoffTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex-1 text-center">
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  {selectedMatch?.awayTeam || 'Away'}
                </h3>
                <p className="text-xs text-muted uppercase tracking-wider mt-2">Away</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Quick Actions + Map */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="grid grid-cols-4 gap-3 mt-2">
              {quickActions.map((action, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={action.onClick}
                  className="flex flex-col items-center gap-2.5 p-3 rounded-xl transition-all group"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                    style={{ background: `${action.color}15`, color: action.color, border: `1px solid ${action.color}25` }}>
                    {action.icon}
                  </div>
                  <span className="text-[11px] font-medium text-subtle text-center leading-tight">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </Card>

          {/* Mini Map */}
          <Card title="Interactive Stadium Map" onClick={() => navigate('/fan/map')} glow="blue">
            <div className="mt-2 rounded-xl overflow-hidden relative aspect-[16/9]"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {selectedStadium ? (
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* Placeholder stadium visual */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-48 h-32 rounded-2xl border-4 border-primary" style={{ borderStyle: 'dashed' }} />
                  </div>
                  <div className="text-center z-10">
                    <MapPin size={32} className="text-primary mx-auto mb-2" />
                    <p className="text-white font-semibold">{selectedStadium.name}</p>
                    <p className="text-xs text-muted mt-1">{selectedStadium.zones?.length || 0} zones mapped</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-muted text-sm">Select a match to view stadium map</p>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-3 flex justify-between items-center"
                style={{ background: 'linear-gradient(to top, rgba(2,8,23,0.9), transparent)' }}>
                <span className="text-xs text-primary font-semibold">Tap to open Interactive Map →</span>
                <span className="text-xs text-muted">Live zones</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Alerts */}
        <div className="space-y-6">
          {/* Live Alerts */}
          <Card title="Live Alerts" glow="red">
            <div className="space-y-3 mt-2 max-h-96 overflow-y-auto scrollbar-hide">
              {allAlerts.length > 0 ? (
                allAlerts.map((alert, i) => {
                  const isEmergency = alert.type === 'error' || alert.type === 'EMERGENCY';
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-3 p-3 rounded-xl"
                      style={{
                        background: isEmergency ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isEmergency ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)'}`,
                      }}
                    >
                      <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color: isEmergency ? '#ef4444' : '#f59e0b' }} />
                      <div>
                        <p className="text-xs text-white leading-relaxed">{alert.message}</p>
                        <p className="text-[10px] text-muted mt-1">{alert.time || 'Just now'}</p>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <Bell size={28} className="text-muted mx-auto mb-2 opacity-40" />
                  <p className="text-sm text-muted">All clear — no active alerts</p>
                </div>
              )}
            </div>
          </Card>

          {/* AI Quick Help */}
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => navigate('/fan/assistant')}
            className="glass-card p-5 cursor-pointer group"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.1))', borderColor: 'rgba(139,92,246,0.2)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(139,92,246,0.2)', color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.3)' }}>
                <BotMessageSquare size={20} />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">AI Stadium Assistant</p>
                <p className="text-xs text-muted">Powered by Gemini</p>
              </div>
            </div>
            <p className="text-xs text-subtle mb-4 leading-relaxed">Ask anything about the stadium, seating, food, or transport. Available in 50+ languages.</p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-purple group-hover:gap-2.5 transition-all">
              Open Chat Assistant →
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
