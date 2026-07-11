import crowdService from './crowd.service.js';

class RecommendationService {
  async getRecommendations() {
    const crowd = await crowdService.getLiveCrowdData();
    const recs = [];
    
    crowd.forEach(c => {
      if (c.density > 80) {
        recs.push(`Redirect users from ${c.zone} to alternate routes.`);
        recs.push(`Deploy more staff to ${c.zone} to manage the crowd.`);
      }
    });

    if (recs.length === 0) {
      recs.push("System normal. No immediate action required.");
    }
    
    return recs;
  }
}

export default new RecommendationService();
