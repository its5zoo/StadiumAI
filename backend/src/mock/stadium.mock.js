import { v4 as uuidv4 } from 'uuid';
import { ZONE_TYPES } from '../constants/zoneTypes.js';
import { STATUS } from '../constants/status.js';

export const stadiumsMock = [
  {
    id: "stadium-metlife",
    name: "MetLife Stadium",
    city: "New York/New Jersey",
    map: "/assets/stadiums/metlife/map.svg",
    zones: [
      { id: "gate-1", name: "Gate 1 (North)", type: ZONE_TYPES.ENTRY_GATE, capacity: 5000, occupancy: 2200, status: STATUS.LOW },
      { id: "gate-2", name: "Gate 2 (East)", type: ZONE_TYPES.ENTRY_GATE, capacity: 5000, occupancy: 1500, status: STATUS.LOW },
      { id: "gate-4", name: "Gate 4 (South)", type: ZONE_TYPES.ENTRY_GATE, capacity: 5000, occupancy: 3000, status: STATUS.MODERATE },
      { id: "gate-5", name: "Gate 5 (West)", type: ZONE_TYPES.ENTRY_GATE, capacity: 5000, occupancy: 4200, status: STATUS.HIGH },
      { id: "food-a", name: "Food Court A", type: ZONE_TYPES.FOOD, capacity: 3000, occupancy: 1800, status: STATUS.MODERATE },
      { id: "med-1", name: "Medical Tent 1", type: ZONE_TYPES.MEDICAL, capacity: 500, occupancy: 100, status: STATUS.LOW }
    ]
  },
  {
    id: "stadium-hardrock",
    name: "Hard Rock Stadium",
    city: "Miami",
    map: "/assets/stadiums/hardrock/map.svg",
    zones: [
      { id: "gate-a", name: "Gate A (Main)", type: ZONE_TYPES.ENTRY_GATE, capacity: 8000, occupancy: 2000, status: STATUS.LOW },
      { id: "gate-c", name: "Gate C (VIP)", type: ZONE_TYPES.ENTRY_GATE, capacity: 2000, occupancy: 500, status: STATUS.LOW }
    ]
  },
  {
    id: "stadium-sofi",
    name: "SoFi Stadium",
    city: "Los Angeles",
    map: "/assets/stadiums/sofi/map.svg",
    zones: [
      { id: "gate-n", name: "North Entry", type: ZONE_TYPES.ENTRY_GATE, capacity: 10000, occupancy: 8500, status: STATUS.HIGH },
      { id: "gate-s", name: "South Entry", type: ZONE_TYPES.ENTRY_GATE, capacity: 10000, occupancy: 4000, status: STATUS.LOW }
    ]
  }
];
