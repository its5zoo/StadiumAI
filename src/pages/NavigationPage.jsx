import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';
import Card from '../components/Card';
import { stadiumData } from '../mock/stadiumData';
import { navigationResponses } from '../mock/navigationResponses';

export default function NavigationPage() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    // Add user message
    const newMessages = [...messages, { text, isUser: true }];
    setMessages(newMessages);

    // Mock AI response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseText = "I'm sorry, I don't know the answer to that yet. Try asking 'where is gate a' or 'where is washroom'.";
      
      for (const [key, value] of Object.entries(navigationResponses)) {
        if (lowerText.includes(key)) {
          responseText = value;
          break;
        }
      }

      setMessages(prev => [...prev, { text: responseText, isUser: false }]);
    }, 500);
  };

  const handleQuickAction = (query) => {
    handleSendMessage(query);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Navigation Assistant</h1>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-1 h-[600px] lg:h-full">
          <ChatBox 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            placeholder="Ask for directions..." 
          />
        </div>

        {/* Map Placeholder */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex-1 bg-[#1e293b] rounded-xl border border-gray-700 flex items-center justify-center min-h-[300px]">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                Map
              </div>
              <p>Interactive Map Placeholder</p>
              <div className="mt-4 flex gap-2 flex-wrap justify-center">
                <button onClick={() => handleQuickAction("Where is Gate A?")} className="px-3 py-1 bg-gray-800 rounded border border-gray-600 hover:bg-gray-700">Gate A</button>
                <button onClick={() => handleQuickAction("Where is Gate B?")} className="px-3 py-1 bg-gray-800 rounded border border-gray-600 hover:bg-gray-700">Gate B</button>
                <button onClick={() => handleQuickAction("Where is food court?")} className="px-3 py-1 bg-gray-800 rounded border border-gray-600 hover:bg-gray-700">Food Court</button>
                <button onClick={() => handleQuickAction("Where is washroom?")} className="px-3 py-1 bg-gray-800 rounded border border-gray-600 hover:bg-gray-700">Washroom</button>
              </div>
            </div>
          </div>
          
          <Card title="Recent Queries">
            <div className="flex gap-2 flex-wrap">
              {stadiumData.map((item, index) => (
                <button 
                  key={index}
                  onClick={() => handleQuickAction(`Where is ${item.place.toLowerCase()}?`)} 
                  className="px-3 py-1 bg-[#0f172a] hover:bg-gray-800 rounded-full text-sm border border-gray-700 transition-colors"
                >
                  Find {item.place}
                </button>
              ))}
              <button 
                onClick={() => handleQuickAction("Where is nearest exit?")}
                className="px-3 py-1 bg-[#0f172a] hover:bg-gray-800 rounded-full text-sm border border-gray-700 transition-colors"
              >
                Nearest Exit
              </button>
              <button 
                onClick={() => handleQuickAction("Where is gate a?")}
                className="px-3 py-1 bg-[#0f172a] hover:bg-gray-800 rounded-full text-sm border border-gray-700 transition-colors"
              >
                Gate A
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
