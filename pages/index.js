import { useState, useRef } from 'react';
import Head from 'next/head';

const VIBES = [
  { id: 'party', emoji: '🎉', label: 'Party', desc: 'Nightlife & social scenes' },
  { id: 'culture', emoji: '🏛️', label: 'Culture', desc: 'History & local life' },
  { id: 'adventure', emoji: '🏔️', label: 'Adventure', desc: 'Outdoors & thrills' },
  { id: 'mix', emoji: '✨', label: 'Mix It All', desc: 'A bit of everything' },
];

const SAMPLE_TRIPS = [
  {
    emoji: '🏝️',
    destination: 'Bali, Indonesia',
    days: 14,
    budget: '$1,800',
    socialScore: 9,
    highlights: ['Canggu surf & café scene', 'Ubud rice terraces & temples', 'Full moon parties in Kuta'],
    vibe: 'Party + Culture',
    accent: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
  },
  {
    emoji: '🏰',
    destination: 'Lisbon, Portugal',
    days: 10,
    budget: '$1,500',
    socialScore: 8,
    highlights: ['Alfama neighbourhood at sunset', 'LX Factory weekend market', 'Day trip to Sintra'],
    vibe: 'Culture + Mix',
    accent: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
  },
  {
    emoji: '🌸',
    destination: 'Tokyo, Japan',
    days: 12,
    budget: '$2,200',
    socialScore: 8,
    highlights: ['Shibuya crossing at midnight', 'Tsukiji market breakfast', 'Capsule hotel experience'],
    vibe: 'Culture + Adventure',
    accent: '#DB2777',
    bg: '#FDF2F8',
    border: '#FBCFE8',
  },
];

const HOW_IT_WORKS = [
  { step: '01', emoji: '📍', title: 'Tell us where', desc: 'Drop your destination, budget, how long you have, and the vibe you are going for.' },
  { step: '02', emoji: '✨', title: 'We build your trip', desc: 'Real day-by-day itinerary. Real hostel prices. What to skip. Where to actually go.' },
  { step: '03', emoji: '✈️', title: 'Go', desc: 'Screenshot your plan, pack your bag, and head out. Simple.' },
];

export default function Home() {
  const [form, setForm] = useState({ destination: '', budget: '', days: '', vibe: '' });
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState('');
  const [activeDay, setActiveDay] = useState(0);
  const plannerRef = useRef(null);

  const scrollToPlanner = () => {
    plannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const totalSpend = trip ? Object.values(trip.budgetBreakdown).reduce((a, b) => a + b, 0) : 0;

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
        body { font-family: 'Inter', sans-serif; background: #FFFDF7; color: #1C1917; min-height: 100vh; }
        input:focus { outline: none; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: #D6D3D1; border-radius: 2px; }
      `}</style>

      {/* Nav */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 32px',
        borderBottom: '1px solid #F5F0E8',
        background: '#FFFDF7',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <span style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '26px',
          fontWeight: '900',
          color: '#0D9488',
        }}>voya</span>
        <button
          onClick={scrollToPlanner}
          style={{
            background: '#0D9488',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 22px',
            fontSize: '14px',
            fontWeight: '700',
            color: '#fff',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Plan a Trip ✈️
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        textAlign: 'center',
        padding: '72px 24px 60px',
        maxWidth: '720px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'inline-block',
          background: '#F0FDFA',
          border: '1px solid #99F6E4',
          borderRadius: '100px',
          padding: '6px 18px',
          fontSize: '13px',
          fontWeight: '700',
          color: '#0D9488',
          marginBottom: '24px',
          letterSpacing: '0.3px',
        }}>
          Built for 18–30 solo travelers 🌍
        </div>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(40px, 8vw, 64px)',
          fontWeight: '900',
          lineHeight: '1.08',
          letterSpacing: '-2px',
          color: '#1C1917',
          marginBottom: '22px',
        }}>
          Stop researching.<br />
          <span style={{ color: '#0D9488', fontStyle: 'italic' }}>Start going.</span>
        </h1>

        <p style={{
          color: '#78716C',
          fontSize: '18px',
          lineHeight: '1.65',
          maxWidth: '480px',
          margin: '0 auto 36px',
        }}>
          Drop your destination and budget. Voya builds you a real day-by-day itinerary — with actual hostel prices, local tips, and the social scene for your vibe.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={scrollToPlanner}
            style={{
              background: 'linear-gradient(135deg, #0D9488, #0F766E)',
              border: 'none',
              borderRadius: '14px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '800',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              boxShadow: '0 8px 24px rgba(13,148,136,0.3)',
            }}
          >
            Build my trip →
          </button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: '#A8A29E',
            fontWeight: '500',
          }}>
            <span>✓</span> Free to use &nbsp;·&nbsp; <span>✓</span> Takes 10 seconds
          </div>
        </div>
      </section>

      {/* ── SAMPLE TRIPS ── */}
      <section style={{
        padding: '0 20px 72px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: '900',
            color: '#1C1917',
            marginBottom: '10px',
          }}>
            Where do you want to go?
          </h2>
          <p style={{ color: '#78716C', fontSize: '15px' }}>Here is what a Voya trip looks like</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {SAMPLE_TRIPS.map((t) => (
            <div
              key={t.destination}
              onClick={() => {
                setForm({ destination: t.destination.split(',')[0], budget: t.budget.replace('$','').replace(',',''), days: String(t.days), vibe: 'mix' });
                scrollToPlanner();
              }}
              style={{
                background: '#fff',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                border: `1px solid ${t.border}`,
                cursor: 'pointer',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)'; }}
            >
              {/* Card Header */}
              <div style={{ background: t.bg, padding: '24px 24px 20px' }}>
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>{t.emoji}</div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1C1917',
                  marginBottom: '6px',
                }}>
                  {t.destination}
                </h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: t.accent, background: '#fff', borderRadius: '6px', padding: '3px 8px' }}>
                    {t.days} days
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: t.accent, background: '#fff', borderRadius: '6px', padding: '3px 8px' }}>
                    {t.budget}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: t.accent, background: '#fff', borderRadius: '6px', padding: '3px 8px' }}>
                    Social {t.socialScore}/10
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '18px 24px 22px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                  Highlights
                </div>
                {t.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '7px' }}>
                    <span style={{ color: t.accent, fontWeight: '800', fontSize: '12px', marginTop: '2px', flexShrink: 0 }}>→</span>
                    <span style={{ fontSize: '13px', color: '#57534E', lineHeight: '1.5' }}>{h}</span>
                  </div>
                ))}
                <div style={{
                  marginTop: '16px',
                  padding: '10px 14px',
                  background: t.bg,
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: t.accent,
                  textAlign: 'center',
                }}>
                  Plan a similar trip →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{
        background: '#fff',
        borderTop: '1px solid #F5F0E8',
        borderBottom: '1px solid #F5F0E8',
        padding: '64px 24px',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(24px, 4vw, 32px)',
              fontWeight: '900',
              color: '#1C1917',
              marginBottom: '10px',
            }}>
              How it works
            </h2>
            <p style={{ color: '#78716C', fontSize: '15px' }}>Three steps. Ten seconds. One real trip plan.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '56px', height: '56px',
                  background: '#F0FDFA',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                  margin: '0 auto 16px',
                  border: '1px solid #99F6E4',
                }}>
                  {step.emoji}
                </div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#0D9488', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '6px' }}>
                  Step {step.step}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#1C1917', marginBottom: '8px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#78716C', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILT FOR YOU ── */}
      <section style={{ padding: '72px 24px', maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: '900',
            color: '#1C1917',
            marginBottom: '10px',
          }}>
            Not your parents' travel guide
          </h2>
          <p style={{ color: '#78716C', fontSize: '15px', maxWidth: '400px', margin: '0 auto' }}>
            Voya is built specifically for the way 18-30 year olds actually travel
          </p>
        </div>

        <div style={{ display: 'grid', gap: '14px' }}>
          {[
            { emoji: '💸', title: 'Real budgets, real plans', desc: "We don't suggest $400/night hotels. Every plan is built around what you actually have to spend — hostels, cheap eats, free activities included." },
            { emoji: '🤝', title: 'The Social Score', desc: "Every trip gets a Social Score — how easy it is to meet people at your destination. Know before you book whether you're headed somewhere social or somewhere solo." },
            { emoji: '📍', title: 'Peer intelligence, not tourist traps', desc: "Our recommendations come from people your age who've actually been there. Not TripAdvisor reviews from people twice your age looking for quiet restaurants." },
          ].map((item) => (
            <div key={item.title} style={{
              display: 'flex',
              gap: '20px',
              padding: '22px 24px',
              background: '#fff',
              borderRadius: '18px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              border: '1px solid #F5F0E8',
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: '48px', height: '48px',
                background: '#F0FDFA',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
                border: '1px solid #99F6E4',
              }}>
                {item.emoji}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1C1917', marginBottom: '6px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#78716C', lineHeight: '1.65' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANNER FORM ── */}
      <section
        ref={plannerRef}
        style={{
          background: '#fff',
          borderTop: '1px solid #F5F0E8',
          padding: '64px 24px 80px',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: '900',
              color: '#1C1917',
              marginBottom: '10px',
              letterSpacing: '-1px',
            }}>
              Where are you going?
            </h2>
            <p style={{ color: '#78716C', fontSize: '15px' }}>Tell us your trip details and we will handle the rest</p>
          </div>

          {!trip && !loading && (
            <form onSubmit={handleSubmit} style={{ animation: 'fadeUp 0.4s ease' }}>
              <div style={{
                background: '#FAFAF9',
                borderRadius: '24px',
                padding: '28px',
                marginBottom: '16px',
                border: '1px solid #F5F0E8',
              }}>
                {/* Destination */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '8px' }}>
                    ✈️  Destination
                  </label>
                  <input
                    type="text"
                    placeholder="Bali, Tokyo, Lisbon, anywhere..."
                    value={form.destination}
                    onChange={e => setForm({ ...form, destination: e.target.value })}
                    style={{
                      width: '100%', background: '#fff', border: '1.5px solid #E7E5E4',
                      borderRadius: '14px', padding: '14px 18px', fontSize: '16px',
                      color: '#1C1917', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#0D9488'}
                    onBlur={e => e.target.style.borderColor = '#E7E5E4'}
                  />
                </div>

                {/* Budget + Days */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '8px' }}>
                      💰  Budget (USD)
                    </label>
                    <input
                      type="number"
                      placeholder="2,000"
                      value={form.budget}
                      onChange={e => setForm({ ...form, budget: e.target.value })}
                      style={{
                        width: '100%', background: '#fff', border: '1.5px solid #E7E5E4',
                        borderRadius: '14px', padding: '14px 18px', fontSize: '16px',
                        color: '#1C1917', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = '#0D9488'}
                      onBlur={e => e.target.style.borderColor = '#E7E5E4'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '8px' }}>
                      📅  Days
                    </label>
                    <input
                      type="number"
                      placeholder="14"
                      value={form.days}
                      onChange={e => setForm({ ...form, days: e.target.value })}
                      style={{
                        width: '100%', background: '#fff', border: '1.5px solid #E7E5E4',
                        borderRadius: '14px', padding: '14px 18px', fontSize: '16px',
                        color: '#1C1917', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = '#0D9488'}
                      onBlur={e => e.target.style.borderColor = '#E7E5E4'}
                    />
                  </div>
                </div>

                {/* Vibe */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '10px' }}>
                    🎯  Your Vibe
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {VIBES.map(v => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setForm({ ...form, vibe: v.id })}
                        style={{
                          background: form.vibe === v.id ? '#F0FDFA' : '#fff',
                          border: `1.5px solid ${form.vibe === v.id ? '#0D9488' : '#E7E5E4'}`,
                          borderRadius: '14px', padding: '14px 16px', cursor: 'pointer',
                          textAlign: 'left', transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        <div style={{ fontSize: '20px', marginBottom: '4px' }}>{v.emoji}</div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: form.vibe === v.id ? '#0D9488' : '#1C1917', marginBottom: '2px' }}>{v.label}</div>
                        <div style={{ fontSize: '12px', color: '#A8A29E' }}>{v.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && <p style={{ color: '#DC2626', fontSize: '14px', marginBottom: '12px', textAlign: 'center', fontWeight: '500' }}>{error}</p>}

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #0D9488, #0F766E)',
                  border: 'none', borderRadius: '16px', padding: '20px',
                  fontSize: '17px', fontWeight: '800', color: '#fff', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 24px rgba(13,148,136,0.3)',
                }}
              >
                Build My Trip ✈️
              </button>
            </form>
          )}

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px', animation: 'float 1.5s ease-in-out infinite' }}>🌍</div>
              <p style={{ color: '#78716C', fontSize: '16px', fontWeight: '500' }}>Building your perfect trip...</p>
              <p style={{ color: '#A8A29E', fontSize: '14px', marginTop: '6px' }}>Takes about 10 seconds</p>
            </div>
          )}

          {/* Trip Output */}
          {trip && (
            <div style={{ animation: 'fadeUp 0.5s ease' }}>

              {/* Hero Card */}
              <div style={{
                background: 'linear-gradient(135deg, #0D9488, #0F766E)',
                borderRadius: '24px', padding: '32px', marginBottom: '16px',
                color: '#fff', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '110px', opacity: '0.08', lineHeight: 1 }}>✈️</div>
                <span style={{
                  display: 'inline-block', background: 'rgba(255,255,255,0.2)', borderRadius: '8px',
                  padding: '4px 12px', fontSize: '12px', fontWeight: '700',
                  textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px',
                }}>
                  {form.days} Days · ${Number(form.budget).toLocaleString()}
                </span>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 5vw, 30px)', fontWeight: '900', lineHeight: '1.2', marginBottom: '8px' }}>
                  {trip.title}
                </h2>
                <p style={{ opacity: '0.85', fontSize: '15px', marginBottom: '22px' }}>{trip.tagline}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.15)', borderRadius: '14px', padding: '14px 18px' }}>
                  <div style={{ width: '44px', height: '44px', background: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '900', color: '#0D9488', flexShrink: 0 }}>
                    {trip.socialScore}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700' }}>Social Score</div>
                    <div style={{ fontSize: '12px', opacity: '0.8' }}>{trip.socialScoreLabel}</div>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', marginBottom: '14px', border: '1px solid #F5F0E8', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', marginBottom: '18px' }}>💰 Budget Breakdown</h3>
                {Object.entries(trip.budgetBreakdown).map(([key, val]) => {
                  const pct = Math.round((val / totalSpend) * 100);
                  return (
                    <div key={key} style={{ marginBottom: '13px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontSize: '14px', textTransform: 'capitalize', color: '#57534E', fontWeight: '500' }}>{key}</span>
                        <span style={{ fontSize: '14px', fontWeight: '700' }}>${val}</span>
                      </div>
                      <div style={{ height: '5px', background: '#F5F0E8', borderRadius: '3px' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #0D9488, #14B8A6)', borderRadius: '3px' }} />
                      </div>
                    </div>
                  );
                })}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #F5F0E8' }}>
                  <span style={{ fontSize: '14px', color: '#78716C' }}>Total Estimated</span>
                  <span style={{ fontSize: '22px', fontWeight: '800', color: '#0D9488', fontFamily: 'Playfair Display, serif' }}>${totalSpend}</span>
                </div>
              </div>

              {/* Days */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', marginBottom: '14px', border: '1px solid #F5F0E8', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>🗺️ Day by Day</h3>
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '14px', marginBottom: '16px' }}>
                  {trip.days.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveDay(i)}
                      style={{
                        flexShrink: 0, padding: '7px 14px', borderRadius: '10px',
                        border: `1.5px solid ${activeDay === i ? '#0D9488' : '#E7E5E4'}`,
                        background: activeDay === i ? '#F0FDFA' : '#FAFAF9',
                        color: activeDay === i ? '#0D9488' : '#78716C',
                        fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      Day {d.day}
                    </button>
                  ))}
                </div>
                {trip.days[activeDay] && (
                  <div>
                    <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '19px', fontWeight: '700', marginBottom: '14px' }}>{trip.days[activeDay].title}</h4>
                    {[
                      { label: '🌅 Morning', content: trip.days[activeDay].morning },
                      { label: '☀️ Afternoon', content: trip.days[activeDay].afternoon },
                      { label: '🌙 Evening', content: trip.days[activeDay].evening },
                    ].map(({ label, content }) => (
                      <div key={label} style={{ padding: '14px 16px', background: '#FAFAF9', borderRadius: '12px', marginBottom: '8px', border: '1px solid #F5F0E8' }}>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#0D9488', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{label}</div>
                        <p style={{ fontSize: '14px', color: '#57534E', lineHeight: '1.7' }}>{content}</p>
                      </div>
                    ))}
                    <div style={{ textAlign: 'right', fontSize: '13px', color: '#A8A29E', marginTop: '8px' }}>
                      Est. daily spend: <span style={{ color: '#0D9488', fontWeight: '700' }}>${trip.days[activeDay].cost}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Hostels */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', marginBottom: '14px', border: '1px solid #F5F0E8', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>🏠 Best Places to Stay</h3>
                {trip.topHostels?.map((h, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px', padding: '14px 16px', background: '#FAFAF9', borderRadius: '12px', marginBottom: '10px', border: '1px solid #F5F0E8' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>{h.name}</div>
                      <div style={{ fontSize: '12px', color: '#A8A29E', marginBottom: '4px', fontWeight: '500' }}>{h.vibe}</div>
                      <div style={{ fontSize: '13px', color: '#78716C', lineHeight: '1.5' }}>{h.why}</div>
                    </div>
                    <div style={{ flexShrink: 0, background: '#F0FDFA', border: '1.5px solid #99F6E4', borderRadius: '12px', padding: '10px 14px', textAlign: 'center' }}>
                      <div style={{ fontSize: '17px', fontWeight: '900', color: '#0D9488' }}>${h.pricePerNight}</div>
                      <div style={{ fontSize: '10px', color: '#78716C' }}>/ night</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', marginBottom: '14px', border: '1px solid #F5F0E8', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>💡 Insider Tips</h3>
                {trip.proTips?.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', padding: '12px 16px', background: '#FAFAF9', borderRadius: '12px', marginBottom: '8px', border: '1px solid #F5F0E8' }}>
                    <span style={{ background: '#0D9488', color: '#fff', fontWeight: '800', fontSize: '11px', width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>{i + 1}</span>
                    <p style={{ fontSize: '14px', color: '#57534E', lineHeight: '1.65' }}>{tip}</p>
                  </div>
                ))}
              </div>

              {/* Share */}
              <div style={{ background: 'linear-gradient(135deg, #FFF7ED, #FEF3C7)', border: '1.5px solid #FED7AA', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '14px' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>📸</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: '700', color: '#92400E', marginBottom: '6px' }}>Share your trip</div>
                <div style={{ fontSize: '13px', color: '#B45309', lineHeight: '1.5' }}>Screenshot this and post it — let people know where you are headed</div>
              </div>

              <button
                onClick={() => { setTrip(null); setForm({ destination: '', budget: '', days: '', vibe: '' }); window.scrollTo({ top: plannerRef.current?.offsetTop - 100, behavior: 'smooth' }); }}
                style={{ width: '100%', background: '#fff', border: '1.5px solid #E7E5E4', borderRadius: '14px', padding: '16px', fontSize: '15px', fontWeight: '600', color: '#78716C', cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: '20px' }}
              >
                ← Plan Another Trip
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', textAlign: 'center', borderTop: '1px solid #F5F0E8' }}>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: '900', color: '#0D9488' }}>voya</span>
        <p style={{ fontSize: '13px', color: '#A8A29E', marginTop: '8px' }}>Built for the generation that actually travels</p>
      </footer>
    </>
  );
}
