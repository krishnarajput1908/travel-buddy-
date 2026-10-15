/**
 * TRAVEL BUDDY - Floating AI Chat Widget
 * Renders a FAB button + overlay chat panel on every page.
 * Acts as a tourist guide AI — answers travel questions in Hindi, Hinglish, or English.
 */

const AIFloatingChat = {
  isOpen: false,
  messages: [],
  isTyping: false,
  API_BASE: 'http://localhost:5000',

  // ── Welcome message ──────────────────────────────────────────────────────
  WELCOME: `Namaste! 🙏 Main hoon **Yatri**, tumhara AI travel buddy!

Tum mujhse Hindi, Hinglish, ya English — kisi bhi bhasha mein baat kar sakte ho.

Main help karunga:
- 🗺️ **Trip planning** — kahan, kab, kaise
- 💰 **Budget tips** — saste mein ghoomein
- 🏨 **Hotels & stays** — best options
- 🍽️ **Local food** — kya khana chahiye
- 🎒 **Packing** — kya le jaana hai

Toh batao... **kahan jaana chahte ho?** ✈️`,

  // ── Smart fallback responses ─────────────────────────────────────────────
  FALLBACK_RULES: [
    {
      match: /manali|himachal|himalay/i,
      reply: `**Manali** zabardast destination hai! 🏔️

**Best Time:** March–June & September–November.

**5-Day Plan:**
- Day 1: Mall Road explore
- Day 2: Solang Valley — paragliding (₹500-₹1500)
- Day 3: Rohtang Pass trek (₹2000-₹3500)
- Day 4: Old Manali + Vashisht Hot Springs
- Day 5: Departure

**Budget (2 log):** Bus: ₹800-₹1200, Hotel: ₹800-₹2500/night, Food: ₹400-₹700/day

Kuch specific poochho! 😊`
    },
    {
      match: /goa|beach|samudra/i,
      reply: `**Goa** — party, beaches, chill vibes! 🏖️

**Best Beaches:**
- 🌅 Palolem — romantic, south Goa
- 🎉 Baga/Calangute — nightlife, north Goa
- 🤿 Anjuna — flea market, hippie vibes

**Must Do:** Dudhsagar Falls (₹1000-₹1500), Spice plantation (₹600-₹800), Sunset cruise (₹500-₹1000)

**Budget tip:** Nov-Feb best hai, shoulder season Sep-Oct mein kam prices!`
    },
    {
      match: /ladakh|leh|spiti/i,
      reply: `**Ladakh** — India ka crown jewel! 👑

**Best Time:** June–September

**Must Visit:**
- 🏔️ Pangong Lake — magical blue water
- 🕌 Thiksey Monastery
- 🌄 Khardung La Pass
- 🚗 Nubra Valley — sand dunes!

**Health:** 2 days acclimatization zaroor karo, Diamox lo, alcohol avoid karo pehle 2-3 din

Aur kuch poochho! 🎒`
    },
    {
      match: /budget|cheap|sasta|kam paise|affordable/i,
      reply: `**Budget Travel Tips!** 💰

**Transport:** State buses, sleeper trains, Tatkal quota
**Stay:** Hostels ₹300-₹700/night, OYO ₹600-₹1200
**Food:** Dhabas ₹80-₹150/meal, street food!

**Best Budget Places:** Rishikesh, Varanasi, Hampi, Pushkar, McLeod Ganj

Kaunsa destination dhundh rahe ho? Better estimate dunga!`
    },
    {
      match: /solo|akela|alone/i,
      reply: `**Solo Travel Guide** 🎒

**Safety:** Location share karo, local SIM lo, reviews dekh ke book karo
**Best Solo Spots:** Rishikesh, Goa, McLeod Ganj, Hampi

**Budget:** ₹800-₹1500/day hostels, ₹1500-₹2500/day mid-range

**Apps:** Hostelworld, Couchsurfing

Aur kuch poochho yaar! 🤜`
    },
    {
      match: /pack|luggage|bag|kya le|kya lena/i,
      reply: `**Packing Essentials!** 🎒

**Clothes:** 3-4 quick-dry tops, warm layers, walking shoes
**Docs:** Aadhar/Passport (phone mein photos bhi), travel insurance
**Health:** Paracetamol, ORS, sunscreen SPF 50+
**Gadgets:** Power bank 20K mAh, universal adapter

**Golden Rule:** Jo pehna ho use nikalo bag se — phir bhi lagta hai toh mat lo! 😄`
    },
    {
      match: /kerala|backwater|munnar|alleppey/i,
      reply: `**Kerala — God's Own Country!** 🌴

**Must Visit:** Alleppey houseboat (₹5K-₹15K/night), Munnar tea estates, Periyar Safari, Varkala Beach

**7-Day Plan:** Kochi → Munnar → Thekkady → Alleppey → Varkala

**Budget (4 log, 7 days):** ₹60K-₹1L — expensive hai par value amazing!`
    },
    {
      match: /rajasthan|jaipur|jodhpur|jaisalmer|udaipur/i,
      reply: `**Rajasthan — Royal Land!** 👑

**Top Spots:** Amber Fort (Jaipur), Mehrangarh (Jodhpur), Desert Safari (Jaisalmer), Lake Pichola (Udaipur)

**Food:** Dal Baati Churma, Laal Maas, Mawa Kachori, Lassi

**Best Time:** Oct–Mar. Avoid May-June (50°C+!)

Kitne din ka trip? Full itinerary bana dunga!`
    }
  ],

  DEFAULT_REPLIES: [
    `Interesting sawal hai! 🤔 Thoda aur batao:
- **Kahan jaana chahte ho?**
- **Kitne din ka trip?**
- **Kitna budget hai?**

Main tailor-made plan bana dunga! ✈️`,

    `Zabardast! 😊 Specific batao:
- Destination naam clearly
- Season ya month
- Budget roughly kitna?

Hindi ya English — dono mein help karunga!`,

    `Acha acha! 🌟 Trip planning mein expert hoon. Batao:
- Kab ka plan hai?
- Kahan se start karoge?
- Nature, adventure, history, food — kya dekhna hai?

Solid plan banata hoon! 💪`
  ],

  // ── Init: inject HTML + bind events ─────────────────────────────────────
  init() {
    // Don't render on the ai-chat.html page (it has its own full chat)
    const page = window.location.pathname.split('/').pop() || 'index.html';
    if (page === 'ai-chat.html') return;

    this.injectHTML();
    this.bindEvents();
    this.renderWelcome();
  },

  injectHTML() {
    // ── FAB Button ──
    const fab = document.createElement('button');
    fab.className = 'ai-chat-fab';
    fab.id = 'ai-chat-fab';
    fab.setAttribute('aria-label', 'Open AI Travel Buddy Chat');
    fab.innerHTML = `
      <i class="fas fa-robot"></i>
      <span class="ai-chat-fab-tooltip">💬 Ask AI Travel Buddy</span>
    `;
    document.body.appendChild(fab);

    // ── Chat Overlay Panel ──
    const overlay = document.createElement('div');
    overlay.className = 'ai-chat-overlay';
    overlay.id = 'ai-chat-overlay';
    overlay.innerHTML = `
      <!-- Header -->
      <div class="ai-overlay-header">
        <div class="overlay-avatar"><i class="fas fa-robot"></i></div>
        <div class="overlay-info">
          <div class="overlay-title">Yatri — AI Travel Buddy</div>
          <div class="overlay-status">Online & Ready</div>
        </div>
        <div class="ai-overlay-actions">
          <button onclick="AIFloatingChat.clearChat()" title="New Chat"><i class="fas fa-rotate"></i></button>
          <button onclick="AIFloatingChat.toggle()" title="Close"><i class="fas fa-xmark"></i></button>
        </div>
      </div>

      <!-- Quick Prompts -->
      <div class="ai-overlay-prompts" id="ai-overlay-prompts">
        <button class="ai-overlay-prompt-chip" onclick="AIFloatingChat.sendQuick(this)">🏔️ Manali trip plan</button>
        <button class="ai-overlay-prompt-chip" onclick="AIFloatingChat.sendQuick(this)">🏖️ Goa beaches</button>
        <button class="ai-overlay-prompt-chip" onclick="AIFloatingChat.sendQuick(this)">💰 Budget travel tips</button>
        <button class="ai-overlay-prompt-chip" onclick="AIFloatingChat.sendQuick(this)">✈️ Ladakh best time</button>
        <button class="ai-overlay-prompt-chip" onclick="AIFloatingChat.sendQuick(this)">🎒 Solo travel guide</button>
        <button class="ai-overlay-prompt-chip" onclick="AIFloatingChat.sendQuick(this)">👑 Rajasthan itinerary</button>
      </div>

      <!-- Messages -->
      <div class="ai-overlay-messages" id="ai-overlay-messages"></div>

      <!-- Input Bar -->
      <div class="ai-overlay-input-bar">
        <div class="ai-overlay-textarea-wrap">
          <textarea id="ai-overlay-input" placeholder="Poochho kuch bhi... ✈️" rows="1" maxlength="800"></textarea>
        </div>
        <button class="ai-overlay-send-btn" id="ai-overlay-send-btn" onclick="AIFloatingChat.sendMessage()" title="Send">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    `;
    document.body.appendChild(overlay);
  },

  bindEvents() {
    const fab = document.getElementById('ai-chat-fab');
    fab.addEventListener('click', () => this.toggle());

    const input = document.getElementById('ai-overlay-input');
    if (!input) return;

    // Auto-resize textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 80) + 'px';
    });

    // Enter = send, Shift+Enter = newline
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
  },

  toggle() {
    this.isOpen = !this.isOpen;
    const fab = document.getElementById('ai-chat-fab');
    const overlay = document.getElementById('ai-chat-overlay');
    const fabIcon = fab.querySelector('i');

    if (this.isOpen) {
      fab.classList.add('open');
      overlay.classList.add('open');
      fabIcon.className = 'fas fa-xmark';
      // Focus the input
      setTimeout(() => {
        const input = document.getElementById('ai-overlay-input');
        if (input) input.focus();
      }, 400);
    } else {
      fab.classList.remove('open');
      overlay.classList.remove('open');
      fabIcon.className = 'fas fa-robot';
    }
  },

  renderWelcome() {
    const container = document.getElementById('ai-overlay-messages');
    if (!container) return;
    container.innerHTML = '';
    this.messages = [];
    this.appendMessage('ai', this.WELCOME);
  },

  sendMessage() {
    const input = document.getElementById('ai-overlay-input');
    const text = input?.value?.trim();
    if (!text || this.isTyping) return;

    this.appendMessage('user', text);
    input.value = '';
    input.style.height = 'auto';

    this.showTyping();

    this.getAIResponse(text).then(reply => {
      this.hideTyping();
      this.appendMessage('ai', reply);
    });
  },

  sendQuick(btn) {
    const text = btn.textContent.trim();
    const input = document.getElementById('ai-overlay-input');
    if (input) {
      input.value = text;
      input.dispatchEvent(new Event('input'));
    }
    this.sendMessage();
  },

  async getAIResponse(userMessage) {
    // Try backend Gemini API
    try {
      const token = localStorage.getItem('tb_jwt_token');
      if (token) {
        const currentTrip = (() => {
          try {
            const it = JSON.parse(localStorage.getItem('tb_active_itinerary') || 'null');
            return it ? it.destinationName : null;
          } catch(e) { return null; }
        })();

        const user = (() => {
          try { return JSON.parse(localStorage.getItem('tb_currentUser') || 'null'); } catch(e) { return null; }
        })();

        const res = await fetch(`${this.API_BASE}/api/ai/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            message: userMessage,
            currentTrip,
            userName: user?.name
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.reply) {
            return data.reply;
          }
        }
      }
    } catch(e) { /* Fall through to local */ }

    // Local smart fallback
    return this.localFallback(userMessage);
  },

  localFallback(msg) {
    for (const rule of this.FALLBACK_RULES) {
      if (rule.match.test(msg)) {
        return rule.reply;
      }
    }
    return this.DEFAULT_REPLIES[Math.floor(Math.random() * this.DEFAULT_REPLIES.length)];
  },

  appendMessage(role, text) {
    const container = document.getElementById('ai-overlay-messages');
    if (!container) return;

    const isUser = role === 'user';
    const avatarIcon = isUser ? 'fa-user' : 'fa-robot';
    const html = this.markdownToHtml(text);

    const msgEl = document.createElement('div');
    msgEl.className = `chat-msg ${isUser ? 'user' : ''}`;
    msgEl.innerHTML = `
      <div class="msg-avatar">
        <i class="fas ${avatarIcon}"></i>
      </div>
      <div class="chat-bubble">${html}</div>
    `;
    container.appendChild(msgEl);
    container.scrollTop = container.scrollHeight;

    this.messages.push({ role, text });
  },

  showTyping() {
    this.isTyping = true;
    const container = document.getElementById('ai-overlay-messages');
    if (!container) return;

    const typingEl = document.createElement('div');
    typingEl.id = 'ai-overlay-typing';
    typingEl.className = 'chat-typing-row';
    typingEl.innerHTML = `
      <div class="msg-avatar"><i class="fas fa-robot"></i></div>
      <div class="typing-bubble">
        <span></span><span></span><span></span>
      </div>
    `;
    container.appendChild(typingEl);
    container.scrollTop = container.scrollHeight;

    const btn = document.getElementById('ai-overlay-send-btn');
    if (btn) btn.disabled = true;
  },

  hideTyping() {
    this.isTyping = false;
    const el = document.getElementById('ai-overlay-typing');
    if (el) el.remove();
    const btn = document.getElementById('ai-overlay-send-btn');
    if (btn) btn.disabled = false;
  },

  clearChat() {
    this.messages = [];
    this.renderWelcome();
  },

  markdownToHtml(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^- (.+)$/gm, '<li style="margin-left:1rem;margin-bottom:0.2rem;">$1</li>')
      .replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul style="margin:0.4rem 0;">$&</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^(.+)$/, '<p>$1</p>');
  }
};

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  AIFloatingChat.init();
});
