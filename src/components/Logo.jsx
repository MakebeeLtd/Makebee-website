import markUrl from '../assets/makebee-mark.svg';

/**
 * Official Makebee lockup: the isometric mark plus the "make/bee" wordmark.
 * The mark file (src/assets/makebee-mark.svg) is the single source of truth —
 * never redraw or recolour it here.
 */
export default function Logo({ size = 30, wordmark = true, className = '' }) {
  const height = Math.round(size * 1.1);
  const textSize = Math.round(size * 0.64);

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={markUrl}
        width={size}
        height={height}
        alt={wordmark ? '' : 'Makebee'}
        className="block shrink-0"
        decoding="async"
      />
      {wordmark && (
        <span
          className="font-display font-bold leading-none tracking-[-0.01em]"
          style={{ fontSize: `${textSize}px` }}
        >
          <span className="text-ink">make</span>
          <span className="text-gold-label">bee</span>
        </span>
      )}
    </span>
  );
}

export { markUrl };
