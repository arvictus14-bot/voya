import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const ACCOMMODATION_LABELS = {
  hostel:  'hostel dorms — shared rooms, social atmosphere, bunk beds',
  private: 'private rooms in hostels, guesthouses, or small B&Bs',
  hotel:   'budget hotels with private rooms and basic amenities',
  airbnb:  'Airbnb apartments or rooms that still fit a young traveler budget',
  camping: 'camping, cabins, or outdoor stays where they make sense',
  mix:     'a smart mix — dorms where social, private rooms when needed',
};

const GROUP_LABELS = {
  solo:   'solo traveler',
  couple: 'couple traveling together',
  friends: 'friends traveling together',
  group:  'small group of 3–5 friends',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { destination, budget, days, vibe, accommodation, group, departureCity, travelMonth, travelYear, tripNotes, currency } = req.body;
  if (!destination || !budget || !days || !vibe) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const currencyCode = currency || 'USD';
  const perDay = Math.round(Number(budget) / Number(days));
  const vibeArr = Array.isArray(vibe) ? vibe : [vibe];
  const accomArr = Array.isArray(accommodation) ? accommodation : (accommodation ? [accommodation] : ['mix']);
  const vibeLabel = vibeArr.join(' + ');
  const accomLabel = accomArr.map(a => ACCOMMODATION_LABELS[a] || a).join('; or ');
  const groupLabel = GROUP_LABELS[group] || GROUP_LABELS.solo;

  const travelDate = travelMonth && travelYear ? `${travelMonth} ${travelYear}` : null;
  const flightContext = departureCity
    ? `Traveler is flying from ${departureCity}${travelDate ? ` in ${travelDate}` : ''} — give specific flight advice including airlines, typical prices, and whether to book early.`
    : `Departure city unknown — give a rough flight cost range from typical origin cities.`;
  const seasonContext = travelDate
    ? `Travel is planned for ${travelDate}. Factor in: seasonal weather, peak vs off-peak prices, local festivals or events happening that month, and any relevant warnings (monsoon, extreme heat, etc.).`
    : `No travel dates provided — give general seasonal advice.`;

  const notesContext = tripNotes && tripNotes.trim().length > 0
    ? `\n- Traveler's specific requests: "${tripNotes.trim()}" — incorporate these directly into the itinerary.`
    : '';

  const prompt = `You are a travel expert for 18-30 travelers. Create a detailed, real travel itinerary.

Trip details:
- Destination: ${destination}
- Duration: ${days} days
- Total budget: ${budget} ${currencyCode} (~${perDay} ${currencyCode}/day)
- Vibe: ${vibeLabel}
- Accommodation: ${accomLabel}
- Traveling as: ${groupLabel}
- Flights: ${flightContext}
- Season: ${seasonContext}${notesContext}

IMPORTANT RULES:
- You MUST include EXACTLY ${days} day objects in the "days" array — one per day, no more, no fewer. If the trip is 7 days, output 7 day objects. If 32 days, output 32. Do not stop early under any circumstances.
- ${Number(days) > 10 ? `For this ${days}-day trip, keep morning/afternoon/evening descriptions SHORT (1-2 sentences each) to ensure all ${days} days fit in the response. Do not truncate — all ${days} days are required.` : 'Give detailed descriptions for each time of day.'}
- Use REAL place names everywhere — real hostels, real hotels, real restaurants, real attractions
- For keyPlaces: extract 2-4 real named places from each day's plan (specific enough to search on Google Maps)
- For mustDoActivities: list 4-6 bookable experiences (tours, classes, excursions) with GetYourGuide-style names
- For topStays: use real property names that exist on Booking.com or Hostelworld
- Write like a friend, not a guidebook

Respond ONLY with valid JSON in this exact format:
{
  "title": "exciting trip title",
  "tagline": "short punchy tagline under 10 words",
  "budgetBreakdown": {
    "flights": estimated round-trip flight cost as number (in ${currencyCode}),
    "accommodation": total accommodation cost as number (in ${currencyCode}),
    "food": total food cost as number (in ${currencyCode}),
    "activities": total activities cost as number (in ${currencyCode}),
    "transport": local transport cost as number (in ${currencyCode}),
    "misc": miscellaneous as number (in ${currencyCode})
  },
  "flightNote": "specific flight advice — airlines, booking timing, rough cost from departure city if known, layover cities",
  "decisionSummary": {
    "budgetFit": "one sentence on whether the budget is realistic and what tradeoffs matter",
    "vibeFit": "one sentence on why this destination fits the selected vibe",
    "watchOut": "one honest warning or planning watchout"
  },
  "socialScore": number 1-10,
  "socialScoreLabel": "short label e.g. Incredible for meeting people",
  "days": [
    {
      "day": 1,
      "title": "day title",
      "morning": "specific morning plan mentioning real place names",
      "afternoon": "specific afternoon plan mentioning real place names",
      "evening": "specific evening/night plan mentioning real place names",
      "cost": estimated daily spend as number,
      "keyPlaces": ["Real Place Name 1", "Real Place Name 2", "Real Place Name 3"]
    }
  ],
  "topStays": [
    {
      "name": "exact real property name",
      "type": "Hostel / Guesthouse / Budget Hotel / Boutique Hotel",
      "pricePerNight": number,
      "vibe": "vibe in 4-6 words",
      "why": "why it suits this traveler specifically",
      "bookOn": "Booking.com or Hostelworld or Airbnb"
    }
  ],
  "mustDoActivities": [
    {
      "name": "specific bookable activity name",
      "category": "Food & Drink / Adventure / Culture / Nightlife / Nature / Wellness",
      "price": estimated price per person as number,
      "duration": "e.g. 3 hours or Half day",
      "why": "one sentence why this is unmissable"
    }
  ],
  "proTips": [
    "specific actionable tip 1",
    "specific actionable tip 2",
    "specific actionable tip 3",
    "specific actionable tip 4"
  ],
  "bestTimeToGo": "best months and why"
}`;

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a travel expert for young travelers. Respond only with valid JSON, no markdown, no extra text.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 16000,
    });

    const trip = JSON.parse(completion.choices[0].message.content);
    res.status(200).json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate trip' });
  }
}
