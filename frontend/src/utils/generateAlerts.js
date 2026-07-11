export function generateAlerts(crowdData) {
  const alerts = [];
  crowdData.forEach(item => {
    if (item.density > 70) {
      alerts.push({
        title: `${item.zone} Congested`,
        message: `${item.zone} density is at ${item.density}%. Expect delays.`
      });
    }
  });
  return alerts;
}
