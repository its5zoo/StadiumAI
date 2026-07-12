import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { Calendar, MapPin, Clock, ChevronRight, Loader2, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';

const SkeletonCard = () => (
  <div className="glass-card p-6 space-y-4">
    <div className="flex justify-between">
      <div className="skeleton h-5 w-28 rounded" />
      <div className="skeleton h-5 w-20 rounded" />
    </div>
    <div className="flex justify-between items-center py-4">
      <div className="skeleton h-8 w-24 rounded" />
      <div className="skeleton h-6 w-8 rounded" />
      <div className="skeleton h-8 w-24 rounded" />
    </div>
    <div className="skeleton h-4 w-36 rounded" />
  </div>
);

export default function MatchSelection() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState(null);
  const { setSelectedMatch, setSelectedStadium } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => { fetchMatches(); }, []);

  const fetchMatches = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/matches');
      const data = await res.json();
      if (data.success) setMatches(data.data);
      else toast.error("Failed to load matches");
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleMatchSelect = async (match) => {
    console.log("Match clicked:", match);
    setSelecting(match.id);
    setSelectedMatch(match);
    try {
      console.log(`Fetching stadium: http://localhost:5000/api/v1/stadiums/${match.stadiumId}`);
      const res = await fetch(`http://localhost:5000/api/v1/stadiums/${match.stadiumId}`);
      const data = await res.json();
      console.log("Stadium API response:", data);
      if (data.success) {
        setSelectedStadium(data.data);
        setTimeout(() => navigate('/select-role'), 100);
      } else {
        toast.error("Failed to load stadium details");
      }
    } catch (err) {
      console.error("Network error:", err);
      toast.error("Network error loading stadium");
    } finally {
      setSelecting(null);
    }
  };

  const phaseColors = {
    'QUARTER FINALS': { bg: 'rgba(245,158,11,0.1)', text: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
    'SEMI FINALS': { bg: 'rgba(139,92,246,0.1)', text: '#8b5cf6', border: 'rgba(139,92,246,0.25)' },
    'FINAL': { bg: 'rgba(239,68,68,0.1)', text: '#ef4444', border: 'rgba(239,68,68,0.25)' },
  };
  const getPhaseStyle = (phase) => phaseColors[phase?.toUpperCase()] || { bg: 'rgba(59,130,246,0.1)', text: '#3b82f6', border: 'rgba(59,130,246,0.25)' };

  return (
    <div className="min-h-screen bg-dark flex flex-col relative overflow-hidden">
      {/* Orbs */}
      <div className="orb orb-blue w-80 h-80 top-0 right-0 opacity-20" />
      <div className="orb orb-purple w-64 h-64 bottom-0 left-0 opacity-15" />

      <div className="relative z-10 flex flex-col items-center py-16 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#f59e0b' }}>
            <Trophy size={12} />
            FIFA World Cup 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Select Your Match</h1>
          <p className="text-subtle text-lg">Choose the match you are attending today</p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : matches.length === 0 ? (
            <div className="col-span-3 text-center py-20">
              <Trophy size={48} className="text-muted mx-auto mb-4 opacity-40" />
              <p className="text-subtle text-lg">No matches available right now</p>
              <p className="text-muted text-sm mt-2">Check back soon for upcoming fixtures</p>
            </div>
          ) : (
            matches.map((match, i) => {
              const phaseStyle = getPhaseStyle(match.tournamentPhase);
              const isSelecting = selecting === match.id;
              const kickoffDate = match.kickoff ? new Date(match.kickoff) : null;

              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  onClick={() => !selecting && handleMatchSelect(match)}
                  className="glass-card p-6 cursor-pointer group relative overflow-hidden"
                  style={{ borderColor: isSelecting ? '#3b82f6' : '' }}
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.04), rgba(139,92,246,0.04))' }} />

                  {/* Phase + Date row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: phaseStyle.bg, color: phaseStyle.text, border: `1px solid ${phaseStyle.border}` }}>
                      {match.tournamentPhase}
                    </span>
                    {kickoffDate && (
                      <div className="flex items-center gap-1.5 text-xs text-muted">
                        <Calendar size={12} />
                        {kickoffDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    )}
                  </div>

                  {/* Teams */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex-1 text-left">
                      <h3 className="text-2xl font-black text-white">{match.homeTeam}</h3>
                      <p className="text-xs text-muted mt-0.5">Home</p>
                    </div>
                    <div className="flex flex-col items-center px-4">
                      <span className="text-gold font-black text-lg">VS</span>
                      {kickoffDate && (
                        <div className="flex items-center gap-1 text-xs text-muted mt-1">
                          <Clock size={10} />
                          {kickoffDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="text-2xl font-black text-white">{match.awayTeam}</h3>
                      <p className="text-xs text-muted mt-0.5">Away</p>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="flex items-center justify-between pt-4"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-1.5 text-xs text-subtle">
                      <MapPin size={12} />
                      {match.city}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-primary group-hover:gap-2.5 transition-all">
                      {isSelecting ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <>Select <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
