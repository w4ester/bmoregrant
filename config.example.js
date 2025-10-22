// Copy this file to config.js and add your OpenAI API key
// NEVER commit config.js to git (it's in .gitignore)

const CONFIG = {
  // Get your API key from: https://platform.openai.com/api-keys
  OPENAI_API_KEY: 'sk-proj-your-api-key-here',

  // Model to use (gpt-5-nano is cheapest at $0.05/1M tokens)
  MODEL: 'gpt-5-nano',

  // Alternative models you can try:
  // 'gpt-5-mini' - $0.25/1M tokens (smarter)
  // 'gpt-5-chat-latest' - conversational variant
  // 'gpt-4o-mini' - older model, still good

  // Maximum tokens for response (keep low to save costs)
  MAX_TOKENS: 500,

  // Temperature (0-2, lower = more focused)
  TEMPERATURE: 0.7,

  // IMPORTANT SECURITY NOTE:
  // This approach exposes your API key in the browser!
  // For production, use one of these instead:
  // 1. Cloudflare Worker proxy (recommended, free)
  // 2. Vercel Edge Function
  // 3. Netlify Edge Function
  // 4. Your own backend API
  //
  // See README.md for secure setup instructions
};
