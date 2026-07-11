import React from 'react';
import Card from '../components/Card';
import { TrendingDown, Globe, Clock, Zap } from 'lucide-react';

export default function Statistics() {
  return (
    <div className="space-y-8 pb-12">
      <div className="text-center max-w-3xl mx-auto pt-8">
        <h1 className="text-4xl font-bold text-white mb-4">Projected Impact</h1>
        <p className="text-gray-400 text-lg">
          MatchDay AI is designed to measurably improve the Fan Experience while drastically reducing operational overhead for FIFA organizers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <Card className="text-center border-green-500/30 bg-green-500/5">
          <TrendingDown className="mx-auto text-green-500 mb-4" size={48} />
          <h2 className="text-4xl font-black text-white mb-2">35%</h2>
          <p className="text-gray-400 font-medium">Reduction in Crowd Congestion</p>
        </Card>

        <Card className="text-center border-blue-500/30 bg-blue-500/5">
          <Globe className="mx-auto text-blue-500 mb-4" size={48} />
          <h2 className="text-4xl font-black text-white mb-2">5+</h2>
          <p className="text-gray-400 font-medium">Languages Supported Natively</p>
        </Card>

        <Card className="text-center border-fifagold/30 bg-fifagold/5">
          <Clock className="mx-auto text-fifagold mb-4" size={48} />
          <h2 className="text-4xl font-black text-white mb-2">12m</h2>
          <p className="text-gray-400 font-medium">Avg Wait Time Saved per Fan</p>
        </Card>

        <Card className="text-center border-purple-500/30 bg-purple-500/5">
          <Zap className="mx-auto text-purple-500 mb-4" size={48} />
          <h2 className="text-4xl font-black text-white mb-2">Instant</h2>
          <p className="text-gray-400 font-medium">Emergency Broadcast Latency</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card title="Value for Fans">
          <ul className="space-y-4 mt-4 text-gray-300">
            <li className="flex gap-2">✅ Personalized navigation inside massive stadiums.</li>
            <li className="flex gap-2">✅ Language barriers eliminated via Voice AI.</li>
            <li className="flex gap-2">✅ High contrast and voice output for accessibility.</li>
            <li className="flex gap-2">✅ Less time in queues, more time watching the match.</li>
          </ul>
        </Card>

        <Card title="Value for Organizers">
          <ul className="space-y-4 mt-4 text-gray-300">
            <li className="flex gap-2">✅ God's-eye view of live stadium density.</li>
            <li className="flex gap-2">✅ AI-driven decision support during critical incidents.</li>
            <li className="flex gap-2">✅ Instant communication channels to all attendees.</li>
            <li className="flex gap-2">✅ Data-driven crowd management for maximum safety.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
