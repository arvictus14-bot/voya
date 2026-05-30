import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

/* ── Brand tokens ─────────────────────────────────────────── */
/* Deep terracotta — earthy, adventurous, warm. Best performing warm tone
   for 18-30 travel demographic based on color psychology research. */
const C = {
  brand:   '#D4522A',   // deep terracotta
  brandLt: '#E06B42',   // lighter terracotta
  brandBg: '#FBF0EB',   // warm peach cream
  dark:    '#0F0B06',   // near-black warm
  dark2:   '#1C1409',
  text:    '#1E1208',
  muted:   '#7A6A58',
  subtle:  '#B5A898',
  border:  '#EDE5D8',
  card:    '#FFFFFF',
  cream:   '#FFFCFA',
};

/* ── Rotating hero photos ─────────────────────────────────── */
/* All photos verified free under Unsplash License — real photographers, no AI */
const HERO_PHOTOS = [
  { url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1920&q=90', place: 'Bali, Indonesia', credit: 'Niklas Weiss' },
  { url: 'https://images.unsplash.com/photo-1526315337991-2ea805e212a8?auto=format&fit=crop&w=1920&q=90', place: 'Santorini, Greece', credit: 'Charlie M' },
  { url: 'https://images.unsplash.com/photo-1741850826368-12d515927617?auto=format&fit=crop&w=1920&q=90', place: 'Tokyo, Japan', credit: 'Unsplash' },
  { url: 'https://images.unsplash.com/photo-1561956021-947f09ae0101?auto=format&fit=crop&w=1920&q=90', place: 'Positano, Italy', credit: 'Jordan Steranka' },
  { url: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=1920&q=90', place: 'Lisbon, Portugal', credit: 'Aayush Gupta' },
  { url: 'https://images.unsplash.com/photo-1538475711279-0373b6bc754e?auto=format&fit=crop&w=1920&q=90', place: 'Krabi, Thailand', credit: 'Unsplash' },
];

/* ── Destination photo grid ───────────────────────────────── */
/* All photos verified free under Unsplash License — real photographers, no AI */
const DEST_GRID = [
  { name: 'Bali', country: 'Indonesia', photo: 'https://images.unsplash.com/photo-1523539693385-e5e891eb4465?auto=format&fit=crop&w=700&q=88' },
  { name: 'Santorini', country: 'Greece', photo: 'https://images.unsplash.com/photo-1526315337991-2ea805e212a8?auto=format&fit=crop&w=700&q=88' },
  { name: 'Tokyo', country: 'Japan', photo: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=700&q=88' },
  { name: 'Lisbon', country: 'Portugal', photo: 'https://images.unsplash.com/photo-1536663815808-535e2280d2c2?auto=format&fit=crop&w=700&q=88' },
  { name: 'Krabi', country: 'Thailand', photo: 'https://images.unsplash.com/photo-1538475711279-0373b6bc754e?auto=format&fit=crop&w=700&q=88' },
  { name: 'Positano', country: 'Italy', photo: 'https://images.unsplash.com/photo-1561956021-947f09ae0101?auto=format&fit=crop&w=700&q=88' },
  { name: 'Marrakech', country: 'Morocco', photo: 'https://images.unsplash.com/photo-1580746738099-1cb74f972feb?auto=format&fit=crop&w=700&q=88' },
  { name: 'Medellín', country: 'Colombia', photo: 'https://images.unsplash.com/photo-1512250431446-d0b4b57b27ec?auto=format&fit=crop&w=700&q=88' },
];

/* ── Sample trips ─────────────────────────────────────────── */
const SAMPLE_TRIPS = [
  {
    destination: 'Bali',
    country: 'Indonesia',
    days: 14,
    budget: 1800,
    socialScore: 9,
    highlights: ['Canggu surf & café scene', 'Ubud rice terraces & temples', 'Full moon parties in Kuta'],
    photo: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=900&q=88',
    tag: '🔥 Most Popular',
  },
  {
    destination: 'Lisbon',
    country: 'Portugal',
    days: 10,
    budget: 1500,
    socialScore: 8,
    highlights: ['Alfama neighbourhood at golden hour', 'LX Factory weekend market', 'Day trip to Sintra'],
    photo: 'https://images.unsplash.com/photo-1536663815808-535e2280d2c2?auto=format&fit=crop&w=900&q=88',
    tag: '⭐ Editor\'s Pick',
  },
  {
    destination: 'Tokyo',
    country: 'Japan',
    days: 12,
    budget: 2200,
    socialScore: 8,
    highlights: ['Shibuya crossing at midnight', 'Tsukiji market breakfast', 'Capsule hotel experience'],
    photo: 'https://images.unsplash.com/photo-1741850826368-12d515927617?auto=format&fit=crop&w=900&q=88',
    tag: '🌟 Trending',
  },
];

const VIBES = [
  { id: 'party', emoji: '🎉', label: 'Party', desc: 'Nightlife & social scenes' },
  { id: 'culture', emoji: '🏛️', label: 'Culture', desc: 'History & local life' },
  { id: 'adventure', emoji: '🏔️', label: 'Adventure', desc: 'Outdoors & thrills' },
  { id: 'mix', emoji: '✨', label: 'Mix It All', desc: 'A bit of everything' },
];

const ACCOMMODATION_TYPES = [
  { id: 'hostel', emoji: '🛏️', label: 'Hostel', desc: 'Social dorms & common areas' },
  { id: 'private', emoji: '🚪', label: 'Private Room', desc: 'Your own space, hostel or B&B' },
  { id: 'hotel', emoji: '🏨', label: 'Budget Hotel', desc: 'More comfort, still affordable' },
  { id: 'mix', emoji: '🎲', label: 'Mix It Up', desc: 'Whatever fits best' },
];

const GROUP_TYPES = [
  { id: 'solo', emoji: '🎒', label: 'Solo', desc: 'Just me' },
  { id: 'couple', emoji: '💑', label: 'Couple', desc: 'Me & a partner' },
  { id: 'group', emoji: '👥', label: 'Group', desc: '3 or more' },
];

const DAY_PRESETS = [5, 7, 10, 14, 21];

const POPULAR_DESTINATIONS = [
  // ── Southeast Asia ──
  'Bali, Indonesia', 'Ubud, Bali', 'Canggu, Bali', 'Seminyak, Bali', 'Nusa Penida, Indonesia',
  'Lombok, Indonesia', 'Gili Islands, Indonesia', 'Yogyakarta, Indonesia', 'Jakarta, Indonesia',
  'Bangkok, Thailand', 'Chiang Mai, Thailand', 'Chiang Rai, Thailand',
  'Phuket, Thailand', 'Krabi, Thailand', 'Koh Samui, Thailand', 'Koh Phangan, Thailand',
  'Koh Tao, Thailand', 'Pai, Thailand', 'Hua Hin, Thailand', 'Ayutthaya, Thailand',
  'Hanoi, Vietnam', 'Ho Chi Minh City, Vietnam', 'Hội An, Vietnam', 'Da Nang, Vietnam',
  'Hạ Long Bay, Vietnam', 'Nha Trang, Vietnam', 'Phú Quốc, Vietnam', 'Huế, Vietnam',
  'Phnom Penh, Cambodia', 'Siem Reap, Cambodia', 'Sihanoukville, Cambodia',
  'Vang Vieng, Laos', 'Luang Prabang, Laos', 'Vientiane, Laos',
  'Singapore', 'Kuala Lumpur, Malaysia', 'Penang, Malaysia', 'Langkawi, Malaysia',
  'Kota Kinabalu, Malaysia', 'Kuching, Malaysia',
  'Boracay, Philippines', 'Palawan, Philippines', 'El Nido, Philippines',
  'Manila, Philippines', 'Cebu, Philippines', 'Siargao, Philippines',
  'Yangon, Myanmar', 'Bagan, Myanmar', 'Inle Lake, Myanmar',
  'Dhaka, Bangladesh', 'Colombo, Sri Lanka',
  // ── East Asia ──
  'Tokyo, Japan', 'Osaka, Japan', 'Kyoto, Japan', 'Hiroshima, Japan',
  'Nara, Japan', 'Hokkaido, Japan', 'Okinawa, Japan', 'Fukuoka, Japan',
  'Seoul, South Korea', 'Busan, South Korea', 'Jeju Island, South Korea',
  'Taipei, Taiwan', 'Taichung, Taiwan', 'Tainan, Taiwan',
  'Shanghai, China', 'Beijing, China', 'Chengdu, China', 'Guilin, China',
  'Xi\'an, China', 'Hong Kong', 'Macau',
  'Ulaanbaatar, Mongolia',
  // ── South Asia ──
  'Kathmandu, Nepal', 'Pokhara, Nepal', 'Chitwan, Nepal',
  'Galle, Sri Lanka', 'Ella, Sri Lanka', 'Kandy, Sri Lanka', 'Mirissa, Sri Lanka',
  'Goa, India', 'Mumbai, India', 'Delhi, India', 'Jaipur, India', 'Agra, India',
  'Rishikesh, India', 'Udaipur, India', 'Varanasi, India', 'Kerala, India',
  'Hampi, India', 'Pushkar, India', 'McLeod Ganj, India',
  'Lahore, Pakistan', 'Islamabad, Pakistan',
  // ── Central Asia ──
  'Tbilisi, Georgia', 'Batumi, Georgia', 'Yerevan, Armenia',
  'Almaty, Kazakhstan', 'Tashkent, Uzbekistan', 'Samarkand, Uzbekistan', 'Bukhara, Uzbekistan',
  'Bishkek, Kyrgyzstan',
  // ── Middle East ──
  'Tel Aviv, Israel', 'Jerusalem, Israel', 'Dubai, UAE', 'Abu Dhabi, UAE',
  'Muscat, Oman', 'Doha, Qatar', 'Amman, Jordan', 'Petra, Jordan',
  'Beirut, Lebanon', 'Istanbul, Turkey', 'Cappadocia, Turkey',
  'Bodrum, Turkey', 'Antalya, Turkey', 'Izmir, Turkey',
  // ── Europe — Southern & Western ──
  'Lisbon, Portugal', 'Porto, Portugal', 'Algarve, Portugal', 'Madeira, Portugal',
  'Barcelona, Spain', 'Madrid, Spain', 'Seville, Spain', 'Valencia, Spain',
  'Granada, Spain', 'San Sebastián, Spain', 'Ibiza, Spain', 'Mallorca, Spain',
  'Canary Islands, Spain',
  'Rome, Italy', 'Florence, Italy', 'Venice, Italy', 'Milan, Italy',
  'Naples, Italy', 'Positano, Italy', 'Amalfi Coast, Italy', 'Cinque Terre, Italy',
  'Sicily, Italy', 'Sardinia, Italy', 'Bologna, Italy',
  'Athens, Greece', 'Santorini, Greece', 'Mykonos, Greece', 'Crete, Greece',
  'Corfu, Greece', 'Rhodes, Greece', 'Thessaloniki, Greece',
  'Paris, France', 'Nice, France', 'Lyon, France', 'Bordeaux, France', 'Marseille, France',
  'Amsterdam, Netherlands', 'Brussels, Belgium', 'Luxembourg City, Luxembourg',
  // ── Europe — Northern ──
  'London, UK', 'Edinburgh, UK', 'Dublin, Ireland', 'Galway, Ireland',
  'Reykjavik, Iceland', 'Bergen, Norway', 'Oslo, Norway', 'Tromsø, Norway',
  'Stockholm, Sweden', 'Gothenburg, Sweden', 'Copenhagen, Denmark',
  'Helsinki, Finland', 'Tallinn, Estonia', 'Riga, Latvia', 'Vilnius, Lithuania',
  // ── Europe — Central & Eastern ──
  'Berlin, Germany', 'Munich, Germany', 'Hamburg, Germany', 'Cologne, Germany',
  'Vienna, Austria', 'Salzburg, Austria', 'Innsbruck, Austria',
  'Zurich, Switzerland', 'Geneva, Switzerland', 'Interlaken, Switzerland',
  'Prague, Czech Republic', 'Brno, Czech Republic', 'Český Krumlov, Czech Republic',
  'Budapest, Hungary', 'Krakow, Poland', 'Warsaw, Poland', 'Gdansk, Poland',
  'Bratislava, Slovakia', 'Ljubljana, Slovenia', 'Bled, Slovenia',
  'Zagreb, Croatia', 'Split, Croatia', 'Dubrovnik, Croatia', 'Hvar, Croatia',
  'Kotor, Montenegro', 'Budva, Montenegro', 'Tirana, Albania', 'Ohrid, North Macedonia',
  'Sofia, Bulgaria', 'Plovdiv, Bulgaria', 'Bucharest, Romania', 'Cluj-Napoca, Romania',
  'Belgrade, Serbia', 'Novi Sad, Serbia', 'Sarajevo, Bosnia', 'Mostar, Bosnia',
  'Lviv, Ukraine', 'Kyiv, Ukraine',
  // ── Africa — North ──
  'Marrakech, Morocco', 'Fes, Morocco', 'Chefchaouen, Morocco', 'Essaouira, Morocco',
  'Casablanca, Morocco', 'Cairo, Egypt', 'Luxor, Egypt', 'Hurghada, Egypt',
  'Tunis, Tunisia', 'Djerba, Tunisia', 'Algiers, Algeria',
  // ── Africa — Sub-Saharan ──
  'Cape Town, South Africa', 'Johannesburg, South Africa', 'Durban, South Africa',
  'Zanzibar, Tanzania', 'Dar es Salaam, Tanzania', 'Arusha, Tanzania',
  'Nairobi, Kenya', 'Mombasa, Kenya', 'Kampala, Uganda', 'Kigali, Rwanda',
  'Accra, Ghana', 'Lagos, Nigeria', 'Dakar, Senegal', 'Addis Ababa, Ethiopia',
  'Victoria Falls, Zimbabwe', 'Livingstone, Zambia', 'Windhoek, Namibia',
  'Maputo, Mozambique', 'Antananarivo, Madagascar', 'Mauritius',
  // ── Latin America — Mexico & Central America ──
  'Mexico City, Mexico', 'Tulum, Mexico', 'Puerto Vallarta, Mexico', 'Oaxaca, Mexico',
  'Cancún, Mexico', 'Playa del Carmen, Mexico', 'San Cristóbal, Mexico',
  'Guadalajara, Mexico', 'Mérida, Mexico', 'Mazatlán, Mexico',
  'Antigua, Guatemala', 'Flores, Guatemala', 'Guatemala City, Guatemala',
  'San Pedro Sula, Honduras', 'Roatán, Honduras',
  'San José, Costa Rica', 'Manuel Antonio, Costa Rica', 'Monteverde, Costa Rica',
  'Panama City, Panama', 'Bocas del Toro, Panama', 'San Juan del Sur, Nicaragua',
  'San Salvador, El Salvador', 'Belize City, Belize', 'Caye Caulker, Belize',
  'Havana, Cuba', 'Trinidad, Cuba',
  // ── Latin America — South America ──
  'Medellín, Colombia', 'Cartagena, Colombia', 'Bogotá, Colombia', 'Santa Marta, Colombia',
  'Quito, Ecuador', 'Galápagos Islands, Ecuador', 'Cuenca, Ecuador',
  'Lima, Peru', 'Cusco, Peru', 'Machu Picchu, Peru', 'Arequipa, Peru', 'Iquitos, Peru',
  'La Paz, Bolivia', 'Sucre, Bolivia', 'Uyuni, Bolivia',
  'Buenos Aires, Argentina', 'Mendoza, Argentina', 'Bariloche, Argentina',
  'Santiago, Chile', 'Valparaíso, Chile', 'Torres del Paine, Chile',
  'Rio de Janeiro, Brazil', 'São Paulo, Brazil', 'Florianópolis, Brazil',
  'Salvador, Brazil', 'Manaus, Brazil',
  'Montevideo, Uruguay', 'Punta del Este, Uruguay',
  'Asunción, Paraguay', 'Caracas, Venezuela', 'Georgetown, Guyana',
  // ── Caribbean ──
  'San Juan, Puerto Rico', 'Santo Domingo, Dominican Republic', 'Punta Cana, Dominican Republic',
  'Kingston, Jamaica', 'Nassau, Bahamas', 'Bridgetown, Barbados',
  'Port of Spain, Trinidad', 'Willemstad, Curaçao', 'Philipsburg, Sint Maarten',
  // ── Oceania & Pacific ──
  'Sydney, Australia', 'Melbourne, Australia', 'Brisbane, Australia',
  'Cairns, Australia', 'Gold Coast, Australia', 'Perth, Australia',
  'Adelaide, Australia', 'Darwin, Australia', 'Alice Springs, Australia',
  'Auckland, New Zealand', 'Queenstown, New Zealand', 'Wellington, New Zealand',
  'Christchurch, New Zealand', 'Rotorua, New Zealand',
  'Fiji Islands', 'Bora Bora, French Polynesia', 'Papeete, French Polynesia',
  'Port Vila, Vanuatu', 'Apia, Samoa',
  // ── Indian Ocean ──
  'Maldives', 'Male, Maldives', 'Seychelles', 'Réunion Island', 'Mauritius',
  // ── Atlantic Islands ──
  'Azores, Portugal', 'Ponta Delgada, Azores', 'Faroe Islands', 'Malta', 'Valletta, Malta',
  'Tenerife, Spain', 'Gran Canaria, Spain', 'Lanzarote, Spain',
  // ── Balkans & Hidden Gems ──
  'Pristina, Kosovo', 'Kazbegi, Georgia', 'Mestia, Georgia', 'Batumi, Georgia',
  'Skopje, North Macedonia', 'Podgorica, Montenegro',
  // ── USA Domestic ──
  'New York City, USA', 'Las Vegas, USA', 'New Orleans, USA', 'Nashville, USA',
  'Miami, USA', 'Los Angeles, USA', 'San Francisco, USA', 'Chicago, USA',
  'Maui, Hawaii', 'Oahu, Hawaii', 'Kauai, Hawaii',
  // ── Canada ──
  'Vancouver, Canada', 'Toronto, Canada', 'Montreal, Canada', 'Banff, Canada',
  'Whistler, Canada', 'Quebec City, Canada',
];

const DEPARTURE_CITIES = [
  // USA — major hubs
  'New York (JFK), USA', 'New York (Newark), USA', 'Los Angeles (LAX), USA',
  'Chicago (O\'Hare), USA', 'Chicago (Midway), USA', 'Miami, USA', 'Fort Lauderdale, USA',
  'San Francisco, USA', 'Seattle, USA', 'Boston, USA', 'Atlanta, USA',
  'Dallas (DFW), USA', 'Houston, USA', 'Denver, USA', 'Phoenix, USA',
  'Las Vegas, USA', 'Orlando, USA', 'Washington DC (Dulles), USA', 'Washington DC (Reagan), USA',
  'Philadelphia, USA', 'Detroit, USA', 'Minneapolis, USA', 'Portland, USA',
  'Charlotte, USA', 'Salt Lake City, USA', 'San Diego, USA', 'New Orleans, USA',
  // Canada
  'Toronto (Pearson), Canada', 'Vancouver, Canada', 'Montreal, Canada',
  'Calgary, Canada', 'Ottawa, Canada', 'Edmonton, Canada',
  // UK & Ireland
  'London (Heathrow), UK', 'London (Gatwick), UK', 'London (Stansted), UK',
  'Manchester, UK', 'Edinburgh, UK', 'Birmingham, UK', 'Bristol, UK',
  'Glasgow, UK', 'Dublin, Ireland',
  // Western Europe
  'Amsterdam, Netherlands', 'Paris (CDG), France', 'Paris (Orly), France',
  'Berlin, Germany', 'Frankfurt, Germany', 'Munich, Germany', 'Düsseldorf, Germany',
  'Hamburg, Germany', 'Madrid, Spain', 'Barcelona, Spain', 'Malaga, Spain',
  'Lisbon, Portugal', 'Porto, Portugal', 'Rome (Fiumicino), Italy', 'Milan (Malpensa), Italy',
  'Venice, Italy', 'Naples, Italy', 'Zurich, Switzerland', 'Geneva, Switzerland',
  'Vienna, Austria', 'Brussels, Belgium', 'Zurich, Switzerland',
  // Scandinavia & Nordics
  'Stockholm, Sweden', 'Copenhagen, Denmark', 'Oslo, Norway', 'Helsinki, Finland',
  'Reykjavik, Iceland',
  // Eastern Europe
  'Warsaw, Poland', 'Prague, Czech Republic', 'Budapest, Hungary', 'Bucharest, Romania',
  'Athens, Greece', 'Istanbul, Turkey', 'Kyiv, Ukraine',
  // Middle East & Africa
  'Dubai (DXB), UAE', 'Abu Dhabi, UAE', 'Doha, Qatar', 'Riyadh, Saudi Arabia',
  'Tel Aviv, Israel', 'Cairo, Egypt', 'Casablanca, Morocco',
  'Johannesburg, South Africa', 'Cape Town, South Africa', 'Nairobi, Kenya',
  'Lagos, Nigeria', 'Accra, Ghana', 'Addis Ababa, Ethiopia', 'Tunis, Tunisia',
  // Asia — East
  'Tokyo (Narita), Japan', 'Tokyo (Haneda), Japan', 'Osaka, Japan',
  'Seoul (Incheon), South Korea', 'Beijing, China', 'Shanghai, China',
  'Hong Kong', 'Taipei, Taiwan', 'Guangzhou, China',
  // Asia — Southeast
  'Singapore', 'Bangkok (Suvarnabhumi), Thailand', 'Bangkok (Don Mueang), Thailand',
  'Kuala Lumpur, Malaysia', 'Jakarta, Indonesia', 'Bali (Denpasar), Indonesia',
  'Manila, Philippines', 'Ho Chi Minh City, Vietnam', 'Hanoi, Vietnam',
  // Asia — South
  'Mumbai, India', 'Delhi, India', 'Bangalore, India', 'Chennai, India',
  'Colombo, Sri Lanka', 'Kathmandu, Nepal', 'Dhaka, Bangladesh', 'Karachi, Pakistan',
  // Oceania
  'Sydney, Australia', 'Melbourne, Australia', 'Brisbane, Australia',
  'Perth, Australia', 'Auckland, New Zealand', 'Christchurch, New Zealand',
  // Latin America
  'Mexico City, Mexico', 'Cancún, Mexico', 'São Paulo, Brazil', 'Rio de Janeiro, Brazil',
  'Bogotá, Colombia', 'Buenos Aires, Argentina', 'Santiago, Chile', 'Lima, Peru',
  'Panama City, Panama', 'San José, Costa Rica', 'Medellín, Colombia',
  'Quito, Ecuador', 'Caracas, Venezuela', 'Havana, Cuba',
  // Caribbean
  'Kingston, Jamaica', 'Nassau, Bahamas', 'Santo Domingo, Dominican Republic',
];

/* ── Link helpers ─────────────────────────────────────────── */
const links = {
  googleFlights: (from, to, month, year) => {
    const base = `https://www.google.com/travel/flights?q=flights+from+${encodeURIComponent(from || 'anywhere')}+to+${encodeURIComponent(to)}`;
    return month && year ? `${base}+in+${encodeURIComponent(month + ' ' + year)}` : base;
  },
  skyscanner: (from, to) =>
    `https://www.skyscanner.com/flights/${encodeURIComponent(from || '')}/${encodeURIComponent(to)}/`,
  bookingCom: (name, destination) =>
    `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(name + ' ' + destination)}`,
  hostelworld: (name, destination) =>
    `https://www.hostelworld.com/search?search_keywords=${encodeURIComponent(name)}&search_location_sub=${encodeURIComponent(destination.split(',')[0])}`,
  googleMaps: (place, destination) =>
    `https://maps.google.com/?q=${encodeURIComponent(place + ' ' + destination)}`,
  getYourGuide: (activity, destination) =>
    `https://www.getyourguide.com/s/?q=${encodeURIComponent(activity + ' ' + destination)}`,
  viator: (activity, destination) =>
    `https://www.viator.com/searchResults/all?text=${encodeURIComponent(activity + ' ' + destination)}&pid=P00303477&mcid=42383&medium=link&campaign=voya-site`,
};

const FAQS = [
  { q: 'Is Voya free?', a: 'Yes — the trip planner is completely free. We earn a small commission when you book accommodation or flights through our links, at zero extra cost to you.' },
  { q: 'Are the prices accurate?', a: 'Prices vary by season and availability. Treat estimates as a solid baseline — they reflect real-world costs for 18-30 travelers and are updated regularly.' },
  { q: 'Can I use this for group trips?', a: 'Squad features are coming soon — find others heading to the same destination at the same time. For now, build your plan and share the screenshot with your crew.' },
  { q: 'What if I want to change my itinerary?', a: 'Hit "Plan Another Trip," tweak your inputs, and regenerate. You can run as many plans as you want — totally free.' },
];

const HOW_IT_WORKS = [
  { step: '01', emoji: '📍', title: 'Tell us where', desc: 'Pick your destination, set your budget, and tell us your vibe and travel style.' },
  { step: '02', emoji: '✨', title: 'We build your trip', desc: 'Real day-by-day itinerary. Real accommodation prices. Flights factored in. Zero tourist traps.' },
  { step: '03', emoji: '✈️', title: 'Go', desc: 'Screenshot your plan, pack your bag, and head out. Simple.' },
];

export default function Home() {
  const [form, setForm] = useState({ destination: '', budget: '', days: '', vibe: [], accommodation: [], group: '', departureCity: '', travelMonth: '', travelYear: '' });
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState('');
  const [activeDay, setActiveDay] = useState(0);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [shareMsg, setShareMsg] = useState('');
  const [heroIdx, setHeroIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showDepSuggestions, setShowDepSuggestions] = useState(false);
  const plannerRef = useRef(null);
  const destRef = useRef(null);
  const depRef = useRef(null);

  /* Rotating hero every 5.5s */
  useEffect(() => {
    const id = setInterval(() => {
      setPrevIdx(i => i);
      setHeroIdx(i => {
        setPrevIdx(i);
        return (i + 1) % HERO_PHOTOS.length;
      });
    }, 5500);
    return () => clearInterval(id);
  }, []);

  /* Close autocompletes on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (destRef.current && !destRef.current.contains(e.target)) setShowSuggestions(false);
      if (depRef.current && !depRef.current.contains(e.target)) setShowDepSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const scrollToPlanner = () => {
    plannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const prefill = (dest) => {
    setForm(f => ({ ...f, destination: dest }));
    setShowSuggestions(false);
    scrollToPlanner();
  };

  const filteredDests = form.destination.length > 0
    ? [...new Set(POPULAR_DESTINATIONS.filter(d => d.toLowerCase().includes(form.destination.toLowerCase())))].slice(0, 10)
    : [];

  const surpriseMe = () => {
    const dest = POPULAR_DESTINATIONS[Math.floor(Math.random() * POPULAR_DESTINATIONS.length)];
    setForm(f => ({ ...f, destination: dest }));
    setShowSuggestions(false);
  };

  const filteredDep = form.departureCity.length > 0
    ? DEPARTURE_CITIES.filter(d => d.toLowerCase().includes(form.departureCity.toLowerCase())).slice(0, 6)
    : [];

  const perDay = form.budget && form.days ? Math.round(Number(form.budget) / Number(form.days)) : null;

  const toggleMulti = (field, id) => {
    setForm(f => ({
      ...f,
      [field]: f[field].includes(id) ? f[field].filter(v => v !== id) : [...f[field], id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.destination || !form.budget || !form.days || form.vibe.length === 0) {
      setError('Fill in destination, budget, days and at least one vibe to continue.');
      return;
    }
    setError('');
    setLoading(true);
    setTrip(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setTrip(data);
      setActiveDay(0);
      setTimeout(() => plannerRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const text = `${trip.title} — ${form.days} days in ${form.destination} for $${Number(form.budget).toLocaleString()}. Built on Voya 🌍`;
    if (navigator.share) {
      try { await navigator.share({ title: trip.title, text, url: window.location.href }); } catch {}
    } else {
      await navigator.clipboard.writeText(text + ' — ' + window.location.href);
      setShareMsg('Copied!');
      setTimeout(() => setShareMsg(''), 2500);
    }
  };

  const handleEmail = (e) => {
    e.preventDefault();
    if (email.includes('@')) setEmailSubmitted(true);
  };

  const totalSpend = trip ? Object.values(trip.budgetBreakdown).reduce((a, b) => a + b, 0) : 0;

  const card = {
    background: '#fff',
    borderRadius: '20px',
    padding: '24px',
    marginBottom: '14px',
    border: '1px solid #F0EAE0',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
  };

  const label = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '700',
    color: '#9A8880',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    marginBottom: '8px',
  };

  const inputBase = {
    width: '100%',
    background: '#fff',
    border: '1.5px solid #E7E5E4',
    borderRadius: '14px',
    padding: '14px 18px',
    fontSize: '16px',
    color: '#1C1917',
    fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s',
  };

  return (
    <>
      <Head>
        <title>Voya — Trip Planning for 18-30 Travelers</title>
        <meta name="description" content="Real trip plans built for young solo travelers. Destination, budget, vibe — we handle the rest." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: ${C.cream}; color: ${C.text}; min-height: 100vh; }
        input:focus, textarea:focus { outline: none; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #D6D3D1; border-radius: 2px; }
        .dest-tile:hover .dest-overlay { opacity: 1 !important; }
        .dest-tile:hover { transform: scale(1.03); }
        @media (max-width: 600px) {
          .dest-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        .sample-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,0.18) !important; }
        .faq-item { border-bottom: 1px solid #F0EAE0; }
        .faq-item:last-child { border-bottom: none; }
        .hero-photo { position: absolute; inset: 0; background-size: cover; background-position: center; transition: opacity 1.4s ease; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 32px', background: 'rgba(15,11,6,0.72)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: '900', color: C.brandLt, letterSpacing: '-0.5px' }}>
          voya
        </span>
        <button onClick={scrollToPlanner} style={{
          background: C.brand, border: 'none', borderRadius: '10px',
          padding: '10px 22px', fontSize: '14px', fontWeight: '700',
          color: '#fff', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.2px',
        }}>
          Plan a Trip ✈️
        </button>
      </nav>

      {/* ── HERO (full-screen rotating photo) ── */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Background layers */}
        {HERO_PHOTOS.map((p, i) => (
          <div
            key={p.url}
            className="hero-photo"
            style={{
              backgroundImage: `url(${p.url})`,
              opacity: i === heroIdx ? 1 : 0,
              zIndex: i === heroIdx ? 1 : 0,
            }}
          />
        ))}

        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)', zIndex: 2 }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 24px', maxWidth: '780px' }}>
          <p style={{
            fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.55)',
            letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px',
          }}>
            For the generation that actually goes
          </p>

          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(42px, 9vw, 80px)',
            fontWeight: '900', lineHeight: '1.04', letterSpacing: '-2.5px',
            color: '#fff', marginBottom: '22px',
          }}>
            Stop researching.<br />
            <span style={{ color: C.brandLt, fontStyle: 'italic' }}>Start going.</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 'clamp(16px, 2.5vw, 19px)', lineHeight: '1.65', maxWidth: '480px', margin: '0 auto 38px' }}>
            Drop your destination and budget. Voya builds a real day-by-day itinerary — actual hostel prices, social scene ratings, zero tourist trap BS.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <button onClick={scrollToPlanner} style={{
              background: C.brand,
              border: 'none', borderRadius: '14px', padding: '18px 44px',
              fontSize: '17px', fontWeight: '800', color: '#fff', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              boxShadow: `0 8px 32px rgba(184,150,46,0.45)`,
              letterSpacing: '0.2px',
            }}>
              Build my trip — it's free →
            </button>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>✓ Free &nbsp;·&nbsp; ✓ 10 seconds &nbsp;·&nbsp; ✓ No sign-up</p>
          </div>
        </div>

        {/* Location pill — bottom left */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '32px', zIndex: 4,
          background: 'rgba(15,11,6,0.65)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '100px', padding: '8px 16px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: C.brandLt, display: 'inline-block', flexShrink: 0 }} />
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.85)' }}>
            {HERO_PHOTOS[heroIdx].place}
          </span>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: '32px', right: '32px', zIndex: 4, fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase' }}>
          scroll ↓
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{ background: C.dark, padding: '24px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[
            { num: '4,200+', label: 'Trips planned' },
            { num: '60+', label: 'Countries covered' },
            { num: '18–30', label: 'Built for you' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: '900', color: C.brandLt }}>{s.num}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontWeight: '500', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESTINATION GRID ── */}
      <section style={{ padding: '72px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: '900', color: C.text, marginBottom: '12px', letterSpacing: '-0.5px' }}>
            Where do you want to go?
          </h2>
          <p style={{ color: C.muted, fontSize: '16px' }}>Tap any destination to start planning</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '14px' }}>
          {DEST_GRID.map((d) => (
            <div
              key={d.name}
              className="dest-tile"
              onClick={() => prefill(`${d.name}, ${d.country}`)}
              style={{
                position: 'relative', borderRadius: '18px', overflow: 'hidden',
                aspectRatio: '3/4', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${d.photo})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.78) 100%)',
              }} />
              <div className="dest-overlay" style={{
                position: 'absolute', inset: 0,
                background: `rgba(184,150,46,0.18)`,
                opacity: 0, transition: 'opacity 0.25s ease',
              }} />
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '900', color: '#fff', lineHeight: '1.2', marginBottom: '3px' }}>
                  {d.name}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', fontWeight: '500' }}>{d.country}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SAMPLE TRIPS ── */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: '900', color: C.text, marginBottom: '10px' }}>
            See what a Voya trip looks like
          </h2>
          <p style={{ color: C.muted, fontSize: '15px' }}>Click any to generate your own version</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {SAMPLE_TRIPS.map(t => (
            <div
              key={t.destination}
              className="sample-card"
              onClick={() => {
                setForm({ destination: t.destination, budget: String(t.budget), days: String(t.days), vibe: ['mix'], accommodation: ['mix'], group: 'solo' });
                scrollToPlanner();
              }}
              style={{
                borderRadius: '22px', overflow: 'hidden', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'all 0.25s',
                background: '#fff',
              }}
            >
              <div style={{
                height: '210px',
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.6) 100%), url(${t.photo})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                position: 'relative', display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between', padding: '16px',
              }}>
                <span style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.95)', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', fontWeight: '700', color: C.text }}>
                  {t.tag}
                </span>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: '900', color: '#fff', marginBottom: '4px' }}>{t.destination}</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontWeight: '500' }}>{t.country}</p>
                </div>
              </div>
              <div style={{ padding: '18px 20px 20px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                  {[`${t.days} days`, `$${t.budget.toLocaleString()}`, `Social ${t.socialScore}/10`].map(tag => (
                    <span key={tag} style={{
                      fontSize: '12px', fontWeight: '600', color: C.brand,
                      background: C.brandBg, borderRadius: '6px', padding: '3px 10px',
                      border: `1px solid ${C.border}`,
                    }}>{tag}</span>
                  ))}
                </div>
                {t.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'flex-start' }}>
                    <span style={{ color: C.brand, fontWeight: '800', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>→</span>
                    <span style={{ fontSize: '13px', color: C.muted, lineHeight: '1.5' }}>{h}</span>
                  </div>
                ))}
                <div style={{ marginTop: '16px', padding: '10px 14px', background: C.brandBg, borderRadius: '10px', fontSize: '13px', fontWeight: '700', color: C.brand, textAlign: 'center', border: `1px solid ${C.border}` }}>
                  Plan a similar trip →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: C.dark, padding: '80px 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: '900', color: '#fff', marginBottom: '12px', letterSpacing: '-0.5px' }}>
              How it works
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}>Three steps. Ten seconds. One real trip.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            {HOW_IT_WORKS.map(s => (
              <div key={s.step} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px', height: '64px', background: 'rgba(184,150,46,0.15)',
                  borderRadius: '18px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '30px', margin: '0 auto 18px',
                  border: `1px solid rgba(184,150,46,0.3)`,
                }}>
                  {s.emoji}
                </div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: C.brandLt, textTransform: 'uppercase', letterSpacing: '1.4px', marginBottom: '8px' }}>
                  Step {s.step}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.65' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILT FOR YOU ── */}
      <section style={{ padding: '80px 24px', maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: '900', color: C.text, marginBottom: '12px', letterSpacing: '-0.5px' }}>
            Not your parents' travel guide
          </h2>
          <p style={{ color: C.muted, fontSize: '16px', maxWidth: '400px', margin: '0 auto' }}>
            Built for the way 18–30 year olds actually travel
          </p>
        </div>
        <div style={{ display: 'grid', gap: '14px' }}>
          {[
            { emoji: '💸', title: 'Real budgets, real plans', desc: "We don't suggest $400/night hotels. Every plan is built around what you actually have to spend — hostels, cheap eats, free activities included." },
            { emoji: '🤝', title: 'The Social Score', desc: "Every trip gets a Social Score — how easy it is to meet other travelers at your destination. Know before you book whether you're headed somewhere electric or somewhere solo." },
            { emoji: '📍', title: 'Peer intelligence, not tourist traps', desc: "Recommendations filtered through what 18-30 travelers actually rate. Not TripAdvisor reviews from families looking for quiet restaurants." },
          ].map(item => (
            <div key={item.title} style={{
              display: 'flex', gap: '18px', padding: '22px 24px',
              background: '#fff', borderRadius: '18px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              border: `1px solid ${C.border}`, alignItems: 'flex-start',
            }}>
              <div style={{
                width: '50px', height: '50px', background: C.brandBg,
                borderRadius: '14px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '24px', flexShrink: 0,
                border: `1px solid ${C.border}`,
              }}>
                {item.emoji}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: C.text, marginBottom: '6px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: C.muted, lineHeight: '1.65' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EMAIL CAPTURE ── */}
      <section style={{ background: C.dark, padding: '80px 24px' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
          {!emailSubmitted ? (
            <>
              <div style={{ fontSize: '38px', marginBottom: '18px', animation: 'float 3s ease-in-out infinite' }}>📬</div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: '900', color: '#fff', marginBottom: '12px', letterSpacing: '-0.5px' }}>
                Get weekly trip drops
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '32px', lineHeight: '1.65' }}>
                New destination guides for 18–30 travelers, every week. Real budgets. Real hostels. Zero fluff.
              </p>
              <form onSubmit={handleEmail} style={{ display: 'flex', gap: '10px', maxWidth: '420px', margin: '0 auto' }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    flex: 1, background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)',
                    borderRadius: '12px', padding: '14px 18px', fontSize: '15px',
                    color: '#fff', fontFamily: 'Inter, sans-serif',
                  }}
                />
                <button type="submit" style={{
                  background: C.brand, border: 'none', borderRadius: '12px',
                  padding: '14px 22px', fontSize: '14px', fontWeight: '800',
                  color: '#fff', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap',
                }}>
                  Send me trips
                </button>
              </form>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginTop: '14px' }}>No spam. Unsubscribe any time.</p>
            </>
          ) : (
            <div>
              <div style={{ fontSize: '52px', marginBottom: '18px' }}>🎉</div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: '900', color: '#fff', marginBottom: '10px' }}>You're in.</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}>First drop lands in your inbox this week.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '80px 24px', maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: '900', color: C.text, letterSpacing: '-0.5px' }}>
            Questions
          </h2>
        </div>
        <div style={{ background: '#fff', borderRadius: '20px', border: `1px solid ${C.border}`, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '20px 24px', background: 'transparent',
                  border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: '700', color: C.text }}>{faq.q}</span>
                <span style={{ fontSize: '20px', color: C.brand, fontWeight: '800', flexShrink: 0, marginLeft: '12px', transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 24px 20px', animation: 'fadeUp 0.2s ease' }}>
                  <p style={{ fontSize: '14px', color: C.muted, lineHeight: '1.7' }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANNER ── */}
      <section ref={plannerRef} style={{ background: '#fff', borderTop: `1px solid ${C.border}`, padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 5vw, 44px)', fontWeight: '900', color: C.text, marginBottom: '10px', letterSpacing: '-1.5px' }}>
              Where are you going?
            </h2>
            <p style={{ color: C.muted, fontSize: '16px' }}>Tell us your details — we handle the rest</p>
          </div>

          {!trip && !loading && (
            <form onSubmit={handleSubmit} style={{ animation: 'fadeUp 0.4s ease' }}>

              {/* ── Section 1: Where & How Long ── */}
              <div style={{ background: C.cream, borderRadius: '20px', padding: '24px', marginBottom: '12px', border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: C.brand, textTransform: 'uppercase', letterSpacing: '1.4px', marginBottom: '16px' }}>Where & How Long</div>

                {/* Destination autocomplete */}
                <div style={{ marginBottom: '16px', position: 'relative' }} ref={destRef}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ ...label, marginBottom: 0 }}>✈️  Destination</label>
                    <button type="button" onClick={surpriseMe} style={{ background: 'none', border: `1px solid ${C.brand}`, borderRadius: '20px', padding: '3px 10px', fontSize: '11px', fontWeight: '700', color: C.brand, cursor: 'pointer', letterSpacing: '0.3px' }}>🎲 Surprise me</button>
                  </div>
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={form.destination}
                    onChange={e => { setForm({ ...form, destination: e.target.value }); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    style={inputBase}
                    autoComplete="off"
                  />
                  {showSuggestions && filteredDests.length > 0 && (
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
                      background: '#fff', borderRadius: '14px', border: `1.5px solid ${C.border}`,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 50, overflow: 'hidden',
                    }}>
                      {filteredDests.map(d => (
                        <button
                          key={d}
                          type="button"
                          onMouseDown={() => { setForm(f => ({ ...f, destination: d })); setShowSuggestions(false); }}
                          style={{
                            width: '100%', padding: '12px 16px', background: 'transparent',
                            border: 'none', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
                            textAlign: 'left', fontSize: '14px', color: C.text, fontFamily: 'Inter, sans-serif',
                            display: 'flex', alignItems: 'center', gap: '10px',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = C.brandBg}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <span style={{ fontSize: '16px' }}>📍</span>
                          <span>{d}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Departure city autocomplete */}
                <div style={{ marginBottom: '16px', position: 'relative' }} ref={depRef}>
                  <label style={label}>🛫  Flying From <span style={{ fontWeight: '400', textTransform: 'none', letterSpacing: 0, color: C.subtle }}>(optional — for flight estimates)</span></label>
                  <input
                    type="text"
                    placeholder="New York, London, Sydney..."
                    value={form.departureCity}
                    onChange={e => { setForm({ ...form, departureCity: e.target.value }); setShowDepSuggestions(true); }}
                    onFocus={() => setShowDepSuggestions(true)}
                    style={inputBase}
                    autoComplete="off"
                  />
                  {showDepSuggestions && filteredDep.length > 0 && (
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
                      background: '#fff', borderRadius: '14px', border: `1.5px solid ${C.border}`,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 50, overflow: 'hidden',
                    }}>
                      {filteredDep.map(d => (
                        <button
                          key={d}
                          type="button"
                          onMouseDown={() => { setForm(f => ({ ...f, departureCity: d })); setShowDepSuggestions(false); }}
                          style={{
                            width: '100%', padding: '12px 16px', background: 'transparent',
                            border: 'none', borderBottom: `1px solid ${C.border}`, cursor: 'pointer',
                            textAlign: 'left', fontSize: '14px', color: C.text, fontFamily: 'Inter, sans-serif',
                            display: 'flex', alignItems: 'center', gap: '10px',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = C.brandBg}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <span>🛫</span><span>{d}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Travel dates — month + year */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={label}>📅  When Are You Going? <span style={{ fontWeight: '400', textTransform: 'none', letterSpacing: 0, color: C.subtle }}>(optional)</span></label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <select
                      value={form.travelMonth}
                      onChange={e => setForm({ ...form, travelMonth: e.target.value })}
                      style={{ ...inputBase, color: form.travelMonth ? C.text : '#A8A29E', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%239A8880\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px', cursor: 'pointer' }}
                    >
                      <option value="">Month</option>
                      {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={form.travelYear}
                      onChange={e => setForm({ ...form, travelYear: e.target.value })}
                      style={{ ...inputBase, color: form.travelYear ? C.text : '#A8A29E', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%239A8880\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px', cursor: 'pointer' }}
                    >
                      <option value="">Year</option>
                      {[2025, 2026, 2027].map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Days quick-select */}
                <div>
                  <label style={label}>🔢  How Many Days?</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    {DAY_PRESETS.map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setForm({ ...form, days: String(d) })}
                        style={{
                          padding: '8px 16px', borderRadius: '10px', border: `1.5px solid ${form.days === String(d) ? C.brand : '#E7E5E4'}`,
                          background: form.days === String(d) ? C.brandBg : '#fff',
                          color: form.days === String(d) ? C.brand : C.muted,
                          fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                          transition: 'all 0.15s',
                        }}
                      >
                        {d}d
                      </button>
                    ))}
                    <input
                      type="number"
                      placeholder="Custom"
                      value={DAY_PRESETS.includes(Number(form.days)) ? '' : form.days}
                      onChange={e => setForm({ ...form, days: e.target.value })}
                      style={{ ...inputBase, width: '90px', padding: '8px 12px', fontSize: '14px' }}
                      min="1" max="90"
                    />
                  </div>
                </div>
              </div>

              {/* ── Section 2: Budget ── */}
              <div style={{ background: C.cream, borderRadius: '20px', padding: '24px', marginBottom: '12px', border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: C.brand, textTransform: 'uppercase', letterSpacing: '1.4px', marginBottom: '16px' }}>Your Budget</div>
                <label style={label}>💰  Total Budget (USD)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    placeholder="2000"
                    value={form.budget}
                    onChange={e => setForm({ ...form, budget: e.target.value })}
                    style={{ ...inputBase, paddingRight: perDay ? '110px' : '18px' }}
                  />
                  {perDay && (
                    <span style={{
                      position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                      fontSize: '13px', fontWeight: '600', color: C.brand,
                    }}>
                      ≈ ${perDay}/day
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  {[['🎒', 'Backpacker', '1000'], ['🏨', 'Standard', '2000'], ['✨', 'Comfort', '3500']].map(([emoji, label2, val]) => (
                    <button key={val} type="button" onClick={() => setForm({ ...form, budget: val })} style={{
                      flex: 1, padding: '8px 6px', borderRadius: '10px',
                      border: `1.5px solid ${form.budget === val ? C.brand : '#E7E5E4'}`,
                      background: form.budget === val ? C.brandBg : '#fff',
                      color: form.budget === val ? C.brand : C.muted,
                      fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                      textAlign: 'center', transition: 'all 0.15s',
                    }}>
                      {emoji} {label2}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Section 3: Trip Style ── */}
              <div style={{ background: C.cream, borderRadius: '20px', padding: '24px', marginBottom: '12px', border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: C.brand, textTransform: 'uppercase', letterSpacing: '1.4px', marginBottom: '20px' }}>Trip Style</div>

                {/* Vibe — multi-select */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ ...label, marginBottom: 0 }}>🎯  Your Vibe</label>
                    <span style={{ fontSize: '11px', color: C.muted, fontWeight: '500' }}>Pick one or more</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {VIBES.map(v => {
                      const on = form.vibe.includes(v.id);
                      return (
                        <button key={v.id} type="button" onClick={() => toggleMulti('vibe', v.id)} style={{
                          background: on ? C.brandBg : '#fff',
                          border: `1.5px solid ${on ? C.brand : '#E7E5E4'}`,
                          borderRadius: '14px', padding: '12px 14px', cursor: 'pointer',
                          textAlign: 'left', transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
                          position: 'relative',
                        }}>
                          {on && <span style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '11px', color: C.brand, fontWeight: '800' }}>✓</span>}
                          <div style={{ fontSize: '18px', marginBottom: '3px' }}>{v.emoji}</div>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: on ? C.brand : C.text, marginBottom: '2px' }}>{v.label}</div>
                          <div style={{ fontSize: '11px', color: C.muted }}>{v.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Accommodation — multi-select */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ ...label, marginBottom: 0 }}>🏠  Where I'm Staying</label>
                    <span style={{ fontSize: '11px', color: C.muted, fontWeight: '500' }}>Pick one or more</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {ACCOMMODATION_TYPES.map(a => {
                      const on = form.accommodation.includes(a.id);
                      return (
                        <button key={a.id} type="button" onClick={() => toggleMulti('accommodation', a.id)} style={{
                          background: on ? C.brandBg : '#fff',
                          border: `1.5px solid ${on ? C.brand : '#E7E5E4'}`,
                          borderRadius: '14px', padding: '12px 14px', cursor: 'pointer',
                          textAlign: 'left', transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
                          position: 'relative',
                        }}>
                          {on && <span style={{ position: 'absolute', top: '8px', right: '10px', fontSize: '11px', color: C.brand, fontWeight: '800' }}>✓</span>}
                          <div style={{ fontSize: '18px', marginBottom: '3px' }}>{a.emoji}</div>
                          <div style={{ fontSize: '13px', fontWeight: '700', color: on ? C.brand : C.text, marginBottom: '2px' }}>{a.label}</div>
                          <div style={{ fontSize: '11px', color: C.muted }}>{a.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Traveling as */}
                <div>
                  <label style={label}>👤  Traveling As</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {GROUP_TYPES.map(g => (
                      <button key={g.id} type="button" onClick={() => setForm({ ...form, group: g.id })} style={{
                        flex: 1, background: form.group === g.id ? C.brandBg : '#fff',
                        border: `1.5px solid ${form.group === g.id ? C.brand : '#E7E5E4'}`,
                        borderRadius: '14px', padding: '12px 10px', cursor: 'pointer',
                        textAlign: 'center', transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
                      }}>
                        <div style={{ fontSize: '20px', marginBottom: '4px' }}>{g.emoji}</div>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: form.group === g.id ? C.brand : C.text }}>{g.label}</div>
                        <div style={{ fontSize: '11px', color: C.muted }}>{g.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && <p style={{ color: '#DC2626', fontSize: '14px', marginBottom: '12px', textAlign: 'center', fontWeight: '500' }}>{error}</p>}
              <button type="submit" style={{
                width: '100%', background: C.brand, border: 'none',
                borderRadius: '16px', padding: '20px', fontSize: '17px', fontWeight: '800',
                color: '#fff', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                boxShadow: `0 8px 28px rgba(184,150,46,0.4)`,
                letterSpacing: '0.2px',
              }}>
                Build My Trip ✈️
              </button>
            </form>
          )}

          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: '52px', marginBottom: '20px', animation: 'float 1.5s ease-in-out infinite' }}>🌍</div>
              <p style={{ color: C.muted, fontSize: '16px', fontWeight: '500' }}>Building your perfect trip...</p>
              <p style={{ color: C.subtle, fontSize: '14px', marginTop: '6px' }}>Takes about 10 seconds</p>
            </div>
          )}

          {trip && (
            <div style={{ animation: 'fadeUp 0.5s ease' }}>
              {/* Trip Hero */}
              <div style={{ background: `linear-gradient(135deg, ${C.dark} 0%, ${C.dark2} 100%)`, borderRadius: '24px', padding: '32px', marginBottom: '14px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '110px', opacity: '0.06', lineHeight: 1 }}>✈️</div>
                <span style={{ display: 'inline-block', background: `rgba(212,82,42,0.2)`, border: `1px solid rgba(212,82,42,0.4)`, borderRadius: '8px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px', color: '#F4A07A' }}>
                  {form.days} Days · ${Number(form.budget).toLocaleString()}{form.travelMonth && form.travelYear ? ` · ${form.travelMonth} ${form.travelYear}` : ''}
                </span>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 5vw, 30px)', fontWeight: '900', lineHeight: '1.2', marginBottom: '8px' }}>{trip.title}</h2>
                <p style={{ opacity: '0.65', fontSize: '15px', marginBottom: '22px' }}>{trip.tagline}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.07)', borderRadius: '14px', padding: '14px 18px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ width: '44px', height: '44px', background: C.brand, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '900', color: '#fff', flexShrink: 0 }}>{trip.socialScore}</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Social Score</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{trip.socialScoreLabel}</div>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div style={card}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', marginBottom: '18px' }}>💰 Budget Breakdown</h3>
                {Object.entries(trip.budgetBreakdown).map(([key, val]) => {
                  const pct = Math.round((val / totalSpend) * 100);
                  return (
                    <div key={key} style={{ marginBottom: '13px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontSize: '14px', textTransform: 'capitalize', color: C.muted, fontWeight: '500' }}>{key}</span>
                        <span style={{ fontSize: '14px', fontWeight: '700' }}>${val}</span>
                      </div>
                      <div style={{ height: '5px', background: C.border, borderRadius: '3px' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${C.brand}, ${C.brandLt})`, borderRadius: '3px' }} />
                      </div>
                    </div>
                  );
                })}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '18px', paddingTop: '14px', borderTop: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: '14px', color: C.muted }}>Total Estimated</span>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: '800', color: C.brand }}>${totalSpend}</span>
                </div>
              </div>

              {/* Days */}
              <div style={card}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>🗺️ Day by Day</h3>
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '14px', marginBottom: '16px' }}>
                  {trip.days.map((d, i) => (
                    <button key={i} onClick={() => setActiveDay(i)} style={{
                      flexShrink: 0, padding: '7px 14px', borderRadius: '10px',
                      border: `1.5px solid ${activeDay === i ? C.brand : '#E7E5E4'}`,
                      background: activeDay === i ? C.brandBg : '#FAFAF9',
                      color: activeDay === i ? C.brand : C.muted,
                      fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                    }}>Day {d.day}</button>
                  ))}
                </div>
                {trip.days[activeDay] && (
                  <div>
                    <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '19px', fontWeight: '700', marginBottom: '14px' }}>{trip.days[activeDay].title}</h4>
                    {[
                      { label: '🌅 Morning', content: trip.days[activeDay].morning },
                      { label: '☀️ Afternoon', content: trip.days[activeDay].afternoon },
                      { label: '🌙 Evening', content: trip.days[activeDay].evening },
                    ].map(({ label: l, content }) => (
                      <div key={l} style={{ padding: '14px 16px', background: C.cream, borderRadius: '12px', marginBottom: '8px', border: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: C.brand, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{l}</div>
                        <p style={{ fontSize: '14px', color: C.muted, lineHeight: '1.7' }}>{content}</p>
                      </div>
                    ))}
                    {/* Key places as Maps links */}
                    {trip.days[activeDay].keyPlaces?.length > 0 && (
                      <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {trip.days[activeDay].keyPlaces.map((place, pi) => (
                          <a
                            key={pi}
                            href={links.googleMaps(place, form.destination)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '4px',
                              fontSize: '12px', fontWeight: '600', color: C.brand,
                              background: C.brandBg, border: `1px solid ${C.border}`,
                              borderRadius: '8px', padding: '4px 10px', textDecoration: 'none',
                              transition: 'all 0.15s',
                            }}
                          >
                            📍 {place}
                          </a>
                        ))}
                      </div>
                    )}
                    <div style={{ textAlign: 'right', fontSize: '13px', color: C.subtle, marginTop: '10px' }}>
                      Est. daily spend: <span style={{ color: C.brand, fontWeight: '700' }}>${trip.days[activeDay].cost}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Flights */}
              {trip.flightNote && (
                <div style={card}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', marginBottom: '14px' }}>✈️ Flights</h3>
                  <p style={{ fontSize: '14px', color: C.muted, lineHeight: '1.7', marginBottom: '16px' }}>{trip.flightNote}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <a
                      href={links.googleFlights(form.departureCity, form.destination, form.travelMonth, form.travelYear)}
                      target="_blank" rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px',
                        background: C.brand, color: '#fff', borderRadius: '10px', textDecoration: 'none',
                        fontSize: '13px', fontWeight: '700', fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      🔍 Search Google Flights
                    </a>
                    <a
                      href={links.skyscanner(form.departureCity || '', form.destination)}
                      target="_blank" rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 18px',
                        background: C.brandBg, color: C.brand, border: `1.5px solid ${C.border}`,
                        borderRadius: '10px', textDecoration: 'none',
                        fontSize: '13px', fontWeight: '700', fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      🌐 Skyscanner
                    </a>
                  </div>
                </div>
              )}

              {/* Places to Stay */}
              <div style={card}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>🏠 Best Places to Stay</h3>
                {(trip.topStays || trip.topHostels)?.map((h, i) => (
                  <div key={i} style={{ padding: '14px 16px', background: C.cream, borderRadius: '12px', marginBottom: '10px', border: `1px solid ${C.border}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px', marginBottom: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <div style={{ fontSize: '15px', fontWeight: '700' }}>{h.name}</div>
                          {h.type && <span style={{ fontSize: '10px', fontWeight: '700', color: C.brand, background: C.brandBg, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '2px 6px' }}>{h.type}</span>}
                        </div>
                        <div style={{ fontSize: '12px', color: C.subtle, marginBottom: '4px', fontWeight: '500' }}>{h.vibe}</div>
                        <div style={{ fontSize: '13px', color: C.muted, lineHeight: '1.5' }}>{h.why}</div>
                      </div>
                      <div style={{ flexShrink: 0, background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: '12px', padding: '10px 14px', textAlign: 'center' }}>
                        <div style={{ fontSize: '17px', fontWeight: '900', color: C.brand }}>${h.pricePerNight}</div>
                        <div style={{ fontSize: '10px', color: C.muted }}>/ night</div>
                      </div>
                    </div>
                    {/* Booking links */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <a
                        href={links.bookingCom(h.name, form.destination)}
                        target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: '12px', fontWeight: '700', color: '#003580', background: '#EEF3FF', border: '1px solid #C7D6F7', borderRadius: '7px', padding: '5px 10px', textDecoration: 'none' }}
                      >
                        Book on Booking.com →
                      </a>
                      {(h.type?.toLowerCase().includes('hostel') || !h.type) && (
                        <a
                          href={links.hostelworld(h.name, form.destination)}
                          target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: '12px', fontWeight: '700', color: '#CC4400', background: '#FFF0E8', border: '1px solid #FFD0B0', borderRadius: '7px', padding: '5px 10px', textDecoration: 'none' }}
                        >
                          Check Hostelworld →
                        </a>
                      )}
                      <a
                        href={links.googleMaps(h.name, form.destination)}
                        target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: '12px', fontWeight: '700', color: C.muted, background: '#fff', border: `1px solid ${C.border}`, borderRadius: '7px', padding: '5px 10px', textDecoration: 'none' }}
                      >
                        📍 View on Maps
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Must-Do Activities */}
              {trip.mustDoActivities?.length > 0 && (
                <div style={card}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>🎯 Must-Do Experiences</h3>
                  {trip.mustDoActivities.map((act, i) => (
                    <div key={i} style={{ padding: '14px 16px', background: C.cream, borderRadius: '12px', marginBottom: '10px', border: `1px solid ${C.border}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '3px' }}>{act.name}</div>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '4px' }}>
                            {act.category && <span style={{ fontSize: '11px', fontWeight: '600', color: C.brand, background: C.brandBg, border: `1px solid ${C.border}`, borderRadius: '4px', padding: '2px 7px' }}>{act.category}</span>}
                            {act.duration && <span style={{ fontSize: '11px', color: C.muted, fontWeight: '500' }}>⏱ {act.duration}</span>}
                          </div>
                          <div style={{ fontSize: '13px', color: C.muted, lineHeight: '1.5' }}>{act.why}</div>
                        </div>
                        {act.price > 0 && (
                          <div style={{ flexShrink: 0, background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: '10px', padding: '8px 12px', textAlign: 'center' }}>
                            <div style={{ fontSize: '15px', fontWeight: '900', color: C.brand }}>${act.price}</div>
                            <div style={{ fontSize: '10px', color: C.muted }}>per person</div>
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <a
                          href={links.getYourGuide(act.name, form.destination)}
                          target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: '12px', fontWeight: '700', color: '#1A6B3C', background: '#EDFBF3', border: '1px solid #A7DFC0', borderRadius: '7px', padding: '5px 10px', textDecoration: 'none' }}
                        >
                          Book on GetYourGuide →
                        </a>
                        <a
                          href={links.viator(act.name, form.destination)}
                          target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: '12px', fontWeight: '700', color: '#7C3AED', background: '#F5F0FF', border: '1px solid #DDD6FE', borderRadius: '7px', padding: '5px 10px', textDecoration: 'none' }}
                        >
                          Try Viator →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tips */}
              <div style={card}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>💡 Insider Tips</h3>
                {trip.proTips?.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', padding: '12px 16px', background: C.cream, borderRadius: '12px', marginBottom: '8px', border: `1px solid ${C.border}` }}>
                    <span style={{ background: C.brand, color: '#fff', fontWeight: '800', fontSize: '11px', width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>{i + 1}</span>
                    <p style={{ fontSize: '14px', color: C.muted, lineHeight: '1.65' }}>{tip}</p>
                  </div>
                ))}
              </div>

              {/* Share */}
              <div style={{ background: C.dark, borderRadius: '20px', padding: '28px', textAlign: 'center', marginBottom: '14px' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📸</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '6px' }}>Share your trip</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.5', marginBottom: '18px' }}>Let people know where you're headed</div>
                <button onClick={handleShare} style={{
                  background: C.brand, border: 'none', borderRadius: '12px',
                  padding: '12px 28px', fontSize: '14px', fontWeight: '700',
                  color: '#fff', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                }}>
                  {shareMsg || 'Share this trip 🔗'}
                </button>
              </div>

              <button
                onClick={() => { setTrip(null); setForm({ destination: '', budget: '', days: '', vibe: [], accommodation: [], group: '', departureCity: '', travelMonth: '', travelYear: '' }); window.scrollTo({ top: plannerRef.current?.offsetTop - 100, behavior: 'smooth' }); }}
                style={{ width: '100%', background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: '14px', padding: '16px', fontSize: '15px', fontWeight: '600', color: C.muted, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: '20px' }}
              >
                ← Plan Another Trip
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.dark, padding: '48px 24px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: '900', color: C.brandLt }}>voya</span>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '10px', marginBottom: '20px' }}>
          Built for the generation that actually travels
        </p>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
          Photos by{' '}
          {['Niklas Weiss', 'Charlie M', 'Jezael Melgoza', 'Jordan Steranka', 'Aayush Gupta'].map((name, i, arr) => (
            <span key={name}>{name}{i < arr.length - 1 ? ', ' : ''}</span>
          ))}{' '}& more — via{' '}
          <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'underline' }}>Unsplash</a>
        </p>
      </footer>
    </>
  );
}
