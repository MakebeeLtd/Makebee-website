/**
 * The hero's rippling tile cluster from the prototype, rebuilt as a fixed,
 * precomputed set of ~50 single-element tiles (no layout measuring, no resize
 * rebuilds). Each tile pops on a delay based on its distance from the centre,
 * so the field ripples outward. Tiles light up on hover.
 */
const TILE_W = 46;
const TILE_H = 53;
const COLS = 4; // each side of centre
const ROWS = 3;
const MAX_DIST = 4.1;

const tiles = [];
for (let r = -ROWS; r <= ROWS; r += 1) {
  for (let c = -COLS; c <= COLS; c += 1) {
    const dist = Math.hypot(c, r * 1.15);
    if (dist <= MAX_DIST) {
      tiles.push({ key: `${r}:${c}`, x: c * TILE_W, y: r * TILE_H, delay: Math.round(dist * 90) });
    }
  }
}

export default function HexTileCluster() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(circle,#000_42%,transparent_72%)] [-webkit-mask-image:radial-gradient(circle,#000_42%,transparent_72%)]"
    >
      {tiles.map((t) => (
        <span
          key={t.key}
          className="hex-tile"
          style={{ translate: `${t.x}px ${t.y}px`, animationDelay: `${t.delay}ms` }}
        />
      ))}
    </div>
  );
}
