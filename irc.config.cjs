// irc.config.js
module.exports = {
  PORT: 5173, //number
  geminiConfig: {
    /* 
    - gemini-1.5-flash 
    - gemini-1.5-flash-8b 
    - gemini-1.5-pro 
    - gemini-2.0-flash 
    - gemini-2.0-flash-thinking-exp-01-21
    */
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    },
  },
};
