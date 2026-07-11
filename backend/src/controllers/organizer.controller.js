import crowdService from '../services/crowd.service.js';
import recommendationService from '../services/recommendation.service.js';

export const getOrganizerDashboard = async (req, res, next) => {
  try {
    const crowd = await crowdService.getLiveCrowdData();
    const recommendations = await recommendationService.getRecommendations();
    const alerts = await crowdService.getAlerts();
    
    // Mock analytics
    const analytics = {
      totalAttendance: 68402,
      expectedAttendance: 66800,
      activeAlerts: alerts.length
    };

    res.status(200).json({
      success: true,
      message: "Organizer dashboard data retrieved successfully",
      data: {
        analytics,
        recommendations,
        congestion: crowd
      }
    });
  } catch (error) {
    next(error);
  }
};
