import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { Zap, Eye, EyeOff, ArrowRight, Shield, User } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('fan@example.com');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const roleParam = searchParams.get('role');

  useEffect(() => {
    if (roleParam === 'ORGANIZER') setEmail('org@example.com');
    else setEmail('fan@example.com');
  }, [roleParam]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Login failed');
      login(data.data.token, data.data.user);
      toast.success("Welcome back!");
      if (data.data.user.role === 'ORGANIZER') navigate('/organizer');
      else navigate('/fan/dashboard');
    } catch (err) {
      if (err.message.includes('Failed to fetch')) {
        toast.error("Backend offline. Using demo session.");
        if (email === 'fan@example.com') {
          login('mock-jwt-fan', { id: '1', role: 'FAN', name: 'John Fan' });
          navigate('/fan/dashboard');
        } else if (email === 'org@example.com') {
          login('mock-jwt-org', { id: '2', role: 'ORGANIZER', name: 'Jane Org' });
          navigate('/organizer');
        } else {
          toast.error('No demo account matched.');
        }
      } else {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const isOrganizer = roleParam === 'ORGANIZER';

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Orbs */}
      <div className="orb orb-blue w-96 h-96 top-[-150px] right-[-100px] opacity-30" />
      <div className="orb orb-purple w-64 h-64 bottom-[-50px] left-[-50px] opacity-20" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
              <Zap size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold"><span className="gradient-text">MatchDay</span> <span className="text-white">AI</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-sm text-subtle">Sign in to your {isOrganizer ? 'organizer' : 'fan'} account</p>
        </motion.div>

        {/* Role selector pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-6"
        >
          <button
            onClick={() => { navigate('/login?role=FAN'); setEmail('fan@example.com'); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${!isOrganizer ? 'bg-primary/20 text-primary border border-primary/30' : 'text-subtle border border-white/08'}`}
            style={isOrganizer ? { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' } : {}}
          >
            <User size={15} /> Fan Portal
          </button>
          <button
            onClick={() => { navigate('/login?role=ORGANIZER'); setEmail('org@example.com'); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${isOrganizer ? 'bg-gold/20 text-gold border border-gold/30' : 'text-subtle'}`}
            style={!isOrganizer ? { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' } : {}}
          >
            <Shield size={15} /> Organizer
          </button>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-8"
        >
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-subtle uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-premium"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-subtle uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-premium pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Demo hint */}
            <div className="px-3 py-2.5 rounded-xl text-xs" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
              <p className="text-subtle"><span className="text-primary font-medium">Demo:</span> {isOrganizer ? 'org@example.com' : 'fan@example.com'} / password</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 text-white disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>

            <p className="text-center text-sm text-subtle">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:text-primaryHover font-medium transition-colors">
                Register
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
