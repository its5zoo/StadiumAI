import { Router } from 'express';
import { matchesMock } from '../mock/match.mock.js';
import { Match } from '../models/Match.js';

const router = Router();

// Our 3 mock stadiums to randomly assign so the MVP crowd simulation keeps working
const MOCK_STADIUMS = [
  { id: 'stadium-metlife', city: 'New York/New Jersey' },
  { id: 'stadium-hardrock', city: 'Miami' },
  { id: 'stadium-sofi', city: 'Los Angeles' }
];

router.get('/', async (req, res, next) => {
  try {
    // 1. First, try to fetch live matches from football-data.org
    if (process.env.FOOTBALL_DATA_API_KEY) {
      try {
        const apiRes = await fetch('https://api.football-data.org/v4/matches', {
          headers: { 'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY }
        });
        
        const data = await apiRes.json();
        
        if (apiRes.ok && data.matches && data.matches.length > 0) {
          const mappedMatches = data.matches.map((match, index) => {
            // Assign a stadium round-robin
            const stadium = MOCK_STADIUMS[index % MOCK_STADIUMS.length];
            return {
              id: `match-${match.id}`,
              homeTeam: match.homeTeam.shortName || match.homeTeam.name || 'TBD',
              awayTeam: match.awayTeam.shortName || match.awayTeam.name || 'TBD',
              stadiumId: stadium.id,
              kickoff: match.utcDate,
              city: stadium.city,
              tournamentPhase: match.stage ? match.stage.replace(/_/g, ' ') : (match.competition?.name || 'Group Stage')
            };
          });
          return res.status(200).json({ success: true, data: mappedMatches });
        }
      } catch (apiError) {
        console.warn("Football-data API failed, falling back...");
      }
    }

    // 2. Fallback to DB
    const matches = await Match.find();
    if (matches.length > 0) {
      return res.status(200).json({ success: true, data: matches });
    }
    
    // 3. Fallback to Mock
    res.status(200).json({ success: true, data: matchesMock });
  } catch (error) {
    console.warn("DB unavailable, falling back to mock matches");
    res.status(200).json({ success: true, data: matchesMock });
  }
});

export default router;
