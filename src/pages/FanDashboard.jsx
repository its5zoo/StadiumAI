import React, { useEffect, useState, useContext } from 'react';
import { Compass, BotMessageSquare, Globe, Accessibility, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import socketService from '../services/socket.service';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function FanDashboard() {
  const navigate = useNavigate();
  const { selectedMatch, selectedStadium } = useContext(AppContext);
  const [crowdData, setCrowdData] = useState([]);

  useEffect(() => {
    // If we have selectedStadium, initialize crowdData based on its zones
    if (selectedStadium && selectedStadium.zones) {
      setCrowdData(selectedStadium.zones.map(z => ({
        zone: z.name,
        density: Math.floor(Math.random() * 100), // Mock dynamic density for now
        status: z.status
      })));
    }
  }, [selectedStadium]);

  useEffect(() => {
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
      });

      socket.on('crowd-update', (data) => {
        // Here we could filter crowd-update by stadiumId in a real app
        setCrowdData(data);
      });
    }

    return () => {
      if (socket) {
        socket.off('emergency-broadcast');
        socket.off('crowd-update');
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Fan Hub <span className="text-sm font-normal text-green-500 ml-2 animate-pulse">● LIVE</span></h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="🏟 Match Information" className="border border-primary/20 bg-gradient-to-r from-dark to-primary/10">
            <div className="flex justify-between items-center mt-4">
              <div className="text-center">
                <p className="text-sm text-gray-400">Home</p>
                <h3 className="text-2xl font-bold text-white">{selectedMatch?.homeTeam || 'USA'}</h3>
              </div>
              <div className="text-center px-4">
                <p className="text-xs text-fifagold font-bold mb-1">VS</p>
                <p className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">
                  {selectedMatch?.kickoff ? new Date(selectedMatch.kickoff).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '20:00 EST'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Away</p>
                <h3 className="text-2xl font-bold text-white">{selectedMatch?.awayTeam || 'BRA'}</h3>
              </div>
            </div>
            <p className="text-center text-sm text-gray-400 mt-4 pt-4 border-t border-gray-700">
              {selectedStadium?.name || 'MetLife Stadium'} • {selectedMatch?.tournamentPhase || 'Group Stage'}
            </p>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => navigate('/fan/assistant')} 
              className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-center gap-3"
            >
              <div className="bg-primary/20 p-4 rounded-full text-primary">
                <BotMessageSquare size={32} />
              </div>
              <span className="font-bold text-white">Ask MatchDay AI</span>
            </div>
            
            <div 
              onClick={() => navigate('/fan/map')} 
              className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 cursor-pointer hover:border-accent transition-colors flex flex-col items-center justify-center gap-3"
            >
              <div className="bg-accent/20 p-4 rounded-full text-accent">
                <Compass size={32} />
              </div>
              <span className="font-bold text-white">Smart Map</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => navigate('/fan/assistant')} 
              className="bg-[#1e293b] p-4 rounded-xl border border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors flex items-center gap-4"
            >
              <Globe className="text-blue-400" />
              <span className="text-white">Translate</span>
            </div>
            
            <div 
              onClick={() => navigate('/fan/assistant')} 
              className="bg-[#1e293b] p-4 rounded-xl border border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors flex items-center gap-4"
            >
              <Accessibility className="text-fifagold" />
              <span className="text-white">Accessibility</span>
            </div>
          </div>
        </div>
        
        {/* Sidebar Status Area */}
        <div className="space-y-6">
          <Card title="Live Stadium Status">
            <div className="space-y-4 mt-4">
              {crowdData.map((zone, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{zone.zone}</span>
                    <span className={zone.status === 'HIGH' ? 'text-red-500 font-bold' : zone.status === 'MEDIUM' ? 'text-yellow-500' : 'text-green-500'}>{zone.status}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${zone.status === 'HIGH' ? 'bg-red-500' : zone.status === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${zone.density}%` }}></div>
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
