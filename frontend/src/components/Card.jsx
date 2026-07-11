import React from 'react';

export default function Card({ title, children, className = "" }) {
  return (
    <div className={`bg-[#1e293b] rounded-xl border border-gray-700 p-5 ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2">{title}</h3>}
      <div>{children}</div>
    </div>
  );
}
