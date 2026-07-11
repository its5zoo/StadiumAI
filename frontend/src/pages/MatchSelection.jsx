import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Card from '../components/Card';
import toast from 'react-hot-toast';

export default function MatchSelection() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedMatch, setSelectedStadium } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/matches');
      const data = await res.json();
      if (data.success) setMatches(data.data);
      else toast.error("Failed to load matches");
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleMatchSelect = async (match) => {
    console.log("Match clicked:", match);
    setSelectedMatch(match);
    
    // Auto-select stadium
    try {
      console.log(`Fetching stadium details: http://localhost:5000/api/v1/stadiums/${match.stadiumId}`);
      const res = await fetch(`http://localhost:5000/api/v1/stadiums/${match.stadiumId}`);
      const data = await res.json();
      console.log("Stadium API response:", data);
      
      if (data.success) {
        setSelectedStadium(data.data);
        // Wait for context to update before navigating to avoid immediate redirect back
        setTimeout(() => {
          navigate('/select-role');
        }, 100);
      } else {
        toast.error("Failed to load stadium details");
      }
    } catch (err) {
      console.error("Network error:", err);
      toast.error("Network error loading stadium");
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-white mb-2 text-center">Select Match</h1>
      <p className="text-gray-400 mb-8 text-center">Choose the match you are attending</p>

      {loading ? (
        <div className="text-primary animate-pulse">Loading matches...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {matches.map(match => (
            <Card key={match.id} className="cursor-pointer hover:border-primary transition-colors bg-[#1e293b]" onClick={() => handleMatchSelect(match)}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm bg-gray-700 px-2 py-1 rounded text-gray-300">{match.tournamentPhase}</span>
                <span className="text-sm text-gray-400">{new Date(match.kickoff).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">{match.homeTeam}</h3>
                <span className="text-fifagold font-bold text-sm">VS</span>
                <h3 className="text-xl font-bold text-white">{match.awayTeam}</h3>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400">{match.city}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
