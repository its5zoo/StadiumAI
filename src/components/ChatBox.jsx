import React from 'react';
import { Send } from 'lucide-react';

export default function ChatBox({ placeholder = "Type your message..." }) {
  return (
    <div className="flex flex-col h-full bg-[#1e293b] rounded-xl border border-gray-700 overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="text-center text-gray-500 mt-10">
          <p>AI Chat Placeholder</p>
          <p className="text-sm">Messages will appear here</p>
        </div>
      </div>
      <div className="p-3 bg-gray-800/50 border-t border-gray-700 flex gap-2">
        <input 
          type="text" 
          placeholder={placeholder}
          className="flex-1 bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
          disabled
        />
        <button className="bg-primary hover:bg-blue-700 text-white p-2 rounded-lg transition-colors" disabled>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
