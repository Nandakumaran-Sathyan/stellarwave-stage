/**
 * prerender-meta.mjs
 *
 * Post-build script. Runs automatically after `vite build` via the
 * `postbuild` npm hook.
 *
 * What it does, for each static route AND every published blog post:
 *   1. Copies dist/index.html → dist/<route>/index.html
 *   2. Injects the correct <title>, <meta description>, <canonical>,
 *      <og:*>, and <twitter:*> tags into <head>.
 *   3. Replaces the <!-- SEO_FALLBACK_START/END --> block in <body> with a
 *      real <h1>, <h2>s, and genuine page copy for that route — the same
 *      technique already used for the static nav links, so non-JS crawlers
 *      (and tools like Screaming Frog in raw-HTML mode) see a real heading
 *      structure and >200 words of substantive content instead of an empty
 *      shell, not just correct <head> tags.
 *   4. Regenerates dist/sitemap.xml to include every blog post URL — the
 *      static public/sitemap.xml only lists the fixed top-level routes and
 *      can't know about content that lives in Sanity.
 *
 * Why this approach (not puppeteer/jsdom):
 *   The site uses WebGL (Three.js, OGL, Spline) which can't run in headless
 *   environments. Wrapping the fallback content in <noscript> means it's
 *   only ever parsed by clients that don't execute JavaScript — browsers
 *   and JS-executing crawlers (Googlebot included) never render <noscript>
 *   content into the live DOM, so there's no duplicate-heading risk against
 *   the real React-rendered page.
 *
 * Resilience:
 *   Blog posts come from a network call to Sanity at build time. If that
 *   call fails (offline build, Sanity outage, etc.) we log a warning and
 *   fall back to the static routes only — a blog-post SEO gap should never
 *   fail the production build.
 *
 * Result:
 *   Vercel serves static per-route HTML files (highest priority in Vercel
 *   routing). Crawlers get fully-populated <head> tags AND real fallback
 *   content instantly, no JS needed, and every post is discoverable via the
 *   sitemap.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');
const SITE_URL = 'https://stellarwave.in';

// ─── Static route definitions ─────────────────────────────────────────────
// title ≤ 60 chars, description ≤ 155 chars — Screaming Frog / Google both
// truncate past these limits, so staying under them (with margin, since the
// real constraint is pixel width, not character count) keeps snippets intact.
const staticRoutes = [
  {
    path: '/services',
    title: 'Digital Marketing Services in Chennai | Stellar Wave',
    description:
      'Brand strategy, creative content, performance marketing, and sports ecosystem marketing — structured systems built for measurable growth in Chennai.',
    canonical: `${SITE_URL}/services`,
    ogType: 'website',
    changefreq: 'monthly',
    priority: '0.9',
    h1: 'Digital Marketing Services in Chennai',
    h2: ['Strategy, Creative, Growth', 'Competitive Sporting Ecosystems'],
    content: [
      'Stellar Wave offers four core digital marketing services in Chennai, working together as one integrated system rather than isolated deliverables.',
      'Strategy comes first — before campaigns, content, or ads, we define market positioning, competitive advantage, audience behaviour, and a communication framework, so every later decision has a clear direction to follow. This covers brand strategy, go-to-market planning, growth modelling, competitive analysis, and audience research.',
      'Creative brings that strategy to life through brand identity systems, campaign concepts, content creation and storytelling, short-form videos and brand films, retail and experiential creative, and presentation and sponsorship decks — because a brand is experienced, not just seen, and every creative decision is expected to carry intent.',
      'Growth turns visibility into measurable progress: performance marketing across Meta, Google, and other digital platforms, conversion-driven funnels, website and UI/UX development, SEO and authority building, influencer collaborations, and marketing automation and CRM systems, all focused on outcomes like leads, conversions, and long-term brand strength rather than vanity metrics.',
      'Competitive Sporting Ecosystems is our specialist fourth pillar — league and championship branding, institutional sports communication systems, and sponsorship and investment decks for organisations operating in high-attention, competitive environments where moments win attention but structure builds legacy.',
      'Every engagement draws on whichever combination of these four disciplines a brand actually needs, backed by structured systems that drive measurable growth.',
    ],
  },
  {
    path: '/client',
    title: 'Our Clients — Stellar Wave Digital Marketing Agency',
    description:
      "Stellar Wave partners with enterprises, sports institutions, and consumer brands across India. Explore our client portfolio and growth systems.",
    canonical: `${SITE_URL}/client`,
    ogType: 'website',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Our Clients',
    h2: ['Who we work with', 'One principle, five categories'],
    content: [
      'Stellar Wave partners with organisations across five categories: Enterprise & Engineering, Consumer & Retail Brands, Performance & Training Ecosystems, Associations & Federations, and Championships & Competitive Properties.',
      'Our enterprise and engineering clients, including Snowforce, an ERP provider for infrastructure and construction enterprises, and TAV, an Australian mid-drive motor technology manufacturer, operate in high-trust B2B environments where authority-driven communication and structured digital visibility matter more than volume. Consumer and retail brands, such as Humming Bird’s children’s magazines and activity books, need precision in visibility and perception within high-engagement markets. Performance and training clients — gyms, studios, and athletic brands — need communication systems that reflect discipline and results.',
      'Associations and federations, including the Tamil Nadu Cycling Association and national kickboxing bodies, require institutional credibility built through consistent, structured messaging. Championships and competitive properties, such as Khelo India 2026 and the Track Asia Cup, need brand systems built for moments that win attention while establishing long-term legacy.',
      'Across every category, the same principle applies: we build digital marketing systems tailored to each client’s market, audience, and stage of growth, rather than applying one template everywhere. Explore our client portfolio to see the full range of enterprises, sports institutions, and consumer brands we’ve worked with across India.',
    ],
  },
  {
    path: '/teams',
    title: 'Meet the Team — Stellar Wave Digital Marketing Agency',
    description:
      'Meet the team behind Stellar Wave, a Chennai digital marketing agency founded by Aravind Sunil and Pavithra Saravanan.',
    canonical: `${SITE_URL}/teams`,
    ogType: 'website',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'Meet the Team',
    h2: ['Founded on structure before scale', 'The people behind the work'],
    content: [
      'Stellar Wave is led by co-founders Aravind Sunil and Pavithra Saravanan, alongside a small, senior team built around strategy, creativity, and technology. The agency began with a simple belief: that brands deserve structure before scale, and relationships before revenue.',
      'Aravind is driven by growth — not just numbers, but meaningful expansion. From sports ecosystems to enterprise collaborations, his focus has been on building systems that last. Pavithra brings the emotional intelligence behind the brand — with a deep eye for aesthetics and storytelling, she ensures every strategy carries clarity, warmth, and identity. Together they built Stellar Wave around the idea that marketing works best as a structured system, not a collection of disconnected campaigns.',
      'The wider team includes Sivakumar SN as UI/UX Designer, Swathi as Creative Director, and Nandakumaran Sathyan focused on AI automation — a deliberately compact group that pairs strategic thinking with hands-on creative and technical execution.',
      'We are a Chennai-based digital marketing agency, and that regional grounding shapes how we work — understanding the local market and the Tamil-speaking audience alongside a structured, data-driven approach used for clients across India. Our team combines brand strategy, creative production, performance marketing, and sports ecosystem marketing under one roof. Get in touch to meet the team behind the work.',
    ],
  },
  {
    path: '/blog',
    title: 'Blog — Digital Marketing Insights | Stellar Wave',
    description:
      'Expert insights on digital marketing, brand strategy, performance marketing, and content creation from the Stellar Wave team in Chennai.',
    canonical: `${SITE_URL}/blog`,
    ogType: 'website',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Stellar Wave Blog',
    h2: ['Digital marketing insights from Chennai', 'What we write about'],
    content: [
      'The Stellar Wave blog shares insights on digital marketing, brand strategy, performance marketing, SEO, and content creation, written from the day-to-day work of running a Chennai-based digital marketing agency.',
      'Recent posts cover practical, applied topics: how performance marketing compares to traditional advertising, what businesses should actually look for in a digital marketing agency in Chennai, digital marketing strategy heading into 2026, what makes a business website convert, brand mascot strategy, how SEO helps businesses generate long-term visibility, why businesses need a better marketing strategy, AI-generated poster design versus professional design, how content creation drives business growth, and why branding matters more than ever for growing businesses.',
      'We also publish case studies from real client work — including our branding, creative communication, venue identity, and digital campaign work on the Track Asia Cup, an international cycling championship hosted in Chennai with participation from ten Asian nations.',
      'These posts are written for founders, marketing leads, and business owners who want a clearer, more structured view of how digital marketing actually works — not generic advice, but insight drawn from campaigns we’ve run and systems we’ve built for enterprises, sports institutions, and consumer brands across India. New posts are added regularly as we take on new client work.',
    ],
  },
];

// Home isn't in the loop above (it IS dist/index.html already, with its own
// hardcoded SEO_FALLBACK block), but it still needs a sitemap entry.
const homeRoute = {
  path: '/',
  canonical: `${SITE_URL}/`,
  changefreq: 'monthly',
  priority: '1.0',
  lastmod: new Date().toISOString().slice(0, 10),
};

// ─── Helpers ───────────────────────────────────────────────────────────────
function escAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function normalizeSlug(slug) {
  return String(slug || '').replace(/^\/+/, '');
}

// Builds the <h1>/<h2>/<p> block that replaces SEO_FALLBACK_START..END.
function buildFallbackBlock(route) {
  const h2s = route.h2 || [];
  const paras = route.content || [];
  // Interleave h2s ahead of their following paragraphs where we have both;
  // extra paragraphs (no matching h2) just render as-is.
  let body = `<h1>${escHtml(route.h1)}</h1>\n`;
  const maxLen = Math.max(h2s.length, paras.length);
  for (let i = 0; i < maxLen; i++) {
    if (h2s[i]) body += `<h2>${escHtml(h2s[i])}</h2>\n`;
    if (paras[i]) body += `<p>${escHtml(paras[i])}</p>\n`;
  }
  return `<main>\n${body}</main>`;
}

// Extracts plain text from a Sanity Portable Text array (best-effort).
function portableTextToPlainText(blocks) {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .filter((b) => b && b._type === 'block' && Array.isArray(b.children))
    .map((b) => b.children.map((c) => c.text || '').join(''))
    .filter(Boolean)
    .join('\n\n');
}

// ─── Fetch published blog posts from Sanity (best-effort) ────────────────────
async function fetchBlogRoutes() {
  try {
    const client = createClient({
      projectId: 'y1u1r3gv',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
    });

    const posts = await client.fetch(
      `*[_type in ["post", "blog"] && defined(slug.current) && defined(publishedAt)]{
        "slug": slug.current, title, metaTitle, metaDescription, excerpt, publishedAt, _updatedAt, body, content
      }`
    );

    return posts.map((post) => {
      const slug = normalizeSlug(post.slug);
      const title = post.metaTitle || `${post.title} | Stellar Wave Blog`;
      const description =
        post.metaDescription ||
        post.excerpt ||
        'Read the latest insights from Stellar Wave on digital marketing, branding, and growth.';
      const lastmod = (post._updatedAt || post.publishedAt || '').slice(0, 10);

      // Best-effort real body text for the noscript fallback — falls back to
      // the excerpt/description (repeated as needed isn't done here; a short
      // fallback is still far better than an empty shell) if the post has no
      // portable-text body yet.
      const bodyText = portableTextToPlainText(post.body) || portableTextToPlainText(post.content);
      const paragraphs = bodyText
        ? bodyText.split(/\n\n+/).filter(Boolean)
        : [post.excerpt || description];

      return {
        path: `/blog/${slug}`,
        title,
        description,
        canonical: `${SITE_URL}/blog/${slug}`,
        ogType: 'article',
        changefreq: 'monthly',
        priority: '0.6',
        lastmod: lastmod || undefined,
        h1: post.title,
        h2: post.excerpt ? ['Overview'] : [],
        content: post.excerpt ? [post.excerpt, ...paragraphs] : paragraphs,
      };
    });
  } catch (err) {
    console.warn('⚠️   Could not fetch blog posts from Sanity at build time — skipping blog-post prerendering.');
    console.warn(`     ${err instanceof Error ? err.message : err}`);
    return [];
  }
}

// ─── Load the base template ───────────────────────────────────────────────────
let template;
try {
  template = readFileSync(join(distDir, 'index.html'), 'utf-8');
} catch {
  console.error('❌  dist/index.html not found. Run `npm run build` first.');
  process.exit(1);
}

const blogRoutes = await fetchBlogRoutes();
const routes = [...staticRoutes, ...blogRoutes];

// ─── Process each route ───────────────────────────────────────────────────────
for (const route of routes) {
  let html = template;
  const { title, description, canonical, ogType } = route;
  const safe = {
    title: escAttr(title),
    description: escAttr(description),
    canonical,
    ogType,
  };

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // <meta name="description">  (handles single-line and multi-line variants)
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${safe.description}" />`
  );

  // <link rel="canonical">
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${canonical}" />`
  );

  // OG tags
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${canonical}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="${ogType}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${safe.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${safe.description}" />`
  );

  // Twitter tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${safe.title}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${safe.description}" />`
  );

  // Body fallback content — real <h1>/<h2>/<p> for this specific route,
  // replacing the home-page copy the base template ships with by default.
  if (route.h1) {
    const fallbackBlock = buildFallbackBlock(route);
    html = html.replace(
      /<!-- SEO_FALLBACK_START -->[\s\S]*?<!-- SEO_FALLBACK_END -->/,
      `<!-- SEO_FALLBACK_START -->\n${fallbackBlock}\n<!-- SEO_FALLBACK_END -->`
    );
  }

  // Write → dist/<route>/index.html
  const routeDir = join(distDir, route.path);
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(join(routeDir, 'index.html'), html, 'utf-8');
  console.log(`  ✅  Prerendered  ${route.path}`);
}

// ─── Regenerate sitemap.xml with every route, including blog posts ──────────
const sitemapEntries = [homeRoute, ...staticRoutes, ...blogRoutes]
  .map((r) => {
    const lastmod = r.lastmod || new Date().toISOString().slice(0, 10);
    return `  <url>
    <loc>${escXml(r.canonical)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`;

writeFileSync(join(distDir, 'sitemap.xml'), sitemap, 'utf-8');
console.log(`  ✅  sitemap.xml regenerated with ${routes.length + 1} URLs (incl. ${blogRoutes.length} blog post${blogRoutes.length === 1 ? '' : 's'})`);

console.log('\n🚀  Meta prerendering complete — all routes have static HTML heads and fallback content.\n');
