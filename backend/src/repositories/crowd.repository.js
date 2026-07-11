import { CrowdSnapshot } from '../models/CrowdSnapshot.js';

class CrowdRepository {
  async createSnapshot(snapshotData) {
    const snapshot = new CrowdSnapshot(snapshotData);
    return await snapshot.save();
  }

  async getLatestByStadium(stadiumId) {
    return await CrowdSnapshot.findOne({ stadiumId }).sort({ timestamp: -1 });
  }
}

export default new CrowdRepository();
