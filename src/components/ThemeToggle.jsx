import { useTheme } from '../hooks/useTheme.js';
import { MoonIcon, SunIcon } from './Icons.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-line bg-surface text-ink-2 transition-colors duration-150 hover:border-gold-deep hover:text-gold-label"
    >
      {/* Icon follows the live data-theme attribute, so it is right from first paint */}
      <MoonIcon className="theme-icon-dark" />
      <SunIcon className="theme-icon-light" />
    </button>
  );
}
