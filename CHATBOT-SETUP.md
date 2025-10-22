# Grant Chatbot Setup Guide

A smart AI chatbot powered by OpenAI's GPT-5-nano that answers questions about the Baltimore AI Producers Lab grant application.

## Features

✅ **Smart & Fast**: Uses GPT-5-nano ($0.05 per 1M tokens - super cheap!)
✅ **Baltimore Branded**: Blue gradient UI matching your grant site
✅ **Mobile Responsive**: Works beautifully on all devices
✅ **Context Aware**: Pre-loaded with all grant details (budget, timeline, team, etc.)
✅ **Easy Integration**: Drop-in chatbot component

---

## Quick Start (Testing Only - NOT Secure!)

⚠️ **WARNING**: This method exposes your API key in the browser. Only use for quick testing!

### 1. Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-proj-...`)

### 2. Create .env file

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```bash
OPENAI_API_KEY=sk-proj-YOUR-ACTUAL-KEY-HERE
OPENAI_MODEL=gpt-5-nano
OPENAI_MAX_TOKENS=500
OPENAI_TEMPERATURE=0.7
```

### 3. Create env.js

```bash
cp env.example.js env.js
```

Edit `env.js` and add your API key (same as in .env):

```javascript
window.ENV = {
  OPENAI_API_KEY: 'sk-proj-YOUR-ACTUAL-KEY-HERE',
  OPENAI_MODEL: 'gpt-5-nano',
  OPENAI_MAX_TOKENS: 500,
  OPENAI_TEMPERATURE: 0.7
};
```

### 4. Test Locally

```bash
# Open index.html in your browser
open index.html
```

The chatbot button will appear in the bottom-left corner!

---

## Secure Production Setup (RECOMMENDED)

For production use, **NEVER expose your API key client-side**. Use a proxy instead.

### Option 1: Cloudflare Workers (Recommended - Free!)

**Why Cloudflare Workers?**
- ✅ Free tier: 100,000 requests/day
- ✅ Edge computing (super fast)
- ✅ Keeps API key secure server-side
- ✅ Easy to set up

#### Setup Steps:

1. **Sign up for Cloudflare** (free): https://dash.cloudflare.com/sign-up

2. **Create a Worker**:
   - Go to "Workers & Pages" → "Create"
   - Click "Create Worker"
   - Name it: `baltimore-grant-chatbot-proxy`

3. **Add this Worker code**:

```javascript
export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const body = await request.json();

      // Forward to OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: body.model || 'gpt-5-nano',
          messages: body.messages,
          max_tokens: body.max_tokens || 500,
          temperature: body.temperature || 0.7
        })
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};
```

4. **Add Environment Variable**:
   - In Worker settings → "Variables and Secrets"
   - Add variable: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
   - Make it "Encrypt" (secret)

5. **Deploy Worker**:
   - Click "Save and Deploy"
   - Copy the Worker URL (e.g., `https://baltimore-grant-chatbot-proxy.YOUR-SUBDOMAIN.workers.dev`)

6. **Update chatbot.js**:

Find the `callOpenAI` method and replace the fetch URL:

```javascript
async callOpenAI(userMessage) {
  const response = await fetch('https://baltimore-grant-chatbot-proxy.YOUR-SUBDOMAIN.workers.dev', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-5-nano',
      messages: [
        { role: 'system', content: this.systemPrompt },
        ...this.messages.slice(-6),
        { role: 'user', content: userMessage }
      ],
      max_tokens: 500,
      temperature: 0.7
    })
  });
  // ... rest of code
}
```

7. **Remove config.js dependency**:

Since the API key is now server-side, you can remove config.js entirely!

---

### Option 2: Vercel Edge Functions

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Create `/api/chat.js`**:

```javascript
export const config = {
  runtime: 'edge'
};

export default async function handler(request) {
  const { messages, model = 'gpt-5-nano' } = await request.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 500,
      temperature: 0.7
    })
  });

  return response;
}
```

3. **Add Environment Variable**:
```bash
vercel env add OPENAI_API_KEY
```

4. **Deploy**:
```bash
vercel --prod
```

---

### Option 3: Netlify Edge Functions

Similar to Vercel but using Netlify's platform.

1. Create `/netlify/edge-functions/chat.js`
2. Configure in `netlify.toml`
3. Deploy

---

## Model Options

You can use different OpenAI models by changing `OPENAI_MODEL` in your .env file:

| Model | Cost (per 1M tokens) | Best For |
|-------|---------------------|----------|
| `gpt-5-nano` | $0.05 input / $0.40 output | Simple Q&A (recommended) |
| `gpt-5-mini` | $0.25 input / $2 output | Smarter responses |
| `gpt-5-chat-latest` | Similar to gpt-5 | Conversational |
| `gpt-4o-mini` | $0.15 input / $0.60 output | Good balance |

**For this grant chatbot, gpt-5-nano is perfect!** The questions are straightforward and it's 10x cheaper than gpt-4o-mini.

---

## Customization

### Change System Prompt

Edit the `systemPrompt` in `chatbot.js` (around line 16) to customize the chatbot's knowledge and behavior.

### Change Colors

The chatbot uses Baltimore blue gradient by default. To change:

In `styles.css`, find `.chat-toggle` and `.chat-header`:

```css
background: linear-gradient(135deg, YOUR-COLOR-1 0%, YOUR-COLOR-2 100%);
```

### Change Position

The chatbot is in the bottom-left by default. To move it:

In `styles.css`, find `.grant-chatbot`:

```css
.grant-chatbot {
  bottom: 20px;
  left: 20px;  /* Change to 'right: 20px;' for bottom-right */
}
```

---

## Estimated Costs

**Average conversation**: 5 messages × 200 tokens each = 1,000 tokens total

**Using gpt-5-nano**:
- Input: 800 tokens × $0.05/1M = $0.00004
- Output: 800 tokens × $0.40/1M = $0.00032
- **Total per conversation: $0.00036**

**1,000 conversations per month = $0.36/month** 🤯

---

## Troubleshooting

### Chatbot button doesn't appear
- Check browser console for errors
- Make sure `env.js` exists (copy from env.example.js)
- Verify script tags are loaded: `<script src="env.js"></script>` and `<script src="chatbot.js"></script>`

### "API key not configured" error
- Copy `env.example.js` to `env.js`
- Add your OpenAI API key from your `.env` file
- Refresh the page

### Chatbot appears but doesn't respond
- Check API key is valid
- Verify you have OpenAI credits
- Check browser console for error messages
- Try a different model (e.g., `gpt-4o-mini`)

### "Model not found" error
- GPT-5 models released in August 2025
- If unavailable, use `gpt-4o-mini` instead
- Update OPENAI_MODEL in your .env and env.js files

---

## Security Checklist

✅ **.env and env.js are in .gitignore** (never commit API keys!)
✅ **Use proxy in production** (Cloudflare Worker recommended)
✅ **Set spending limits** in OpenAI dashboard
✅ **Monitor usage** regularly
✅ **Rotate keys** if exposed

---

## Support

Questions? Check:
- OpenAI API Docs: https://platform.openai.com/docs
- Cloudflare Workers: https://developers.cloudflare.com/workers/
- Open an issue on GitHub

---

## What's Next?

Want to make it better?

- 💡 Add conversation history persistence (localStorage)
- 🎨 Add dark mode support
- 📊 Track popular questions
- 🔗 Add "helpful links" suggestions
- 🎯 Add quick-reply buttons
- 📱 Add push notifications for responses

Enjoy your GPT-5-nano powered grant chatbot! 🚀
