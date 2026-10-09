import studieLanding from '../assets/studie-landing.webp';

/**
 * Selected work.
 *
 * `label` must be honest. Use one of:
 *   'Makebee Product'   – a product Makebee built and runs
 *   'Internal Prototype'– built internally, not shipped to a client
 *   'Concept'           – design/exploration, not built to production
 *   'Makebee Demo'      – a demo build
 *   'Client Project'    – ONLY for real, delivered client work
 *
 * `image` (optional): { src, alt, width, height, position? }. Import the file from
 * src/assets so Vite fingerprints it. Without an image the card shows a
 * branded placeholder thumbnail.
 *
 * `link` (optional): { href, label, external }. Cards without a link show
 * no button — never point a button at "#".
 */
/** Studie AI's live site. The single source for every Studie link on the page. */
export const STUDIE_URL = 'https://studie-frontend-v2.pages.dev/';

/** Screenshot of the Studie AI landing page (src/assets/studie-landing.webp, 1200×629). */
export const studieScreenshot = {
  src: studieLanding,
  alt: 'Studie AI landing page with the headline “Sit the exam before the exam.” and a marked mock exam paper.',
  width: 1200,
  height: 629,
  position: 'top', // project cards crop to 16:7; keep Studie's nav and headline in frame
};

/**
 * Only work a visitor can open today. Concepts and prototypes without a live
 * destination were removed; add an entry here when it has a real `link`.
 */
export const projects = [
  {
    id: 'studie-ai',
    label: 'Makebee Product',
    title: 'Studie AI',
    description: 'AI-generated mock exams for Nigerian university students, built and run by Makebee.',
    tags: ['AI', 'EdTech', 'Web app'],
    image: studieScreenshot,
    link: { href: STUDIE_URL, label: 'View project', external: true },
  },
];
