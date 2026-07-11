import React, { useState, useEffect, useRef, useContext } from 'react';
import { Bot, Mic, Send, Volume2, Globe, Compass, Accessibility, HelpCircle } from 'lucide-react';
import Card from '../components/Card';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function FanAssistant() {
  const { selectedLanguage, selectedStadium } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('navigation');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { text: `Hi there! I'm your MatchDay AI assistant. Your language is set to ${selectedLanguage}. How can I help you?`, isUser: false }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const tabs = [
    { id: 'navigation', icon: <Compass size={18} />, label: 'Navigation' },
    { id: 'translation', icon: <Globe size={18} />, label: 'Translate' },
    { id: 'accessibility', icon: <Accessibility size={18} />, label: 'Accessibility' },
    { id: 'general', icon: <HelpCircle size={18} />, label: 'General' },
  ];

  // Voice output
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Voice input
  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };
    recognition.onerror = () => {
      toast.error("Microphone error.");
      setIsRecording(false);
    };
    recognition.onend = () => setIsRecording(false);
    
    recognition.start();
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    const userQuery = query;
    setMessages(prev => [...prev, { text: userQuery, isUser: true }]);
    setQuery('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      // Always route to unified voice query which handles translation -> AI -> translation
      const endpoint = 'http://localhost:5000/api/v1/ai/voice/query';
      const body = { 
        text: userQuery,
        userLanguage: selectedLanguage,
        stadiumId: selectedStadium?.id
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      
      let aiResponse = "Sorry, I couldn't process that.";
      if (data.success) {
        aiResponse = data.data.response;
      }

      setMessages(prev => [...prev, { text: aiResponse, isUser: false }]);
      
      // Auto-speak the response for voice interaction feel
      speak(aiResponse);
      
    } catch (error) {
      setMessages(prev => [...prev, { text: "Network error. Please try again.", isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
          <Bot className="text-primary" size={32} /> Unified AI Assistant
        </h1>
        
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setMessages([{ text: `Switched to ${tab.label} Mode. How can I help?`, isUser: false }]); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-[#1e293b] text-gray-400 hover:bg-gray-800'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <Card className="flex-1 flex flex-col p-0 overflow-hidden bg-dark border-gray-800">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.isUser ? 'bg-primary text-white rounded-br-none' : 'bg-[#1e293b] text-gray-200 border border-gray-700 rounded-bl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#1e293b] border border-gray-700 rounded-2xl rounded-bl-none px-4 py-3 flex gap-2">
                <span className="animate-bounce">●</span><span className="animate-bounce delay-75">●</span><span className="animate-bounce delay-150">●</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-800 bg-[#0f172a]">
          <form onSubmit={handleSend} className="flex gap-2">
            <button 
              type="button"
              onClick={startRecording}
              className={`p-3 rounded-xl transition-colors ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-[#1e293b] text-gray-400 hover:text-white border border-gray-700'}`}
            >
              <Mic size={20} />
            </button>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={activeTab === 'translation' ? "Type to translate..." : "Ask where to go..."}
              className="flex-1 bg-[#1e293b] border border-gray-700 rounded-xl px-4 text-white focus:outline-none focus:border-primary"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-primary hover:bg-blue-600 text-white p-3 rounded-xl disabled:opacity-50 transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}
