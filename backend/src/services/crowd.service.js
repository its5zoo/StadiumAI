import stadiumService from './stadium.service.js';
import { STATUS } from '../constants/status.js';

class CrowdService {
  async getLiveCrowdData() {
    const zones = await stadiumService.getZones();
    return zones.map(zone => ({
      zone: zone.name,
      type: zone.type,
      density: Math.round((zone.occupancy / zone.capacity) * 100) || 0,
      status: zone.status || STATUS.LOW
    }));
  }

  async getAlerts() {
    const crowd = await this.getLiveCrowdData();
    return crowd
      .filter(c => c.status === STATUS.HIGH || c.density > 70)
      .map(c => ({
        title: `${c.zone} Congested`,
        message: `${c.zone} density is at ${c.density}%. Expect delays.`
      }));
  }
}

export default new CrowdService();
