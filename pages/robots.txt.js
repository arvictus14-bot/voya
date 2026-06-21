export default function Robots() {
  return null;
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=86400');
  res.write(`User-agent: *
Allow: /
Sitemap: https://govoya.travel/sitemap.xml`);
  res.end();
  return { props: {} };
}
