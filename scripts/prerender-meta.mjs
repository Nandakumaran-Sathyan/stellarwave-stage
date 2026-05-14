/**
 * prerender-meta.mjs
 *
 * Zero-dependency post-build script.
 * Runs automatically after `vite build` via the `postbuild` npm hook.
 *
 * What it does:
 *   For each route, copies dist/index.html → dist/<route>/index.html
 *   and injects the correct <title>, <meta description>, <canonical>,
 *   <og:*>, and <twitter:*> tags directly into the HTML before Vercel serves it.
 *
 * Why this approach (not puppeteer/jsdom):
 *   The site uses WebGL (Three.js, OGL, Spline) which can't run in headless
 *   environments. All we need for SEO is correct <head> tags — the body content
 *   is rendered by React after JS loads, which Googlebot handles fine.
 *
 * Result:
 *   Vercel serves static per-route HTML files (highest priority in Vercel routing).
 *   Crawlers get fully-populated <head> tags instantly, no JS needed.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');

// ─── Route definitions ───────────────────────────────────────────────────────
const routes = [
  {
    path: '/services',
    title: 'Digital Marketing Services in Chennai — Brand Strategy, Creative & Growth | Stellar Wave',
    description:
      "Explore Stellar Wave's digital marketing services in Chennai — Brand Strategy, Creative Content, Performance Marketing, and Sports Ecosystem Marketing. We build structured systems that drive measurable growth.",
    canonical: 'https://stellarwave.in/services',
    ogType: 'website',
  },
  {
    path: '/client',
    title: 'Our Client Constellation — Stellar Wave Digital Marketing Agency',
    description:
      "Stellar Wave partners with enterprises, sports institutions, consumer brands, and large-scale sporting properties across India. Explore our client portfolio and the growth systems we've built.",
    canonical: 'https://stellarwave.in/client',
    ogType: 'website',
  },
  {
    path: '/teams',
    title: 'Meet the Team — Stellar Wave Digital Marketing Agency',
    description:
      'Meet the people behind Stellar Wave — a Chennai-based digital marketing agency. Founded by Aravind Sunil and Pavithra Saravanan, our team combines strategy, creativity, and technology.',
    canonical: 'https://stellarwave.in/teams',
    ogType: 'website',
  },
  {
    path: '/blog',
    title: 'Blog — Digital Marketing Insights | Stellar Wave',
    description:
      'Expert insights on digital marketing, brand strategy, performance marketing, and content creation from the Stellar Wave team in Chennai.',
    canonical: 'https://stellarwave.in/blog',
    ogType: 'website',
  },
];

// ─── Helper: safely escape content for HTML attribute values ─────────────────
function escAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ─── Load the base template ───────────────────────────────────────────────────
let template;
try {
  template = readFileSync(join(distDir, 'index.html'), 'utf-8');
} catch {
  console.error('❌  dist/index.html not found. Run `npm run build` first.');
  process.exit(1);
}

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

console.log('\n🚀  Meta prerendering complete — all routes have static HTML heads.\n');
