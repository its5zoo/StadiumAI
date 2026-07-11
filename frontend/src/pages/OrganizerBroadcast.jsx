import React, { useState, useContext } from 'react';
import Card from '../components/Card';
import { Radio, Send } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

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
      if (data.success) {
        toast.success("Broadcast Dispatched successfully!");
        setMessage('');
      } else {
        toast.error("Failed to dispatch broadcast");
      }
    } catch (err) {
      toast.error("Network Error dispatching broadcast");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white flex items-center gap-2 mb-6">
        <Radio className="text-primary" size={32} /> Broadcast Center
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Compose Broadcast">
          <form onSubmit={handleSend} className="mt-4 space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Broadcast Type</label>
              <div className="flex gap-4">
                {['INFO', 'WARNING', 'EMERGENCY'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`px-4 py-2 rounded-lg font-bold border ${type === t ? (t === 'EMERGENCY' ? 'bg-red-500 text-white border-red-500' : t === 'WARNING' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-blue-500 text-white border-blue-500') : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Message</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="e.g. Gate 5 is overcrowded. Please use Gate 2."
                className="w-full bg-[#1e293b] border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-primary"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || !message}
              className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-xl disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
            >
              <Send size={20} /> {loading ? 'Dispatching...' : 'Dispatch Broadcast'}
            </button>
          </form>
        </Card>

        <Card title="Broadcast History" className="h-[500px] overflow-y-auto">
          <div className="space-y-4 mt-4">
            {broadcasts.length > 0 ? broadcasts.map((b, i) => (
              <div key={i} className="bg-[#1e293b] p-4 rounded-xl border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${b.type === 'EMERGENCY' ? 'bg-red-500/20 text-red-500' : b.type === 'WARNING' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-blue-500/20 text-blue-500'}`}>
                    {b.type}
                  </span>
                </div>
                <p className="text-white">{b.message}</p>
              </div>
            )) : <p className="text-gray-500 italic">No broadcasts sent yet.</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}
