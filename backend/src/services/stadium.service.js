import { stadiumMock } from '../mock/stadium.mock.js';
import stadiumRepository from '../repositories/stadium.repository.js';

class StadiumService {
  async getStadiumData() {
    try {
      const stadium = await stadiumRepository.findFirst();
      if (stadium) return stadium.toJSON();
    } catch (err) {
      console.warn("DB unavailable, falling back to mock stadium");
    }
    return stadiumMock;
  }

  async getZones() {
    try {
      const stadium = await stadiumRepository.findFirst();
      if (stadium) return stadium.toJSON().zones;
    } catch (err) {
      console.warn("DB unavailable, falling back to mock zones");
    }
    return stadiumMock.zones;
  }
}

export default new StadiumService();
