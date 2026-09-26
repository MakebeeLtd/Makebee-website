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
 * `image` (optional): { src, alt, width, height }. Import the file from
 * src/assets so Vite fingerprints it. Without an image the card shows a
 * branded placeholder thumbnail.
 *
 * `link` (optional): { href, label, external }. Cards without a link show
 * no button — never point a button at "#".
 */
export const projects = [
  {
    id: 'studie-ai',
    label: 'Makebee Product',
    title: 'Studie AI',
    description: 'AI-generated mock exams for Nigerian university students, built and run by Makebee.',
    tags: ['AI', 'EdTech', 'Web app'],
    link: { href: 'https://studie-frontend.pages.dev/', label: 'View project', external: true },
  },
  {
    id: 'business-management-system',
    label: 'Internal Prototype',
    title: 'Business Management System',
    description: 'Inventory, sales and reporting for small retail operators.',
    tags: ['Business systems', 'Dashboard'],
  },
  {
    id: 'ai-knowledge-assistant',
    label: 'Concept',
    title: 'AI Knowledge Assistant',
    description: 'Structured question-and-answer over internal documents and policies.',
    tags: ['AI', 'Search'],
  },
  {
    id: 'ecommerce-platform',
    label: 'Concept',
    title: 'E-commerce Platform',
    description: 'Storefront and checkout for independent brands.',
    tags: ['Commerce', 'Web'],
  },
];
