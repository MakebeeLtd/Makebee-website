/**
 * Illustrative Studie AI interface (not a screenshot, contains no real usage data).
 * Swap for a real screenshot by passing `image` ({ src, alt, width, height }).
 */
const OPTIONS = [
  'Stack',
  'Queue',
  'Binary search tree',
  'Hash table',
];

export default function ProductShowcase({ image }) {
  if (image) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded-card border border-line"
      />
    );
  }

  return (
    <figure className="m-0">
      <div
        role="img"
        aria-label="Illustration of a Studie AI mock exam: a multiple-choice question with a countdown timer and a progress bar."
        className="rounded-card border border-line bg-bg-secondary p-4 sm:p-5"
      >
        <div aria-hidden="true">
          <div className="flex items-center justify-between gap-3 rounded-[9px] border border-line bg-elevated px-3.5 py-3">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-ink">Mock exam: CSC 201</p>
              <p className="text-[12px] text-ink-2">Question 4 of 20</p>
            </div>
            <span className="shrink-0 rounded-md border border-line px-2 py-1 font-display text-[12.5px] font-semibold tabular-nums text-gold-label">
              18:42
            </span>
          </div>

          <p className="mt-4 px-1 text-[14px] font-semibold leading-snug text-ink">
            Which data structure removes items in the same order they were added?
          </p>

          <ul className="mt-3 grid gap-2">
            {OPTIONS.map((opt, i) => {
              const selected = i === 1;
              return (
                <li
                  key={opt}
                  className={`flex items-center gap-3 rounded-[9px] border px-3.5 py-2.5 text-[13px] ${
                    selected
                      ? 'border-gold-deep bg-[color-mix(in_srgb,var(--honey)_10%,var(--elevated))] text-ink'
                      : 'border-line bg-elevated text-ink-2'
                  }`}
                >
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[11px] font-semibold ${
                      selected ? 'border-gold-label text-gold-label' : 'border-line text-muted'
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex items-center gap-3 px-1">
            <div className="h-1.5 flex-1 overflow-hidden rounded bg-[var(--border)]">
              <span className="block h-full w-1/5 rounded bg-gradient-to-r from-gold-deep to-gold-bright" />
            </div>
            <span className="text-[12px] tabular-nums text-ink-2">20%</span>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[12px] text-ink-2">Interface illustration</figcaption>
    </figure>
  );
}
