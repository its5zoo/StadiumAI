import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/Card';
import { Radio, Send, AlertTriangle, Info, AlertOctagon, CheckCircle, Clock } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const broadcastTypes = [
  { id: 'INFO',      label: 'Info',      icon: <Info size={16} />,          color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)' },
  { id: 'WARNING',   label: 'Warning',   icon: <AlertTriangle size={16} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.3)' },
  { id: 'EMERGENCY', label: 'Emergency', icon: <AlertOctagon size={16} />,  color: '#ef4444', bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.3)' },
];

export default function OrganizerBroadcast() {
  const { broadcasts } = useContext(AppContext);
  const [type, setType] = useState('INFO');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/v1/organizer/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ type, message })
      });
      const data = await res.json();
      if (data.success) { toast.success("Broadcast dispatched!"); setMessage(''); }
      else toast.error("Failed to dispatch broadcast");
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const selectedType = broadcastTypes.find(t => t.id === type);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.25))', border: '1px solid rgba(59,130,246,0.3)' }}>
          <Radio size={20} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Broadcast Center</h1>
          <p className="text-xs text-muted">Dispatch messages to all fans in real-time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compose */}
        <Card title="Compose Broadcast">
          <form onSubmit={handleSend} className="space-y-5 mt-2">
            {/* Type selector */}
            <div>
              <label className="section-title mb-3 block">Broadcast Type</label>
              <div className="flex gap-2">
                {broadcastTypes.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setType(t.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all"
                    style={type === t.id
                      ? { background: t.bg, color: t.color, border: `1px solid ${t.border}`, boxShadow: `0 0 15px ${t.color}30` }
                      : { background: 'rgba(255,255,255,0.03)', color: '#64748b', border: '1px solid rgba(255,255,255,0.07)' }
                    }
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Alert preview */}
            {selectedType && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
                style={{ background: selectedType.bg, border: `1px solid ${selectedType.border}`, color: selectedType.color }}>
                {selectedType.icon}
                <span>This will be sent as a <strong>{type}</strong> broadcast to all fans</span>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="section-title mb-3 block">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="e.g. Gate 5 is overcrowded. Please use Gate 2 or Gate 3 to exit."
                className="input-premium resize-none"
              />
              <p className="text-right text-xs text-muted mt-1">{message.length} / 280</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading || !message}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white disabled:opacity-50 transition-all"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 4px 20px rgba(59,130,246,0.3)' }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Send size={18} /> Dispatch Broadcast</>
              )}
            </motion.button>
          </form>
        </Card>

        {/* History */}
        <Card title="Broadcast History">
          <div className="space-y-3 mt-2 max-h-96 overflow-y-auto scrollbar-hide">
            <AnimatePresence>
              {broadcasts.length > 0 ? broadcasts.map((b, i) => {
                const typeConf = broadcastTypes.find(t => t.id === b.type) || broadcastTypes[0];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 rounded-xl"
                    style={{ background: typeConf.bg, border: `1px solid ${typeConf.border}` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: typeConf.color }}>
                        {typeConf.icon} {b.type}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <Clock size={10} /> Just now
                      </div>
                    </div>
                    <p className="text-sm text-white">{b.message}</p>
                  </motion.div>
                );
              }) : (
                <div className="text-center py-10">
                  <Radio size={36} className="text-muted mx-auto mb-3 opacity-30" />
                  <p className="text-sm text-muted">No broadcasts sent yet</p>
                  <p className="text-xs text-muted mt-1">Compose and dispatch your first message</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </div>
  );
}
