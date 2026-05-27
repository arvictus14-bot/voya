import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { destination, budget, days, vibe } = req.body;
  if (!destination || !budget || !days || !vibe) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const prompt = `You are a travel expert for solo travelers aged 18-30. Create an exciting, detailed travel itinerary.

Trip: ${days} days in ${destination}, budget $${budget} USD, vibe: ${vibe}

Respond ONLY with valid JSON in this exact format:
{
  "title": "exciting trip title",
  "tagline": "short punchy tagline under 10 words",
  "budgetBreakdown": {
    "accommodation": number,
    "food": number,
    "activities": number,
    "transport": number,
    "misc": number
  },
  "socialScore": number between 1-10,
  "socialScoreLabel": "e.g. Incredible for meeting people",
  "days": [
    {
      "day": 1,
      "title": "day title",
      "morning": "specific morning plan",
      "afternoon": "specific afternoon plan",
      "evening": "specific evening/night plan",
      "cost": estimated daily spend as number
    }
  ],
  "topHostels": [
    {
      "name": "real hostel name",
      "pricePerNight": number,
      "vibe": "hostel vibe in a few words",
      "why": "why great for meeting people"
    }
  ],
  "proTips": [
    "specific tip 1 for young solo travelers",
    "specific tip 2",
    "specific tip 3"
  ],
  "bestTimeToGo": "brief recommendation"
}

Use REAL hostel names, REAL neighborhoods, REAL prices. Write like a friend who has been there, not a guidebook.`;

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a travel expert. Respond only with valid JSON, no markdown, no extra text.' },
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
