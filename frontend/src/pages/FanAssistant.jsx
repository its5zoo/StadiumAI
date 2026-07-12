import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Mic, Send, Globe, Compass, Accessibility, HelpCircle, Zap, Volume2 } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function FanAssistant() {
  const { selectedLanguage, selectedStadium } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('navigation');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { text: `Hi! I'm your MatchDay AI assistant. I'm here to help you navigate the stadium, translate languages, and answer any questions. How can I help you today?`, isUser: false, time: new Date() }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const tabs = [
    { id: 'navigation', icon: <Compass size={16} />, label: 'Navigation' },
    { id: 'translation', icon: <Globe size={16} />, label: 'Translate' },
    { id: 'accessibility', icon: <Accessibility size={16} />, label: 'Accessibility' },
    { id: 'general', icon: <HelpCircle size={16} />, label: 'General' },
  ];

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { toast.error("Voice input not supported."); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (event) => setQuery(event.results[0][0].transcript);
    recognition.onerror = () => { toast.error("Microphone error."); setIsRecording(false); };
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    const userQuery = query;
    setMessages(prev => [...prev, { text: userQuery, isUser: true, time: new Date() }]);
    setQuery('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/v1/ai/voice/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ text: userQuery, userLanguage: selectedLanguage, stadiumId: selectedStadium?.id })
      });
      const data = await res.json();
      const aiResponse = data.success ? data.data.response : "Sorry, I couldn't process that.";
      setMessages(prev => [...prev, { text: aiResponse, isUser: false, time: new Date() }]);
      speak(aiResponse);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Network error. Please try again.", isUser: false, time: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = {
    navigation: ['Where is my seat?', 'Find nearest washroom', 'How to reach Gate 1?', 'Where is first aid?'],
    translation: ['Translate to Spanish', 'How to say "exit" in French?', 'Translate "where is food court"', 'Help in Arabic'],
    accessibility: ['Wheelchair access routes', 'Accessible restrooms', 'Hearing assistance', 'Priority seating info'],
    general: ['Match schedule', 'Stadium rules', 'Emergency procedures', 'Fan zone location'],
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col gap-4">
      {/* Header + Tabs */}
      <div className="space-y-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))', border: '1px solid rgba(59,130,246,0.3)' }}>
              <Bot size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AI Stadium Assistant</h1>
              <p className="text-xs text-muted">Powered by Gemini · {selectedLanguage}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Online
          </div>
        </div>

        {/* Tab Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setMessages([{ text: `Switched to ${tab.label} mode. ${tab.id === 'navigation' ? 'Ask me how to get anywhere in the stadium!' : tab.id === 'translation' ? 'Type anything to translate!' : tab.id === 'accessibility' ? 'I can help with accessible routes and facilities.' : 'Ask me anything about the match or stadium!'}`, isUser: false, time: new Date() }]); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-all shrink-0 ${
                activeTab === tab.id ? 'text-white' : 'text-subtle hover:text-white'
              }`}
              style={activeTab === tab.id
                ? { background: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.25))', border: '1px solid rgba(59,130,246,0.3)' }
                : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }
              }
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="glass-card flex-1 flex flex-col overflow-hidden p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!msg.isUser && (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center mr-2 mt-1 shrink-0"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                    <Zap size={12} className="text-white" />
                  </div>
                )}
                <div className="max-w-[78%]">
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.isUser
                        ? 'text-white rounded-br-md'
                        : 'text-subtle rounded-bl-md'
                    }`}
                    style={msg.isUser
                      ? { background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 4px 15px rgba(59,130,246,0.3)' }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
                    }
                  >
                    {msg.text}
                  </div>
                  <p className="text-[10px] text-muted mt-1 px-1">
                    {msg.time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {msg.isUser && (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center ml-2 mt-1 shrink-0"
                    style={{ background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.3)' }}>
                    <span className="text-xs text-primary font-bold">U</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center mr-2 mt-1 shrink-0"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                <Zap size={12} className="text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5 items-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    animate={{ y: [-4, 0, -4] }}
                    transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 pb-2 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {quickPrompts[activeTab]?.map((prompt, i) => (
              <button
                key={i}
                onClick={() => { setQuery(prompt); }}
                className="text-xs px-3 py-1.5 rounded-xl whitespace-nowrap transition-all hover:text-white shrink-0"
                style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', color: '#60a5fa' }}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
          <form onSubmit={handleSend} className="flex gap-2">
            <button
              type="button"
              onClick={startRecording}
              className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all shrink-0 ${
                isRecording ? 'animate-pulse' : ''
              }`}
              style={isRecording
                ? { background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444' }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }
              }
            >
              <Mic size={18} />
            </button>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={activeTab === 'translation' ? "Type to translate..." : "Ask anything about the stadium..."}
              className="input-premium flex-1"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading || !query.trim()}
              className="w-11 h-11 flex items-center justify-center rounded-xl transition-all shrink-0 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 4px 15px rgba(59,130,246,0.3)' }}
            >
              <Send size={16} className="text-white" />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
