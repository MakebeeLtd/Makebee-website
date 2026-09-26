/**
 * Services shown in the Services section and the footer.
 * `icon` must match a key in src/components/ServiceIcon.jsx.
 * `includes` lists the kinds of work in scope — edit to match what the team actually offers.
 */
export const services = [
  {
    id: 'product-development',
    icon: 'product',
    title: 'Product Development',
    description:
      'From first sketch to launch and the releases after it scoping, design, build and iteration.',
    includes: ['Discovery and scoping', 'Interface and UX design', 'MVP build', 'Iteration after launch'],
  },
  {
    id: 'software-development',
    icon: 'code',
    title: 'Software Development',
    description:
      'Custom web applications, APIs and internal tools, written to be maintained long after handover.',
    includes: ['Web applications', 'APIs and backends', 'Internal tools', 'Integrations'],
  },
  {
    id: 'ai-solutions',
    icon: 'ai',
    title: 'AI Solutions',
    description:
      'Document search, assistants and content generation,scoped to problems where AI actually helps.',
    includes: ['Document search and Q&A', 'Assistants', 'Content generation', 'AI features in existing products'],
  },
  {
    id: 'business-automation',
    icon: 'automation',
    title: 'Business Automation',
    description:
      'Replace repetitive manual work with workflows, integrations and dashboards your team will use.',
    includes: ['Workflow automation', 'System integrations', 'Reporting dashboards'],
  },
  {
    id: 'software-services',
    icon: 'support',
    title: 'Software Services',
    description:
      'Maintenance, audits, performance fixes and technical support for software you already run.',
    includes: ['Maintenance and updates', 'Code audits', 'Performance fixes', 'Technical support'],
  },
];
