import React, { useContext } from 'react';
import Card from '../components/Card';
import { BarChart2, TrendingUp, Users, Radio, BrainCircuit } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function OrganizerAnalytics() {
  const { heatmapData, recommendations, broadcasts } = useContext(AppContext);

  // Mock calculations
  const totalDensity = heatmapData.reduce((acc, z) => acc + (z.density || 0), 0);
  const avgOccupancy = heatmapData.length > 0 ? Math.round(totalDensity / heatmapData.length) : 0;
  
  let mostCrowded = { name: 'N/A', density: 0 };
  heatmapData.forEach(z => {
    if ((z.density || 0) > mostCrowded.density) {
      mostCrowded = { name: z.zone, density: z.density };
    }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
        <BarChart2 className="text-primary" size={32} /> Analytics Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center gap-4">
          <div className="p-4 bg-red-500/20 rounded-full text-red-500"><TrendingUp size={24} /></div>
          <div>
            <p className="text-gray-400 text-xs">Most Crowded Zone</p>
            <h3 className="text-xl font-bold text-white truncate max-w-[120px]">{mostCrowded.name}</h3>
          </div>
        </Card>
        
        <Card className="flex items-center gap-4">
          <div className="p-4 bg-blue-500/20 rounded-full text-blue-500"><Users size={24} /></div>
          <div>
            <p className="text-gray-400 text-xs">Avg Occupancy</p>
            <h3 className="text-xl font-bold text-white">{avgOccupancy}%</h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-4 bg-primary/20 rounded-full text-primary"><BrainCircuit size={24} /></div>
          <div>
            <p className="text-gray-400 text-xs">AI Actions Taken</p>
            <h3 className="text-xl font-bold text-white">{recommendations.length}</h3>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-4 bg-fifagold/20 rounded-full text-fifagold"><Radio size={24} /></div>
          <div>
            <p className="text-gray-400 text-xs">Broadcasts Sent</p>
            <h3 className="text-xl font-bold text-white">{broadcasts.length}</h3>
          </div>
        </Card>
      </div>

      <Card title="Traffic Trends (Simulated)" className="h-96">
        <div className="h-full flex items-end justify-between px-4 pb-12 pt-8 gap-2 opacity-70">
           {/* Mock Bar Chart */}
           {[40, 45, 60, 55, 70, 85, 90, 80, 65, 50, 40, 30].map((val, i) => (
             <div key={i} className="w-full bg-primary/30 hover:bg-primary/60 transition-colors rounded-t relative group flex flex-col justify-end" style={{ height: `${val}%` }}>
               <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100">{val}%</span>
             </div>
           ))}
        </div>
      </Card>
    </div>
  );
}
