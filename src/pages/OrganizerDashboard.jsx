import React, { useEffect, useState } from 'react';
import { Users, AlertTriangle, ShieldCheck, DoorOpen } from 'lucide-react';
import Card from '../components/Card';
import socketService from '../services/socket.service';
import toast from 'react-hot-toast';

export default function OrganizerDashboard() {
  const [stats, setStats] = useState({ activeVolunteers: 0, openGates: 0, criticalAlerts: 0 });
  const [crowdData, setCrowdData] = useState([]);
  const [aiAnalysis, setAiAnalysis] = useState("Waiting for real-time updates...");
  
  useEffect(() => {
    // 1. Initial HTTP Data Fetch
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

    // 2. Connect WebSockets for live data
    const socket = socketService.connect();
    if (socket) {
      socket.on('crowd-update', (data) => {
        setCrowdData(data);
      });

      socket.on('recommendation-generated', (data) => {
        setAiAnalysis(data.message);
        toast("New AI Recommendation Generated", { icon: '💡' });
      });
    }

    // 3. Fallback polling for AI analysis if sockets fail
    const pollInterval = setInterval(async () => {
      if (socket && socket.connected) return; // Skip polling if socket is connected
      
      try {
        const token = localStorage.getItem('token');
        const aiRes = await fetch('http://localhost:5000/api/v1/ai/crowd-analysis', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const aiData = await aiRes.json();
        if (aiData.success) setAiAnalysis(aiData.data.analysis);
      } catch (err) {
        console.warn("Polling fallback failed.");
      }
    }, 15000);

    return () => {
      clearInterval(pollInterval);
      if (socket) {
        socket.off('crowd-update');
        socket.off('recommendation-generated');
      }
    };
  }, []);

  const handleBroadcast = async () => {
    try {
      const token = localStorage.getItem('token');
      const msg = prompt("Enter emergency broadcast message for all fans:");
      if (!msg) return;

      const res = await fetch('http://localhost:5000/api/v1/organizer/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: msg })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Broadcast sent to all fans");
      } else {
        toast.error("Broadcast failed: " + data.message);
      }
    } catch (e) {
      toast.error("Broadcast offline.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Organizer Dashboard <span className="text-sm font-normal text-green-500 ml-2 animate-pulse">● LIVE</span></h1>
        <button onClick={handleBroadcast} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-colors">
          Emergency Broadcast
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="flex items-center gap-4">
          <div className="p-4 bg-primary/20 rounded-full text-primary"><Users size={32} /></div>
          <div><p className="text-gray-400">Volunteers</p><h3 className="text-3xl font-bold text-white">{stats.activeVolunteers}</h3></div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="p-4 bg-green-500/20 rounded-full text-green-500"><DoorOpen size={32} /></div>
          <div><p className="text-gray-400">Open Gates</p><h3 className="text-3xl font-bold text-white">{stats.openGates}</h3></div>
        </Card>
        <Card className="flex items-center gap-4 border border-red-500/30">
          <div className="p-4 bg-red-500/20 rounded-full text-red-500"><AlertTriangle size={32} /></div>
          <div><p className="text-gray-400">Critical Alerts</p><h3 className="text-3xl font-bold text-red-500">{stats.criticalAlerts}</h3></div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Live Crowd Density">
          <div className="space-y-4 mt-4">
            {crowdData.length > 0 ? crowdData.map((zone, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{zone.zone}</span>
                  <span className={zone.status === 'HIGH' ? 'text-red-500 font-bold' : zone.status === 'MEDIUM' ? 'text-yellow-500' : 'text-green-500'}>{zone.status}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className={`h-2 rounded-full ${zone.status === 'HIGH' ? 'bg-red-500' : zone.status === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${zone.density}%` }}></div>
                </div>
              </div>
                ))
              ) : (
                <li className="text-gray-500 p-4 text-center">No active recommendations. System operating optimally.</li>
              )}
            </ul>
          </Card>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          <Card title="Active Alerts">
            <div className="space-y-3">
              {alerts.length > 0 ? (
                alerts.map((alert, i) => (
                  <AlertCard key={i} title={alert.title} message={alert.message} type="error" />
                ))
              ) : (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-center">
                  No active alerts.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
