import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, LogOut, Mic, Globe, Eye, Zap, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function Navbar({ toggleSidebar, sidebarOpen }) {
  const { user, logout } = useContext(AuthContext);
  const {
    selectedLanguage,
    setSelectedLanguage,
    accessibilityMode,
    toggleAccessibility,
    isListening,
    setIsListening,
    selectedMatch,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const startGlobalVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice input is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      toast.loading(`Processing: "${transcript}"...`, { id: 'voice-query' });
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/v1/ai/voice/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ text: transcript, userLanguage: selectedLanguage })
        });
        const data = await res.json();
        if (data.success) {
          toast.success(data.data.response, { id: 'voice-query', duration: 8000 });
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(data.data.response);
            window.speechSynthesis.speak(utterance);
          }
        } else {
          toast.error("Voice processing failed.", { id: 'voice-query' });
        }
      } catch (err) {
        toast.error("Network error.", { id: 'voice-query' });
      }
    };
    recognition.onerror = () => { toast.error("Microphone error."); setIsListening(false); };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <nav className="glass-nav sticky top-0 z-50 h-16">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left: Logo + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {sidebarOpen ? <X size={18} className="text-subtle" /> : <Menu size={18} className="text-subtle" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">
              <span className="gradient-text">MatchDay</span>
              <span className="text-white"> AI</span>
            </span>
          </Link>

          {/* Match pill */}
          {selectedMatch && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#f59e0b' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
            </div>
          )}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Accessibility */}
          <button
            onClick={toggleAccessibility}
            title="Toggle Accessibility Mode"
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${accessibilityMode ? 'bg-gold/20 text-gold border border-gold/30' : 'text-subtle hover:text-white'}`}
            style={!accessibilityMode ? { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' } : {}}
          >
            <Eye size={16} />
          </button>

          {/* Voice */}
          <button
            onClick={startGlobalVoice}
            title="Voice Assistant"
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${isListening ? 'bg-danger/20 text-danger border border-danger/30 animate-pulse' : 'text-subtle hover:text-white'}`}
            style={!isListening ? { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' } : {}}
          >
            <Mic size={16} />
          </button>

          {/* Language selector */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-subtle"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Globe size={14} />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="English">EN</option>
              <option value="Spanish">ES</option>
              <option value="French">FR</option>
              <option value="Arabic">AR</option>
              <option value="Hindi">HI</option>
            </select>
          </div>

          {/* Divider */}
          <div className="w-px h-6 hidden md:block" style={{ background: 'rgba(255,255,255,0.08)' }} />

          {/* User */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-semibold text-white leading-tight">{user.name}</span>
                <span className="text-[10px] font-medium" style={{ color: user.role === 'ORGANIZER' ? '#f59e0b' : '#3b82f6' }}>
                  {user.role}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: user.role === 'ORGANIZER' ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#020817' }}>
                {user.name?.[0]?.toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-subtle hover:text-danger transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
