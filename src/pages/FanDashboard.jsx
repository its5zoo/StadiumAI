import React, { useContext } from 'react';
import Card from '../components/Card';
import AlertCard from '../components/AlertCard';
import StatusBadge from '../components/StatusBadge';
import { AppContext } from '../context/AppContext';
import { getDensityStatus } from '../mock/crowdSimulation';

export default function FanDashboard() {
  const { alerts, crowdData } = useContext(AppContext);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Fan Dashboard</h1>
      
      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert, i) => (
            <AlertCard key={i} title={alert.title} message={alert.message} type="warning" />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="AI Navigation">
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">Find your way around the stadium easily.</p>
            <button className="w-full bg-primary hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
              Start Navigation
            </button>
          </div>
        </Card>

        <Card title="Crowd Status">
          <div className="space-y-4">
            {crowdData.slice(0, 3).map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{item.zone}</span>
                <StatusBadge status={getDensityStatus(item.density)} text={`${item.density}%`} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Translator">
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">Need help communicating?</p>
            <button className="w-full bg-[#334155] hover:bg-[#475569] text-white py-2 rounded-lg transition-colors border border-gray-600">
              Open Translator
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
