import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Map, MessageSquare } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      {/* Hero Section */}
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
        Welcome to <span className="text-primary">MatchDay AI</span>
      </h1>
      <p className="text-xl text-gray-400 mb-10 max-w-2xl">
        Your ultimate AI-powered companion for the FIFA World Cup 2026. Navigate the stadium, monitor crowds, and break language barriers instantly.
      </p>

      {/* Enter App Button */}
      <Link 
        to="/matches" 
        className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform hover:scale-105 mb-16"
      >
        Select a Match
      </Link>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700 flex flex-col items-center">
          <div className="bg-blue-500/10 p-4 rounded-full text-primary mb-4">
            <Map size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Smart Navigation</h3>
          <p className="text-gray-400 text-sm">Find your seat, gates, and facilities effortlessly with AI routing.</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700 flex flex-col items-center">
          <div className="bg-green-500/10 p-4 rounded-full text-accent mb-4">
            <Activity size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Crowd Intel</h3>
          <p className="text-gray-400 text-sm">Real-time congestion updates and smart routing to avoid the crowd.</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700 flex flex-col items-center">
          <div className="bg-purple-500/10 p-4 rounded-full text-purple-500 mb-4">
            <MessageSquare size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Global Translator</h3>
          <p className="text-gray-400 text-sm">Communicate with fans globally using our instant translator.</p>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="mt-16 flex gap-8 text-gray-500">
        <div>
          <p className="text-2xl font-bold text-white">100k+</p>
          <p className="text-sm">Fans Supported</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">0s</p>
          <p className="text-sm">Latency</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">100%</p>
          <p className="text-sm">Coverage</p>
        </div>
      </div>
    </div>
  );
}
