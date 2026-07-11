import React, { useEffect, useState, useContext } from 'react';
import { Users, AlertTriangle, ShieldCheck, DoorOpen, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../components/Card';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function OrganizerDashboard() {
  const { selectedMatch, selectedStadium, heatmapData, recommendations, incidents } = useContext(AppContext);
  const [stats, setStats] = useState({ fansInside: 0, gateUtilization: "0%", parkingOccupancy: "0%", emergencyCases: 0, activeAlerts: 0 });

  useEffect(() => {
    // Initial fetch for dashboard static/initial metrics
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          Operations Center
          <span className="text-xs font-bold text-green-500 bg-green-500/20 px-2 py-1 rounded animate-pulse">● LIVE</span>
        </h1>
      </div>

      {/* SECTION 1 — Match Overview */}
      <Card className="border border-fifagold/20 bg-gradient-to-r from-[#0f172a] to-fifagold/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">Current Match</p>
            <h3 className="text-xl font-bold text-white">{selectedMatch?.homeTeam || 'Home'} vs {selectedMatch?.awayTeam || 'Away'}</h3>
          </div>
          <div className="text-center md:text-left border-l border-gray-700 pl-6">
            <p className="text-sm text-gray-400">Current Stadium</p>
            <h3 className="text-xl font-bold text-primary">{selectedStadium?.name || 'MetLife Stadium'}</h3>
          </div>
          <div className="text-center md:text-left border-l border-gray-700 pl-6">
            <p className="text-sm text-gray-400">Total Attendance</p>
            <h3 className="text-xl font-bold text-white">82,500 / {selectedStadium?.capacity || '82,500'}</h3>
          </div>
          <div className="text-center md:text-left border-l border-gray-700 pl-6">
            <p className="text-sm text-gray-400">Active Alerts</p>
            <h3 className="text-xl font-bold text-red-500">{stats.activeAlerts}</h3>
          </div>
        </div>
      </Card>

      {/* SECTION 2 — Operations Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="flex items-center gap-4">
          <div className="p-4 bg-primary/20 rounded-full text-primary"><Users size={32} /></div>
          <div><p className="text-gray-400 text-sm">Fans Inside</p><h3 className="text-2xl font-bold text-white">{stats.fansInside}</h3></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-4 bg-green-500/20 rounded-full text-green-500"><DoorOpen size={32} /></div>
          <div><p className="text-gray-400 text-sm">Gate Util.</p><h3 className="text-2xl font-bold text-white">{stats.gateUtilization}</h3></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-4 bg-yellow-500/20 rounded-full text-yellow-500"><Activity size={32} /></div>
          <div><p className="text-gray-400 text-sm">Parking Occ.</p><h3 className="text-2xl font-bold text-white">{stats.parkingOccupancy}</h3></div>
        </Card>
        <Card className="flex items-center gap-4 border border-red-500/30">
          <div className="p-4 bg-red-500/20 rounded-full text-red-500"><AlertTriangle size={32} /></div>
          <div><p className="text-gray-400 text-sm">Emergency Cases</p><h3 className="text-2xl font-bold text-red-500">{stats.emergencyCases}</h3></div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          
          {/* SECTION 3 — Crowd Status */}
          <Card title="Live Crowd Status">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {(heatmapData.length > 0 ? heatmapData : (selectedStadium?.zones || [])).map((zone, i) => {
                const density = zone.density || 0;
                const status = density > 80 ? 'HIGH' : density > 50 ? 'MEDIUM' : 'LOW';
                return (
                <div key={i} className="bg-[#1e293b] p-4 rounded-xl border border-gray-700">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-white">{zone.zone || zone.name}</span>
                    <span className={`font-bold ${status === 'HIGH' ? 'text-red-500' : status === 'MEDIUM' ? 'text-yellow-500' : 'text-green-500'}`}>
                      {status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className={`h-2 rounded-full ${status === 'HIGH' ? 'bg-red-500' : status === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${density || 10}%` }}></div>
                  </div>
                </div>
              )})}
            </div>
          </Card>

          {/* SECTION 4 — AI Recommendations */}
          <Card title={<div className="flex items-center gap-2">AI Decision Support <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Real-Time</span></div>}>
            <div className="space-y-4 mt-4 max-h-64 overflow-y-auto custom-scrollbar pr-2">
              {recommendations.length > 0 ? recommendations.map((rec, i) => (
                <div key={i} className="flex gap-3 bg-[#0f172a] border border-primary/30 p-4 rounded-xl items-start">
                  <BotMessageSquare className="text-primary mt-1 shrink-0" size={20} />
                  <p className="text-gray-200">{rec.message || rec}</p>
                </div>
              )) : (
                <div className="text-gray-500 italic text-center p-4">AI is monitoring crowd patterns...</div>
              )}
            </div>
          </Card>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* SECTION 5 — Incident Feed */}
          <Card title="Live Incident Feed" className="h-full">
            <div className="space-y-4 mt-4">
              {incidents.length > 0 ? incidents.map((inc, i) => (
                <div key={i} className="border-l-4 border-yellow-500 bg-[#1e293b] p-3 rounded-r-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-yellow-500">{inc.zone}</span>
                    <span className="text-xs text-gray-500">{new Date(inc.time).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-sm text-gray-300">{inc.desc || inc.message}</p>
                </div>
              )) : (
                <div className="flex flex-col items-center justify-center text-gray-500 p-8 h-48 border border-dashed border-gray-700 rounded-lg">
                  <CheckCircle size={32} className="mb-2 text-green-500 opacity-50" />
                  <p>No active incidents</p>
                </div>
              )}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
