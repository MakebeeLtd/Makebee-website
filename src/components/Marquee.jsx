import { useState } from 'react';
import { PauseIcon, PlayIcon } from './Icons.jsx';

function HexMark() {
  return (
    <svg width="10" height="11" viewBox="0 0 84 96" aria-hidden="true" focusable="false" className="shrink-0">
      <path d="M42 4L80 26V70L42 92L4 70V26Z" fill="none" stroke="var(--gold-label)" strokeWidth="9" />
    </svg>
  );
}

function Group({ items, hidden = false }) {
  return (
    <ul className={`flex shrink-0 items-center ${hidden ? 'marquee-dup' : ''}`} aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-[15px] font-semibold tracking-[-0.01em] text-ink-2 sm:px-8 sm:text-[17px]">
            {item}
          </span>
          <HexMark />
        </li>
      ))}
    </ul>
  );
}

/**
 * Seamless loop: two identical groups, the track slides by exactly -50%.
 * Pauses on hover/focus and via an explicit button (WCAG 2.2.2 — moving
 * content that runs longer than 5 seconds needs a pause control).
 * With reduced motion it becomes a static, wrapped list.
 */
export default function Marquee({ items, label }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative flex items-center">
      <div className="marquee min-w-0 flex-1 overflow-hidden" data-paused={paused}>
        <div className="marquee-track">
          <Group items={items} />
          <Group items={items} hidden />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? `Play ${label} animation` : `Pause ${label} animation`}
        className="marquee-control mr-3 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-gold-deep hover:text-gold-label sm:mr-5"
      >
        {paused ? <PlayIcon /> : <PauseIcon />}
      </button>
    </div>
  );
}
