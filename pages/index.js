import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

/* ── Brand tokens ─────────────────────────────────────────── */
const C = {
  brand:   '#B8962E',   // warm gold
  brandLt: '#D4AE4A',   // lighter gold
  brandBg: '#FBF6EA',   // soft cream
  dark:    '#0F0B06',   // near-black warm
  dark2:   '#1C1409',
  text:    '#1E1208',
  muted:   '#7A6A58',
  subtle:  '#B5A898',
  border:  '#EDE5D8',
  card:    '#FFFFFF',
  cream:   '#FFFDF7',
};

/* ── Rotating hero photos ─────────────────────────────────── */
const HERO_PHOTOS = [
  { url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=85', place: 'Bali, Indonesia' },
  { url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1800&q=85', place: 'Santorini, Greece' },
  { url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1800&q=85', place: 'Tokyo, Japan' },
  { url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1800&q=85', place: 'Amalfi Coast, Italy' },
  { url: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1800&q=85', place: 'Lisbon, Portugal' },
  { url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1800&q=85', place: 'Phuket, Thailand' },
];

/* ── Destination photo grid ───────────────────────────────── */
const DEST_GRID = [
  { name: 'Bali', country: 'Indonesia', photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' },
  { name: 'Santorini', country: 'Greece', photo: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80' },
  { name: 'Tokyo', country: 'Japan', photo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80' },
  { name: 'Lisbon', country: 'Portugal', photo: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=600&q=80' },
  { name: 'Phuket', country: 'Thailand', photo: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=600&q=80' },
  { name: 'Amalfi', country: 'Italy', photo: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80' },
  { name: 'Marrakech', country: 'Morocco', photo: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?auto=format&fit=crop&w=600&q=80' },
  { name: 'Medellín', country: 'Colombia', photo: 'https://images.unsplash.com/photo-1598715685267-a4b41740ade7?auto=format&fit=crop&w=600&q=80' },
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
    photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    tag: '🔥 Most Popular',
  },
  {
    destination: 'Lisbon',
    country: 'Portugal',
    days: 10,
    budget: 1500,
    socialScore: 8,
    highlights: ['Alfama neighbourhood at golden hour', 'LX Factory weekend market', 'Day trip to Sintra'],
    photo: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80',
    tag: '⭐ Editor\'s Pick',
  },
  {
    destination: 'Tokyo',
    country: 'Japan',
    days: 12,
    budget: 2200,
    socialScore: 8,
    highlights: ['Shibuya crossing at midnight', 'Tsukiji market breakfast', 'Capsule hotel experience'],
    photo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    tag: '🌟 Trending',
  },
];

const VIBES = [
  { id: 'party', emoji: '🎉', label: 'Party', desc: 'Nightlife & social scenes' },
  { id: 'culture', emoji: '🏛️', label: 'Culture', desc: 'History & local life' },
  { id: 'adventure', emoji: '🏔️', label: 'Adventure', desc: 'Outdoors & thrills' },
  { id: 'mix', emoji: '✨', label: 'Mix It All', desc: 'A bit of everything' },
];

const FAQS = [
  { q: 'Is Voya free?', a: 'Yes — the trip planner is completely free. We earn a small commission when you book hostels or flights through our links, at zero extra cost to you.' },
  { q: 'Are the prices accurate?', a: 'We use live pricing data from hostel booking platforms. Prices vary by season, so treat estimates as a solid baseline and check live availability when you\'re ready to book.' },
  { q: 'Can I use this for group trips?', a: 'Squad features are coming soon — find others heading to the same destination at the same time. For now, build your plan and share the screenshot with your travel crew.' },
  { q: 'What if I want to change my itinerary?', a: 'Hit "Plan Another Trip," tweak your inputs, and regenerate. You can run as many plans as you want — totally free.' },
];

const HOW_IT_WORKS = [
  { step: '01', emoji: '📍', title: 'Tell us where', desc: 'Drop your destination, budget, how long you have, and the vibe you\'re going for.' },
  { step: '02', emoji: '✨', title: 'We build your trip', desc: 'Real day-by-day itinerary. Real hostel prices. What to skip. Where to actually go.' },
  { step: '03', emoji: '✈️', title: 'Go', desc: 'Screenshot your plan, pack your bag, and head out. Simple.' },
];

export default function Home() {
  const [form, setForm] = useState({ destination: '', budget: '', days: '', vibe: '' });
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
  const plannerRef = useRef(null);

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

  const scrollToPlanner = () => {
    plannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const prefill = (dest) => {
    setForm(f => ({ ...f, destination: dest }));
    scrollToPlanner();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.destination || !form.budget || !form.days || !form.vibe) {
      setError('Fill in all fields to build your trip.');
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
          <div style={{
            display: 'inline-block', background: 'rgba(184,150,46,0.25)', border: '1px solid rgba(184,150,46,0.5)',
            backdropFilter: 'blur(8px)', borderRadius: '100px', padding: '6px 20px',
            fontSize: '13px', fontWeight: '700', color: C.brandLt, marginBottom: '28px', letterSpacing: '0.5px',
          }}>
            For the generation that actually goes 🌍
          </div>

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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {DEST_GRID.map((d) => (
            <div
              key={d.name}
              className="dest-tile"
              onClick={() => prefill(d.name)}
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
                setForm({ destination: t.destination, budget: String(t.budget), days: String(t.days), vibe: 'mix' });
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
              <div style={{ background: C.cream, borderRadius: '24px', padding: '28px', marginBottom: '16px', border: `1px solid ${C.border}` }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={label}>✈️  Destination</label>
                  <input type="text" placeholder="Bali, Tokyo, Lisbon, anywhere..." value={form.destination}
                    onChange={e => setForm({ ...form, destination: e.target.value })} style={inputBase}
                    onFocus={e => e.target.style.borderColor = C.brand}
                    onBlur={e => e.target.style.borderColor = '#E7E5E4'} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                  <div>
                    <label style={label}>💰  Budget (USD)</label>
                    <input type="number" placeholder="2,000" value={form.budget}
                      onChange={e => setForm({ ...form, budget: e.target.value })} style={inputBase}
                      onFocus={e => e.target.style.borderColor = C.brand}
                      onBlur={e => e.target.style.borderColor = '#E7E5E4'} />
                  </div>
                  <div>
                    <label style={label}>📅  Days</label>
                    <input type="number" placeholder="14" value={form.days}
                      onChange={e => setForm({ ...form, days: e.target.value })} style={inputBase}
                      onFocus={e => e.target.style.borderColor = C.brand}
                      onBlur={e => e.target.style.borderColor = '#E7E5E4'} />
                  </div>
                </div>
                <div>
                  <label style={label}>🎯  Your Vibe</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {VIBES.map(v => (
                      <button key={v.id} type="button" onClick={() => setForm({ ...form, vibe: v.id })} style={{
                        background: form.vibe === v.id ? C.brandBg : '#fff',
                        border: `1.5px solid ${form.vibe === v.id ? C.brand : '#E7E5E4'}`,
                        borderRadius: '14px', padding: '14px 16px', cursor: 'pointer',
                        textAlign: 'left', transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
                      }}>
                        <div style={{ fontSize: '20px', marginBottom: '4px' }}>{v.emoji}</div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: form.vibe === v.id ? C.brand : C.text, marginBottom: '2px' }}>{v.label}</div>
                        <div style={{ fontSize: '12px', color: C.muted }}>{v.desc}</div>
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
                <span style={{ display: 'inline-block', background: `rgba(184,150,46,0.2)`, border: `1px solid rgba(184,150,46,0.4)`, borderRadius: '8px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px', color: C.brandLt }}>
                  {form.days} Days · ${Number(form.budget).toLocaleString()}
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
                    <div style={{ textAlign: 'right', fontSize: '13px', color: C.subtle, marginTop: '8px' }}>
                      Est. daily spend: <span style={{ color: C.brand, fontWeight: '700' }}>${trip.days[activeDay].cost}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Hostels */}
              <div style={card}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>🏠 Best Places to Stay</h3>
                {trip.topHostels?.map((h, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px', padding: '14px 16px', background: C.cream, borderRadius: '12px', marginBottom: '10px', border: `1px solid ${C.border}` }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>{h.name}</div>
                      <div style={{ fontSize: '12px', color: C.subtle, marginBottom: '4px', fontWeight: '500' }}>{h.vibe}</div>
                      <div style={{ fontSize: '13px', color: C.muted, lineHeight: '1.5' }}>{h.why}</div>
                    </div>
                    <div style={{ flexShrink: 0, background: C.brandBg, border: `1.5px solid ${C.border}`, borderRadius: '12px', padding: '10px 14px', textAlign: 'center' }}>
                      <div style={{ fontSize: '17px', fontWeight: '900', color: C.brand }}>${h.pricePerNight}</div>
                      <div style={{ fontSize: '10px', color: C.muted }}>/ night</div>
                    </div>
                  </div>
                ))}
              </div>

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
                onClick={() => { setTrip(null); setForm({ destination: '', budget: '', days: '', vibe: '' }); window.scrollTo({ top: plannerRef.current?.offsetTop - 100, behavior: 'smooth' }); }}
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
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.15)' }}>
          Photos by <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.25)' }}>Unsplash</a>
        </p>
      </footer>
    </>
  );
}
