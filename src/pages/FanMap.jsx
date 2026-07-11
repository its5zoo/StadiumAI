import React, { useState } from 'react';
import { Compass, BotMessageSquare, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

export default function FanMap() {
  const navigate = useNavigate();
  const [activeZone, setActiveZone] = useState(null);
  const [routeAnalysis, setRouteAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const stadiumZones = [
    { id: 'gate-1', name: 'Gate 1 (North)', type: 'gate', color: 'bg-green-500', x: 50, y: 10 },
    { id: 'gate-4', name: 'Gate 4 (South)', type: 'gate', color: 'bg-yellow-500', x: 50, y: 90 },
    { id: 'gate-5', name: 'Gate 5 (West)', type: 'gate', color: 'bg-red-500', x: 10, y: 50 },
    { id: 'food-a', name: 'Food Court A', type: 'food', color: 'bg-blue-500', x: 30, y: 30 },
    { id: 'med-1', name: 'Medical Tent 1', type: 'medical', color: 'bg-fifagold', x: 70, y: 70 },
  ];

  const handleZoneClick = async (zone) => {
    setActiveZone(zone);
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      // We simulate asking the AI how to get to this zone
      const res = await fetch('http://localhost:5000/api/v1/ai/navigation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ query: `How do I reach ${zone.name} from my current location?` })
      });
      const data = await res.json();
      if (data.success) {
        setRouteAnalysis(data.data.response);
      } else {
        setRouteAnalysis("Unable to fetch route.");
      }
    } catch (err) {
      setRouteAnalysis("Network error fetching route.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Compass className="text-accent" size={32} /> Smart Map
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Map Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] relative bg-[#0f172a] border-gray-800 overflow-hidden flex items-center justify-center">
            {/* Mock Pitch */}
            <div className="absolute w-[60%] h-[70%] border-2 border-green-500/30 rounded-[100px] flex items-center justify-center">
              <div className="w-[100px] h-[100px] border-2 border-green-500/30 rounded-full"></div>
              <div className="absolute w-full h-[2px] bg-green-500/30"></div>
            </div>

            {/* Clickable Zones */}
            {stadiumZones.map(zone => (
              <button
                key={zone.id}
                onClick={() => handleZoneClick(zone)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 transition-transform hover:scale-110 ${activeZone?.id === zone.id ? 'scale-125' : ''}`}
                style={{ top: `${zone.y}%`, left: `${zone.x}%` }}
              >
                <div className={`w-6 h-6 rounded-full ${zone.color} shadow-lg shadow-${zone.color}/50 animate-pulse`}></div>
                <span className="bg-dark/80 px-2 py-1 rounded text-xs text-white border border-gray-700 whitespace-nowrap">
                  {zone.name}
                </span>
              </button>
            ))}
          </Card>
        </div>
        
        {/* Route Info Sidebar */}
        <div className="space-y-4">
          <Card title="AI Routing" className="border border-primary/20 bg-gradient-to-b from-dark to-primary/5 min-h-[300px]">
            {!activeZone ? (
              <div className="text-center text-gray-400 mt-10">
                <Compass size={48} className="mx-auto mb-4 opacity-50" />
                <p>Click any gate or facility on the map to get AI-generated route instructions.</p>
              </div>
            ) : (
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-2 text-xl font-bold text-white border-b border-gray-700 pb-2">
                  Target: <span className="text-primary">{activeZone.name}</span>
                </div>
                
                {loading ? (
                  <div className="flex gap-2 items-center text-gray-400">
                    <span className="animate-spin text-primary">⚽</span> Calculating optimal route...
                  </div>
                ) : (
                  <div className="bg-[#1e293b] p-4 rounded-xl border border-gray-700 text-gray-200 leading-relaxed">
                    <p className="flex items-start gap-2">
                      <BotMessageSquare className="text-primary shrink-0 mt-1" size={20} />
                      {routeAnalysis}
                    </p>
                  </div>
                )}
                
                <button 
                  onClick={() => navigate('/fan/assistant')}
                  className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors border border-gray-700"
                >
                  Need more help? Ask Assistant
                </button>
              </div>
            )}
          </Card>
          
          <Card title="Legend">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-300"><div className="w-3 h-3 rounded-full bg-green-500"></div> Entry Gates</div>
              <div className="flex items-center gap-2 text-sm text-gray-300"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Food Courts</div>
              <div className="flex items-center gap-2 text-sm text-gray-300"><div className="w-3 h-3 rounded-full bg-fifagold"></div> Medical Tents</div>
              <div className="flex items-center gap-2 text-sm text-gray-300"><div className="w-3 h-3 rounded-full bg-red-500"></div> Congested Areas</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
