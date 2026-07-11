import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { translations } from '../mock/translations';

export default function TranslationPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [sourceLang, setSourceLang] = useState("Spanish");
  const [targetLang, setTargetLang] = useState("English");

  const handleTranslate = () => {
    const lowerInput = inputText.trim().toLowerCase();
    
    // Exact match for the mock dictionary
    if (translations[lowerInput]) {
      setOutputText(translations[lowerInput]);
    } else {
      // Mock failure or generic response
      setOutputText("Translation unavailable in mock data. Try: 'hola', 'gracias', or '¿dónde está la puerta a?'");
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center mb-8">Multilingual Assistant</h1>

      <div className="bg-[#1e293b] rounded-xl border border-gray-700 p-4 md:p-6 shadow-lg">
        {/* Language Selectors */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <select 
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full md:w-[45%] bg-[#0f172a] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>Arabic</option>
          </select>
          
          <button onClick={handleSwap} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors text-gray-400">
            <ArrowRightLeft size={20} />
          </button>

          <select 
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full md:w-[45%] bg-[#0f172a] border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary"
          >
            <option>Spanish</option>
            <option>English</option>
            <option>French</option>
            <option>Arabic</option>
          </select>
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-48 bg-[#0f172a] border border-gray-700 rounded-lg p-4 text-white resize-none outline-none focus:border-primary"
              placeholder="Enter text to translate..."
            ></textarea>
          </div>
          <div className="flex flex-col">
            <div className={`w-full h-48 bg-[#0f172a] border border-gray-700 rounded-lg p-4 ${outputText ? 'text-white' : 'text-gray-400'}`}>
              {outputText || "Translation will appear here..."}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleTranslate}
            className="bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg transition-colors"
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );
}
