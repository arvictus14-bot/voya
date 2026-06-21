import Head from 'next/head';
import Link from 'next/link';
import destinations from '../../data/destinations';

const C = {
  brand:   '#D4522A',
  brandLt: '#E06B42',
  brandBg: '#FBF0EB',
  dark:    '#0F0B06',
  text:    '#1E1208',
  muted:   '#7A6A58',
  subtle:  '#B5A898',
  border:  '#EDE5D8',
  cream:   '#FFFCFA',
};

export async function getStaticPaths() {
  return {
    paths: destinations.map(d => ({ params: { slug: d.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const dest = destinations.find(d => d.slug === params.slug);
  if (!dest) return { notFound: true };
  return { props: { dest } };
}

export default function DestinationPage({ dest }) {
  const title = `${dest.name} Trip Planner — ${dest.days.recommended}-Day Budget Itinerary | Voya`;
  const metaDesc = `Plan your ${dest.name} trip in seconds. Budget from $${dest.budget.low}/day. ${dest.description.slice(0, 120)}...`;
  const viatorUrl = `https://www.viator.com/searchResults/all?text=${encodeURIComponent(dest.name)}&pid=P00303477&mcid=42383&medium=link&campaign=voya-site`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={dest.photo} />
        <meta property="og:url" content={`https://govoya.travel/destinations/${dest.slug}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image" content={dest.photo} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://govoya.travel/destinations/${dest.slug}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'TouristDestination',
                name: dest.name,
                description: dest.description,
                url: `https://govoya.travel/destinations/${dest.slug}`,
                image: dest.photo,
                touristType: { '@type': 'Audience', audienceType: '18-30 budget travelers' },
              },
              {
                '@type': 'FAQPage',
                mainEntity: dest.faqs.map(f => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            ],
          })}}
        />
      </Head>

      <div style={{ fontFamily: "'Inter', sans-serif", background: C.cream, color: C.text, minHeight: '100vh' }}>

        {/* Nav */}
        <nav style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: C.brand, letterSpacing: '-0.5px' }}>voya</span>
          </Link>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{ background: C.brand, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              Plan a Trip ✈️
            </button>
          </Link>
        </nav>

        {/* Hero */}
        <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
          <img src={dest.photo} alt={`${dest.name}, ${dest.country}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.65))' }} />
          <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, textAlign: 'center', color: '#fff', padding: '0 20px' }}>
            <p style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.85 }}>{dest.region}</p>
            <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 900, lineHeight: 1.1 }}>{dest.name} Trip Planner</h1>
            <p style={{ margin: '0 0 24px', fontSize: 18, opacity: 0.9, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>{dest.tagline}</p>
            <Link href="/">
              <button style={{ background: C.brand, color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
                Build my {dest.name} itinerary — free →
              </button>
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px' }}>

          {/* Quick stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, margin: '40px 0' }}>
            {[
              { label: 'Daily Budget', value: `$${dest.budget.low}–$${dest.budget.mid}`, sub: 'USD per day' },
              { label: 'Recommended', value: `${dest.days.recommended} days`, sub: `min ${dest.days.min} days` },
              { label: 'Best Time', value: dest.bestTime.split('(')[0].trim(), sub: dest.bestTime.includes('(') ? dest.bestTime.match(/\((.+)\)/)?.[1] : '' },
            ].map(s => (
              <div key={s.label} style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 16px', textAlign: 'center' }}>
                <p style={{ margin: '0 0 4px', fontSize: 12, color: C.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</p>
                <p style={{ margin: '0 0 2px', fontSize: 20, fontWeight: 800, color: C.text }}>{s.value}</p>
                <p style={{ margin: 0, fontSize: 12, color: C.subtle }}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* About */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Why {dest.name}?</h2>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: C.text, margin: 0 }}>{dest.description}</p>
          </section>

          {/* Vibes */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16 }}>What to do in {dest.name}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {dest.vibes.map((v, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px' }}>
                  <span style={{ fontSize: 20 }}>{'🏖️🍜🏛️🌿🎭🏔️🎨🌊🌙🍷'.split('')[i % 10]}</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <a href={viatorUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: C.brandBg, color: C.brand, border: `1px solid ${C.brand}`, borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                Browse {dest.name} experiences on Viator →
              </a>
            </div>
          </section>

          {/* Budget breakdown */}
          <section style={{ marginBottom: 48, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 16, padding: 28 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 20, margin: '0 0 20px' }}>{dest.name} Budget Guide</h2>
            {[
              { tier: 'Budget', range: `$${dest.budget.low}–$${dest.budget.mid}/day`, desc: 'Hostel dorms, street food, free attractions, local transport', color: '#dcfce7', textColor: '#166534' },
              { tier: 'Mid-range', range: `$${dest.budget.mid}–$${dest.budget.high}/day`, desc: 'Private room, sit-down restaurants, paid attractions, Uber', color: '#fef9c3', textColor: '#854d0e' },
              { tier: 'Comfort', range: `$${dest.budget.high}+/day`, desc: 'Boutique hotels, nice restaurants, tours, premium experiences', color: C.brandBg, textColor: C.brand },
            ].map(b => (
              <div key={b.tier} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                <span style={{ background: b.color, color: b.textColor, borderRadius: 6, padding: '4px 10px', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', marginTop: 2 }}>{b.tier}</span>
                <div>
                  <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: 15 }}>{b.range}</p>
                  <p style={{ margin: 0, color: C.muted, fontSize: 14 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Best for */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 16 }}>{dest.name} is best for</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {dest.bestFor.map(v => (
                <span key={v} style={{ background: C.brandBg, color: C.brand, border: `1px solid ${C.brand}20`, borderRadius: 20, padding: '8px 18px', fontSize: 14, fontWeight: 600 }}>{v}</span>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 20 }}>{dest.name} FAQs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {dest.faqs.map((faq, i) => (
                <div key={i} style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px' }}>
                  <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 16 }}>{faq.q}</p>
                  <p style={{ margin: 0, color: C.muted, fontSize: 15, lineHeight: 1.65 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: C.dark, borderRadius: 20, padding: '48px 32px', textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 900, margin: '0 0 12px' }}>Ready to plan your {dest.name} trip?</h2>
            <p style={{ color: '#B5A898', fontSize: 16, margin: '0 0 28px' }}>Drop your budget and dates. Get a real day-by-day itinerary in 10 seconds — free.</p>
            <Link href="/">
              <button style={{ background: C.brand, color: '#fff', border: 'none', borderRadius: 10, padding: '16px 36px', fontWeight: 800, fontSize: 17, cursor: 'pointer' }}>
                Build my {dest.name} itinerary →
              </button>
            </Link>
            <p style={{ color: '#7A6A58', fontSize: 13, marginTop: 16, marginBottom: 0 }}>Free · 10 seconds · No sign-up</p>
          </section>

          {/* Other destinations */}
          <section style={{ marginBottom: 64 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Explore other destinations</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {destinations.filter(d => d.slug !== dest.slug).slice(0, 8).map(d => (
                <Link key={d.slug} href={`/destinations/${d.slug}`} style={{ textDecoration: 'none' }}>
                  <span style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 14px', fontSize: 14, fontWeight: 500, color: C.text, display: 'block' }}>{d.name}</span>
                </Link>
              ))}
            </div>
          </section>

        </div>

        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${C.border}`, padding: '24px 20px', textAlign: 'center', color: C.muted, fontSize: 13 }}>
          <Link href="/" style={{ color: C.brand, fontWeight: 700, textDecoration: 'none' }}>govoya.travel</Link>
          {' — '}Stop researching. Start going.
        </footer>
      </div>
    </>
  );
}
