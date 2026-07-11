import React, { useContext } from 'react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { AppContext } from '../context/AppContext';
import { getDensityStatus } from '../mock/crowdSimulation';

export default function CrowdDashboard() {
  const { crowdData, recommendations } = useContext(AppContext);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Crowd Intelligence</h1>
      
      {/* Heatmap Placeholder */}
      <div className="bg-[#1e293b] rounded-xl border border-gray-700 p-8 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-900 to-red-900 mix-blend-overlay"></div>
        <div className="w-24 h-24 border-4 border-dashed border-gray-600 rounded-lg flex items-center justify-center mb-4 z-10">
          Heatmap
        </div>
        <p className="text-gray-400 z-10">Live Stadium Heatmap Placeholder</p>
        <p className="text-xs text-gray-500 mt-2 z-10">Updates every 10 seconds</p>
      </div>

      {/* Zone Cards */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Live Zone Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {crowdData.map((data, index) => (
          <Card key={index} className="flex flex-col justify-between h-full transition-colors duration-500">
            <h3 className="font-semibold text-lg mb-2">{data.zone}</h3>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-400">Density</span>
              <StatusBadge status={getDensityStatus(data.density)} text={`${data.density}%`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      <Card title="AI Recommendations" className="mt-8">
        <ul className="space-y-3 text-gray-300">
          {recommendations.length > 0 ? (
            recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-accent">•</span>
                {rec}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No active recommendations.</li>
          )}
        </ul>
      </Card>
    </div>
  );
}
