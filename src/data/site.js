/**
 * Company-wide facts. Edit here; components read from this file.
 * Only add something to this file if it is true today.
 */
export const site = {
  name: 'Makebee',
  tagline: 'Software product studio',
  email: 'makebee.tech@gmail.com',
  location: 'Lagos, Nigeria',
  description:
    'Makebee is a software product studio building digital products, software systems, AI solutions and business automation.',
  // Add real profile URLs here to show them in the footer, e.g.
  // { label: 'LinkedIn', href: 'https://www.linkedin.com/company/…' }
  social: [],
};

export const mailto = `mailto:${site.email}`;

/**
 * Navigation. Items without an `href` are not rendered, so a page
 * that doesn't exist yet (e.g. Blog) never becomes a dead link.
 * Add `href: 'https://…'` to the Blog entry when it goes live.
 */
export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: null },
  { label: 'Contact', href: '#contact' },
];

export const visibleNavItems = navItems.filter((item) => Boolean(item.href));

/**
 * Company snapshot strip under the hero.
 * The prototype showed "6+ / 5+ / 1". These are statements, not counts,
 * until the numbers are verified. To show a number, put it in `value`.
 */
export const snapshot = [
  { value: 'Studio + product', label: 'Client work alongside products we own' },
  { value: 'Studie AI', label: 'Our flagship product, built and run in-house' },
  { value: 'Lagos', label: 'Where we’re based and building for wider markets' },
];

export const whatWeDo = [
  'Product Development',
  'Software Development',
  'AI Solutions',
  'Business Automation',
  'Software Services',
  'Web Development',
  'AI Integration',
  'Business Systems',
];

export const aboutPoints = [
  {
    title: 'Product-first thinking',
    body: 'We scope, design and build client software the way we build our own products. Studie AI is where we practise that every day.',
  },
  {
    title: 'A small, focused team',
    body: 'The people you speak to are the people writing the code. No hand-offs to a team you never meet.',
  },
  {
    title: 'Built from Nigeria, for real problems',
    body: 'We work within the constraints of the markets we know well: patchy networks, price-sensitive usersand build to a standard that holds up anywhere.',
  },
];
