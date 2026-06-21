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

export async function getStaticPaths() {
  return {
    paths: blogPosts.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
}

export default function BlogPost({ post }) {
  const url = `https://govoya.travel/blog/${post.slug}`;

  return (
    <>
      <Head>
        <title>{post.title} | Voya</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            url,
            datePublished: post.date,
            author: { '@type': 'Organization', name: 'Voya' },
            publisher: { '@type': 'Organization', name: 'Voya', url: 'https://govoya.travel' },
          })}}
        />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: ${C.cream}; color: ${C.text}; }
        .blog-content h2 { font-size: 22px; font-weight: 800; margin: 32px 0 12px; color: ${C.text}; }
        .blog-content h3 { font-size: 17px; font-weight: 700; margin: 24px 0 8px; color: ${C.text}; }
        .blog-content p { font-size: 16px; line-height: 1.8; margin-bottom: 16px; color: #2C1E10; }
        .blog-content ul { padding-left: 20px; margin-bottom: 16px; }
        .blog-content li { font-size: 16px; line-height: 1.8; margin-bottom: 6px; color: #2C1E10; }
        .blog-content strong { font-weight: 700; color: ${C.text}; }
        .blog-content a { color: ${C.brand}; }
      `}</style>

      <nav style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: C.brand, letterSpacing: '-0.5px' }}>voya</span>
        </Link>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link href="/blog" style={{ textDecoration: 'none', fontSize: 14, fontWeight: 600, color: C.muted }}>Guides</Link>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{ background: C.brand, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              Plan a Trip ✈️
            </button>
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.brand, textTransform: 'uppercase', letterSpacing: 1 }}>{post.category}</span>
          <span style={{ fontSize: 12, color: C.subtle, margin: '0 8px' }}>·</span>
          <span style={{ fontSize: 12, color: C.subtle }}>{post.readTime}</span>
          <span style={{ fontSize: 12, color: C.subtle, margin: '0 8px' }}>·</span>
          <span style={{ fontSize: 12, color: C.subtle }}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 900, lineHeight: 1.2, marginBottom: 32, color: C.text }}>{post.title}</h1>

        <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div style={{ marginTop: 48, padding: '32px', background: '#fff', borderRadius: 16, border: `1px solid ${C.border}` }}>
          <p style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Ready to plan your trip?</p>
          <p style={{ color: C.muted, marginBottom: 20, fontSize: 15 }}>Tell Voya your budget, dates, and vibe. Get a real day-by-day itinerary in seconds — free.</p>
          <Link href="/">
            <button style={{ background: C.brand, color: '#fff', border: 'none', borderRadius: 10, padding: '14px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              Build my itinerary free →
            </button>
          </Link>
        </div>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
          <Link href="/blog" style={{ textDecoration: 'none', fontSize: 14, color: C.muted, fontWeight: 600 }}>
            ← Back to all guides
          </Link>
        </div>
      </div>
    </>
  );
}
