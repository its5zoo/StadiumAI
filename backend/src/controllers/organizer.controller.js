import crowdService from '../services/crowd.service.js';
import recommendationService from '../services/recommendation.service.js';

export const getOrganizerDashboard = (req, res, next) => {
  try {
    const crowd = crowdService.getLiveCrowdData();
    const recommendations = recommendationService.getRecommendations();
    
    // Mock analytics
    const analytics = {
      totalAttendance: 68402,
      expectedAttendance: 66800,
      activeAlerts: crowdService.getAlerts().length
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
