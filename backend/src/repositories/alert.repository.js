import { Alert } from '../models/Alert.js';

class AlertRepository {
  async create(alertData) {
    const alert = new Alert(alertData);
    return await alert.save();
  }

  async getActiveAlertsByStadium(stadiumId) {
    return await Alert.find({ stadiumId }).sort({ createdAt: -1 }).limit(10);
  }
}

export default new AlertRepository();
