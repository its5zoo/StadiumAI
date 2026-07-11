import React, { useEffect, useState, useContext } from 'react';
import { Compass, BotMessageSquare, Globe, Accessibility, AlertTriangle, MapPin, Coffee, Phone, Mic, Bell, CloudRain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import socketService from '../services/socket.service';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function FanDashboard() {
  const navigate = useNavigate();
  const { selectedMatch, selectedStadium, selectedLanguage, isListening, setIsListening, broadcasts } = useContext(AppContext);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/alerts');
        const data = await res.json();
        if (data.success) {
          setAlerts(data.data);
        }
      } catch (e) {
        console.error("Failed to fetch alerts", e);
      }
    };
    fetchAlerts();

    const socket = socketService.connect();
    if (socket) {
      socket.on('emergency-broadcast', (data) => {
        toast((t) => (
          <div className="flex flex-col gap-2">
            <span className="font-bold text-red-500">🚨 EMERGENCY BROADCAST</span>
            <span>{data.message}</span>
            <button 
              onClick={() => toast.dismiss(t.id)} 
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm w-full"
            >
              Acknowledge
            </button>
          </div>
        ), { duration: 30000, style: { border: '2px solid red', backgroundColor: '#1e293b', color: '#fff' } });
        
        setAlerts(prev => [{ id: Date.now(), message: data.message, time: "Just now", type: "error" }, ...prev]);
      });
    }

    return () => {
      if (socket) {
        socket.off('emergency-broadcast');
      }
    };
  }, []);

  const triggerVoice = () => {
    // Toggling the global voice assistant state.
    // In a real app, this might trigger the exact same logic as the Navbar mic button.
    setIsListening(true);
    toast("Listening... Speak your query.", { icon: '🎤' });
    // Simulate stopping after a bit for demo purposes if speech recognition is handled in navbar
    setTimeout(() => setIsListening(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Fan Dashboard</h1>
        <button 
          onClick={triggerVoice}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${isListening ? 'bg-red-500 animate-pulse text-white' : 'bg-primary hover:bg-blue-600 text-white shadow-lg shadow-primary/20'}`}
        >
          <Mic size={20} />
          {isListening ? 'Listening...' : 'Ask AI'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Today's Match Card */}
          <Card className="border border-primary/20 bg-gradient-to-br from-[#1e293b] to-primary/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Compass size={120} />
            </div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-primary font-bold tracking-wider text-sm uppercase">{selectedMatch?.tournamentPhase || 'Group Stage'}</p>
                <h2 className="text-2xl font-bold text-white mt-1">{selectedStadium?.name || 'MetLife Stadium'}</h2>
              </div>
              <div className="flex items-center gap-2 text-gray-400 bg-black/20 px-3 py-1.5 rounded-full text-sm border border-gray-700">
                <CloudRain size={16} className="text-blue-400" />
                <span>72°F Light Rain</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 bg-black/20 p-6 rounded-2xl border border-gray-800/50 backdrop-blur-sm">
              <div className="text-center w-1/3">
                <h3 className="text-3xl font-black text-white">{selectedMatch?.homeTeam || 'USA'}</h3>
                <p className="text-sm text-gray-400 mt-1">Home</p>
              </div>
              <div className="text-center w-1/3 flex flex-col items-center">
                <p className="text-xs text-fifagold font-bold mb-2 uppercase tracking-widest">VS</p>
                <div className="bg-primary/20 text-primary border border-primary/30 px-4 py-2 rounded-lg font-mono font-bold">
                  {selectedMatch?.kickoff ? new Date(selectedMatch.kickoff).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '20:00 EST'}
                </div>
              </div>
              <div className="text-center w-1/3">
                <h3 className="text-3xl font-black text-white">{selectedMatch?.awayTeam || 'BRA'}</h3>
                <p className="text-sm text-gray-400 mt-1">Away</p>
              </div>
            </div>
          </Card>

          {/* Section 2: Quick Actions */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button onClick={() => navigate('/fan/map')} className="bg-[#1e293b] p-4 rounded-xl border border-gray-700 hover:border-primary hover:bg-gray-800 transition-all flex flex-col items-center justify-center gap-3 group">
                <div className="bg-blue-500/20 p-3 rounded-full text-blue-400 group-hover:scale-110 transition-transform">
                  <Compass size={24} />
                </div>
                <span className="text-sm font-medium text-gray-300">Find Seat</span>
              </button>
              <button onClick={() => navigate('/fan/assistant')} className="bg-[#1e293b] p-4 rounded-xl border border-gray-700 hover:border-primary hover:bg-gray-800 transition-all flex flex-col items-center justify-center gap-3 group">
                <div className="bg-green-500/20 p-3 rounded-full text-green-400 group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <span className="text-sm font-medium text-gray-300">Nearest Washroom</span>
              </button>
              <button onClick={() => navigate('/fan/assistant')} className="bg-[#1e293b] p-4 rounded-xl border border-gray-700 hover:border-primary hover:bg-gray-800 transition-all flex flex-col items-center justify-center gap-3 group">
                <div className="bg-orange-500/20 p-3 rounded-full text-orange-400 group-hover:scale-110 transition-transform">
                  <Coffee size={24} />
                </div>
                <span className="text-sm font-medium text-gray-300">Food Nearby</span>
              </button>
              <button onClick={() => toast("Contacting Medical Team...", {icon:'🚑'})} className="bg-[#1e293b] p-4 rounded-xl border border-red-500/30 hover:border-red-500 hover:bg-red-500/10 transition-all flex flex-col items-center justify-center gap-3 group">
                <div className="bg-red-500/20 p-3 rounded-full text-red-500 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <span className="text-sm font-medium text-red-400">Emergency</span>
              </button>
            </div>
          </div>

        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Section 3: Mini Stadium Map */}
          <Card title="Live Mini Map" className="cursor-pointer hover:border-primary transition-colors" onClick={() => navigate('/fan/map')}>
            <div className="mt-4 bg-black/40 rounded-xl border border-gray-800 p-4 aspect-square flex items-center justify-center relative overflow-hidden group">
               {selectedStadium ? (
                 <img 
                   src={`/assets/stadiums/${selectedStadium.id}/map.svg`} 
                   alt={selectedStadium.name}
                   className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity" 
                 />
               ) : (
                 <div className="text-gray-500 text-sm">No stadium loaded</div>
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent pointer-events-none" />
               <div className="absolute bottom-4 left-4 text-xs font-bold text-primary bg-primary/20 px-2 py-1 rounded border border-primary/30">
                 Tap to open Interactive Map
               </div>
            </div>
          </Card>

          {/* Section 4: Live Alerts Feed */}
          <Card title="Live Alerts Feed" className="border border-red-500/20">
            <div className="space-y-4 mt-4 h-64 overflow-y-auto">
              {broadcasts.length > 0 ? broadcasts.map((alert, i) => (
                <div key={i} className="flex gap-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertTriangle className="text-red-500 shrink-0" />
                  <div>
                    <p className="text-white text-sm">{alert.message}</p>
                    <p className="text-gray-400 text-xs mt-1">Just now • {alert.type}</p>
                  </div>
                </div>
              )) : alerts.map((alert, i) => (
                <div key={i} className="flex gap-4 p-3 bg-[#1e293b] rounded-lg">
                  <AlertTriangle className={alert.type === 'warning' ? 'text-yellow-500 shrink-0' : 'text-blue-500 shrink-0'} />
                  <div>
                    <p className="text-white text-sm">{alert.message}</p>
                    <p className="text-gray-400 text-xs mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
