import { useState } from 'react';
import Head from 'next/head';

const VIBES = [
  { id: 'party', emoji: '🎉', label: 'Party', desc: 'Nightlife & social scenes' },
  { id: 'culture', emoji: '🏛️', label: 'Culture', desc: 'History & local life' },
  { id: 'adventure', emoji: '🏔️', label: 'Adventure', desc: 'Outdoors & thrills' },
  { id: 'mix', emoji: '✨', label: 'Mix It All', desc: 'A bit of everything' },
];

export default function Home() {
  const [form, setForm] = useState({ destination: '', budget: '', days: '', vibe: '' });
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState('');
  const [activeDay, setActiveDay] = useState(0);

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
        <title>Voya — Plan Your Trip</title>
        <meta name="description" content="Trip planning built for 18-30 travelers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Inter', sans-serif;
          background: #FFFDF7;
          color: #1C1917;
          min-height: 100vh;
        }
        input:focus { outline: none; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: #D6D3D1; border-radius: 2px; }
      `}</style>

      {/* Top nav bar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 24px',
        borderBottom: '1px solid #F5F0E8',
        background: '#FFFDF7',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <span style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '24px',
          fontWeight: '900',
          color: '#0D9488',
          letterSpacing: '-0.5px',
        }}>
          voya
        </span>
      </nav>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 20px' }}>

        {/* Hero */}
        <header style={{ textAlign: 'center', padding: '52px 0 44px' }}>
          <div style={{ fontSize: '42px', marginBottom: '16px', animation: 'float 3s ease-in-out infinite' }}>
            🌍
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 8vw, 56px)',
            fontWeight: '900',
            lineHeight: '1.1',
            color: '#1C1917',
            marginBottom: '16px',
            letterSpacing: '-1px',
          }}>
            Where are you<br />
            <span style={{ color: '#0D9488' }}>going next?</span>
          </h1>
          <p style={{
            color: '#78716C',
            fontSize: '17px',
            lineHeight: '1.6',
            maxWidth: '380px',
            margin: '0 auto',
          }}>
            Tell us your destination and budget. We'll build you a real trip plan in seconds.
          </p>
        </header>

        {/* Form */}
        {!trip && !loading && (
          <form onSubmit={handleSubmit} style={{ animation: 'fadeUp 0.5s ease' }}>
            <div style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '28px',
              marginBottom: '16px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              border: '1px solid #F5F0E8',
            }}>

              {/* Destination */}
              <div style={{ marginBottom: '22px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#A8A29E',
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  marginBottom: '8px',
                }}>
                  ✈️  Destination
                </label>
                <input
                  type="text"
                  placeholder="Bali, Tokyo, Lisbon, anywhere..."
                  value={form.destination}
                  onChange={e => setForm({ ...form, destination: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#FAFAF9',
                    border: '1.5px solid #E7E5E4',
                    borderRadius: '14px',
                    padding: '14px 18px',
                    fontSize: '16px',
                    color: '#1C1917',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#0D9488'}
                  onBlur={e => e.target.style.borderColor = '#E7E5E4'}
                />
              </div>

              {/* Budget + Days */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '22px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#A8A29E',
                    textTransform: 'uppercase',
                    letterSpacing: '1.2px',
                    marginBottom: '8px',
                  }}>
                    💰  Budget (USD)
                  </label>
                  <input
                    type="number"
                    placeholder="2,000"
                    value={form.budget}
                    onChange={e => setForm({ ...form, budget: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#FAFAF9',
                      border: '1.5px solid #E7E5E4',
                      borderRadius: '14px',
                      padding: '14px 18px',
                      fontSize: '16px',
                      color: '#1C1917',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#0D9488'}
                    onBlur={e => e.target.style.borderColor = '#E7E5E4'}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#A8A29E',
                    textTransform: 'uppercase',
                    letterSpacing: '1.2px',
                    marginBottom: '8px',
                  }}>
                    📅  Days
                  </label>
                  <input
                    type="number"
                    placeholder="14"
                    value={form.days}
                    onChange={e => setForm({ ...form, days: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#FAFAF9',
                      border: '1.5px solid #E7E5E4',
                      borderRadius: '14px',
                      padding: '14px 18px',
                      fontSize: '16px',
                      color: '#1C1917',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#0D9488'}
                    onBlur={e => e.target.style.borderColor = '#E7E5E4'}
                  />
                </div>
              </div>

              {/* Vibe */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#A8A29E',
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  marginBottom: '10px',
                }}>
                  🎯  Your Vibe
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {VIBES.map(v => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setForm({ ...form, vibe: v.id })}
                      style={{
                        background: form.vibe === v.id ? '#F0FDFA' : '#FAFAF9',
                        border: `1.5px solid ${form.vibe === v.id ? '#0D9488' : '#E7E5E4'}`,
                        borderRadius: '14px',
                        padding: '14px 16px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      <div style={{ fontSize: '20px', marginBottom: '5px' }}>{v.emoji}</div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: form.vibe === v.id ? '#0D9488' : '#1C1917', marginBottom: '2px' }}>
                        {v.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#A8A29E' }}>{v.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <p style={{ color: '#DC2626', fontSize: '14px', marginBottom: '12px', textAlign: 'center', fontWeight: '500' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #0D9488, #0F766E)',
                border: 'none',
                borderRadius: '16px',
                padding: '20px',
                fontSize: '17px',
                fontWeight: '800',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.3px',
                marginBottom: '60px',
                boxShadow: '0 8px 24px rgba(13,148,136,0.3)',
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 12px 28px rgba(13,148,136,0.35)'; }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 24px rgba(13,148,136,0.3)'; }}
            >
              Build My Trip ✈️
            </button>
          </form>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0', animation: 'fadeUp 0.3s ease' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px', animation: 'float 1.5s ease-in-out infinite' }}>
              🌍
            </div>
            <p style={{ color: '#78716C', fontSize: '16px', fontWeight: '500' }}>
              Building your perfect trip...
            </p>
            <p style={{ color: '#A8A29E', fontSize: '14px', marginTop: '6px' }}>
              This takes about 10 seconds
            </p>
          </div>
        )}

        {/* Trip Output */}
        {trip && (
          <div style={{ animation: 'fadeUp 0.5s ease', paddingBottom: '60px' }}>

            {/* Hero Card */}
            <div style={{
              background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
              borderRadius: '24px',
              padding: '32px',
              marginBottom: '16px',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                fontSize: '120px', opacity: '0.1', lineHeight: 1,
              }}>✈️</div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '14px',
              }}>
                {form.days} Days · ${Number(form.budget).toLocaleString()}
              </div>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(22px, 5vw, 30px)',
                fontWeight: '900',
                lineHeight: '1.2',
                marginBottom: '8px',
              }}>
                {trip.title}
              </h2>
              <p style={{ opacity: '0.85', fontSize: '15px', marginBottom: '22px' }}>{trip.tagline}</p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '14px',
                padding: '14px 18px',
                backdropFilter: 'blur(10px)',
              }}>
                <div style={{
                  width: '44px', height: '44px',
                  background: '#fff',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: '900',
                  color: '#0D9488',
                  flexShrink: 0,
                }}>
                  {trip.socialScore}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700' }}>Social Score</div>
                  <div style={{ fontSize: '12px', opacity: '0.8' }}>{trip.socialScoreLabel}</div>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '24px',
              marginBottom: '16px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              border: '1px solid #F5F0E8',
            }}>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '18px',
                fontWeight: '700',
                color: '#1C1917',
                marginBottom: '20px',
              }}>
                💰 Budget Breakdown
              </h3>
              {Object.entries(trip.budgetBreakdown).map(([key, val]) => {
                const pct = Math.round((val / totalSpend) * 100);
                return (
                  <div key={key} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px', textTransform: 'capitalize', color: '#57534E', fontWeight: '500' }}>{key}</span>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#1C1917' }}>${val}</span>
                    </div>
                    <div style={{ height: '5px', background: '#F5F0E8', borderRadius: '3px' }}>
                      <div style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: 'linear-gradient(90deg, #0D9488, #14B8A6)',
                        borderRadius: '3px',
                      }} />
                    </div>
                  </div>
                );
              })}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid #F5F0E8',
              }}>
                <span style={{ fontSize: '14px', color: '#78716C', fontWeight: '500' }}>Total Estimated</span>
                <span style={{ fontSize: '22px', fontWeight: '800', color: '#0D9488', fontFamily: 'Playfair Display, serif' }}>${totalSpend}</span>
              </div>
            </div>

            {/* Days */}
            <div style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '24px',
              marginBottom: '16px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              border: '1px solid #F5F0E8',
            }}>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '18px',
                fontWeight: '700',
                color: '#1C1917',
                marginBottom: '16px',
              }}>
                🗺️ Day by Day
              </h3>

              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '14px', marginBottom: '18px' }}>
                {trip.days.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveDay(i)}
                    style={{
                      flexShrink: 0,
                      padding: '8px 16px',
                      borderRadius: '10px',
                      border: `1.5px solid ${activeDay === i ? '#0D9488' : '#E7E5E4'}`,
                      background: activeDay === i ? '#F0FDFA' : '#FAFAF9',
                      color: activeDay === i ? '#0D9488' : '#78716C',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.15s',
                    }}
                  >
                    Day {d.day}
                  </button>
                ))}
              </div>

              {trip.days[activeDay] && (
                <div>
                  <h4 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '16px',
                    color: '#1C1917',
                  }}>
                    {trip.days[activeDay].title}
                  </h4>
                  {[
                    { label: '🌅 Morning', content: trip.days[activeDay].morning },
                    { label: '☀️ Afternoon', content: trip.days[activeDay].afternoon },
                    { label: '🌙 Evening', content: trip.days[activeDay].evening },
                  ].map(({ label, content }) => (
                    <div key={label} style={{
                      padding: '16px',
                      background: '#FAFAF9',
                      borderRadius: '14px',
                      marginBottom: '10px',
                      border: '1px solid #F5F0E8',
                    }}>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#0D9488',
                        marginBottom: '7px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                      }}>
                        {label}
                      </div>
                      <p style={{ fontSize: '14px', color: '#57534E', lineHeight: '1.7' }}>{content}</p>
                    </div>
                  ))}
                  <div style={{ textAlign: 'right', fontSize: '13px', color: '#A8A29E', marginTop: '10px' }}>
                    Est. daily spend: <span style={{ color: '#0D9488', fontWeight: '700' }}>${trip.days[activeDay].cost}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Hostels */}
            <div style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '24px',
              marginBottom: '16px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              border: '1px solid #F5F0E8',
            }}>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '18px',
                fontWeight: '700',
                color: '#1C1917',
                marginBottom: '16px',
              }}>
                🏠 Best Places to Stay
              </h3>
              {trip.topHostels?.map((h, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '16px',
                  background: '#FAFAF9',
                  borderRadius: '14px',
                  marginBottom: '10px',
                  border: '1px solid #F5F0E8',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#1C1917', marginBottom: '4px' }}>{h.name}</div>
                    <div style={{ fontSize: '12px', color: '#A8A29E', marginBottom: '5px', fontWeight: '500' }}>{h.vibe}</div>
                    <div style={{ fontSize: '13px', color: '#78716C', lineHeight: '1.5' }}>{h.why}</div>
                  </div>
                  <div style={{
                    flexShrink: 0,
                    background: '#F0FDFA',
                    border: '1.5px solid #99F6E4',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '17px', fontWeight: '900', color: '#0D9488' }}>${h.pricePerNight}</div>
                    <div style={{ fontSize: '10px', color: '#78716C', fontWeight: '500' }}>/ night</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pro Tips */}
            <div style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '24px',
              marginBottom: '16px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              border: '1px solid #F5F0E8',
            }}>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '18px',
                fontWeight: '700',
                color: '#1C1917',
                marginBottom: '16px',
              }}>
                💡 Insider Tips
              </h3>
              {trip.proTips?.map((tip, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '14px 16px',
                  background: '#FAFAF9',
                  borderRadius: '12px',
                  marginBottom: '8px',
                  border: '1px solid #F5F0E8',
                  alignItems: 'flex-start',
                }}>
                  <span style={{
                    background: '#0D9488',
                    color: '#fff',
                    fontWeight: '800',
                    fontSize: '11px',
                    width: '24px', height: '24px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}>
                    {i + 1}
                  </span>
                  <p style={{ fontSize: '14px', color: '#57534E', lineHeight: '1.65' }}>{tip}</p>
                </div>
              ))}
            </div>

            {/* Share */}
            <div style={{
              background: 'linear-gradient(135deg, #FFF7ED, #FEF3C7)',
              border: '1.5px solid #FED7AA',
              borderRadius: '20px',
              padding: '24px',
              textAlign: 'center',
              marginBottom: '16px',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>📸</div>
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '17px',
                fontWeight: '700',
                color: '#92400E',
                marginBottom: '6px',
              }}>
                Share your trip
              </div>
              <div style={{ fontSize: '13px', color: '#B45309', lineHeight: '1.5' }}>
                Screenshot this and post it — let people know where you are headed
              </div>
            </div>

            {/* Plan Another */}
            <button
              onClick={() => { setTrip(null); setForm({ destination: '', budget: '', days: '', vibe: '' }); }}
              style={{
                width: '100%',
                background: '#fff',
                border: '1.5px solid #E7E5E4',
                borderRadius: '16px',
                padding: '16px',
                fontSize: '15px',
                fontWeight: '600',
                color: '#78716C',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '60px',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => e.target.style.borderColor = '#0D9488'}
              onMouseLeave={e => e.target.style.borderColor = '#E7E5E4'}
            >
              ← Plan Another Trip
            </button>
          </div>
        )}
      </div>
    </>
  );
}
