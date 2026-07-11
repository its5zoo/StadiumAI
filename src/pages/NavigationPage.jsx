import React from 'react';
import ChatBox from '../components/ChatBox';
import Card from '../components/Card';
import { stadiumData } from '../mock/stadiumData';

export default function NavigationPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Navigation Assistant</h1>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-1 h-full">
          <ChatBox placeholder="Ask for directions..." />
        </div>

        {/* Map Placeholder */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex-1 bg-[#1e293b] rounded-xl border border-gray-700 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                Map
              </div>
              <p>Interactive Map Placeholder</p>
            </div>
          </div>
          
          <Card title="Recent Queries">
            <div className="flex gap-2 flex-wrap">
              {stadiumData.map((item, index) => (
                <span key={index} className="px-3 py-1 bg-[#0f172a] rounded-full text-sm border border-gray-700">
                  Find {item.place}
                </span>
              ))}
              <span className="px-3 py-1 bg-[#0f172a] rounded-full text-sm border border-gray-700">Nearest Exit</span>
              <span className="px-3 py-1 bg-[#0f172a] rounded-full text-sm border border-gray-700">Gate A</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
