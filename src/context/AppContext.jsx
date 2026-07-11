import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

export const AppContext = createContext();

export function AppProvider({ children }) {
  // Global State
  const [selectedMatch, setSelectedMatch] = useState(() => {
    const saved = localStorage.getItem('selectedMatch');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [selectedStadium, setSelectedStadium] = useState(() => {
    const saved = localStorage.getItem('selectedStadium');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'English';
  });

  const [currentLocationInsideStadium, setCurrentLocationInsideStadium] = useState(null);

  const [accessibilityMode, setAccessibilityMode] = useState(() => {
    return localStorage.getItem('accessibilityMode') === 'true';
  });

  const [isListening, setIsListening] = useState(false);

  // Real-time Organizer states
  const [heatmapData, setHeatmapData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [broadcasts, setBroadcasts] = useState([]);

  // Socket
  const [socket, setSocket] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    if (selectedMatch) localStorage.setItem('selectedMatch', JSON.stringify(selectedMatch));
    else localStorage.removeItem('selectedMatch');
  }, [selectedMatch]);

  useEffect(() => {
    if (selectedStadium) localStorage.setItem('selectedStadium', JSON.stringify(selectedStadium));
    else localStorage.removeItem('selectedStadium');
  }, [selectedStadium]);

  useEffect(() => {
    localStorage.setItem('selectedLanguage', selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    localStorage.setItem('accessibilityMode', accessibilityMode);
  }, [accessibilityMode]);

  // Socket Connection Effect
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole'); // We can extract role or rely on token parsing in backend
    
    // For demo MVP fallbacks, if no real token, use mock tokens
    let auth_token = token;
    if (!token && userRole) {
      auth_token = userRole === 'ORGANIZER' ? 'mock-jwt-org' : 'mock-jwt-fan';
    }

    if (auth_token) {
      const newSocket = io('http://localhost:5000', {
        auth: { token: auth_token }
      });

      newSocket.on('connect', () => {
        console.log('Connected to Real-Time Socket');
      });

      newSocket.on('crowd-update', (data) => {
        setHeatmapData(data);
      });

      newSocket.on('recommendation-generated', (data) => {
        setRecommendations(prev => [{ ...data, id: Date.now() }, ...prev]);
        toast("New AI Recommendation generated!", { icon: '🤖' });
      });

      newSocket.on('broadcast', (data) => {
        setBroadcasts(prev => [data, ...prev]);
        toast(data.message, { 
          icon: data.type === 'EMERGENCY' ? '🚨' : data.type === 'WARNING' ? '⚠️' : '📢',
          duration: 10000 
        });
      });

      setSocket(newSocket);

      return () => newSocket.disconnect();
    }
  }, []);

  const toggleAccessibility = () => {
    setAccessibilityMode(!accessibilityMode);
  };

  return (
    <AppContext.Provider value={{ 
      selectedMatch, 
      setSelectedMatch,
      selectedStadium,
      setSelectedStadium,
      selectedLanguage,
      setSelectedLanguage,
      currentLocationInsideStadium,
      setCurrentLocationInsideStadium,
      accessibilityMode,
      toggleAccessibility,
      isListening,
      setIsListening,
      heatmapData,
      recommendations,
      incidents,
      broadcasts,
      socket
    }}>
      {children}
    </AppContext.Provider>
  );
}
