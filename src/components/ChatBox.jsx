import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function ChatBox({ messages, onSendMessage, placeholder = "Type your message..." }) {
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#1e293b] rounded-xl border border-gray-700 overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p>AI Chat Ready</p>
            <p className="text-sm">Ask a question to begin.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${msg.isUser ? 'bg-primary text-white' : 'bg-gray-700 text-gray-100'}`}>
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="p-3 bg-gray-800/50 border-t border-gray-700 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={placeholder}
          className="flex-1 bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
        />
        <button 
          onClick={handleSend}
          className="bg-primary hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
