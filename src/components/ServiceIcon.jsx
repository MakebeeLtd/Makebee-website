/* Service icons: the Makebee hexagon frame with a single glyph inside. */
const FRAME = 'M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4Z';

const GLYPHS = {
  product: 'M4 7.4 12 12l8-4.6M12 12v9.2',
  code: 'M10 9.4 7.6 12l2.4 2.6M14 9.4l2.4 2.6-2.4 2.6',
  ai: 'M12 8.2l1.1 2.7 2.7 1.1-2.7 1.1-1.1 2.7-1.1-2.7L8.2 12l2.7-1.1Z',
  automation: 'M8.8 11.2a3.3 3.3 0 0 1 5.9-1.4M15.2 12.8a3.3 3.3 0 0 1-5.9 1.4M14.9 8.1v1.9H13M9.1 15.9V14H11',
  support: 'm9 12.2 2.1 2.1 4-4.3',
};

export default function ServiceIcon({ name, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="38"
      height="38"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={FRAME} />
      <path d={GLYPHS[name] ?? ''} />
    </svg>
  );
}
