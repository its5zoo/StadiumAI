import React, { useContext } from 'react';
import Card from '../components/Card';
import { AppContext } from '../context/AppContext';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function OrganizerIncidents() {
  const { incidents } = useContext(AppContext);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
        <AlertCircle className="text-red-500" size={32} /> Incident Management
      </h1>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="pb-3 pl-4">Time</th>
                <th className="pb-3">Zone</th>
                <th className="pb-3">Severity</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incidents.length > 0 ? incidents.map((inc, i) => (
                <tr key={i} className="border-b border-gray-800 hover:bg-[#1e293b] transition-colors">
                  <td className="py-4 pl-4 text-gray-300">{new Date(inc.time).toLocaleTimeString()}</td>
                  <td className="py-4 font-bold text-white">{inc.zone}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${inc.severity === 'HIGH' ? 'bg-red-500/20 text-red-500' : inc.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>
                      {inc.severity}
                    </span>
                  </td>
                  <td className="py-4 text-gray-300 max-w-xs truncate">{inc.desc || inc.message}</td>
                  <td className="py-4 text-gray-400">{inc.status || 'OPEN'}</td>
                  <td className="py-4">
                    <button className="bg-green-500/10 text-green-500 hover:bg-green-500/20 px-3 py-1 rounded text-sm transition-colors border border-green-500/30">
                      Resolve
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    <CheckCircle size={48} className="mx-auto mb-4 text-green-500 opacity-20" />
                    No active incidents.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
