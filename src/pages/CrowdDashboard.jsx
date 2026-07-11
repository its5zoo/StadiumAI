import React from 'react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import { crowdData } from '../mock/crowdData';

export default function CrowdDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Crowd Intelligence</h1>
      
      {/* Heatmap Placeholder */}
      <div className="bg-[#1e293b] rounded-xl border border-gray-700 p-8 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-24 h-24 border-4 border-dashed border-gray-600 rounded-lg flex items-center justify-center mb-4">
          Heatmap
        </div>
        <p className="text-gray-400">Live Stadium Heatmap Placeholder</p>
      </div>

      {/* Zone Cards */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Zone Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {crowdData.map((data, index) => (
          <Card key={index} className="flex flex-col justify-between h-full">
            <h3 className="font-semibold text-lg mb-2">{data.zone}</h3>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-400">Density</span>
              <StatusBadge status={data.density} />
            </div>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      <Card title="AI Recommendations" className="mt-8">
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            Route traffic from Gate B to Gate A to balance load.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            Deploy more staff to East Wing washrooms.
          </li>
        </ul>
      </Card>
    </div>
  );
}
