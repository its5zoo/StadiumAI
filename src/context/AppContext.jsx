import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

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

  return (
    <AppContext.Provider value={{ 
      selectedMatch, 
      setSelectedMatch,
      selectedStadium,
      setSelectedStadium,
      selectedLanguage,
      setSelectedLanguage,
      currentLocationInsideStadium,
      setCurrentLocationInsideStadium
    }}>
      {children}
    </AppContext.Provider>
  );
}
