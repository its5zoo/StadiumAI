// Initial mock data that will be updated
export const initialCrowdData = [
  { zone: "Gate A", density: 20 },
  { zone: "Gate B", density: 45 },
  { zone: "Main Concourse", density: 60 },
  { zone: "Food Court A", density: 30 }
];

// Returns status based on density
export function getDensityStatus(density) {
  if (density <= 30) return "Low";
  if (density <= 70) return "Moderate";
  return "High";
}

// Generates new random density for each zone
export function simulateCrowdUpdates(currentData) {
  return currentData.map(item => {
    // fluctuate by -15 to +15
    const change = Math.floor(Math.random() * 31) - 15;
    let newDensity = item.density + change;
    
    // clamp between 0 and 100
    newDensity = Math.max(0, Math.min(100, newDensity));
    
    return { ...item, density: newDensity };
  });
}
