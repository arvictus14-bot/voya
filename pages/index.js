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
  { name: 'Bali', country: 'Indonesia', badge: '🔥 Trending Now', vibe: 'Beach', photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=90' },
  { name: 'Santorini', country: 'Greece', badge: '✨ Bucket List', vibe: 'Romance', photo: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=700&q=88' },
  { name: 'Tokyo', country: 'Japan', badge: '🌟 Most Booked', vibe: 'Culture', photo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=700&q=88' },
  { name: 'Lisbon', country: 'Portugal', badge: '⭐ Editor\'s Pick', vibe: 'Foodie', photo: 'https://images.unsplash.com/photo-1536663815808-535e2280d2c2?auto=format&fit=crop&w=700&q=88' },
  { name: 'Krabi', country: 'Thailand', badge: '🏖️ Beach Vibes', vibe: 'Adventure', photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=88' },
  { name: 'Positano', country: 'Italy', badge: '📸 Photogenic', vibe: 'Culture', photo: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=700&q=88' },
  { name: 'Istanbul', country: 'Turkey', badge: '🕌 East Meets West', vibe: 'Culture', photo: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=700&q=88' },
  { name: 'Rio de Janeiro', country: 'Brazil', badge: '🎭 Carnival Energy', vibe: 'Party', photo: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=700&q=88' },
  { name: 'Barcelona', country: 'Spain', badge: '🎉 Party Hub', vibe: 'Party', photo: 'https://images.unsplash.com/photo-1464790719320-516ecd75af6c?auto=format&fit=crop&w=700&q=88' },
  { name: 'Kyoto', country: 'Japan', badge: '🌸 Dreamy', vibe: 'Culture', photo: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=88' },
  { name: 'Cape Town', country: 'South Africa', badge: '🦁 Wild Side', vibe: 'Adventure', photo: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=700&q=88' },
  { name: 'Tulum', country: 'Mexico', badge: '🌴 Boho Vibes', vibe: 'Beach', photo: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=700&q=88' },
  { name: 'Chiang Mai', country: 'Thailand', badge: '🏔️ Offbeat', vibe: 'Nature', photo: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=700&q=88' },
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
  { id: 'party', emoji: '🎉', label: 'Party' },
  { id: 'adventure', emoji: '🏔️', label: 'Adventure' },
  { id: 'beach', emoji: '🌊', label: 'Beach' },
  { id: 'culture', emoji: '🏛️', label: 'Culture' },
  { id: 'foodie', emoji: '🍜', label: 'Foodie' },
  { id: 'wellness', emoji: '🧘', label: 'Wellness' },
  { id: 'nature', emoji: '🌿', label: 'Nature' },
  { id: 'art', emoji: '🎨', label: 'Art & Design' },
  { id: 'mix', emoji: '✨', label: 'Mix It All' },
];

const ACCOMMODATION_TYPES = [
  { id: 'hostel', emoji: '🛏️', label: 'Hostel' },
  { id: 'private', emoji: '🚪', label: 'Private Room' },
  { id: 'hotel', emoji: '🏨', label: 'Hotel' },
  { id: 'airbnb', emoji: '🏡', label: 'Airbnb' },
  { id: 'camping', emoji: '🏕️', label: 'Camping' },
  { id: 'mix', emoji: '🎲', label: 'Mix It Up' },
];

const GROUP_TYPES = [
  { id: 'solo', emoji: '🎒', label: 'Solo' },
  { id: 'couple', emoji: '💑', label: 'Couple' },
  { id: 'friends', emoji: '🥂', label: 'Friends' },
  { id: 'group', emoji: '👥', label: 'Group' },
];

const TRENDING_PICKS = [
  { emoji: '🔥', label: 'Bali', dest: 'Bali, Indonesia' },
  { emoji: '🌸', label: 'Japan', dest: 'Tokyo, Japan' },
  { emoji: '🏖️', label: 'Thailand', dest: 'Bangkok, Thailand' },
  { emoji: '🍕', label: 'Italy', dest: 'Rome, Italy' },
  { emoji: '🌊', label: 'Greece', dest: 'Santorini, Greece' },
  { emoji: '🇵🇹', label: 'Portugal', dest: 'Lisbon, Portugal' },
  { emoji: '🦁', label: 'Morocco', dest: 'Marrakech, Morocco' },
  { emoji: '🌴', label: 'Maldives', dest: 'Maldives' },
  { emoji: '🎭', label: 'Colombia', dest: 'Medellín, Colombia' },
  { emoji: '🗽', label: 'New York', dest: 'New York City, USA' },
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
  'Maldives', 'Male, Maldives', 'Seychelles', 'Mahé, Seychelles', 'Praslin, Seychelles',
  'Réunion Island', 'Mauritius', 'Port Louis, Mauritius', 'Diego Garcia',
  // ── Atlantic Islands ──
  'Azores, Portugal', 'Ponta Delgada, Azores', 'Faroe Islands', 'Tórshavn, Faroe Islands',
  'Malta', 'Valletta, Malta', 'Gozo, Malta',
  'Tenerife, Spain', 'Gran Canaria, Spain', 'Lanzarote, Spain', 'Fuerteventura, Spain',
  'Madeira, Portugal', 'Funchal, Madeira',
  'Cape Verde', 'Sal, Cape Verde', 'Santiago, Cape Verde',
  // ── Balkans & Hidden Gems ──
  'Pristina, Kosovo', 'Kazbegi, Georgia', 'Mestia, Georgia',
  'Skopje, North Macedonia', 'Ohrid, North Macedonia',
  'Chisinau, Moldova', 'Minsk, Belarus',
  'Dolomites, Italy', 'Tuscany, Italy', 'Lake Como, Italy', 'Puglia, Italy',
  'Alentejo, Portugal', 'Costa del Sol, Spain',
  // ── More Middle East ──
  'Riyadh, Saudi Arabia', 'AlUla, Saudi Arabia', 'Sharm el-Sheikh, Egypt',
  'Aqaba, Jordan', 'Wadi Rum, Jordan', 'Socotra Island, Yemen',
  'Kuwait City, Kuwait', 'Manama, Bahrain', 'Musandam, Oman', 'Salalah, Oman',
  // ── More Africa ──
  'Stone Town, Zanzibar', 'Serengeti, Tanzania', 'Kilimanjaro, Tanzania',
  'Masai Mara, Kenya', 'Lamu, Kenya', 'Diani Beach, Kenya',
  'Entebbe, Uganda', 'Gorilla Trekking, Rwanda', 'Lake Kivu, Rwanda',
  'Abuja, Nigeria', 'Abidjan, Ivory Coast', 'Lomé, Togo',
  'Libreville, Gabon', 'Douala, Cameroon', 'Bamako, Mali',
  'Lusaka, Zambia', 'Harare, Zimbabwe', 'Gaborone, Botswana', 'Maseru, Lesotho',
  'Eswatini', 'Toliara, Madagascar', 'Nosy Be, Madagascar',
  'Djibouti City, Djibouti', 'Asmara, Eritrea', 'Mogadishu, Somalia',
  'Khartoum, Sudan', 'Kampala, Uganda',
  // ── More Caribbean ──
  'Providenciales, Turks and Caicos', 'Aruba', 'Oranjestad, Aruba',
  'Bonaire', 'Curaçao', 'Sint Maarten', 'Saint Martin, France',
  'Gustavia, St Barts', 'Basseterre, St Kitts', 'St Lucia',
  'Castries, St Lucia', 'Kingstown, St Vincent', 'St George\'s, Grenada',
  'Roseau, Dominica', 'Fort-de-France, Martinique', 'Pointe-à-Pitre, Guadeloupe',
  'Nassau, Bahamas', 'Exuma, Bahamas', 'Eleuthera, Bahamas',
  'Montserrat', 'Anguilla', 'Road Town, British Virgin Islands',
  'Charlotte Amalie, US Virgin Islands', 'Havana, Cuba', 'Varadero, Cuba',
  'Holguín, Cuba', 'Port-au-Prince, Haiti', 'Labadee, Haiti',
  // ── More Pacific ──
  'Nadi, Fiji', 'Mamanuca Islands, Fiji', 'Yasawa Islands, Fiji',
  'Tonga', "Nuku'alofa, Tonga", 'Samoa', 'Apia, Samoa',
  'Cook Islands', 'Rarotonga, Cook Islands', 'Aitutaki, Cook Islands',
  'New Caledonia', 'Noumea, New Caledonia', 'Tahiti, French Polynesia',
  'Moorea, French Polynesia', 'Huahine, French Polynesia', 'Raiatea, French Polynesia',
  'Solomon Islands', 'Honiara, Solomon Islands', 'Palau', 'Micronesia',
  'Guam', 'Saipan, Northern Mariana Islands', 'Papua New Guinea',
  'Tasmania, Australia', 'Uluru, Australia', 'Whitsundays, Australia',
  'Great Barrier Reef, Australia', 'Byron Bay, Australia', 'Noosa, Australia',
  'Hobart, Australia', 'Launceston, Australia', 'Margaret River, Australia',
  'Milford Sound, New Zealand', 'Abel Tasman, New Zealand', 'Bay of Islands, New Zealand',
  // ── More Southeast Asia ──
  'Flores, Indonesia', 'Komodo Island, Indonesia', 'Raja Ampat, Indonesia',
  'Sumatra, Indonesia', 'Sulawesi, Indonesia', 'Maluku Islands, Indonesia',
  'Koh Lanta, Thailand', 'Koh Chang, Thailand', 'Koh Lipe, Thailand',
  'Mui Ne, Vietnam', 'Dalat, Vietnam', 'Sapa, Vietnam', 'Ha Giang, Vietnam',
  'Kampot, Cambodia', 'Kep, Cambodia', 'Koh Rong, Cambodia',
  'Don Det, Laos', '4000 Islands, Laos',
  'Tioman Island, Malaysia', 'Perhentian Islands, Malaysia', 'Redang Island, Malaysia',
  'Dumaguete, Philippines', 'Davao, Philippines', 'General Santos, Philippines',
  'Brunei', 'Timor-Leste',
  // ── More South Asia ──
  'Bhutan', 'Thimphu, Bhutan', 'Paro, Bhutan',
  'Maldives Resorts', 'Addu Atoll, Maldives', 'Baa Atoll, Maldives',
  'Chittagong, Bangladesh', "Cox's Bazar, Bangladesh",
  'Karachi, Pakistan', 'Hunza Valley, Pakistan', 'Lahore, Pakistan',
  'Chennai, India', 'Kolkata, India', 'Bangalore, India', 'Hyderabad, India',
  'Andaman Islands, India', 'Lakshadweep, India', 'Sikkim, India',
  'Darjeeling, India', 'Manali, India', 'Leh, India', 'Amritsar, India',
  'Kochi, India', 'Mysore, India', 'Coorg, India', 'Pondicherry, India',
  // ── More East Asia ──
  'Sapporo, Japan', 'Nagoya, Japan', 'Nagasaki, Japan', 'Kanazawa, Japan',
  'Hakone, Japan', 'Nikko, Japan', 'Kamakura, Japan',
  'Incheon, South Korea', 'Gyeongju, South Korea', 'Suwon, South Korea',
  'Kaohsiung, Taiwan', 'Hualien, Taiwan', 'Kenting, Taiwan',
  'Guangzhou, China', 'Shenzhen, China', 'Zhangjiajie, China', 'Lijiang, China',
  'Yangshuo, China', 'Hangzhou, China', 'Suzhou, China', 'Kunming, China',
  // ── More Central Asia ──
  'Dushanbe, Tajikistan', 'Ashgabat, Turkmenistan', 'Baku, Azerbaijan',
  'Sheki, Azerbaijan', 'Nur-Sultan, Kazakhstan', 'Shymkent, Kazakhstan',
  'Osh, Kyrgyzstan', 'Fergana, Uzbekistan', 'Nukus, Uzbekistan',
  // ── More Europe ──
  'Marseille, France', 'Strasbourg, France', 'Montpellier, France', 'Nantes, France',
  'Toulouse, France', 'Corsica, France', 'Alsace, France',
  'Ghent, Belgium', 'Bruges, Belgium', 'Antwerp, Belgium',
  'Rotterdam, Netherlands', 'Utrecht, Netherlands', 'The Hague, Netherlands',
  'Valletta, Malta', 'Mdina, Malta',
  'Cardiff, UK', 'Manchester, UK', 'Liverpool, UK', 'Bristol, UK',
  'Bath, UK', 'Oxford, UK', 'Cambridge, UK', 'York, UK', 'Brighton, UK',
  'Belfast, UK', 'Inverness, UK', 'Glasgow, UK',
  'Cork, Ireland', 'Killarney, Ireland', 'Dingle, Ireland',
  'Gothenburg, Sweden', 'Malmö, Sweden', 'Uppsala, Sweden',
  'Stavanger, Norway', 'Ålesund, Norway', 'Lofoten Islands, Norway',
  'Turku, Finland', 'Rovaniemi, Finland', 'Tampere, Finland',
  'Aarhus, Denmark', 'Odense, Denmark',
  'Tallinn Old Town, Estonia', 'Pärnu, Estonia',
  'Kaunas, Lithuania', 'Trakai, Lithuania',
  'Jurmala, Latvia',
  'Dresden, Germany', 'Frankfurt, Germany', 'Stuttgart, Germany',
  'Düsseldorf, Germany', 'Nuremberg, Germany', 'Heidelberg, Germany',
  'Freiburg, Germany', 'Rothenburg, Germany', 'Bavarian Alps, Germany',
  'Hallstatt, Austria', 'Graz, Austria', 'Linz, Austria',
  'Bern, Switzerland', 'Lucerne, Switzerland', 'Lausanne, Switzerland',
  'Basel, Switzerland', 'Zermatt, Switzerland', 'Grindelwald, Switzerland',
  'Seville, Spain', 'Bilbao, Spain', 'Córdoba, Spain', 'Toledo, Spain',
  'Alicante, Spain', 'Málaga, Spain', 'Marbella, Spain', 'Palma, Mallorca',
  'Palermo, Sicily', 'Catania, Sicily', 'Taormina, Sicily',
  'Cagliari, Sardinia', 'Alghero, Sardinia',
  'Thessaloniki, Greece', 'Nafplio, Greece', 'Meteora, Greece',
  'Zakynthos, Greece', 'Kefalonia, Greece', 'Paros, Greece', 'Naxos, Greece',
  'Hydra, Greece', 'Samos, Greece', 'Lesbos, Greece',
  'Antalya, Turkey', 'Fethiye, Turkey', 'Marmaris, Turkey', 'Pamukkale, Turkey',
  'Ephesus, Turkey', 'Trabzon, Turkey', 'Göreme, Turkey',
  'Wroclaw, Poland', 'Poznan, Poland', 'Lublin, Poland',
  'Miskolc, Hungary', 'Pécs, Hungary', 'Debrecen, Hungary',
  'Ceske Budejovice, Czech Republic', 'Pilsen, Czech Republic',
  'Poprad, Slovakia', 'Košice, Slovakia', 'High Tatras, Slovakia',
  'Piran, Slovenia', 'Maribor, Slovenia', 'Postojna, Slovenia',
  'Zadar, Croatia', 'Rovinj, Croatia', 'Pula, Croatia', 'Korčula, Croatia',
  'Herceg Novi, Montenegro', 'Bar, Montenegro',
  'Nessebar, Bulgaria', 'Varna, Bulgaria', 'Burgas, Bulgaria',
  'Constanta, Romania', 'Sinaia, Romania', 'Brasov, Romania', 'Sibiu, Romania',
  'Nis, Serbia', 'Subotica, Serbia',
  'Mostar Old Town, Bosnia', 'Banja Luka, Bosnia',
  'Prizren, Kosovo',
  // ── USA — Domestic ──
  'New York City, USA', 'Manhattan, New York', 'Brooklyn, New York',
  'Los Angeles, USA', 'Santa Monica, USA', 'Venice Beach, USA',
  'San Francisco, USA', 'Napa Valley, USA', 'Yosemite, USA',
  'Las Vegas, USA', 'Miami, USA', 'Miami Beach, USA',
  'New Orleans, USA', 'Nashville, USA', 'Austin, USA',
  'Chicago, USA', 'Seattle, USA', 'Portland, USA',
  'Denver, USA', 'Salt Lake City, USA', 'Moab, USA',
  'Phoenix, USA', 'Scottsdale, USA', 'Sedona, USA',
  'San Diego, USA', 'Santa Barbara, USA', 'Monterey, USA',
  'Washington DC, USA', 'Boston, USA', 'Philadelphia, USA',
  'Atlanta, USA', 'Charleston, USA', 'Savannah, USA',
  'New York Upstate, USA', 'Asheville, USA', 'Memphis, USA',
  'Maui, Hawaii', 'Oahu, Hawaii', 'Kauai, Hawaii', 'Big Island, Hawaii',
  'Lanai, Hawaii', 'Honolulu, Hawaii',
  'Anchorage, Alaska', 'Juneau, Alaska', 'Fairbanks, Alaska',
  'Grand Canyon, USA', 'Yellowstone, USA', 'Glacier National Park, USA',
  'Zion National Park, USA', 'Joshua Tree, USA', 'Big Sur, USA',
  // ── Canada ──
  'Vancouver, Canada', 'Victoria, Canada', 'Whistler, Canada', 'Kelowna, Canada',
  'Toronto, Canada', 'Niagara Falls, Canada', 'Ottawa, Canada',
  'Montreal, Canada', 'Quebec City, Canada', 'Halifax, Canada',
  'Banff, Canada', 'Jasper, Canada', 'Lake Louise, Canada',
  'Calgary, Canada', 'Edmonton, Canada', 'Winnipeg, Canada',
  'St. John\'s, Canada', 'Charlottetown, Canada',
  // ── Mexico — Extended ──
  'Cabo San Lucas, Mexico', 'San José del Cabo, Mexico', 'Huatulco, Mexico',
  'Puerto Escondido, Mexico', 'Isla Mujeres, Mexico', 'Holbox, Mexico',
  'Bacalar, Mexico', 'Palenque, Mexico', 'Chichen Itza, Mexico',
  'Guanajuato, Mexico', 'San Miguel de Allende, Mexico', 'Querétaro, Mexico',
  'Puebla, Mexico', 'Morelia, Mexico', 'Zacatecas, Mexico',
  // ── Central America — Extended ──
  'La Fortuna, Costa Rica', 'Tamarindo, Costa Rica', 'Nosara, Costa Rica',
  'Santa Teresa, Costa Rica', 'Jaco, Costa Rica', 'Drake Bay, Costa Rica',
  'Ambergris Caye, Belize', 'Placencia, Belize', 'San Ignacio, Belize',
  'Copán, Honduras', 'Utila, Honduras', 'Tela, Honduras',
  'Ometepe Island, Nicaragua', 'Granada, Nicaragua', 'León, Nicaragua',
  'El Zonte, El Salvador', 'La Libertad, El Salvador',
  'Antigua Guatemala, Guatemala', 'Lake Atitlán, Guatemala',
  // ── South America — Extended ──
  'Cartagena Old City, Colombia', 'Minca, Colombia', 'Tayrona, Colombia',
  'Cali, Colombia', 'Pereira, Colombia', 'Salento, Colombia',
  'Baños, Ecuador', 'Montañita, Ecuador', 'Manta, Ecuador',
  'Máncora, Peru', 'Paracas, Peru', 'Huacachina, Peru', 'Puno, Peru',
  'Rurrenabaque, Bolivia', 'Coroico, Bolivia',
  'Puerto Natales, Chile', 'Atacama Desert, Chile', 'Easter Island, Chile',
  'Punta Arenas, Chile', 'Valdivia, Chile',
  'Iguazu Falls, Argentina', 'Córdoba, Argentina', 'Salta, Argentina',
  'Jujuy, Argentina', 'Mar del Plata, Argentina', 'El Calafate, Argentina',
  'Patagonia, Argentina', 'El Chaltén, Argentina',
  'Natal, Brazil', 'Fortaleza, Brazil', 'Recife, Brazil', 'Belém, Brazil',
  'Porto Alegre, Brazil', 'Curitiba, Brazil', 'Foz do Iguaçu, Brazil',
  'Colonia del Sacramento, Uruguay',
  'Asunción, Paraguay', 'Ciudad del Este, Paraguay',
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
  const [form, setForm] = useState({ destination: '', budget: '', days: '', vibe: [], accommodation: [], group: '', departureCity: '', travelMonth: '', travelYear: '', tripNotes: '' });
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
        .dest-tile:hover { transform: scale(1.025); box-shadow: 0 16px 48px rgba(0,0,0,0.32) !important; }
        .dest-tile:hover .dest-photo { transform: scale(1.07); }
        .dest-tile:hover .dest-cta { opacity: 1 !important; transform: translateY(0) !important; }
        @media (max-width: 900px) {
          .dest-bento { grid-template-columns: repeat(3, 1fr) !important; }
          .dest-tile-feat { grid-column: span 2 !important; grid-row: span 1 !important; }
        }
        @media (max-width: 600px) {
          .dest-bento { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 160px !important; }
          .dest-tile-feat { grid-column: span 2 !important; grid-row: span 1 !important; }
        }
        .sample-card:hover { transform: translateY(-5px); box-shadow: 0 24px 56px rgba(0,0,0,0.2) !important; }
        .sample-card:hover .sample-cta { background: #D4522A !important; color: #fff !important; border-color: #D4522A !important; }
        .hero-photo { position: absolute; inset: 0; background-size: cover; background-position: center; transition: opacity 1.4s ease; }
        @media (max-width: 700px) {
          .email-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .manifesto-cols { flex-direction: column !important; gap: 16px !important; }
          .how-it-works-grid { grid-template-columns: 1fr !important; }
          .how-it-works-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 32px 0 !important; }
        }
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
              boxShadow: `0 8px 32px rgba(212,82,42,0.4)`,
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
      <div style={{ background: C.dark, borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          {[
            { num: '4,200+', label: 'Trips planned' },
            { num: '60+', label: 'Countries' },
            { num: '10s', label: 'To build your trip' },
            { num: 'Free', label: 'Always' },
          ].map((s, i) => (
            <div key={s.label} style={{
              flex: 1, padding: '28px 0', textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: '900', fontStyle: 'italic', color: C.brandLt, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: '600', marginTop: '6px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MANIFESTO ── */}
      <section style={{ padding: '100px 40px 96px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '960px' }}>
          <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '3px', color: C.brand, textTransform: 'uppercase', marginBottom: '28px' }}>
            Our take
          </p>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(38px, 6vw, 72px)',
            fontWeight: '900', lineHeight: '1.08',
            letterSpacing: '-2.5px', color: C.text,
            marginBottom: '0',
          }}>
            Travel isn't a reward.<br />
            <span style={{ color: C.brand, fontStyle: 'italic' }}>It's the whole point.</span>
          </h2>
          <div style={{ marginTop: '36px', maxWidth: '500px' }}>
            <p style={{ fontSize: '18px', color: C.muted, lineHeight: '1.75', marginBottom: '28px' }}>
              You don't need to wait until you're 45 with a 2-week PTO window. The world is open right now — Voya builds your trip in 10 seconds, flat.
            </p>
            <div style={{ display: 'flex', gap: '32px' }}>
              <div style={{ borderLeft: `3px solid ${C.brand}`, paddingLeft: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: C.text, marginBottom: '3px' }}>Real hostels & hotels</div>
                <div style={{ fontSize: '13px', color: C.muted }}>Actual property names, not "budget hotel"</div>
              </div>
              <div style={{ borderLeft: `3px solid ${C.brand}`, paddingLeft: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: C.text, marginBottom: '3px' }}>Social scene ratings</div>
                <div style={{ fontSize: '13px', color: C.muted }}>Know before you book if it's your crowd</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESTINATION GRID ── */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '3px', color: C.brand, textTransform: 'uppercase', marginBottom: '10px' }}>Explore</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: '900', color: C.text, letterSpacing: '-1.5px', lineHeight: 1.05 }}>
              Pick your next escape
            </h2>
          </div>
          <p style={{ color: C.muted, fontSize: '15px', maxWidth: '260px', lineHeight: '1.6', textAlign: 'right' }}>
            Tap any destination — we'll build your full trip in seconds
          </p>
        </div>

        <div
          className="dest-bento"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '210px',
            gap: '12px',
          }}
        >
          {DEST_GRID.map((d, i) => (
            <div
              key={d.name}
              className={`dest-tile${i === 0 ? ' dest-tile-feat' : ''}`}
              onClick={() => prefill(`${d.name}, ${d.country}`)}
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
                transition: 'transform 0.28s ease, box-shadow 0.28s ease',
                ...(i === 0 ? { gridColumn: 'span 2', gridRow: 'span 2' } : {}),
              }}
            >
              {/* Photo layer */}
              <div
                className="dest-photo"
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${d.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#2a2018',
                  transition: 'transform 0.45s ease',
                }}
              />
              {/* Dark gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: i === 0
                  ? 'linear-gradient(160deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.75) 100%)'
                  : 'linear-gradient(to bottom, rgba(0,0,0,0.02) 20%, rgba(0,0,0,0.84) 100%)',
              }} />
              {/* Terracotta hover overlay */}
              <div
                className="dest-overlay"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(212,82,42,0.28)',
                  opacity: 0,
                  transition: 'opacity 0.25s ease',
                }}
              />

              {/* Top-left badge */}
              {d.badge && (
                <div style={{
                  position: 'absolute', top: '13px', left: '13px',
                  background: 'rgba(10,6,2,0.55)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderRadius: '30px',
                  padding: '4px 11px',
                  fontSize: '11px', fontWeight: '700', color: '#fff',
                  letterSpacing: '0.1px',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}>
                  {d.badge}
                </div>
              )}

              {/* Top-right vibe tag */}
              {d.vibe && (
                <div style={{
                  position: 'absolute', top: '13px', right: '13px',
                  background: 'rgba(212,82,42,0.88)',
                  borderRadius: '30px',
                  padding: '4px 11px',
                  fontSize: '11px', fontWeight: '700', color: '#fff',
                }}>
                  {d.vibe}
                </div>
              )}

              {/* Bottom content */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: i === 0 ? '28px' : '16px',
              }}>
                <div style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: i === 0 ? '34px' : '20px',
                  fontWeight: '900', color: '#fff',
                  lineHeight: '1.15', marginBottom: '3px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                }}>
                  {d.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.6)',
                  fontWeight: '600',
                  letterSpacing: '0.3px',
                  marginBottom: i === 0 ? '14px' : '10px',
                }}>
                  {d.country}
                </div>
                {/* Hover CTA — slides up */}
                <div
                  className="dest-cta"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    background: 'rgba(255,255,255,0.16)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '22px',
                    padding: i === 0 ? '8px 18px' : '6px 14px',
                    fontSize: i === 0 ? '13px' : '12px',
                    fontWeight: '700', color: '#fff',
                    opacity: 0,
                    transform: 'translateY(8px)',
                    transition: 'opacity 0.22s ease, transform 0.22s ease',
                  }}
                >
                  Plan this trip →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SAMPLE TRIPS ── */}
      <section style={{ padding: '0 24px 96px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '3px', color: C.brand, textTransform: 'uppercase', marginBottom: '10px' }}>Real trip examples</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: '900', color: C.text, letterSpacing: '-1.5px', lineHeight: 1.05 }}>
              What a Voya trip looks like
            </h2>
          </div>
          <p style={{ color: C.muted, fontSize: '15px', maxWidth: '240px', lineHeight: '1.6', textAlign: 'right' }}>
            Tap any card to generate your own version instantly
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '22px' }}>
          {SAMPLE_TRIPS.map(t => (
            <div
              key={t.destination}
              className="sample-card"
              onClick={() => {
                setForm({ destination: t.destination, budget: String(t.budget), days: String(t.days), vibe: ['mix'], accommodation: ['mix'], group: 'solo' });
                scrollToPlanner();
              }}
              style={{
                borderRadius: '24px', overflow: 'hidden', cursor: 'pointer',
                boxShadow: '0 6px 24px rgba(0,0,0,0.09)',
                transition: 'all 0.28s ease',
                background: '#fff',
              }}
            >
              {/* Photo */}
              <div style={{
                height: '240px',
                backgroundImage: `url(${t.photo})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                position: 'relative',
              }}>
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.65) 100%)',
                }} />
                {/* Tag badge */}
                <span style={{
                  position: 'absolute', top: '16px', left: '16px',
                  background: 'rgba(255,255,255,0.96)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '8px', padding: '4px 11px',
                  fontSize: '11px', fontWeight: '800', color: C.text,
                  letterSpacing: '0.1px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                }}>
                  {t.tag}
                </span>
                {/* Social score pill */}
                <span style={{
                  position: 'absolute', top: '16px', right: '16px',
                  background: 'rgba(212,82,42,0.9)',
                  borderRadius: '8px', padding: '4px 11px',
                  fontSize: '11px', fontWeight: '800', color: '#fff',
                }}>
                  Social {t.socialScore}/10
                </span>
                {/* Destination name */}
                <div style={{ position: 'absolute', bottom: '18px', left: '20px', right: '20px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: '900', color: '#fff', marginBottom: '3px', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                    {t.destination}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.72)', fontWeight: '600', letterSpacing: '0.3px' }}>{t.country}</p>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '20px 22px 22px' }}>
                {/* Stat chips */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
                  {[`📅 ${t.days} days`, `💰 $${t.budget.toLocaleString()}`].map(tag => (
                    <span key={tag} style={{
                      fontSize: '12px', fontWeight: '700', color: C.brand,
                      background: C.brandBg, borderRadius: '8px', padding: '5px 12px',
                      border: `1px solid ${C.border}`,
                    }}>{tag}</span>
                  ))}
                </div>
                {/* Highlights */}
                {t.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: C.brand, flexShrink: 0, marginTop: '6px',
                    }} />
                    <span style={{ fontSize: '13px', color: C.muted, lineHeight: '1.55' }}>{h}</span>
                  </div>
                ))}
                {/* CTA */}
                <div
                  className="sample-cta"
                  style={{
                    marginTop: '20px', padding: '12px 16px',
                    background: C.brandBg,
                    borderRadius: '12px', fontSize: '13px', fontWeight: '800',
                    color: C.brand, textAlign: 'center',
                    border: `1.5px solid ${C.border}`,
                    transition: 'all 0.22s ease',
                    letterSpacing: '0.2px',
                  }}
                >
                  Plan a similar trip →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: C.dark, padding: '96px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ marginBottom: '56px' }}>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(38px, 5vw, 62px)',
              fontWeight: '900', color: '#fff',
              letterSpacing: '-2px', lineHeight: 1,
            }}>
              How it works.
            </h2>
          </div>
          <div className="how-it-works-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {HOW_IT_WORKS.map((s, i) => (
              <div key={s.step} style={{
                padding: '40px 32px',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '88px', fontWeight: '900', fontStyle: 'italic',
                  color: 'rgba(212,82,42,0.13)', lineHeight: 0.9,
                  marginBottom: '28px', userSelect: 'none',
                }}>
                  {s.step}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#fff', marginBottom: '10px', letterSpacing: '-0.2px' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.42)', lineHeight: '1.75' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILT FOR YOU ── */}
      <section style={{ padding: '96px 40px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '960px' }}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 5vw, 58px)',
            fontWeight: '900', color: C.text,
            letterSpacing: '-2px', lineHeight: 1.05,
            marginBottom: '64px',
          }}>
            Not your parents'<br />
            <span style={{ fontStyle: 'italic', color: C.brand }}>travel guide.</span>
          </h2>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {[
              { num: '01', title: 'Real budgets, real plans', desc: "We don't suggest $400/night hotels. Every plan is built around what you actually have to spend — hostels, cheap eats, free activities included." },
              { num: '02', title: 'The Social Score', desc: "Every trip gets a Social Score — how easy it is to meet other travelers at your destination. Know before you book whether you're headed somewhere electric or somewhere solo." },
              { num: '03', title: 'Peer intelligence, not tourist traps', desc: "Recommendations filtered through what 18–30 travelers actually rate. Not TripAdvisor reviews from families looking for quiet restaurants." },
            ].map(item => (
              <div key={item.num} style={{
                display: 'grid', gridTemplateColumns: '72px 1fr',
                gap: '32px', padding: '36px 0',
                borderBottom: `1px solid ${C.border}`, alignItems: 'flex-start',
              }}>
                <div style={{
                  fontFamily: 'Playfair Display, serif', fontSize: '42px',
                  fontWeight: '900', fontStyle: 'italic',
                  color: C.border, lineHeight: 1, userSelect: 'none',
                }}>
                  {item.num}
                </div>
                <div>
                  <h3 style={{ fontSize: '19px', fontWeight: '800', color: C.text, marginBottom: '10px', letterSpacing: '-0.3px' }}>{item.title}</h3>
                  <p style={{ fontSize: '15px', color: C.muted, lineHeight: '1.75', maxWidth: '540px' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ── */}
      <section style={{ background: C.dark, padding: '100px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {!emailSubmitted ? (
          <div className="email-grid" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '3px', color: 'rgba(212,82,42,0.7)', textTransform: 'uppercase', marginBottom: '20px' }}>Weekly drops</p>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 4vw, 54px)', fontWeight: '900', lineHeight: '1.08', color: '#fff', letterSpacing: '-1.5px', marginBottom: '20px' }}>
                New trips in<br />your inbox.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '16px', lineHeight: '1.7', borderLeft: '2px solid rgba(212,82,42,0.4)', paddingLeft: '16px' }}>
                Real budgets. Real hostels. Zero fluff — every week for 18–30 travelers who actually go.
              </p>
            </div>
            <div>
              <form onSubmit={handleEmail} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px', padding: '16px 20px', fontSize: '16px',
                    color: '#fff', fontFamily: 'Inter, sans-serif',
                  }}
                />
                <button type="submit" style={{
                  background: C.brand, border: 'none', borderRadius: '12px',
                  padding: '16px', fontSize: '15px', fontWeight: '800',
                  color: '#fff', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.2px',
                }}>
                  Send me trips →
                </button>
              </form>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', marginTop: '12px' }}>No spam. Unsubscribe any time.</p>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '900', color: '#fff', letterSpacing: '-1.5px' }}>
              You're in. 🌍
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '18px', marginTop: '12px' }}>First drop lands in your inbox this week.</p>
          </div>
        )}
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '100px 40px', maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '40px', marginBottom: '64px', flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(38px, 5vw, 64px)', fontWeight: '900', color: C.text, letterSpacing: '-2px', lineHeight: 1, flexShrink: 0 }}>
            Questions.
          </h2>
          <p style={{ fontSize: '15px', color: C.muted, lineHeight: '1.65', maxWidth: '320px' }}>
            Everything you want to know before you hit build.
          </p>
        </div>
        <div>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderTop: `1px solid ${C.border}`, paddingTop: '28px', paddingBottom: '28px' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', background: 'transparent',
                  border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0,
                }}
              >
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: '700', color: C.text, lineHeight: '1.3', paddingRight: '32px' }}>{faq.q}</span>
                <span style={{ fontSize: '22px', color: C.brand, fontWeight: '300', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)', marginTop: '2px' }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ marginTop: '16px', animation: 'fadeUp 0.2s ease' }}>
                  <p style={{ fontSize: '15px', color: C.muted, lineHeight: '1.75', maxWidth: '620px' }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.border}` }} />
        </div>
      </section>

      {/* ── PLANNER ── */}
      <section ref={plannerRef} style={{ background: '#fff', borderTop: `1px solid ${C.border}`, padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '3px', color: C.brand, textTransform: 'uppercase', marginBottom: '14px' }}>Trip planner</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: '900', color: C.text, letterSpacing: '-2px', lineHeight: '1.05', marginBottom: '12px' }}>
              Where are you going?
            </h2>
            <p style={{ color: C.muted, fontSize: '16px', lineHeight: '1.6' }}>Give us the details — we handle everything else.</p>
          </div>

          {!trip && !loading && (
            <form onSubmit={handleSubmit} style={{ animation: 'fadeUp 0.4s ease' }}>

              {/* ── Destination ── */}
              <div style={{ marginBottom: '36px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: '900', color: C.text, letterSpacing: '-0.5px', margin: 0 }}>Where to?</h3>
                  <button type="button" onClick={surpriseMe} style={{ background: 'none', border: `1.5px solid ${C.brand}`, borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', color: C.brand, cursor: 'pointer' }}>🎲 Surprise me</button>
                </div>
                <div style={{ position: 'relative' }} ref={destRef}>
                  <input
                    type="text"
                    placeholder="City, country or region..."
                    value={form.destination}
                    onChange={e => { setForm({ ...form, destination: e.target.value }); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    style={{ ...inputBase, fontSize: '16px', padding: '16px 18px' }}
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

                {/* Trending quick-picks */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginTop: '14px', scrollbarWidth: 'none' }}>
                  {TRENDING_PICKS.map(t => (
                    <button key={t.dest} type="button" onClick={() => { prefill(t.dest); }}
                      style={{ flexShrink: 0, background: form.destination === t.dest ? C.brandBg : '#F5F5F4', border: `1.5px solid ${form.destination === t.dest ? C.brand : 'transparent'}`, borderRadius: '20px', padding: '7px 14px', fontSize: '13px', fontWeight: '600', color: form.destination === t.dest ? C.brand : C.muted, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s' }}>
                      {t.emoji} {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Divider ── */}
              <div style={{ height: '1px', background: C.border, marginBottom: '36px' }} />

              {/* ── Flying From ── */}
              <div style={{ marginBottom: '36px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: '900', color: C.text, letterSpacing: '-0.5px', marginBottom: '14px' }}>Flying from?</h3>
                <div style={{ position: 'relative' }} ref={depRef}>
                  <input
                    type="text"
                    placeholder="New York, London, Sydney..."
                    value={form.departureCity}
                    onChange={e => { setForm({ ...form, departureCity: e.target.value }); setShowDepSuggestions(true); }}
                    onFocus={() => setShowDepSuggestions(true)}
                    style={{ ...inputBase, fontSize: '16px', padding: '16px 18px' }}
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
                  <label style={label}>📅 When? <span style={{ fontWeight: '400', textTransform: 'none', letterSpacing: 0, color: C.subtle }}>(optional)</span></label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <select value={form.travelMonth} onChange={e => setForm({ ...form, travelMonth: e.target.value })} style={{ ...inputBase, color: form.travelMonth ? C.text : '#A8A29E', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%239A8880\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px', cursor: 'pointer' }}>
                      <option value="">Month</option>
                      {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={form.travelYear} onChange={e => setForm({ ...form, travelYear: e.target.value })} style={{ ...inputBase, color: form.travelYear ? C.text : '#A8A29E', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%239A8880\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px', cursor: 'pointer' }}>
                      <option value="">Year</option>
                      {[2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── Divider ── */}
              <div style={{ height: '1px', background: C.border, marginBottom: '36px' }} />

              {/* ── How Long ── */}
              <div style={{ marginBottom: '36px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: '900', color: C.text, letterSpacing: '-0.5px', marginBottom: '14px' }}>How long?</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {DAY_PRESETS.map(d => (
                    <button key={d} type="button" onClick={() => setForm({ ...form, days: String(d) })} style={{
                      padding: '10px 20px', borderRadius: '24px',
                      border: `2px solid ${form.days === String(d) ? C.brand : '#E7E5E4'}`,
                      background: form.days === String(d) ? C.brand : '#fff',
                      color: form.days === String(d) ? '#fff' : C.muted,
                      fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.15s',
                    }}>{d} days</button>
                  ))}
                  <input type="number" placeholder="Other" value={DAY_PRESETS.includes(Number(form.days)) ? '' : form.days} onChange={e => setForm({ ...form, days: e.target.value })} style={{ ...inputBase, width: '90px', padding: '10px 14px', fontSize: '14px', borderRadius: '24px' }} min="1" max="90" />
                </div>
              </div>

              {/* ── Divider ── */}
              <div style={{ height: '1px', background: C.border, marginBottom: '36px' }} />

              {/* ── Budget ── */}
              <div style={{ marginBottom: '36px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: '900', color: C.text, letterSpacing: '-0.5px', margin: 0 }}>What's your budget?</h3>
                  {perDay && <span style={{ fontSize: '14px', fontWeight: '700', color: C.brand }}>≈ ${perDay}/day</span>}
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                  {[['🎒', 'Backpacker', '1000'], ['🏡', 'Standard', '2000'], ['✨', 'Comfort', '3500'], ['💎', 'Luxury', '6000']].map(([emoji, lbl, val]) => (
                    <button key={val} type="button" onClick={() => setForm({ ...form, budget: val })} style={{
                      flex: 1, padding: '14px 8px', borderRadius: '16px',
                      border: `2px solid ${form.budget === val ? C.brand : '#E7E5E4'}`,
                      background: form.budget === val ? C.brand : '#fff',
                      color: form.budget === val ? '#fff' : C.muted,
                      fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                      textAlign: 'center', transition: 'all 0.15s', lineHeight: '1.4',
                    }}>
                      <div style={{ fontSize: '20px', marginBottom: '4px' }}>{emoji}</div>
                      {lbl}
                    </button>
                  ))}
                </div>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '15px', fontWeight: '700', color: C.muted }}>$</span>
                  <input type="number" placeholder="Custom amount" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} style={{ ...inputBase, paddingLeft: '32px' }} />
                </div>
              </div>

              {/* ── Divider ── */}
              <div style={{ height: '1px', background: C.border, marginBottom: '36px' }} />

              {/* ── Vibe ── */}
              <div style={{ marginBottom: '36px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: '900', color: C.text, letterSpacing: '-0.5px', margin: 0 }}>What's your vibe?</h3>
                  <span style={{ fontSize: '12px', color: C.muted }}>Pick any</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {VIBES.map(v => {
                    const on = form.vibe.includes(v.id);
                    return (
                      <button key={v.id} type="button" onClick={() => toggleMulti('vibe', v.id)} style={{
                        padding: '10px 18px', borderRadius: '24px', cursor: 'pointer',
                        border: `2px solid ${on ? C.brand : '#E7E5E4'}`,
                        background: on ? C.brand : '#fff',
                        color: on ? '#fff' : C.muted,
                        fontSize: '14px', fontWeight: '600', fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '6px',
                      }}>
                        <span>{v.emoji}</span><span>{v.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Divider ── */}
              <div style={{ height: '1px', background: C.border, marginBottom: '36px' }} />

              {/* ── Accommodation ── */}
              <div style={{ marginBottom: '36px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: '900', color: C.text, letterSpacing: '-0.5px', margin: 0 }}>Where are you staying?</h3>
                  <span style={{ fontSize: '12px', color: C.muted }}>Pick any</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {ACCOMMODATION_TYPES.map(a => {
                    const on = form.accommodation.includes(a.id);
                    return (
                      <button key={a.id} type="button" onClick={() => toggleMulti('accommodation', a.id)} style={{
                        padding: '10px 18px', borderRadius: '24px', cursor: 'pointer',
                        border: `2px solid ${on ? C.brand : '#E7E5E4'}`,
                        background: on ? C.brand : '#fff',
                        color: on ? '#fff' : C.muted,
                        fontSize: '14px', fontWeight: '600', fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '6px',
                      }}>
                        <span>{a.emoji}</span><span>{a.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Divider ── */}
              <div style={{ height: '1px', background: C.border, marginBottom: '36px' }} />

              {/* ── Who's going ── */}
              <div style={{ marginBottom: '36px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: '900', color: C.text, letterSpacing: '-0.5px', marginBottom: '14px' }}>Who's going?</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {GROUP_TYPES.map(g => (
                    <button key={g.id} type="button" onClick={() => setForm({ ...form, group: g.id })} style={{
                      flex: 1, padding: '16px 10px', borderRadius: '16px', cursor: 'pointer',
                      border: `2px solid ${form.group === g.id ? C.brand : '#E7E5E4'}`,
                      background: form.group === g.id ? C.brand : '#fff',
                      color: form.group === g.id ? '#fff' : C.muted,
                      textAlign: 'center', transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
                    }}>
                      <div style={{ fontSize: '22px', marginBottom: '6px' }}>{g.emoji}</div>
                      <div style={{ fontSize: '13px', fontWeight: '700' }}>{g.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Anything else? ── */}
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: '900', color: C.text, letterSpacing: '-0.5px', marginBottom: '6px' }}>
                  Anything specific?
                </h3>
                <p style={{ fontSize: '13px', color: C.muted, marginBottom: '12px' }}>Tell us what you actually want to do — we'll build around it.</p>
                <textarea
                  rows={3}
                  placeholder="e.g. I want to try scuba diving, avoid tourist traps, hit the best local street food spots, and find good nightlife..."
                  value={form.tripNotes}
                  onChange={e => setForm(f => ({ ...f, tripNotes: e.target.value }))}
                  maxLength={400}
                  style={{
                    ...inputBase,
                    resize: 'none',
                    lineHeight: '1.6',
                    fontSize: '15px',
                    padding: '16px 18px',
                    fontFamily: 'Inter, sans-serif',
                    color: C.text,
                  }}
                />
                {form.tripNotes.length > 0 && (
                  <div style={{ fontSize: '11px', color: C.subtle, textAlign: 'right', marginTop: '4px' }}>
                    {400 - form.tripNotes.length} characters left
                  </div>
                )}
              </div>

              {error && <p style={{ color: '#DC2626', fontSize: '14px', marginBottom: '12px', textAlign: 'center', fontWeight: '500' }}>{error}</p>}
              <button type="submit" style={{
                width: '100%', background: C.brand, border: 'none',
                borderRadius: '16px', padding: '20px', fontSize: '17px', fontWeight: '800',
                color: '#fff', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                boxShadow: `0 8px 32px rgba(212,82,42,0.35)`,
                letterSpacing: '0.2px', marginTop: '8px',
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
                onClick={() => { setTrip(null); setForm({ destination: '', budget: '', days: '', vibe: [], accommodation: [], group: '', departureCity: '', travelMonth: '', travelYear: '', tripNotes: '' }); window.scrollTo({ top: plannerRef.current?.offsetTop - 100, behavior: 'smooth' }); }}
                style={{ width: '100%', background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: '14px', padding: '16px', fontSize: '15px', fontWeight: '600', color: C.muted, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: '20px' }}
              >
                ← Plan Another Trip
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.dark, padding: '72px 40px 48px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px', marginBottom: '56px' }}>
            {/* Brand */}
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: '900', fontStyle: 'italic', color: C.brandLt, lineHeight: 1, marginBottom: '10px' }}>voya</div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.28)', lineHeight: '1.65', maxWidth: '220px' }}>
                Trip planning for the generation that actually goes.
              </p>
            </div>
            {/* Links */}
            <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Explore</div>
                {[
                  { label: 'Plan a trip', action: scrollToPlanner },
                ].map(l => (
                  <div key={l.label} style={{ marginBottom: '10px' }}>
                    <button onClick={l.action} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif', padding: 0 }}>
                      {l.label}
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Follow</div>
                {[
                  { label: '@govoya on TikTok', href: 'https://tiktok.com/@govoya' },
                  { label: '@govoya on Instagram', href: 'https://instagram.com/govoya' },
                ].map(l => (
                  <div key={l.label} style={{ marginBottom: '10px' }}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                      {l.label}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Bottom row */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.18)' }}>
              © 2025 Voya. Free to use.
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.16)' }}>
              Photos via{' '}
              <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.28)', textDecoration: 'underline' }}>Unsplash</a>
              {' '}— Niklas Weiss, Charlie M, Jordan Steranka & more
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
