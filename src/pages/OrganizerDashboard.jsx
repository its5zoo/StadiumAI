import React from 'react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';
import AlertCard from '../components/AlertCard';
import { alerts } from '../mock/alerts';

export default function OrganizerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Organizer Dashboard</h1>
        <StatusBadge status="Low" text="System Normal" />
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <p className="text-gray-400 text-sm mb-1">Total Attendance</p>
          <p className="text-3xl font-bold text-white">68,402</p>
          <p className="text-green-400 text-xs mt-2">+2.4% from expected</p>
        </Card>
        <Card>
          <p className="text-gray-400 text-sm mb-1">Active Alerts</p>
          <p className="text-3xl font-bold text-yellow-500">{alerts.length}</p>
        </Card>
        <Card>
          <p className="text-gray-400 text-sm mb-1">AI Queries Handled</p>
          <p className="text-3xl font-bold text-primary">12,845</p>
          <p className="text-gray-500 text-xs mt-2">Past hour</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Crowd Overview">
            <div className="h-64 bg-[#0f172a] rounded-lg border border-gray-700 flex items-center justify-center">
              <span className="text-gray-500">Live Analytics Chart Placeholder</span>
            </div>
          </Card>
          
          <Card title="System Recommendations">
            <ul className="space-y-4">
              <li className="flex gap-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <h4 className="font-semibold text-primary">Optimize Staffing</h4>
                  <p className="text-sm text-gray-400 mt-1">Move 5 staff members from Gate C to Gate B due to predicted surge.</p>
                </div>
              </li>
            </ul>
          </Card>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          <Card title="Active Alerts">
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <AlertCard key={i} title={alert.title} type="warning" />
              ))}
              {alerts.length === 0 && <p className="text-sm text-gray-500">No active alerts.</p>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
