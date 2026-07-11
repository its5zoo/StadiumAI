import { v4 as uuidv4 } from 'uuid';
import { ZONE_TYPES } from '../constants/zoneTypes.js';
import { STATUS } from '../constants/status.js';

export const stadiumMock = {
  id: uuidv4(),
  name: "MetLife Stadium",
  zones: [
    {
      id: uuidv4(),
      name: "Gate A",
      type: ZONE_TYPES.ENTRY_GATE,
      capacity: 5000,
      occupancy: 1200,
      status: STATUS.LOW
    },
    {
      id: uuidv4(),
      name: "Gate B",
      type: ZONE_TYPES.ENTRY_GATE,
      capacity: 5000,
      occupancy: 4200,
      status: STATUS.HIGH
    },
    {
      id: uuidv4(),
      name: "East Wing Washroom",
      type: ZONE_TYPES.WASHROOM,
      capacity: 500,
      occupancy: 100,
      status: STATUS.LOW
    },
    {
      id: uuidv4(),
      name: "Main Concourse Food Court",
      type: ZONE_TYPES.FOOD,
      capacity: 3000,
      occupancy: 1800,
      status: STATUS.MODERATE
    }
  ]
};
