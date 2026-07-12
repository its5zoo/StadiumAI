import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/Card';
import { AppContext } from '../context/AppContext';
import { AlertOctagon, CheckCircle, Clock, MapPin, Zap } from 'lucide-react';

const severityConfig = {
  HIGH: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)', label: 'HIGH' },
  MEDIUM: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', label: 'MEDIUM' },
  LOW: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', label: 'LOW' },
};

export default function OrganizerIncidents() {
  const { incidents } = useContext(AppContext);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)' }}>
          <AlertOctagon size={20} className="text-danger" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Incident Management</h1>
          <p className="text-xs text-muted">{incidents.length} active incident{incidents.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <Card title="Live Incident Feed">
        {incidents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <CheckCircle size={32} className="text-accent" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">All Clear</h3>
            <p className="text-sm text-muted">No active incidents. All zones are secure.</p>
          </div>
        ) : (
          <div className="space-y-3 mt-2">
            <AnimatePresence>
              {incidents.map((inc, i) => {
                const sev = severityConfig[inc.severity?.toUpperCase()] || severityConfig.MEDIUM;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="p-4 rounded-xl"
                    style={{ background: sev.bg, border: `1px solid ${sev.border}` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ background: sev.bg, color: sev.color, border: `1px solid ${sev.border}` }}>
                            {sev.label}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted">
                            <MapPin size={10} /> {inc.zone}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted">
                            <Clock size={10} /> {new Date(inc.time).toLocaleTimeString()}
                          </div>
                        </div>
                        <p className="text-sm text-white leading-relaxed">{inc.desc || inc.message}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-lg"
                          style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b', border: '1px solid rgba(255,255,255,0.08)' }}>
                          {inc.status || 'OPEN'}
                        </span>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                          <Zap size={12} /> Resolve
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </Card>
    </div>
  );
}
