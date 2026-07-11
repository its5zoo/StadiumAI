export const isPromptInjection = (text) => {
  if (!text) return false;
  
  const suspiciousKeywords = [
    "ignore previous",
    "ignore all",
    "system prompt",
    "forget previous",
    "database access",
    "show all records",
    "jailbreak",
    "bypass instructions",
    "as an ai language model",
    "print your instructions",
    "what are your instructions"
  ];

  const lowerText = text.toLowerCase();
  
  for (const keyword of suspiciousKeywords) {
    if (lowerText.includes(keyword)) {
      return true;
    }
  }

  return false;
};
