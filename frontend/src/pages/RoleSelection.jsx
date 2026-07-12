import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Card from '../components/Card';
import { User, Shield } from 'lucide-react';

export default function RoleSelection() {
  const { selectedMatch, selectedStadium } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedMatch && !localStorage.getItem('selectedMatch')) {
      navigate('/matches');
    }
  }, [selectedMatch, navigate]);

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Select Your Role</h1>
          <p className="text-gray-400">
            Accessing portal for {selectedMatch?.homeTeam} vs {selectedMatch?.awayTeam} at {selectedStadium?.name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card 
            className="cursor-pointer hover:border-primary transition-all hover:scale-105 bg-[#1e293b]" 
            onClick={() => navigate('/login?role=FAN')}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-primary/20 p-6 rounded-full text-primary">
                <User size={64} />
              </div>
              <h2 className="text-2xl font-bold text-white">Fan Portal</h2>
              <p className="text-gray-400">Navigate the stadium, find facilities, and get live AI assistance.</p>
            </div>
          </Card>

          <Card 
            className="cursor-pointer hover:border-fifagold transition-all hover:scale-105 bg-[#1e293b]" 
            onClick={() => navigate('/login?role=ORGANIZER')}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-fifagold/20 p-6 rounded-full text-fifagold">
                <Shield size={64} />
              </div>
              <h2 className="text-2xl font-bold text-white">Organizer Portal</h2>
              <p className="text-gray-400">Monitor crowd density, view heatmaps, and manage stadium safety.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
