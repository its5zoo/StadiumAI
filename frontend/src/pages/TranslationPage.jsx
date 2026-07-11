import React, { useState } from 'react';
import { Languages, Loader2 } from 'lucide-react';
import Card from '../components/Card';
import toast from 'react-hot-toast';

export default function TranslationPage() {
  const [sourceText, setSourceText] = useState("");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [translation, setTranslation] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast.error("Please enter text to translate.");
      return;
    }
    
    setIsTranslating(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/v1/ai/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: sourceText, targetLang })
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Translation failed');
      }

      setTranslation(data.data.translation);
      if (data.source === "fallback") {
        toast("Using offline dictionary", { icon: 'ℹ️' });
      }
    } catch (error) {
      toast.error(error.message || "AI unavailable. Check connection.");
      // Fallback local mock
      setTimeout(() => {
        setTranslation(`[Offline Mock]: Translated to ${targetLang}`);
      }, 500);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-3 mb-8">
        <Languages size={48} className="text-primary mb-2" />
        <h1 className="text-3xl font-bold text-white text-center">Multilingual Assistant</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Source (Auto-Detect)">
          <textarea 
            className="w-full h-48 bg-[#0f172a] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-primary resize-none"
            placeholder="Type your question or statement here..."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
          ></textarea>
        </Card>

        <Card title="Translation">
          <div className="mb-4">
            <select 
              className="bg-[#0f172a] border border-gray-700 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:border-primary"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="Arabic">Arabic</option>
              <option value="Hindi">Hindi</option>
              <option value="Japanese">Japanese</option>
            </select>
          </div>
          <div className="w-full h-[132px] bg-[#0f172a] border border-gray-700 rounded-lg p-4 text-gray-300 relative flex items-center justify-center">
            {isTranslating ? (
              <div className="flex flex-col items-center text-primary">
                <Loader2 className="animate-spin mb-2" size={24} />
                <span className="text-sm">Thinking...</span>
              </div>
            ) : translation ? (
              <div className="w-full h-full text-left">{translation}</div>
            ) : (
              <span className="text-gray-600 italic">Translation will appear here...</span>
            )}
          </div>
        </Card>
      </div>

      <div className="flex justify-end mt-6">
        <button 
          onClick={handleTranslate}
          className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
          disabled={isTranslating}
        >
          {isTranslating ? 'Translating...' : 'Translate'}
        </button>
      </div>
    </div>
  );
}
