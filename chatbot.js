/**
 * Baltimore AI Producers Lab - Grant Chatbot
 * Powered by OpenAI GPT-5-nano
 */

class GrantChatbot {
  constructor() {
    this.messages = [];
    this.isOpen = false;
    this.isProcessing = false;

    // System prompt with grant context
    this.systemPrompt = `You are a helpful assistant for the Baltimore AI Producers Lab grant application.

PROGRAM OVERVIEW:
- 30 families (up to 100 Baltimore residents total)
- $250,000 total budget ($8,333 per family for Year 1 pilot)
- 6-month program teaching families to BUILD AI tools (not just use them)
- Starting at age 14, family-based learning approach
- Producer-first mindset: create AI tools, don't just consume them

KEY INNOVATIONS:
- Start young (age 14) before consumer habits form
- Family learning model (entire households learn together)
- Local models (work offline, true ownership, no subscriptions)
- Hands-on curriculum: Prompt Lab, Tool Builder Studio, RAG Explorer, Model Lab, MCP Server Studio

TECHNICAL INFRASTRUCTURE:
- 2x NVIDIA DGX Spark ($10K) for fine-tuning models up to 405B parameters
- 3x Mac Studio M3 Ultra ($35K) for inference via Ollama
- Workflow: DGX Spark fine-tuning → GGUF export → Ollama deployment → Family access
- Take-home kits (details in development)

TEAM:
- Program Director ($35K)
- ML Technical Lead ($45K)
- 4 community college education/childcare majors + 2 TAMS HS students ($20K total)

TARGET POPULATION:
- 21.7% of Black youth in Baltimore are Opportunity Youth
- 40.7% of Baltimore households lack broadband
- 58.3% of Baltimore graduates need college remediation
- Addressing the digital divide and AI skills gap

Answer questions clearly and concisely. If you don't know something specific, be honest. Focus on the producer-first approach and family learning model that makes this program unique.`;

    this.init();
  }

  init() {
    this.createChatUI();
    this.attachEventListeners();
  }

  createChatUI() {
    // Create chat container
    const chatHTML = `
      <div id="grantChatbot" class="grant-chatbot">
        <button id="chatToggle" class="chat-toggle" aria-label="Toggle chat">
          <span class="chat-icon">🤖</span>
          <span class="chat-text">Ask about Grant</span>
        </button>

        <div id="chatWindow" class="chat-window" style="display: none;">
          <div class="chat-header">
            <div class="chat-header-content">
              <span class="chat-avatar">🤖</span>
              <div class="chat-title">
                <strong>Grant Assistant</strong>
                <span class="chat-subtitle">Baltimore AI Producers Lab</span>
              </div>
            </div>
            <button id="chatClose" class="chat-close-btn" aria-label="Close chat">&times;</button>
          </div>

          <div id="chatMessages" class="chat-messages">
            <div class="chat-message bot-message">
              <div class="message-avatar">🤖</div>
              <div class="message-content">
                <p>Hi! I'm here to answer questions about the Baltimore AI Producers Lab grant application.</p>
                <p><strong>Try asking:</strong></p>
                <ul>
                  <li>"What makes this program unique?"</li>
                  <li>"How much does it cost per family?"</li>
                  <li>"What's the technical infrastructure?"</li>
                  <li>"Who is the target population?"</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="chat-input-container">
            <textarea id="chatInput"
                      class="chat-input"
                      placeholder="Ask about the grant..."
                      rows="1"
                      maxlength="500"></textarea>
            <button id="chatSend" class="chat-send-btn" aria-label="Send message">
              <span class="send-icon">➤</span>
            </button>
          </div>

          <div class="chat-footer">
            <small class="muted">Powered by GPT-5-nano • <span id="messageCount">0</span> messages</small>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }

  attachEventListeners() {
    const toggle = document.getElementById('chatToggle');
    const close = document.getElementById('chatClose');
    const send = document.getElementById('chatSend');
    const input = document.getElementById('chatInput');

    toggle.addEventListener('click', () => this.toggleChat());
    close.addEventListener('click', () => this.toggleChat());
    send.addEventListener('click', () => this.sendMessage());

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Auto-resize textarea
    input.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
  }

  toggleChat() {
    const window = document.getElementById('chatWindow');
    const toggle = document.getElementById('chatToggle');

    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      window.style.display = 'flex';
      toggle.style.display = 'none';
      document.getElementById('chatInput').focus();
    } else {
      window.style.display = 'none';
      toggle.style.display = 'flex';
    }
  }

  async sendMessage() {
    if (this.isProcessing) return;

    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message to UI
    this.addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';

    // Update message count
    this.messages.push({ role: 'user', content: message });
    this.updateMessageCount();

    // Show typing indicator
    this.isProcessing = true;
    this.addTypingIndicator();

    try {
      // Check if ENV is loaded
      if (typeof window.ENV === 'undefined' || !window.ENV.OPENAI_API_KEY || window.ENV.OPENAI_API_KEY.includes('your-api-key-here')) {
        throw new Error('API key not configured. Please create env.js from env.example.js');
      }

      const response = await this.callOpenAI(message);
      this.removeTypingIndicator();
      this.addMessage(response, 'bot');
      this.messages.push({ role: 'assistant', content: response });
      this.updateMessageCount();
    } catch (error) {
      this.removeTypingIndicator();
      this.addMessage(
        `⚠️ Error: ${error.message}\n\nPlease check your API key in env.js`,
        'bot error'
      );
    } finally {
      this.isProcessing = false;
    }
  }

  async callOpenAI(userMessage) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.ENV.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: window.ENV.OPENAI_MODEL || 'gpt-5-nano',
        messages: [
          { role: 'system', content: this.systemPrompt },
          ...this.messages.slice(-6), // Last 6 messages for context
          { role: 'user', content: userMessage }
        ],
        max_tokens: window.ENV.OPENAI_MAX_TOKENS || 500,
        temperature: window.ENV.OPENAI_TEMPERATURE || 0.7
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  addMessage(content, type) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageHTML = `
      <div class="chat-message ${type}-message">
        <div class="message-avatar">${type === 'user' ? '👤' : '🤖'}</div>
        <div class="message-content">${this.formatMessage(content)}</div>
      </div>
    `;
    messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  addTypingIndicator() {
    const messagesDiv = document.getElementById('chatMessages');
    const typingHTML = `
      <div id="typingIndicator" class="chat-message bot-message">
        <div class="message-avatar">🤖</div>
        <div class="message-content">
          <div class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    `;
    messagesDiv.insertAdjacentHTML('beforeend', typingHTML);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
  }

  formatMessage(content) {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  updateMessageCount() {
    const count = this.messages.filter(m => m.role === 'user').length;
    document.getElementById('messageCount').textContent = count;
  }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if env is loaded
  if (typeof window.ENV !== 'undefined') {
    window.grantChatbot = new GrantChatbot();
    console.log('Grant Chatbot initialized with', window.ENV.OPENAI_MODEL);
  } else {
    console.warn('Chatbot not initialized: env.js not found. Copy env.example.js to env.js and add your API key');
  }
});
