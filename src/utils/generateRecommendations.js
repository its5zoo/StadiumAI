export function generateRecommendations(crowdData) {
  const recommendations = [];
  crowdData.forEach(item => {
    if (item.density > 80) {
      // Find a low density area to redirect to, or just make a generic recommendation
      recommendations.push(
        `Redirect users from ${item.zone} to alternate routes.`
      );
      recommendations.push(
        `Deploy more staff to ${item.zone} to manage the crowd.`
      );
    }
  });
  
  if (recommendations.length === 0) {
    recommendations.push("System normal. No immediate action required.");
  }
  
  return recommendations;
}
