import React, { createContext, useState, useEffect } from 'react';
import { initialCrowdData, simulateCrowdUpdates } from '../mock/crowdSimulation';
import { generateAlerts } from '../utils/generateAlerts';
import { generateRecommendations } from '../utils/generateRecommendations';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [crowdData, setCrowdData] = useState(initialCrowdData);
  const [alerts, setAlerts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // Simulation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCrowdData(current => simulateCrowdUpdates(current));
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Update alerts and recommendations when crowdData changes
  useEffect(() => {
    setAlerts(generateAlerts(crowdData));
    setRecommendations(generateRecommendations(crowdData));
  }, [crowdData]);

  return (
    <AppContext.Provider value={{ crowdData, alerts, recommendations }}>
      {children}
    </AppContext.Provider>
  );
}
