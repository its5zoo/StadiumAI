import { Stadium } from '../models/Stadium.js';

class StadiumRepository {
  async findById(id) {
    return await Stadium.findById(id);
  }

  async findFirst() {
    return await Stadium.findOne();
  }

  async create(stadiumData) {
    const stadium = new Stadium(stadiumData);
    return await stadium.save();
  }
}

export default new StadiumRepository();
