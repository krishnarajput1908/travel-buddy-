import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI (only if key is set)
const getGeminiModel = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') return null;
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
};

// @desc    Freeform AI Travel Chat (Hindi/Hinglish/English)
// @route   POST /api/ai/chat
// @access  Private
export const chatWithBuddy = async (req, res, next) => {
  try {
    const { message, currentTrip, userName } = req.body;
    if (!message) return res.status(400).json({ success: false, message: 'Message is required' });

    const model = getGeminiModel();
    if (!model) {
      return res.json({ success: true, source: 'template', reply: getLocalChatReply(message) });
    }

    const contextStr = currentTrip ? `The user is currently planning/on a trip to: ${currentTrip}.` : '';
    const nameStr = userName ? `User's name is ${userName}.` : '';

    const prompt = `You are "Yatri", a friendly AI travel assistant for an Indian travel app called Travel Buddy.
${nameStr} ${contextStr}

IMPORTANT RULES:
1. You MUST reply in the SAME language the user writes in. If they write in Hindi/Hinglish, reply in Hindi/Hinglish. If English, reply in English.
2. Be conversational, warm, and like a knowledgeable travel buddy — not a formal assistant.
3. Focus ONLY on travel — destinations, planning, budgets, food, transport, packing, safety in India.
4. Use emojis naturally to make responses feel lively.
5. If the question is off-topic from travel, gently redirect to travel topics.
6. Keep responses concise but complete — use bullet points for lists.
7. Always end with a follow-up question or invitation to ask more.

User message: "${message}"

Reply naturally in the SAME language as the user's message:`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text().trim();

    res.json({ success: true, source: 'gemini', reply });
  } catch (error) {
    console.error('Chat Error:', error.message);
    next(error);
  }
};

function getLocalChatReply(message) {
  const msg = message.toLowerCase();
  if (/manali|himachal/i.test(msg)) return 'Manali ek ekdum mast destination hai! Best time March-June hai. Budget roughly ₹15,000-₹25,000 per person for 5 days. Koi aur sawaal?';
  if (/goa|beach/i.test(msg)) return 'Goa ke beaches sach mein zabardast hain! Palolem beach for peace, Baga for nightlife. Budget: ₹10,000-₹20,000 for 4 days. Kab jaana hai?';
  if (/ladakh|leh/i.test(msg)) return 'Ladakh India ka gem hai! June-September best time. Acclimatization zaroor karo. Budget: ₹25,000-₹40,000 for 7 days. Aur kuch poochho!';
  if (/budget|cheap|sasta/i.test(msg)) return 'Budget travel ke liye: state buses lo, hostels prefer karo, local food khao. Rishikesh aur Pushkar very affordable hain! Specific destination batao?';
  if (/kerala/i.test(msg)) return 'Kerala God\'s Own Country hai! Backwaters, Munnar, beaches sab mast hai. Oct-Feb best time. 7 days mein ₹40,000-₹70,000 (2 log). Family ke saath perfect!';
  if (/rajasthan|jaipur|jodhpur/i.test(msg)) return 'Rajasthan ka royal experience toh must hai! Jaipur-Jodhpur-Jaisalmer circuit 7-8 din ka plan karo. Oct-March best. Budget: ₹30,000-₹50,000 (2 log). Chai aur Dal Baati zaroor try karo!';
  return 'Acha sawaal hai! Thoda aur batao — kahan jaana chahte ho, kitne din ka trip, aur budget roughly kitna hai? Main full plan bana sakta hoon! 🗺️';
}


// @desc    Generate AI-powered smart itinerary
// @route   POST /api/ai/itinerary
// @access  Private
export const generateItinerary = async (req, res, next) => {
  try {
    const { destination, origin, durationDays, travellers, travelType, transport, accommodation, budget, interests } = req.body;

    if (!destination || !durationDays) {
      return res.status(400).json({ success: false, message: 'Destination and duration are required' });
    }

    const model = getGeminiModel();

    if (!model) {
      // Fallback: generate a template-based itinerary without AI
      const days = generateFallbackItinerary(destination, durationDays, travelType, interests);
      return res.json({
        success: true,
        source: 'template',
        itinerary: { destination, durationDays, days }
      });
    }

    // Build AI prompt
    const interestStr = interests && interests.length > 0 ? interests.join(', ') : 'general sightseeing';
    const prompt = `You are a professional travel planner. Create a detailed ${durationDays}-day itinerary for a trip to ${destination} from ${origin || 'nearby city'}.

Trip Details:
- Travelers: ${travellers || 2} (${travelType || 'Mixed group'})
- Transport: ${transport || 'Flight'}
- Accommodation: ${accommodation || 'Standard'}
- Approximate Budget: ₹${budget || 50000}
- Traveler Interests: ${interestStr}

Generate a JSON response with this EXACT structure (no markdown, no code fences, just pure JSON):
{
  "days": [
    {
      "dayNumber": 1,
      "title": "Day 1: Arrival & First Impressions",
      "activities": [
        {
          "time": "09:00 AM",
          "title": "Activity name",
          "location": "Place name",
          "cost": 500,
          "description": "Brief 1-line description",
          "type": "transport|food|sightseeing|adventure|culture|shopping|relaxation"
        }
      ]
    }
  ],
  "tips": ["Useful tip 1", "Useful tip 2"],
  "budgetAdvisory": "A brief sentence about whether the budget is realistic for this trip"
}

Include 4-6 activities per day. Make it realistic with actual places in ${destination}. Costs in INR.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse AI response
    let parsed;
    try {
      // Remove potential markdown code fences
      const cleanJson = responseText.replace(/```json?\s*/gi, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.error('AI response parse error:', parseErr.message);
      // Fallback if AI response is unparseable
      const days = generateFallbackItinerary(destination, durationDays, travelType, interests);
      return res.json({
        success: true,
        source: 'template',
        itinerary: { destination, durationDays, days }
      });
    }

    res.json({
      success: true,
      source: 'gemini',
      itinerary: {
        destination,
        durationDays,
        days: parsed.days || [],
        tips: parsed.tips || [],
        budgetAdvisory: parsed.budgetAdvisory || ''
      }
    });
  } catch (error) {
    console.error('AI Itinerary Error:', error.message);
    next(error);
  }
};

// @desc    Get AI destination suggestions based on interests
// @route   POST /api/ai/suggest-destinations
// @access  Private
export const getDestinationSuggestions = async (req, res, next) => {
  try {
    const { interests, budget, travelType } = req.body;

    if (!interests || interests.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide at least one interest' });
    }

    const model = getGeminiModel();

    if (!model) {
      // Fallback suggestions
      const suggestions = getFallbackSuggestions(interests);
      return res.json({ success: true, source: 'template', suggestions });
    }

    const prompt = `Based on these travel interests: ${interests.join(', ')}
Budget preference: ${budget || 'Moderate'}
Travel type: ${travelType || 'Mixed'}

Suggest 6 Indian destinations. Return ONLY valid JSON (no markdown, no code fences):
{
  "suggestions": [
    {
      "name": "Destination Name",
      "state": "State",
      "reason": "One line why this matches their interests",
      "bestTime": "Best months to visit",
      "estimatedBudget": "₹XX,XXX per person for 4 days"
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    let parsed;
    try {
      const cleanJson = responseText.replace(/```json?\s*/gi, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      const suggestions = getFallbackSuggestions(interests);
      return res.json({ success: true, source: 'template', suggestions });
    }

    res.json({ success: true, source: 'gemini', suggestions: parsed.suggestions || [] });
  } catch (error) {
    console.error('AI Suggestions Error:', error.message);
    next(error);
  }
};

// @desc    Get AI budget advisory
// @route   POST /api/ai/budget-advisory
// @access  Private
export const getBudgetAdvisory = async (req, res, next) => {
  try {
    const { destination, durationDays, travellers, transport, accommodation, userBudget, estimatedBudget } = req.body;

    const model = getGeminiModel();
    const ratio = (estimatedBudget / userBudget) * 100;

    if (!model) {
      let advisory = '';
      if (ratio <= 90) advisory = `Great news! Your budget of ₹${Number(userBudget).toLocaleString()} is more than sufficient for this ${durationDays}-day trip to ${destination}. You have room for extras!`;
      else if (ratio <= 110) advisory = `Your budget of ₹${Number(userBudget).toLocaleString()} is close to the estimated cost. Consider keeping a small emergency buffer.`;
      else advisory = `⚠️ Your budget of ₹${Number(userBudget).toLocaleString()} may be tight for this trip. Consider choosing budget accommodation or shorter duration to reduce costs.`;

      return res.json({ success: true, source: 'template', advisory, ratio: Math.round(ratio) });
    }

    const prompt = `A traveler is planning a ${durationDays}-day trip to ${destination} with ${travellers} people.
Transport: ${transport}, Accommodation: ${accommodation}
Their budget: ₹${userBudget}
Estimated total cost: ₹${estimatedBudget}
Budget ratio: ${Math.round(ratio)}%

Give a brief, helpful 2-3 sentence budget advisory. Be specific with cost-saving tips if over budget. Return ONLY JSON:
{"advisory": "Your advisory text here", "savings_tips": ["tip1", "tip2"]}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    let parsed;
    try {
      const cleanJson = responseText.replace(/```json?\s*/gi, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      return res.json({
        success: true,
        source: 'template',
        advisory: ratio > 100 ? `Your budget may be tight. Consider adjusting your preferences.` : `Your budget looks good for this trip!`,
        ratio: Math.round(ratio)
      });
    }

    res.json({
      success: true,
      source: 'gemini',
      advisory: parsed.advisory || '',
      savingsTips: parsed.savings_tips || [],
      ratio: Math.round(ratio)
    });
  } catch (error) {
    next(error);
  }
};

// ─── Fallback Generators (no API key required) ──────────────────────────────

function generateFallbackItinerary(destination, durationDays, travelType, interests) {
  const days = [];
  const activityPool = {
    'Adventure': ['Trekking & Hiking', 'River Rafting', 'Paragliding', 'Rock Climbing', 'Zip-lining'],
    'Beach & Water': ['Beach Walk & Sunrise', 'Snorkeling Session', 'Boat Ride', 'Beach Sports', 'Sunset Cruise'],
    'Heritage & Culture': ['Heritage Walk', 'Museum Visit', 'Historical Fort Tour', 'Cultural Show', 'Architecture Tour'],
    'Nature & Wildlife': ['Nature Trail', 'Bird Watching', 'Wildlife Safari', 'Garden Visit', 'Lake Boating'],
    'Food & Culinary': ['Local Street Food Tour', 'Regional Cuisine Tasting', 'Cooking Class', 'Night Food Walk', 'Café Hopping'],
    'Shopping': ['Local Market Exploration', 'Handicraft Shopping', 'Souvenir Hunt', 'Mall Visit', 'Flea Market'],
    'Spiritual': ['Temple Visit', 'Meditation Session', 'Ashram Visit', 'Prayer Ceremony', 'Yoga Session'],
    'Photography': ['Sunrise Photography', 'Street Photography Walk', 'Landscape Shoot', 'Night Photography', 'Portrait Session']
  };

  for (let i = 1; i <= durationDays; i++) {
    const activities = [];
    const dayTitle = i === 1 ? `Day ${i}: Arrival & Exploration` :
                     i === durationDays ? `Day ${i}: Final Exploration & Departure` :
                     `Day ${i}: Deep Dive into ${destination}`;

    // Morning
    activities.push({
      time: '08:00 AM',
      title: i === 1 ? `Arrival in ${destination}` : 'Breakfast & Morning Walk',
      location: i === 1 ? 'Bus Stand / Airport' : 'Hotel',
      cost: i === 1 ? 0 : 300,
      type: i === 1 ? 'transport' : 'food'
    });

    // Mid-morning sightseeing
    const pool = interests && interests.length > 0
      ? activityPool[interests[i % interests.length]] || activityPool['Heritage & Culture']
      : activityPool['Heritage & Culture'];
    activities.push({
      time: '10:00 AM',
      title: pool[(i - 1) % pool.length],
      location: `${destination} Point ${i}`,
      cost: 800,
      type: 'sightseeing'
    });

    // Lunch
    activities.push({
      time: '01:00 PM',
      title: 'Lunch at Local Restaurant',
      location: 'City Center',
      cost: 500,
      type: 'food'
    });

    // Afternoon
    activities.push({
      time: '03:00 PM',
      title: pool[(i) % pool.length],
      location: `${destination} Area ${i}`,
      cost: 1200,
      type: 'adventure'
    });

    // Evening
    activities.push({
      time: '06:00 PM',
      title: i === durationDays ? 'Departure Preparation & Packing' : 'Sunset Point & Evening Stroll',
      location: i === durationDays ? 'Hotel' : 'Viewpoint',
      cost: 0,
      type: 'relaxation'
    });

    days.push({ dayNumber: i, title: dayTitle, activities });
  }

  return days;
}

function getFallbackSuggestions(interests) {
  const allSuggestions = [
    { name: 'Manali', state: 'Himachal Pradesh', reason: 'Perfect for adventure sports and mountain scenery', bestTime: 'March - June', estimatedBudget: '₹15,000 per person for 4 days', tags: ['Adventure', 'Nature & Wildlife'] },
    { name: 'Goa', state: 'Goa', reason: 'Iconic beaches, nightlife, and Portuguese heritage', bestTime: 'November - February', estimatedBudget: '₹12,000 per person for 4 days', tags: ['Beach & Water', 'Food & Culinary'] },
    { name: 'Jaipur', state: 'Rajasthan', reason: 'Royal palaces, forts, and rich cultural heritage', bestTime: 'October - March', estimatedBudget: '₹10,000 per person for 4 days', tags: ['Heritage & Culture', 'Photography'] },
    { name: 'Rishikesh', state: 'Uttarakhand', reason: 'Spiritual capital with thrilling adventure activities', bestTime: 'September - November', estimatedBudget: '₹8,000 per person for 4 days', tags: ['Spiritual', 'Adventure'] },
    { name: 'Kerala Backwaters', state: 'Kerala', reason: 'Serene houseboat rides and lush tropical nature', bestTime: 'September - March', estimatedBudget: '₹18,000 per person for 4 days', tags: ['Nature & Wildlife', 'Food & Culinary'] },
    { name: 'Varanasi', state: 'Uttar Pradesh', reason: 'Ancient spiritual city on the banks of the Ganges', bestTime: 'October - March', estimatedBudget: '₹7,000 per person for 4 days', tags: ['Spiritual', 'Heritage & Culture'] },
    { name: 'Leh Ladakh', state: 'Ladakh', reason: 'Breathtaking landscapes and high-altitude adventure', bestTime: 'June - September', estimatedBudget: '₹25,000 per person for 5 days', tags: ['Adventure', 'Photography'] },
    { name: 'Udaipur', state: 'Rajasthan', reason: 'City of lakes with romantic heritage architecture', bestTime: 'September - March', estimatedBudget: '₹12,000 per person for 4 days', tags: ['Heritage & Culture', 'Photography'] }
  ];

  // Sort by relevance to user interests
  const scored = allSuggestions.map(s => {
    let score = 0;
    interests.forEach(interest => {
      if (s.tags.some(t => t.toLowerCase().includes(interest.toLowerCase()))) score += 2;
      if (s.reason.toLowerCase().includes(interest.toLowerCase())) score += 1;
    });
    return { ...s, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 6).map(({ tags, score, ...rest }) => rest);
}
