/**
 * Colours point at CSS variables defined in src/index.css.
 * Change a hex value there and both Tailwind classes and custom CSS follow.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    screens: {
      sm: '560px',
      md: '768px',
      nav: '900px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-soft': 'var(--bg-soft)',
        surface: 'var(--surface)',
        elevated: 'var(--elevated)',
        line: 'var(--border)',
        ink: 'var(--text-primary)',
        'ink-2': 'var(--text-secondary)',
        muted: 'var(--text-muted)',
        disabled: 'var(--text-disabled)',
        honey: 'var(--honey)',
        gold: 'var(--gold)',
        'gold-bright': 'var(--gold-bright)',
        'gold-deep': 'var(--gold-deep)',
        'gold-label': 'var(--gold-label)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1180px',
      },
      height: {
        nav: '76px',
      },
      borderRadius: {
        card: '14px',
        panel: '18px',
      },
    },
  },
  plugins: [],
};
