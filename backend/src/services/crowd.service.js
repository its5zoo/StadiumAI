import stadiumService from './stadium.service.js';
import { STATUS } from '../constants/status.js';

class CrowdService {
  getLiveCrowdData() {
    // In future this will fetch from real-time DB / Redis
    return stadiumService.getZones().map(zone => ({
      zone: zone.name,
      type: zone.type,
      density: Math.round((zone.occupancy / zone.capacity) * 100),
      status: zone.status
    }));
  }

  getAlerts() {
    const crowd = this.getLiveCrowdData();
    return crowd
      .filter(c => c.status === STATUS.HIGH || c.density > 70)
      .map(c => ({
        title: `${c.zone} Congested`,
        message: `${c.zone} density is at ${c.density}%. Expect delays.`
      }));
  }
}

export default new CrowdService();
