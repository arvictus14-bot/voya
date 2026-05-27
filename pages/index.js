import { useState } from 'react';
import Head from 'next/head';

const VIBES = [
  { id: 'party', label: '🎉 Party', desc: 'Nightlife & social scenes' },
  { id: 'culture', label: '🏛️ Culture', desc: 'History & local life' },
  { id: 'adventure', label: '🏔️ Adventure', desc: 'Outdoors & thrills' },
  { id: 'mix', label: '✨ Mix It All', desc: 'A bit of everything' },
];

const inputStyle = {
  width: '100%',
  background: '#080810',
  border: '1px solid #1f1f35',
  borderRadius: '12px',
  padding: '14px 16px',
  fontSize: '16px',
  color: '#fff',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
};

const cardStyle = {
  background: '#0f0f1a',
  border: '1px solid #1f1f35',
  borderRadius: '20px',
  padding: '24px',
  marginBottom: '16px',
};

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '600',
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '8px',
};

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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #080810; color: #fff; min-height: 100vh; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #FF6B35; border-radius: 2px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 20px' }}>

        {/* Header */}
        <header style={{ textAlign: 'center', padding: '56px 0 40px' }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)',
            borderRadius: '10px',
            padding: '7px 18px',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-0.5px' }}>voya</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(30px, 8vw, 50px)',
            fontWeight: '900',
            lineHeight: '1.05',
            letterSpacing: '-2px',
            marginBottom: '14px',
          }}>
            Your trip.<br />
            <span style={{ color: '#FF6B35' }}>Built for you.</span>
          </h1>
          <p style={{ color: '#666', fontSize: '15px' }}>
            Tell us where. We handle the rest.
          </p>
        </header>

        {/* Form */}
        {!trip && !loading && (
          <form onSubmit={handleSubmit} style={{ animation: 'fadeUp 0.4s ease' }}>
            <div style={cardStyle}>

              {/* Destination */}
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Where to?</label>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Bali, Tokyo, Lisbon..."
                  value={form.destination}
                  onChange={e => setForm({ ...form, destination: e.target.value })}
                  onFocus={e => e.target.style.borderColor = '#FF6B35'}
                  onBlur={e => e.target.style.borderColor = '#1f1f35'}
                />
              </div>

              {/* Budget + Days */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <label style={labelStyle}>Total Budget (USD)</label>
                  <input
                    style={inputStyle}
                    type="number"
                    placeholder="2000"
                    value={form.budget}
                    onChange={e => setForm({ ...form, budget: e.target.value })}
                    onFocus={e => e.target.style.borderColor = '#FF6B35'}
                    onBlur={e => e.target.style.borderColor = '#1f1f35'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Days</label>
                  <input
                    style={inputStyle}
                    type="number"
                    placeholder="14"
                    value={form.days}
                    onChange={e => setForm({ ...form, days: e.target.value })}
                    onFocus={e => e.target.style.borderColor = '#FF6B35'}
                    onBlur={e => e.target.style.borderColor = '#1f1f35'}
                  />
                </div>
              </div>

              {/* Vibe */}
              <div>
                <label style={labelStyle}>Your Vibe</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {VIBES.map(v => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setForm({ ...form, vibe: v.id })}
                      style={{
                        background: form.vibe === v.id ? 'rgba(255,107,53,0.12)' : '#080810',
                        border: `1px solid ${form.vibe === v.id ? '#FF6B35' : '#1f1f35'}`,
                        borderRadius: '12px',
                        padding: '14px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginBottom: '3px' }}>{v.label}</div>
                      <div style={{ fontSize: '12px', color: '#555' }}>{v.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && <p style={{ color: '#ff5555', fontSize: '14px', marginBottom: '12px', textAlign: 'center' }}>{error}</p>}

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)',
                border: 'none',
                borderRadius: '14px',
                padding: '18px',
                fontSize: '16px',
                fontWeight: '800',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.3px',
                marginBottom: '60px',
              }}
            >
              Build My Trip →
            </button>
          </form>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0', animation: 'fadeUp 0.3s ease' }}>
            <div style={{
              width: '44px', height: '44px',
              border: '3px solid #1f1f35',
              borderTop: '3px solid #FF6B35',
              borderRadius: '50%',
              animation: 'spin 0.7s linear infinite',
              margin: '0 auto 20px',
            }} />
            <p style={{ color: '#555', fontSize: '15px' }}>Building your trip...</p>
          </div>
        )}

        {/* Trip Output */}
        {trip && (
          <div style={{ animation: 'fadeUp 0.5s ease', paddingBottom: '60px' }}>

            {/* Trip Hero */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,107,53,0.12), rgba(255,107,53,0.04))',
              border: '1px solid rgba(255,107,53,0.25)',
              borderRadius: '20px',
              padding: '28px',
              marginBottom: '16px',
            }}>
              <span style={{
                display: 'inline-block',
                background: '#FF6B35',
                borderRadius: '6px',
                padding: '3px 10px',
                fontSize: '11px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '14px',
              }}>
                {form.days} Days · ${Number(form.budget).toLocaleString()}
              </span>
              <h2 style={{ fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: '900', letterSpacing: '-1px', marginBottom: '8px', lineHeight: '1.2' }}>
                {trip.title}
              </h2>
              <p style={{ color: '#999', fontSize: '15px', marginBottom: '20px' }}>{trip.tagline}</p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 16px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '12px',
              }}>
                <div style={{
                  width: '48px', height: '48px',
                  background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: '900',
                  flexShrink: 0,
                }}>
                  {trip.socialScore}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '2px' }}>Social Score</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{trip.socialScoreLabel}</div>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div style={cardStyle}>
              <h3 style={labelStyle}>Budget Breakdown</h3>
              {Object.entries(trip.budgetBreakdown).map(([key, val]) => {
                const pct = Math.round((val / totalSpend) * 100);
                return (
                  <div key={key} style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px', textTransform: 'capitalize', color: '#bbb' }}>{key}</span>
                      <span style={{ fontSize: '14px', fontWeight: '700' }}>${val}</span>
                    </div>
                    <div style={{ height: '3px', background: '#1a1a2e', borderRadius: '2px' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #FF6B35, #FF8C5A)', borderRadius: '2px' }} />
                    </div>
                  </div>
                );
              })}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #1f1f35' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Total Estimated</span>
                <span style={{ fontSize: '20px', fontWeight: '900', color: '#FF6B35' }}>${totalSpend}</span>
              </div>
            </div>

            {/* Days */}
            <div style={cardStyle}>
              <h3 style={{ ...labelStyle, marginBottom: '14px' }}>Day by Day</h3>

              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '14px', marginBottom: '16px' }}>
                {trip.days.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveDay(i)}
                    style={{
                      flexShrink: 0,
                      padding: '7px 14px',
                      borderRadius: '8px',
                      border: `1px solid ${activeDay === i ? '#FF6B35' : '#1f1f35'}`,
                      background: activeDay === i ? 'rgba(255,107,53,0.12)' : 'transparent',
                      color: activeDay === i ? '#FF6B35' : '#555',
                      fontSize: '13px',
                      fontWeight: '600',
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
                  <h4 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '14px', letterSpacing: '-0.5px' }}>
                    {trip.days[activeDay].title}
                  </h4>
                  {[
                    { label: '🌅 Morning', content: trip.days[activeDay].morning },
                    { label: '☀️ Afternoon', content: trip.days[activeDay].afternoon },
                    { label: '🌙 Evening', content: trip.days[activeDay].evening },
                  ].map(({ label, content }) => (
                    <div key={label} style={{ padding: '14px', background: '#080810', borderRadius: '10px', marginBottom: '8px' }}>
                      <div style={{ fontSize: '11px', fontWeight: '800', color: '#FF6B35', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                        {label}
                      </div>
                      <p style={{ fontSize: '14px', color: '#bbb', lineHeight: '1.65' }}>{content}</p>
                    </div>
                  ))}
                  <div style={{ textAlign: 'right', fontSize: '13px', color: '#555', marginTop: '8px' }}>
                    Est. daily spend: <span style={{ color: '#FF6B35', fontWeight: '700' }}>${trip.days[activeDay].cost}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Hostels */}
            <div style={cardStyle}>
              <h3 style={labelStyle}>Top Hostels for Meeting People</h3>
              {trip.topHostels?.map((h, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '14px',
                  background: '#080810',
                  borderRadius: '12px',
                  marginBottom: '10px',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>{h.name}</div>
                    <div style={{ fontSize: '12px', color: '#555', marginBottom: '4px' }}>{h.vibe}</div>
                    <div style={{ fontSize: '13px', color: '#888', lineHeight: '1.5' }}>{h.why}</div>
                  </div>
                  <div style={{
                    flexShrink: 0,
                    border: '1px solid rgba(255,107,53,0.25)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    textAlign: 'center',
                    background: 'rgba(255,107,53,0.06)',
                  }}>
                    <div style={{ fontSize: '17px', fontWeight: '900', color: '#FF6B35' }}>${h.pricePerNight}</div>
                    <div style={{ fontSize: '10px', color: '#555' }}>/ night</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pro Tips */}
            <div style={cardStyle}>
              <h3 style={labelStyle}>Pro Tips</h3>
              {trip.proTips?.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px 14px', background: '#080810', borderRadius: '10px', marginBottom: '8px' }}>
                  <span style={{ color: '#FF6B35', fontWeight: '900', fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>0{i + 1}</span>
                  <p style={{ fontSize: '14px', color: '#bbb', lineHeight: '1.6' }}>{tip}</p>
                </div>
              ))}
            </div>

            {/* Share */}
            <div style={{
              background: 'rgba(255,107,53,0.06)',
              border: '1px solid rgba(255,107,53,0.2)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              marginBottom: '16px',
            }}>
              <div style={{ fontSize: '22px', marginBottom: '8px' }}>📱</div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>Share your trip</div>
              <div style={{ fontSize: '13px', color: '#666' }}>Screenshot this and post it — let people know where you are going</div>
            </div>

            {/* Plan Another */}
            <button
              onClick={() => { setTrip(null); setForm({ destination: '', budget: '', days: '', vibe: '' }); }}
              style={{
                width: '100%',
                background: 'transparent',
                border: '1px solid #1f1f35',
                borderRadius: '14px',
                padding: '16px',
                fontSize: '15px',
                fontWeight: '600',
                color: '#555',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '60px',
              }}
            >
              ← Plan Another Trip
            </button>
          </div>
        )}
      </div>
    </>
  );
}
