import { useRef } from 'react';
import { useHexPointer } from '../hooks/useHexPointer.js';

/**
 * Background hexagon lattice drawn as a single SVG <pattern>
 * (the prototype built hundreds of DOM tiles with JS; this is one element).
 * Stroke colour follows the theme through --hex-stroke.
 *
 * Interactive layer (see hooks/useHexPointer.js): a honey copy of the lattice revealed
 * around the pointer through a small radial mask, plus two outline layers that mark
 * the hexagon under the pointer. Hidden until the pointer is over the field.
 *
 * `opacity` dims only the resting lattice, so the pointer highlight stays readable
 * even on very faint backgrounds.
 */
const HEX_PATH = 'M42 0L84 24V72L42 96L0 72V24Z';

export default function HexField({ id, tile = 60, drift = false, radial = false, opacity, className = '' }) {
  const rootRef = useRef(null);
  const width = tile;
  const height = Math.round((tile * 96) / 84);
  const glowRadius = Math.round(tile * 1.7);
  useHexPointer(rootRef, { width, height, radius: glowRadius });

  const classes = ['hex-field', radial && 'hex-field--radial', drift && 'hex-field--drift', className]
    .filter(Boolean)
    .join(' ');

  const pattern = (patternId, stroke) => (
    <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" viewBox="0 0 84 96">
      <path d={HEX_PATH} fill="none" stroke={stroke} strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </pattern>
  );

  return (
    <div ref={rootRef} aria-hidden="true" className={classes} style={{ '--hex-period': `${height}px` }}>
      <svg xmlns="http://www.w3.org/2000/svg" focusable="false">
        <defs>
          {pattern(id, 'var(--hex-stroke)')}
          {pattern(`${id}-lit`, 'var(--gold-label)')}
          <radialGradient
            id={`${id}-glow`}
            className="hex-lit-gradient"
            gradientUnits="userSpaceOnUse"
            cx="-9999"
            cy="-9999"
            r={glowRadius}
          >
            <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="0.45" stopColor="#fff" stopOpacity="0.3" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
            <rect className="hex-lit-area" x="-9999" y="-9999" width={glowRadius * 2} height={glowRadius * 2} fill={`url(#${id}-glow)`} />
          </mask>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${id})`} style={opacity == null ? undefined : { opacity }} />

        <g className="hex-lit-layer">
          {/* Only a glow-sized square is painted, moved with the pointer — keeps repaints small */}
          <rect
            className="hex-lit-area"
            x="-9999"
            y="-9999"
            width={glowRadius * 2}
            height={glowRadius * 2}
            fill={`url(#${id}-lit)`}
            mask={`url(#${id}-mask)`}
          />
          <g className="hex-cell">
            <path d={HEX_PATH} fill="none" vectorEffect="non-scaling-stroke" />
          </g>
          <g className="hex-cell">
            <path d={HEX_PATH} fill="none" vectorEffect="non-scaling-stroke" />
          </g>
        </g>
      </svg>
    </div>
  );
}
