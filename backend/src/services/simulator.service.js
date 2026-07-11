import { getIO } from '../socket/socket.server.js';
import { predictCrowdCongestion } from '../ai/crowd.ai.js';
import contextService from './context.service.js';

let simulatorInterval = null;

// Mock active dynamic crowd density states for MetLife Stadium Demo
const currentCrowd = [
  { zone: "North Gate", density: 90, status: "HIGH" },
  { zone: "Gate 2 (East)", density: 30, status: "LOW" },
  { zone: "Gate 4 (South)", density: 60, status: "MEDIUM" },
  { zone: "Gate 5 (West)", density: 85, status: "HIGH" },
  { zone: "Food Court", density: 70, status: "MEDIUM" },
  { zone: "Parking A", density: 40, status: "LOW" }
];

export const startCrowdSimulator = () => {
  if (simulatorInterval) clearInterval(simulatorInterval);

  console.log("Starting Real-Time Crowd Simulator...");

  simulatorInterval = setInterval(async () => {
    try {
      const io = getIO();
      let alertTriggered = false;

      // 1. Mutate crowd data randomly
      const updatedCrowd = currentCrowd.map(zone => {
        // Fluctuate density by -5 to +15
        let newDensity = zone.density + (Math.floor(Math.random() * 21) - 5);
        if (newDensity > 100) newDensity = 100;
        if (newDensity < 0) newDensity = 0;

        let status = "LOW";
        if (newDensity > 50) status = "MEDIUM";
        if (newDensity > 75) {
          status = "HIGH";
          alertTriggered = true;
        }

        return { ...zone, density: newDensity, status };
      });

      // Update state
      currentCrowd.splice(0, currentCrowd.length, ...updatedCrowd);

      // 2. Broadcast live data to organizers
      io.to('organizers').emit('crowd-update', updatedCrowd);

      // 3. AI Insights if high density
      if (alertTriggered) {
        try {
          const ragContext = await contextService.buildContext("crowd evacuation safety routes and gates");
          const aiRes = await predictCrowdCongestion(updatedCrowd, ragContext);
          
          io.to('organizers').emit('recommendation-generated', {
            message: aiRes,
            timestamp: new Date().toISOString()
          });
        } catch (aiErr) {
          console.warn("Simulator AI warning:", aiErr.message);
        }
      }
    } catch (err) {
      console.warn("Simulator tick error:", err.message);
    }
  }, 45000); // Tick every 45 seconds to avoid API rate limits
};
