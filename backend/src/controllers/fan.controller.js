import crowdService from '../services/crowd.service.js';
import stadiumService from '../services/stadium.service.js';

export const getFanDashboard = async (req, res, next) => {
  try {
    const crowd = await crowdService.getLiveCrowdData();
    const alerts = await crowdService.getAlerts();
    const zones = await stadiumService.getZones();

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
