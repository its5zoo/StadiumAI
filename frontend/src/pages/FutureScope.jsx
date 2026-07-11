import React from 'react';
import Card from '../components/Card';
import { Eye, Car, Map, TreePine } from 'lucide-react';

export default function FutureScope() {
  return (
    <div className="space-y-8 pb-12">
      <div className="text-center max-w-3xl mx-auto pt-8">
        <h1 className="text-4xl font-bold text-white mb-4">Future Scope</h1>
        <p className="text-gray-400 text-lg">
          MatchDay AI is an extensible platform. While our MVP proves the core value of Real-Time Intelligence, our roadmap expands this to a global scale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <Card className="hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/20 text-blue-500 rounded-lg"><Eye size={28} /></div>
            <h2 className="text-2xl font-bold text-white">Accessibility Expansion</h2>
          </div>
          <p className="text-gray-400">
            Deeper integration with screen readers, dedicated wheelchair routing algorithms that avoid stairs and steep inclines, and sign language avatar translations for deaf fans.
          </p>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-yellow-500/20 text-yellow-500 rounded-lg"><Car size={28} /></div>
            <h2 className="text-2xl font-bold text-white">Transportation Intelligence</h2>
          </div>
          <p className="text-gray-400">
            Integration with city transit APIs (subways, buses, ride-shares) to guide fans from their hotel directly to their specific stadium seat using one unified interface.
          </p>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-500/20 text-green-500 rounded-lg"><TreePine size={28} /></div>
            <h2 className="text-2xl font-bold text-white">Sustainability Tracking</h2>
          </div>
          <p className="text-gray-400">
            Tracking waste bin capacities in real-time, optimizing janitorial routes, and recommending eco-friendly transport options to fans to reduce the tournament's carbon footprint.
          </p>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/20 text-purple-500 rounded-lg"><Map size={28} /></div>
            <h2 className="text-2xl font-bold text-white">Multi-Stadium Sync</h2>
          </div>
          <p className="text-gray-400">
            A Global Command Center that allows FIFA organizers to monitor crowd densities and incidents across all 104 matches and 16 stadiums simultaneously from a single dashboard.
          </p>
        </Card>
      </div>
    </div>
  );
}
