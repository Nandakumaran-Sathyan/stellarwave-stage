/**
 * prerender-meta.mjs
 *
 * Post-build script. Runs automatically after `vite build` via the
 * `postbuild` npm hook.
 *
 * What it does:
 *   For each static route AND every published blog post, copies
 *   dist/index.html → dist/<route>/index.html and injects the correct
 *   <title>, <meta description>, <canonical>, <og:*>, and <twitter:*> tags
 *   directly into the HTML before Vercel serves it. It also regenerates
 *   dist/sitemap.xml to include every blog post URL — the static
 *   public/sitemap.xml only lists the fixed top-level routes and can't know
 *   about content that lives in Sanity.
 *
 * Why this approach (not puppeteer/jsdom):
 *   The site uses WebGL (Three.js, OGL, Spline) which can't run in headless
 *   environments. All we need for SEO is correct <head> tags — the body content
 *   is rendered by React after JS loads, which Googlebot handles fine.
 *
 * Resilience:
 *   Blog posts come from a network call to Sanity at build time. If that
 *   call fails (offline build, Sanity outage, etc.) we log a warning and
 *   fall back to the static routes only — a blog-post SEO gap should never
 *   fail the production build.
 *
 * Result:
 *   Vercel serves static per-route HTML files (highest priority in Vercel
 *   routing). Crawlers get fully-populated <head> tags instantly, no JS
 *   needed, and every post is discoverable via the sitemap.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');
const SITE_URL = 'https://stellarwave.in';

// ─── Static route definitions ─────────────────────────────────────────────
const staticRoutes = [
  {
    path: '/services',
    title: 'Digital Marketing Services in Chennai — Brand Strategy, Creative & Growth | Stellar Wave',
    description:
      "Explore Stellar Wave's digital marketing services in Chennai — Brand Strategy, Creative Content, Performance Marketing, and Sports Ecosystem Marketing. We build structured systems that drive measurable growth.",
    canonical: `${SITE_URL}/services`,
    ogType: 'website',
    changefreq: 'monthly',
    priority: '0.9',
  },
  {
    path: '/client',
    title: 'Our Client Constellation — Stellar Wave Digital Marketing Agency',
    description:
      "Stellar Wave partners with enterprises, sports institutions, consumer brands, and large-scale sporting properties across India. Explore our client portfolio and the growth systems we've built.",
    canonical: `${SITE_URL}/client`,
    ogType: 'website',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/teams',
    title: 'Meet the Team — Stellar Wave Digital Marketing Agency',
    description:
      'Meet the people behind Stellar Wave — a Chennai-based digital marketing agency. Founded by Aravind Sunil and Pavithra Saravanan, our team combines strategy, creativity, and technology.',
    canonical: `${SITE_URL}/teams`,
    ogType: 'website',
    changefreq: 'monthly',
    priority: '0.7',
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
  },
];

// Home isn't in the loop above (it IS dist/index.html already), but it still
// needs a sitemap entry.
const homeRoute = {
  path: '/',
  canonical: `${SITE_URL}/`,
  changefreq: 'monthly',
  priority: '1.0',
  lastmod: new Date().toISOString().slice(0, 10),
};

// ─── Helper: safely escape content for HTML attribute values ─────────────────
function escAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
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
        "slug": slug.current, title, metaTitle, metaDescription, excerpt, publishedAt, _updatedAt
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

      return {
        path: `/blog/${slug}`,
        title,
        description,
        canonical: `${SITE_URL}/blog/${slug}`,
        ogType: 'article',
        changefreq: 'monthly',
        priority: '0.6',
        lastmod: lastmod || undefined,
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
console.log(`  ✅  sitemap.xml regenerated with ${sitemapEntries ? routes.length + 1 : 0} URLs (incl. ${blogRoutes.length} blog post${blogRoutes.length === 1 ? '' : 's'})`);

console.log('\n🚀  Meta prerendering complete — all routes have static HTML heads.\n');
