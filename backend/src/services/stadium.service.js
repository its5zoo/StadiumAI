import { stadiumMock } from '../mock/stadium.mock.js';

class StadiumService {
  getStadiumData() {
    return stadiumMock;
  }

  getZones() {
    return stadiumMock.zones;
  }
}

export default new StadiumService();
