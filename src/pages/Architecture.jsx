import React from 'react';
import Card from '../components/Card';
import { Database, Server, Smartphone, Cpu, Network } from 'lucide-react';

export default function Architecture() {
  return (
    <div className="space-y-8 pb-12">
      <div className="text-center max-w-3xl mx-auto pt-8">
        <h1 className="text-4xl font-bold text-white mb-4">System Architecture</h1>
        <p className="text-gray-400 text-lg">
          MatchDay AI is built on a modern, real-time technology stack designed for high availability and low latency during peak stadium events.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative mt-12">
        {/* Connection Lines (Hidden on mobile) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-primary to-green-500 -translate-y-1/2 z-0 opacity-30"></div>

        <div className="z-10">
          <Card className="h-full border-blue-500/30 bg-blue-500/5 text-center hover:scale-105 transition-transform cursor-default">
            <Smartphone className="mx-auto text-blue-500 mb-4" size={40} />
            <h3 className="font-bold text-white mb-2">Frontend</h3>
            <p className="text-sm text-gray-400">React, TailwindCSS, Socket.io-client</p>
          </Card>
        </div>

        <div className="z-10">
          <Card className="h-full border-primary/30 bg-primary/5 text-center hover:scale-105 transition-transform cursor-default">
            <Server className="mx-auto text-primary mb-4" size={40} />
            <h3 className="font-bold text-white mb-2">Backend API</h3>
            <p className="text-sm text-gray-400">Node.js, Express, Socket.io Server</p>
          </Card>
        </div>

        <div className="z-10">
          <Card className="h-full border-purple-500/30 bg-purple-500/5 text-center hover:scale-105 transition-transform cursor-default">
            <Cpu className="mx-auto text-purple-500 mb-4" size={40} />
            <h3 className="font-bold text-white mb-2">AI Layer</h3>
            <p className="text-sm text-gray-400">Google Gemini Flash 1.5, Vector Embeddings</p>
          </Card>
        </div>
        
        <div className="z-10">
          <Card className="h-full border-fifagold/30 bg-fifagold/5 text-center hover:scale-105 transition-transform cursor-default">
            <Network className="mx-auto text-fifagold mb-4" size={40} />
            <h3 className="font-bold text-white mb-2">RAG Engine</h3>
            <p className="text-sm text-gray-400">Document Chunking, Semantic Search</p>
          </Card>
        </div>

        <div className="z-10">
          <Card className="h-full border-green-500/30 bg-green-500/5 text-center hover:scale-105 transition-transform cursor-default">
            <Database className="mx-auto text-green-500 mb-4" size={40} />
            <h3 className="font-bold text-white mb-2">Database</h3>
            <p className="text-sm text-gray-400">MongoDB Atlas, Vector Store</p>
          </Card>
        </div>
      </div>

      <div className="mt-12 bg-[#0f172a] rounded-xl p-8 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6">Real-Time Intelligence Flow</h2>
        <ul className="space-y-4 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="bg-primary/20 text-primary px-2 py-1 rounded font-bold">1</span>
            <p><strong>Crowd Sensors</strong> feed data into the Node.js WebSocket server.</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-primary/20 text-primary px-2 py-1 rounded font-bold">2</span>
            <p><strong>Socket.io</strong> instantly broadcasts density updates to Organizer Dashboards.</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-primary/20 text-primary px-2 py-1 rounded font-bold">3</span>
            <p><strong>Gemini AI</strong> evaluates the congestion against the RAG knowledge base and generates operational recommendations.</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-primary/20 text-primary px-2 py-1 rounded font-bold">4</span>
            <p>Organizers execute actions, dispatching <strong>Instant Broadcasts</strong> to Fan mobile devices.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
