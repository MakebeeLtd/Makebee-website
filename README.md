# Makebee website

Production React build of the Makebee company site: a one-page portfolio for a
software product studio in Lagos, Nigeria. Converted from the approved HTML
design-system prototype, keeping its palette, type, layout and hexagon motif.

**Stack:** React 19 · Vite 6 · Tailwind CSS 3 · JavaScript (JSX) · self-hosted
variable fonts (Inter, Plus Jakarta Sans). No router, no state library, no backend.

---

## Quick start

Requires Node 18.18+ (Node 20 or 22 recommended).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve dist/ locally at http://localhost:4173
```

### What `npm run build` does

1. `vite build` bundles the client app into `dist/`.
2. `vite build --ssr src/entry-server.jsx` builds a server copy of the app.
3. `scripts/prerender.js` renders the page to static HTML inside
   `dist/index.html`, adds font preloads, and deletes the temporary server build.

The shipped HTML already contains every heading, paragraph and link, so the
page paints before JavaScript loads (better LCP and SEO), then React hydrates
it. `npm run build:spa` skips prerendering if you ever need a plain SPA build.

---

## Before you deploy

1. **Set the real domain** in `.env`:

   ```
   VITE_SITE_URL=https://your-domain.com
   ```

   It feeds the canonical URL, Open Graph/Twitter tags, JSON-LD, `robots.txt`
   and `sitemap.xml` (the last two are generated at build time).
2. Check `src/data/site.js` (email, social links, Blog URL).
3. Run `npm run build && npm run preview` and click through once.

## Deployment

`dist/` is a static site. Any static host works.

- **Cloudflare Pages:** build command `npm run build`, output directory `dist`,
  environment variable `VITE_SITE_URL`.
- **Vercel / Netlify:** framework preset "Vite", same build command and
  output directory. Add `VITE_SITE_URL` in the project's environment settings.

It's a single page with hash links, so no rewrite rules are needed.

---

## Project structure

```
index.html              SEO meta, pre-paint theme script, JSON-LD
.env                    VITE_SITE_URL (single source for the domain)
vite.config.js          Vite + robots.txt/sitemap.xml generation
tailwind.config.js      Tailwind theme → CSS variables
scripts/prerender.js    Static HTML prerender (runs after build)
public/                 favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.png
src/
├── main.jsx            Client entry (hydrates prerendered HTML)
├── entry-server.jsx    Server entry used only by the prerender step
├── App.jsx             Page composition
├── index.css           Design tokens, base styles, buttons, motion
├── assets/
│   └── makebee-mark.svg   Official mark — source of truth for the logo
├── data/
│   ├── site.js         Company info, nav, snapshot strip, marquee, about points
│   ├── services.js     Services (grid + footer)
│   └── projects.js     Selected work
├── hooks/
│   ├── useTheme.js     Theme read / toggle / persist / follow OS
│   └── useReveal.js    Shared IntersectionObserver for scroll reveals
├── components/
│   ├── Navbar.jsx      Sticky nav + accessible mobile menu
│   ├── Logo.jsx        Mark + wordmark lockup
│   ├── ThemeToggle.jsx
│   ├── Button.jsx      <a> or <button>, primary/secondary/ghost
│   ├── SectionHeading.jsx
│   ├── ServiceCard.jsx + ServiceIcon.jsx
│   ├── ProjectCard.jsx (+ ProjectCardSkeleton)
│   ├── MetricCard.jsx
│   ├── ProductShowcase.jsx   Studie AI interface illustration
│   ├── Marquee.jsx     "What we do" strip with pause control
│   ├── HexField.jsx    Background hexagon lattice (one SVG pattern)
│   ├── HexTileCluster.jsx    Hero rippling tiles
│   ├── Skeleton.jsx, Reveal.jsx, CopyEmail.jsx, Icons.jsx
│   └── Footer.jsx
└── sections/
    Hero · WhatWeDo · Snapshot · Services · FeaturedProduct · Projects · About · ContactCTA
```

---

## Theme and colour tokens

All colours live as CSS variables at the top of `src/index.css`, in two blocks:
`[data-theme='dark']` (default) and `[data-theme='light']`. Tailwind maps its
colour names to those variables in `tailwind.config.js`:

| Tailwind name  | Variable            | Dark      | Light     |
| -------------- | ------------------- | --------- | --------- |
| `bg`           | `--bg`              | `#0A1324` | `#FFFFFF` |
| `bg-secondary` | `--bg-secondary`    | `#0D182B` | `#F7F8FA` |
| `bg-soft`      | `--bg-soft`         | `#0D182B` | `#F1F4F8` |
| `surface`      | `--surface`         | `#111E33` | `#FFFFFF` |
| `elevated`     | `--elevated`        | `#16253B` | `#FFFFFF` |
| `line`         | `--border`          | `#24344B` | `#E3E8EF` |
| `ink`          | `--text-primary`    | `#F8FAFC` | `#0B1220` |
| `ink-2`        | `--text-secondary`  | `#AAB6C7` | `#526174` |
| `muted`        | `--text-muted`      | `#718096` | `#718096` |
| `disabled`     | `--text-disabled`   | `#536174` | `#A9B3BF` |
| `honey`        | `--honey`           | `#EFCE63` | `#EFCE63` |
| `gold`         | `--gold`            | `#D9A441` | `#8B5E00` |
| `gold-bright`  | `--gold-bright`     | `#F6D978` | `#EFCE63` |
| `gold-deep`    | `--gold-deep`       | `#8B5E00` | `#8B5E00` |
| `gold-label`   | `--gold-label`      | `#EFCE63` | `#8B5E00` |

Use `text-gold-label` for any gold text or icon: it is honey on dark and the
accessible `#8B5E00` on light. Semantic colours (`success`, `warning`, `error`,
`info`) are the same in both themes.

`muted` (`#718096`) is 4.0:1 on white, below the 4.5:1 AA threshold for body
text, so it is only used for non-essential UI. Use `ink-2` for readable copy.

**How the theme is chosen:** a saved choice (`localStorage['makebee-theme']`)
wins; otherwise the OS setting is followed; dark is the fallback. The inline
script in `index.html` applies this before first paint, so there is no flash.

---

## Editing content

| To change…                               | Edit                          |
| ---------------------------------------- | ----------------------------- |
| Email, location, company description     | `src/data/site.js` → `site`   |
| Social links (hidden while empty)        | `src/data/site.js` → `site.social` |
| Nav items / Blog link                    | `src/data/site.js` → `navItems` |
| Snapshot strip under the hero            | `src/data/site.js` → `snapshot` |
| Marquee words                            | `src/data/site.js` → `whatWeDo` |
| About points                             | `src/data/site.js` → `aboutPoints` |
| Services                                 | `src/data/services.js`        |
| Projects, labels, images, links          | `src/data/projects.js`        |
| Studie AI copy and link                  | `src/sections/FeaturedProduct.jsx` |
| Hero copy                                | `src/sections/Hero.jsx`       |
| Meta title, description, OG text         | `index.html`                  |
| Logo                                     | `src/assets/makebee-mark.svg` |

### Content rules

- **Numbers:** the snapshot strip uses statements, not counts. Only put a
  number in `value` if you can back it up.
- **Project labels:** use `Client Project` only for real, delivered client work.
- **Links:** a nav item or project without an `href`/`link` is simply not
  rendered as a link. Never point anything at `#`.
- **Blog:** set `href` on the Blog entry in `navItems` when the blog exists;
  it will appear in the navbar, mobile menu and footer automatically.

### Adding a project screenshot

```js
// src/data/projects.js
import studieShot from '../assets/studie-dashboard.webp';

{
  id: 'studie-ai',
  image: { src: studieShot, alt: 'Studie AI mock exam screen', width: 1600, height: 700 },
  …
}
```

Export at 1600×700 (the 16:7 card ratio) as WebP, ideally under 120 kB. The
card shows a theme-coloured skeleton until the image has loaded, and images are
lazy-loaded.

### Loading project data from an API

`<Projects items={data} loading={isLoading} />` shows skeleton cards with the
same footprint while `loading` is true. Nothing currently loads asynchronously,
so no skeletons appear on the live page.

---

## Accessibility and motion notes

- Skip link, landmark regions, one `h1`, labelled sections, visible focus rings.
- Mobile menu: `aria-expanded`/`aria-controls`, focus moves in and is trapped,
  Escape closes and returns focus, body scroll is locked, closes on link click
  and when resizing to desktop.
- Marquee has a pause button (WCAG 2.2.2) and pauses on hover/focus.
- `prefers-reduced-motion`: marquee becomes a static wrapped list; hero tiles,
  logo turn, background drift, reveals and skeleton shimmer are all switched off.
- `mailto:` links fail silently for people without a mail app, so the contact
  section also shows the address with a copy button.
