import React, { useEffect, useState } from 'react';
import { ShieldAlert, Compass, Users } from 'lucide-react';
import Card from '../components/Card';
import ChatBox from '../components/ChatBox';
import socketService from '../services/socket.service';
import toast from 'react-hot-toast';

export default function FanDashboard() {
  const [crowdData, setCrowdData] = useState([
    { zone: "Gate A", density: 40, status: "LOW" },
    { zone: "Gate B", density: 30, status: "LOW" },
    { zone: "Gate 6", density: 60, status: "MEDIUM" },
    { zone: "Main Concourse", density: 50, status: "MEDIUM" }
  ]);

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
    }

    return () => {
      if (socket) {
        socket.off('emergency-broadcast');
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Fan Hub <span className="text-sm font-normal text-green-500 ml-2 animate-pulse">● LIVE</span></h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChatBox />
        </div>
        
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
