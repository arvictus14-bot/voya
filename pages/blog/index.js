import Head from 'next/head';
import Link from 'next/link';
import blogPosts from '../../data/blogPosts';

const C = {
  brand:  '#D4522A',
  text:   '#1E1208',
  muted:  '#7A6A58',
  subtle: '#B5A898',
  border: '#EDE5D8',
  cream:  '#FFFCFA',
};

const CATEGORY_COLORS = {
  'Budget Guides': '#D4522A',
  'Solo Travel':   '#2563EB',
  'Safety Guides': '#059669',
  'Nightlife':     '#7C3AED',
  'Accommodation': '#D97706',
};

export default function BlogIndex() {
  return (
    <>
      <Head>
        <title>Travel Guides & Budget Tips | Voya Blog</title>
        <meta name="description" content="Honest travel guides for 18-30 travelers. Budget breakdowns, safety guides, hostel reviews, and itineraries for the world's best destinations." />
        <meta property="og:title" content="Travel Guides & Budget Tips | Voya Blog" />
        <meta property="og:description" content="Honest travel guides for 18-30 travelers. Budget breakdowns, safety guides, hostel reviews, and itineraries." />
        <meta property="og:url" content="https://govoya.travel/blog" />
        <link rel="canonical" href="https://govoya.travel/blog" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: ${C.cream}; color: ${C.text}; }
      `}</style>

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

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 20px 80px' }}>
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900, marginBottom: 12 }}>Travel Guides</h1>
          <p style={{ fontSize: 17, color: C.muted, maxWidth: 520 }}>Honest budget breakdowns, safety guides, and itineraries for young travelers who actually go.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {blogPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#fff',
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                padding: '24px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.15s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
                    color: CATEGORY_COLORS[post.category] || C.brand,
                  }}>{post.category}</span>
                  <span style={{ fontSize: 11, color: C.subtle }}>{post.readTime}</span>
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.4, marginBottom: 10, color: C.text, flex: 1 }}>{post.title}</h2>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 16 }}>{post.description}</p>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.brand }}>Read guide →</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 64, background: C.brand, borderRadius: 20, padding: '40px 32px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 10 }}>Stop reading. Start planning.</h2>
          <p style={{ fontSize: 16, opacity: 0.9, marginBottom: 24, maxWidth: 440, margin: '0 auto 24px' }}>
            Tell Voya your budget, travel dates, and vibe. Get a full itinerary in seconds — free.
          </p>
          <Link href="/">
            <button style={{ background: '#fff', color: C.brand, border: 'none', borderRadius: 12, padding: '16px 36px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
              Build my trip free →
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
