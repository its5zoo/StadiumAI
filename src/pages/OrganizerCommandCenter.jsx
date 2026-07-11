import React, { useContext } from 'react';
import Card from '../components/Card';
import { AppContext } from '../context/AppContext';
import { ShieldAlert, BotMessageSquare, Activity, ShieldCheck, Radio } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OrganizerCommandCenter() {
  const { heatmapData, recommendations, incidents, broadcasts } = useContext(AppContext);

  const activateEmergencyMode = async () => {
    toast.error("EMERGENCY MODE ACTIVATED!", { duration: 5000, style: { padding: '16px', fontWeight: 'bold' }});
    // In a real app, this triggers a backend route which emits emergency broadcasts via sockets
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/v1/organizer/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ type: 'EMERGENCY', message: "EVACUATE STADIUM IMMEDIATELY. FOLLOW EXIT SIGNS." })
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="text-primary" size={32} /> Command Center
        </h1>
        <button 
          onClick={activateEmergencyMode}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-105 animate-pulse"
        >
          <ShieldAlert size={24} /> Emergency Mode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Crowd Feed */}
        <Card title="Live Crowd Feed" className="h-96 overflow-y-auto">
          <div className="space-y-4 mt-4">
            {heatmapData.length > 0 ? heatmapData.map((zone, i) => (
              <div key={i} className="flex justify-between items-center bg-[#1e293b] p-4 rounded-xl border border-gray-700">
                <span className="text-white font-bold">{zone.zone || zone.name}</span>
                <span className={`px-3 py-1 rounded font-bold text-xs ${zone.density > 80 ? 'bg-red-500/20 text-red-500' : zone.density > 50 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>
                  {zone.density > 80 ? 'HIGH' : zone.density > 50 ? 'MEDIUM' : 'LOW'} ({zone.density}%)
                </span>
              </div>
            )) : <div className="text-gray-500 p-4">No live data.</div>}
          </div>
        </Card>

        {/* AI Suggestions */}
        <Card title={<div className="flex items-center gap-2"><BotMessageSquare className="text-primary"/> AI Decision Support</div>} className="h-96 overflow-y-auto border-primary/30">
          <div className="space-y-4 mt-4">
             {recommendations.length > 0 ? recommendations.map((rec, i) => (
               <div key={i} className="bg-primary/10 border border-primary/30 p-4 rounded-xl">
                 <p className="text-white text-sm font-medium">{rec.message || rec}</p>
                 <div className="mt-4 flex gap-2">
                   <button className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                     Execute Action
                   </button>
                 </div>
               </div>
             )) : <div className="text-gray-500 p-4 text-center">AI is analyzing crowd patterns...</div>}
          </div>
        </Card>

        {/* Alerts / Incidents */}
        <Card title={<div className="flex items-center gap-2"><Activity className="text-yellow-500"/> Active Incidents</div>} className="h-96 overflow-y-auto">
          <div className="space-y-4 mt-4">
             {incidents.length > 0 ? incidents.map((inc, i) => (
               <div key={i} className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl">
                 <div className="flex justify-between mb-2">
                   <span className="font-bold text-yellow-500 text-sm">{inc.zone}</span>
                   <span className="text-xs text-gray-400">{new Date(inc.time).toLocaleTimeString()}</span>
                 </div>
                 <p className="text-white text-sm mb-3">{inc.desc || inc.message}</p>
                 <button className="text-xs bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700">Mark Resolved</button>
               </div>
             )) : <div className="text-gray-500 p-4">No active incidents.</div>}
          </div>
        </Card>

        {/* Broadcast Panel */}
        <Card title={<div className="flex items-center gap-2"><Radio className="text-blue-500"/> Broadcast History</div>} className="h-96 overflow-y-auto">
          <div className="space-y-4 mt-4">
             {broadcasts.length > 0 ? broadcasts.map((b, i) => (
               <div key={i} className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl">
                 <span className={`text-xs font-bold px-2 py-1 rounded mb-2 inline-block ${b.type === 'EMERGENCY' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                   {b.type}
                 </span>
                 <p className="text-gray-300 text-sm">{b.message}</p>
               </div>
             )) : <div className="text-gray-500 p-4">No broadcasts dispatched today.</div>}
          </div>
        </Card>

      </div>
    </div>
  );
}
