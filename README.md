# Baltimore AI Producers Lab - Grant Application

Complete grant package with interactive features for the $250K Baltimore AI Producers Lab program.

## 🆕 New Features

### AI Chatbot Assistant 🤖
A GPT-5-nano powered chatbot that answers questions about the grant! See [CHATBOT-SETUP.md](CHATBOT-SETUP.md) for setup.

**Features:**
- Answers questions about budget, timeline, team, technical infrastructure
- Uses GPT-5-nano ($0.05/1M tokens - super cheap!)
- Baltimore-branded blue gradient UI
- Mobile responsive
- ~$0.36/month for 1,000 conversations

**Quick Setup:**
1. Copy `config.example.js` to `config.js`
2. Add your OpenAI API key
3. Done! Chatbot appears bottom-left

For production (secure), use Cloudflare Workers proxy - see full guide in [CHATBOT-SETUP.md](CHATBOT-SETUP.md).

---

## Quick Start

1. **Download the file**: `grant-strategy.html`

2. **Upload to GitHub**:
   - Go to https://github.com/w4ester/bmoregrant
   - Click "Add file" → "Upload files"
   - Drag and drop `grant-strategy.html`
   - Commit with message: "Add grant strategy page"

3. **Access your new page**:
   - After uploading, visit: https://w4ester.github.io/bmoregrant/

## Optional: Add Navigation Link

To add a link from your main page to the grant strategy page, you can add this button/link to your `index.html`:

```html
<a href="grant-strategy.html" class="button">View Grant Strategy →</a>
```

## Features of the Grant Strategy Page

✨ **Beautiful Design**:
- Hero section with key stats
- Sticky navigation bar
- Smooth scrolling between sections
- Responsive mobile design
- Gradient backgrounds and animations

📊 **Comprehensive Sections**:
1. Executive Summary - The hook and key innovations
2. Problem & Opportunity - Target population and AI divide
3. Solution & Innovation - 7-module platform details
4. Implementation Plan - 6-month timeline
5. Budget Breakdown - $250K detailed allocation
6. Expected Outcomes - Primary and secondary metrics
7. Scaling Path - Year 1-3 growth plan

🎨 **Visual Elements**:
- Interactive cards that respond on hover
- Timeline visualization
- Budget comparison table
- Metrics dashboard
- Color-coded problem/solution boxes
- Icon-based navigation

🚀 **Professional Features**:
- Scroll-based navigation highlighting
- Smooth animations on scroll
- Mobile-responsive design
- Accessible color contrasts
- Professional typography

## GitHub Pages Setup

If you haven't enabled GitHub Pages yet:

1. Go to your repository Settings
2. Scroll to "Pages" section
3. Under "Source", select "main" branch
4. Click "Save"
5. Your site will be live at: https://w4ester.github.io/bmoregrant/

## Need Help?

If you encounter any issues or want to customize the page further, let me know!
