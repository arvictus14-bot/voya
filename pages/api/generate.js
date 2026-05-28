import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const ACCOMMODATION_LABELS = {
  hostel:  'hostel dorms — shared rooms, social atmosphere, bunk beds',
  private: 'private rooms in hostels, guesthouses, or small B&Bs',
  hotel:   'budget hotels with private rooms and basic amenities',
  mix:     'a smart mix — dorms where social, private rooms when needed',
};

const GROUP_LABELS = {
  solo:   'solo traveler',
  couple: 'couple traveling together',
  group:  'small group of 3–5 friends',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { destination, budget, days, vibe, accommodation, group } = req.body;
  if (!destination || !budget || !days || !vibe) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const perDay = Math.round(Number(budget) / Number(days));
  const accomLabel = ACCOMMODATION_LABELS[accommodation] || ACCOMMODATION_LABELS.mix;
  const groupLabel = GROUP_LABELS[group] || GROUP_LABELS.solo;

  const prompt = `You are a travel expert for 18-30 travelers. Create a detailed, real travel itinerary.

Trip details:
- Destination: ${destination}
- Duration: ${days} days
- Total budget: $${budget} USD (~$${perDay}/day)
- Vibe: ${vibe}
- Accommodation preference: ${accomLabel}
- Traveling as: ${groupLabel}

Tailor ALL recommendations to the accommodation preference and group type above.
If accommodation is hostel, recommend real hostels. If hotel, recommend real budget hotels. If private, recommend guesthouses.
If traveling as a couple or group, adjust activities and social tips accordingly.

Respond ONLY with valid JSON in this exact format:
{
  "title": "exciting trip title",
  "tagline": "short punchy tagline under 10 words",
  "budgetBreakdown": {
    "flights": estimated round-trip flight cost as number (0 if local/unknown),
    "accommodation": total accommodation cost for trip as number,
    "food": total food cost for trip as number,
    "activities": total activities cost for trip as number,
    "transport": local transport cost for trip as number,
    "misc": miscellaneous spending as number
  },
  "flightNote": "brief note on flights — best time to book, rough cost range, airlines to use",
  "socialScore": number between 1-10,
  "socialScoreLabel": "e.g. Incredible for meeting people",
  "days": [
    {
      "day": 1,
      "title": "day title",
      "morning": "specific morning plan with real place names",
      "afternoon": "specific afternoon plan with real place names",
      "evening": "specific evening/night plan with real place names",
      "cost": estimated daily spend as number
    }
  ],
  "topStays": [
    {
      "name": "real place name",
      "type": "Hostel / Guesthouse / Budget Hotel / etc.",
      "pricePerNight": number,
      "vibe": "vibe in a few words",
      "why": "why it suits this traveler"
    }
  ],
  "proTips": [
    "specific tip 1 tailored to this traveler type and destination",
    "specific tip 2",
    "specific tip 3",
    "specific tip 4"
  ],
  "bestTimeToGo": "brief recommendation on best months and why"
}

Use REAL place names, REAL neighborhoods, REAL prices. Write like a friend who has been there.`;

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a travel expert for young travelers. Respond only with valid JSON, no markdown, no extra text.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    });

    const trip = JSON.parse(completion.choices[0].message.content);
    res.status(200).json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate trip' });
  }
}
