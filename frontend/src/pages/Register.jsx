import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, User, Shield, ArrowRight, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('FAN');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Registration failed');
      toast.success("Account created! Please sign in.");
      navigate('/login');
    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        toast.error('Backend offline. Please start the backend server.');
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">
      <div className="orb orb-purple w-96 h-96 top-[-150px] left-[-100px] opacity-25" />
      <div className="orb orb-blue w-64 h-64 bottom-[-50px] right-[-50px] opacity-20" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
              <Zap size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold"><span className="gradient-text">MatchDay</span> <span className="text-white">AI</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-sm text-subtle">Join the FIFA World Cup 2026 platform</p>
        </motion.div>

        {/* Role selector */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-3 mb-6">
          {[
            { id: 'FAN', label: 'Fan', icon: <User size={15} />, color: '#3b82f6' },
            { id: 'ORGANIZER', label: 'Organizer', icon: <Shield size={15} />, color: '#f59e0b' },
          ].map(r => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={role === r.id
                ? { background: `${r.color}20`, color: r.color, border: `1px solid ${r.color}30` }
                : { background: 'rgba(255,255,255,0.04)', color: '#64748b', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {r.icon} {r.label}
            </button>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-8">
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-subtle uppercase tracking-wider">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-premium" placeholder="John Doe" required />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-subtle uppercase tracking-wider">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-premium" placeholder="you@example.com" required />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-subtle uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-premium pr-12"
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 text-white disabled:opacity-50"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <> Create Account <ArrowRight size={16} /></>
              }
            </button>

            <p className="text-center text-sm text-subtle">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-primaryHover font-medium transition-colors">Sign In</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
