import { useCallback, useEffect, useRef, useState } from 'react';
import Logo from './Logo.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import Button from './Button.jsx';
import { mailto, site, visibleNavItems } from '../data/site.js';

const DESKTOP_QUERY = '(min-width: 900px)';

function MenuIcon({ open }) {
  const line = 'absolute left-0 h-[1.75px] w-[18px] rounded bg-current transition-transform duration-300 ease-out';
  return (
    <span aria-hidden="true" className="relative block h-3.5 w-[18px]">
      <span className={`${line} top-0 ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
      <span className={`${line} top-[6px] transition-opacity ${open ? 'opacity-0' : ''}`} />
      <span className={`${line} top-3 ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const html = document.documentElement;
    const { body } = document;
    const prev = { html: html.style.overflow, body: body.style.overflow, pad: body.style.paddingRight };
    const scrollbar = window.innerWidth - html.clientWidth;

    // Lock background scroll without the page jumping sideways.
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    const focusables = () => [
      toggleRef.current,
      ...panelRef.current.querySelectorAll('a[href], button:not([disabled])'),
    ];
    focusables()[1]?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== 'Tab') return;
      // Keep focus inside the toggle + menu while it is open.
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const mq = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = (event) => event.matches && close();

    document.addEventListener('keydown', onKeyDown);
    mq.addEventListener('change', onBreakpoint);

    return () => {
      html.style.overflow = prev.html;
      body.style.overflow = prev.body;
      body.style.paddingRight = prev.pad;
      document.removeEventListener('keydown', onKeyDown);
      mq.removeEventListener('change', onBreakpoint);
    };
  }, [open, close]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-line bg-[var(--nav-bg)] pt-[env(safe-area-inset-top,0px)] backdrop-blur-[14px] backdrop-saturate-150">
      <div className="wrap flex h-nav items-center justify-between gap-4">
        <a href="#home" className="rounded-md" aria-label={`${site.name}, back to top`} onClick={() => close()}>
          <Logo size={30} />
        </a>

        <nav aria-label="Main" className="hidden nav:block">
          <ul className="flex items-center gap-8 lg:gap-9">
            {visibleNavItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="relative py-2 text-[14.5px] font-medium text-ink-2 transition-colors duration-150 after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-label after:transition-transform after:duration-200 hover:text-ink hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-[18px]">
          <ThemeToggle />
          <Button href={mailto} variant="ghost" size="sm" className="hidden sm:inline-flex">
            Let’s Talk
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-[10px] border border-line bg-surface text-ink transition-colors hover:border-gold-deep nav:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>
    </header>

      {/* Mobile menu — rendered outside <header>: backdrop-filter would otherwise
          make the header the containing block for this fixed panel. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`fixed inset-x-0 bottom-0 top-[calc(var(--nav-h)+env(safe-area-inset-top,0px)+1px)] z-40 overflow-y-auto bg-bg nav:hidden ${
          open
            ? 'visible translate-y-0 opacity-100 [transition:opacity_.28s_ease,transform_.28s_var(--ease-out),visibility_0s]'
            : 'invisible -translate-y-2 opacity-0 [transition:opacity_.2s_ease,transform_.2s_ease,visibility_0s_.2s]'
        }`}
      >
        <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-6">
          <ul className="flex flex-col">
            {visibleNavItems.map((item, i) => (
              <li
                key={item.label}
                className={`border-b border-line transition-[opacity,transform] duration-300 ease-out motion-reduce:transform-none ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${60 + i * 35}ms` : '0ms' }}
              >
                <a
                  href={item.href}
                  onClick={() => close()}
                  className="flex items-center justify-between py-4 font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-ink transition-colors hover:text-gold-label"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <Button href={mailto} className="w-full" onClick={() => close()}>
              Let’s Talk
            </Button>
            <p className="mt-4 text-center text-sm">
              <a href={mailto} className="text-ink-2 underline decoration-line underline-offset-4">
                {site.email}
              </a>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
