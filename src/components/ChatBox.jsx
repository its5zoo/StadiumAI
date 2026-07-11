import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import Card from './Card';
import toast from 'react-hot-toast';

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your MatchDay AI assistant. How can I help you today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = { id: Date.now(), text: inputValue, isBot: false };
    setMessages(prev => [...prev, newMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/v1/ai/navigation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ query: newMsg.text })
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'AI request failed');
      }

      setMessages(prev => [...prev, { id: Date.now(), text: data.data.response, isBot: true }]);
    } catch (error) {
      toast.error(error.message || "AI unavailable. Check connection.");
      // Fallback local mock
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now(), text: "I'm having trouble connecting to the network. Please find a stadium map nearby.", isBot: true }]);
      }, 500);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Card title="Navigation Assistant" className="h-[500px] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0 ${msg.isBot ? 'bg-primary/20 text-primary' : 'bg-gray-700 text-white'}`}>
                {msg.isBot ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className={`p-3 rounded-2xl ${msg.isBot ? 'bg-[#1e293b] rounded-tl-none border border-gray-700 text-gray-200' : 'bg-primary rounded-tr-none text-white'}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%] flex-row">
              <div className="p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0 bg-primary/20 text-primary">
                <Bot size={20} />
              </div>
              <div className="p-3 rounded-2xl bg-[#1e293b] rounded-tl-none border border-gray-700 text-gray-400 italic">
                Thinking...
              </div>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSend} className="relative mt-auto border-t border-gray-800 pt-4 px-2">
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask where to go..."
          className="w-full bg-[#0f172a] border border-gray-700 rounded-full py-3 pl-4 pr-12 text-white focus:outline-none focus:border-primary"
          disabled={isTyping}
        />
        <button 
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-blue-400 transition-colors mt-2"
          disabled={isTyping}
        >
          <Send size={20} />
        </button>
      </form>
    </Card>
  );
}
