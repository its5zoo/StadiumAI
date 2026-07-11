import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogOut, Mic, Globe, Eye } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useContext(AuthContext);
  const { 
    selectedLanguage, 
    setSelectedLanguage, 
    accessibilityMode, 
    toggleAccessibility,
    isListening,
    setIsListening
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
      toast.loading(`Processing voice: "${transcript}"...`, { id: 'voice-query' });
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/v1/ai/voice/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ 
            text: transcript,
            userLanguage: selectedLanguage
          })
        });
        const data = await res.json();
        if (data.success) {
          toast.success(data.data.response, { id: 'voice-query', duration: 8000 });
          // Auto speak response
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
    recognition.onerror = () => {
      toast.error("Microphone error.");
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  return (
    <nav className="bg-dark border-b border-gray-800 p-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-white lg:hidden">
          <Menu size={24} />
        </button>
        <Link to="/" className="text-xl font-bold text-primary">MatchDay AI</Link>
      </div>
      <div className="flex items-center gap-4">
        
        {/* Global Controls */}
        <div className="flex items-center gap-3 border-r border-gray-700 pr-4 mr-2">
          
          <button 
            onClick={toggleAccessibility} 
            className={`p-2 rounded-full transition-colors ${accessibilityMode ? 'bg-yellow-500 text-dark' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            title="Toggle Accessibility Mode"
          >
            <Eye size={20} />
          </button>
          
          <button 
            onClick={startGlobalVoice} 
            className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
            title="Global Voice Assistant"
          >
            <Mic size={20} />
          </button>

          <div className="flex items-center gap-1 text-gray-400 bg-[#1e293b] px-3 py-1.5 rounded-lg border border-gray-700">
            <Globe size={16} />
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent text-sm text-white focus:outline-none"
            >
              <option value="English">EN</option>
              <option value="Spanish">ES</option>
              <option value="French">FR</option>
              <option value="Arabic">AR</option>
              <option value="Hindi">HI</option>
            </select>
          </div>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">{user.name}</span>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <span className="text-sm text-gray-400 hidden sm:block"></span>
        )}
      </div>
    </nav>
  );
}
