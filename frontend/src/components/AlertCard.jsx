import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function AlertCard({ title, message, type = "warning" }) {
  const bgColors = {
    warning: "bg-yellow-500/10 border-yellow-500/50 text-yellow-500",
    error: "bg-red-500/10 border-red-500/50 text-red-500",
    info: "bg-blue-500/10 border-blue-500/50 text-blue-500"
  };

  return (
    <div className={`p-4 rounded-lg border flex gap-3 items-start ${bgColors[type]}`}>
      <AlertCircle className="mt-0.5 shrink-0" size={20} />
      <div>
        <h4 className="font-semibold">{title}</h4>
        {message && <p className="text-sm opacity-90 mt-1">{message}</p>}
      </div>
    </div>
  );
}
