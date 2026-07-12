import React from 'react';

export default function Card({ children, className = '', title, onClick, glow }) {
  const glowClass = glow === 'gold' ? 'hover:shadow-glow-gold hover:border-yellow-500/30'
    : glow === 'green' ? 'hover:shadow-glow-green hover:border-accent/30'
    : glow === 'purple' ? 'hover:shadow-glow-purple hover:border-purple/30'
    : glow === 'red' ? 'hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:border-danger/30'
    : 'hover:shadow-glow-blue hover:border-primary/30';

  return (
    <div
      onClick={onClick}
      className={`glass-card p-6 ${glowClass} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {title && (
        <div className="mb-4">
          {typeof title === 'string' ? (
            <h3 className="text-sm font-semibold text-subtle uppercase tracking-wider flex items-center gap-2">
              {title}
            </h3>
          ) : title}
        </div>
      )}
      {children}
    </div>
  );
}
