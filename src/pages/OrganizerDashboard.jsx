import React, { useContext } from 'react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import AlertCard from '../components/AlertCard';
import { AppContext } from '../context/AppContext';

export default function OrganizerDashboard() {
  const { alerts, recommendations, crowdData } = useContext(AppContext);
  const totalAttendance = 68402; // Static for mock
  
  // Calculate average density
  const avgDensity = Math.round(crowdData.reduce((acc, curr) => acc + curr.density, 0) / crowdData.length);
  const systemStatus = avgDensity > 70 ? "High" : avgDensity > 30 ? "Medium" : "Low";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Organizer Dashboard</h1>
        <StatusBadge status={systemStatus} text={`System ${systemStatus}`} />
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <p className="text-gray-400 text-sm mb-1">Total Attendance</p>
          <p className="text-3xl font-bold text-white">{totalAttendance.toLocaleString()}</p>
          <p className="text-green-400 text-xs mt-2">+2.4% from expected</p>
        </Card>
        <Card>
          <p className="text-gray-400 text-sm mb-1">Active Alerts</p>
          <p className={`text-3xl font-bold ${alerts.length > 0 ? 'text-red-500' : 'text-green-500'}`}>
            {alerts.length}
          </p>
        </Card>
        <Card>
          <p className="text-gray-400 text-sm mb-1">Avg Stadium Density</p>
          <p className="text-3xl font-bold text-primary">{avgDensity}%</p>
          <p className="text-gray-500 text-xs mt-2">Live update</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Crowd Overview">
            <div className="h-64 bg-[#0f172a] rounded-lg border border-gray-700 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              <div className="flex items-end gap-2 h-32 px-4 w-full">
                {/* Fake chart bars based on live data */}
                {crowdData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end items-center group">
                    <div 
                      className={`w-full max-w-[40px] rounded-t transition-all duration-500 ${data.density > 70 ? 'bg-red-500' : data.density > 30 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ height: `${data.density}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-2 rotate-45 origin-left truncate w-full">{data.zone}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          <Card title="System Recommendations">
            <ul className="space-y-4">
              {recommendations.length > 0 ? (
                recommendations.map((rec, i) => (
                  <li key={i} className="flex gap-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-primary">System Action</h4>
                      <p className="text-sm text-gray-400 mt-1">{rec}</p>
                    </div>
                  </li>
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
