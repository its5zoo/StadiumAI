import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { User, Shield, ArrowRight, Zap } from 'lucide-react';

export default function RoleSelection() {
  const { selectedMatch, selectedStadium } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedMatch && !localStorage.getItem('selectedMatch')) {
      navigate('/matches');
    }
  }, [selectedMatch, navigate]);

  const matchData = selectedMatch || (localStorage.getItem('selectedMatch') ? JSON.parse(localStorage.getItem('selectedMatch')) : null);

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Orbs */}
      <div className="orb orb-blue w-96 h-96 top-[-100px] right-[-100px] opacity-25" />
      <div className="orb orb-gold w-64 h-64 bottom-[-50px] left-[10%] opacity-15" />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {matchData && (
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#f59e0b' }}>
              <Zap size={14} />
              {matchData.homeTeam} vs {matchData.awayTeam}
              {matchData.city && <span className="text-muted">· {matchData.city}</span>}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Choose Your Role</h1>
          <p className="text-subtle text-lg max-w-md mx-auto">
            Each portal is tailored to give you the best match-day experience.
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fan Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => navigate('/login?role=FAN')}
            className="glass-card p-8 cursor-pointer group relative overflow-hidden"
            style={{ borderColor: 'rgba(59,130,246,0.1)' }}
          >
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 group-hover:opacity-10 transition-opacity"
              style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', transform: 'translate(50%, -50%)' }} />

            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-blue"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.2))', border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa' }}>
                <User size={40} />
              </div>

              <h2 className="text-3xl font-bold text-white mb-3">Fan Portal</h2>
              <p className="text-subtle mb-6 leading-relaxed">
                Navigate the stadium, locate your seat, find food & facilities, and get real-time AI assistance in your language.
              </p>

              <div className="space-y-2 mb-8">
                {['Smart stadium navigation', 'AI assistant & voice help', 'Live alerts & updates', 'Accessibility support'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-subtle">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                Enter as Fan <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Organizer Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => navigate('/login?role=ORGANIZER')}
            className="glass-card p-8 cursor-pointer group relative overflow-hidden"
            style={{ borderColor: 'rgba(245,158,11,0.1)' }}
          >
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 group-hover:opacity-10 transition-opacity"
              style={{ background: 'radial-gradient(circle, #f59e0b, transparent)', transform: 'translate(50%, -50%)' }} />

            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-gold"
                style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(251,191,36,0.2))', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}>
                <Shield size={40} />
              </div>

              <h2 className="text-3xl font-bold text-white mb-3">Organizer Portal</h2>
              <p className="text-subtle mb-6 leading-relaxed">
                Monitor crowd density, manage incidents, broadcast real-time messages, and make AI-powered decisions.
              </p>

              <div className="space-y-2 mb-8">
                {['Crowd density heatmaps', 'AI-powered recommendations', 'Incident management', 'Broadcast console'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-subtle">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-gold font-semibold group-hover:gap-3 transition-all">
                Enter as Organizer <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
