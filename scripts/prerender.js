/**
 * Build step 3 of 3 (see package.json "build").
 * Renders the React app to static HTML inside dist/index.html so the page
 * paints real content before any JavaScript runs (faster LCP, crawlable),
 * then preloads the two Latin font files used above the fold.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const indexPath = path.join(distDir, 'index.html');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const appHtml = render();

let html = fs.readFileSync(indexPath, 'utf8');
if (!html.includes('<div id="root"></div>')) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
}
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

// Preload Latin variable fonts (the only subsets an English page needs up front).
const assets = fs.readdirSync(path.join(distDir, 'assets'));
const fontFiles = assets.filter((f) =>
  /^(inter|plus-jakarta-sans)-latin-wght-normal-.*\.woff2$/.test(f),
);
const preloads = fontFiles
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');
if (preloads) html = html.replace('</title>', `</title>\n    ${preloads}`);

// ---- Release checks: fail the build instead of shipping broken SEO -------------
const problems = [];
if (html.includes('/src/main.jsx')) problems.push('index.html still points at /src/main.jsx');
if (!/<script type="module" crossorigin src="\/assets\/index-[\w-]+\.js"><\/script>/.test(html))
  problems.push('no compiled /assets/index-*.js entry script found');
if (/%[A-Z_]+%/.test(html)) problems.push(`unreplaced placeholder: ${html.match(/%[A-Z_]+%/)[0]}`);
if (/makebee\.example/.test(html)) problems.push('placeholder domain makebee.example in HTML');
const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
if (!canonical || !/^https:\/\/[^/]+\/$/.test(canonical)) problems.push(`bad canonical: ${canonical}`);
const h1Count = (appHtml.match(/<h1[\s>]/g) || []).length;
if (h1Count !== 1) problems.push(`expected exactly one <h1>, found ${h1Count}`);
for (const block of html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || []) {
  try {
    JSON.parse(block.replace(/^<script[^>]*>|<\/script>$/g, ''));
  } catch (e) {
    problems.push(`invalid JSON-LD: ${e.message}`);
  }
}
for (const file of ['robots.txt', 'sitemap.xml', '404.html']) {
  if (!fs.existsSync(path.join(distDir, file))) problems.push(`dist/${file} missing`);
}
if (problems.length) {
  console.error(`prerender: release checks failed:\n  - ${problems.join('\n  - ')}`);
  process.exit(1);
}

fs.writeFileSync(indexPath, html);
fs.rmSync(ssrDir, { recursive: true, force: true });

console.log(`prerender: canonical ${canonical} · wrote ${(appHtml.length / 1024).toFixed(1)} kB of HTML, preloaded ${fontFiles.length} font file(s)`);
