import crowdService from '../services/crowd.service.js';
import stadiumService from '../services/stadium.service.js';

export const getFanDashboard = (req, res, next) => {
  try {
    const crowd = crowdService.getLiveCrowdData();
    const alerts = crowdService.getAlerts();
    const zones = stadiumService.getZones();

    res.status(200).json({
      success: true,
      message: "Fan dashboard data retrieved successfully",
      data: {
        alerts,
        crowd,
        zones
      }
    });
  } catch (error) {
    next(error);
  }
};
