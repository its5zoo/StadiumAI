import React from 'react';

export default function StatusBadge({ status, text }) {
  const colors = {
    Low: "bg-green-500/20 text-green-400 border-green-500/30",
    Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    High: "bg-red-500/20 text-red-400 border-red-500/30",
    default: "bg-gray-500/20 text-gray-400 border-gray-500/30"
  };

  const badgeColor = colors[status] || colors.default;

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${badgeColor}`}>
      {text || status}
    </span>
  );
}
