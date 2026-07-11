import React, { useContext } from 'react';
import Card from '../components/Card';
import { AppContext } from '../context/AppContext';
import { Compass } from 'lucide-react';

export default function OrganizerHeatmap() {
  const { selectedStadium, heatmapData } = useContext(AppContext);
  const fallbackZones = selectedStadium?.zones || [];
  
  // Use live heatmap data if available, else fallback to stadium zones
  const zonesToRender = heatmapData.length > 0 ? heatmapData : fallbackZones;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Live Crowd Heatmap</h1>
      
      <Card className="h-[700px] relative bg-[#0f172a] border-gray-800 overflow-hidden flex items-center justify-center p-0">
        
        {selectedStadium ? (
           <img 
             src={`/assets/stadiums/${selectedStadium.id}/map.svg`} 
             alt={selectedStadium.name}
             className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" 
           />
         ) : (
            <div className="absolute w-[60%] h-[70%] border-2 border-green-500/30 rounded-[100px] flex items-center justify-center">
              <div className="w-[100px] h-[100px] border-2 border-green-500/30 rounded-full"></div>
              <div className="absolute w-full h-[2px] bg-green-500/30"></div>
            </div>
         )}

        {/* Dynamic Heatmap Zones */}
        {zonesToRender.map((zone, i) => {
          // Sync with FanMap coordinates or use mock generator
          const x = zone.x || (20 + (i * 15) % 60);
          const y = zone.y || (20 + (i * 20) % 60);
          const density = zone.density || 0;
          const status = density > 80 ? 'HIGH' : density > 50 ? 'MEDIUM' : 'LOW';
          
          let colorClass = 'bg-green-500';
          if (status === 'HIGH') colorClass = 'bg-red-500';
          else if (status === 'MEDIUM') colorClass = 'bg-yellow-500';

          return (
          <div
            key={i}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
            style={{ top: `${y}%`, left: `${x}%` }}
          >
            {/* Heat radius visual */}
            <div className={`absolute w-32 h-32 rounded-full ${colorClass} opacity-20 blur-xl animate-pulse pointer-events-none`}></div>
            
            <div className={`w-6 h-6 rounded-full ${colorClass} shadow-lg z-10 border-2 border-dark`}></div>
            <span className="bg-dark/90 px-2 py-1 rounded text-xs text-white border border-gray-700 whitespace-nowrap z-10 font-bold">
              {zone.zone || zone.name} ({density}%)
            </span>
          </div>
        )})}
      </Card>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <Card className="border-green-500/30 bg-green-500/5">
          <h3 className="text-green-500 font-bold text-xl mb-1">SAFE</h3>
          <p className="text-gray-400 text-sm">&lt; 50% Capacity</p>
        </Card>
        <Card className="border-yellow-500/30 bg-yellow-500/5">
          <h3 className="text-yellow-500 font-bold text-xl mb-1">MODERATE</h3>
          <p className="text-gray-400 text-sm">50% - 80% Capacity</p>
        </Card>
        <Card className="border-red-500/30 bg-red-500/5">
          <h3 className="text-red-500 font-bold text-xl mb-1">CONGESTED</h3>
          <p className="text-gray-400 text-sm">&gt; 80% Capacity</p>
        </Card>
      </div>
    </div>
  );
}
