import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Map, MessageSquare, Shield, Zap, Globe, Users, ArrowRight, Star, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: <Map size={28} />,
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.3)',
    title: 'Smart Navigation',
    desc: 'AI-powered routing to find your seat, gates, and facilities instantly.',
  },
  {
    icon: <Activity size={28} />,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.3)',
    title: 'Crowd Intelligence',
    desc: 'Real-time congestion heat maps and smart routing to avoid crowds.',
  },
  {
    icon: <MessageSquare size={28} />,
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.3)',
    title: 'Global Translator',
    desc: 'Communicate with 50+ languages through our instant AI translator.',
  },
  {
    icon: <Shield size={28} />,
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
    title: 'Safety Command',
    desc: 'Real-time incident detection and emergency response coordination.',
  },
  {
    icon: <Globe size={28} />,
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.3)',
    title: 'Multilingual AI',
    desc: 'Voice-first AI assistant that understands any language in seconds.',
  },
  {
    icon: <Users size={28} />,
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.3)',
    title: 'Fan Experience',
    desc: 'Personalized match-day experience for every fan at FIFA World Cup.',
  },
];

const stats = [
  { value: '80K+', label: 'Fans Supported' },
  { value: '<50ms', label: 'Response Time' },
  { value: '50+', label: 'Languages' },
  { value: '16', label: 'Stadiums' },
];

function Counter({ target }) {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target.replace(/\D/g, ''));
  const suffix = target.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isNaN(numericTarget)) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(numericTarget / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= numericTarget) { setCount(numericTarget); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [numericTarget]);

  return <span>{isNaN(numericTarget) ? target : `${count}${suffix}`}</span>;
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient gradient orbs */}
      <div className="orb orb-blue w-96 h-96 top-[-100px] left-[-100px] opacity-40" />
      <div className="orb orb-purple w-80 h-80 top-[200px] right-[-50px] opacity-30" />
      <div className="orb orb-gold w-64 h-64 bottom-[100px] left-[20%] opacity-20" />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pt-24 pb-20 px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-semibold"
          style={{
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.25)',
            color: '#f59e0b',
          }}
        >
          <Star size={12} fill="#f59e0b" />
          FIFA World Cup 2026 · Official AI Platform
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6"
        >
          <span className="text-white">Stadium</span>
          <br />
          <span className="gradient-text">Intelligence</span>
          <br />
          <span className="text-white">Redefined.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-lg md:text-xl text-subtle max-w-2xl mb-12 leading-relaxed"
        >
          The AI-powered command platform for FIFA World Cup 2026 —
          real-time crowd control, multilingual assistance, and smart navigation
          for 80,000+ fans and stadium operations teams.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <Link to="/matches" className="btn-primary flex items-center gap-2 text-white">
            <Zap size={18} />
            Enter Platform
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/architecture"
            className="px-6 py-3 rounded-xl font-semibold text-subtle hover:text-white transition-all duration-300 flex items-center gap-2"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            View Architecture
            <ChevronRight size={16} />
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 w-full max-w-3xl"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-black text-white mb-1">
                <Counter target={stat.value} />
              </p>
              <p className="text-xs text-muted uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 px-4 pb-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="section-title mb-4">Platform Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Everything you need for a flawless match day</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="glass-card p-6 group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}25`, color: f.color, boxShadow: `0 0 20px ${f.glow}` }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-subtle leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="relative z-10 px-4 pb-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))' }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready for kickoff?</h2>
          <p className="text-subtle mb-8">Select your match and enter the stadium experience.</p>
          <Link to="/matches" className="btn-gold inline-flex items-center gap-2">
            <Zap size={18} />
            Select a Match
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
