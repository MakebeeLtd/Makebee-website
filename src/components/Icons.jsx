/* Small UI icons. Decorative by default (aria-hidden); pair with visible or sr-only text. */
const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

export const MoonIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

export const SunIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
  </svg>
);

export const ArrowUpRightIcon = (props) => (
  <svg {...base} width={16} height={16} {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const MailIcon = (props) => (
  <svg {...base} width={16} height={16} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const CopyIcon = (props) => (
  <svg {...base} width={15} height={15} {...props}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h8" />
  </svg>
);

export const CheckIcon = (props) => (
  <svg {...base} width={15} height={15} {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const PauseIcon = (props) => (
  <svg {...base} width={14} height={14} {...props}>
    <path d="M9 6v12M15 6v12" />
  </svg>
);

export const PlayIcon = (props) => (
  <svg {...base} width={14} height={14} {...props}>
    <path d="M8 5.5v13l10-6.5-10-6.5Z" />
  </svg>
);
