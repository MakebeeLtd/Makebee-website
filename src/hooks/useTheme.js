import { useCallback, useEffect, useState } from 'react';

export const THEME_STORAGE_KEY = 'makebee-theme';
const THEME_COLORS = { dark: '#0A1324', light: '#FFFFFF' };

function currentTheme() {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function readSaved() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

let switchTimer;

function applyTheme(theme) {
  const root = document.documentElement;
  // Enable colour transitions only for the duration of the switch.
  root.classList.add('theme-switching');
  root.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  window.clearTimeout(switchTimer);
  switchTimer = window.setTimeout(() => root.classList.remove('theme-switching'), 300);
}

/**
 * The initial theme is applied by an inline script in index.html before
 * first paint. This hook only reads it, toggles it and persists the choice.
 * Server and first client render both assume "dark"; the effect then syncs,
 * which keeps prerendered HTML and hydration in agreement.
 */
export function useTheme() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setTheme(currentTheme());
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[currentTheme()]);

    // Follow the OS setting live, but only until the visitor makes a choice.
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (event) => {
      if (readSaved()) return;
      const next = event.matches ? 'light' : 'dark';
      applyTheme(next);
      setTheme(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* private mode or storage disabled — the switch still works for this visit */
    }
  }, []);

  return { theme, toggleTheme };
}
