import { useEffect } from 'react';

/**
 * Pointer interaction for every hexagon lattice on the page (HexField).
 *
 * One shared window `pointermove` listener and one requestAnimationFrame loop serve all
 * lattices. Each frame, only lattices that are on screen (IntersectionObserver) are checked,
 * and only the one under the pointer is updated — by writing a few SVG attributes and a
 * class, never React state. Nothing runs while the pointer is still and the page isn't scrolling.
 *
 * Enabled only for a fine pointer that can hover (mouse, trackpad, pen) and when the visitor
 * has not asked for reduced motion. Touch devices keep the static lattice.
 */
const ENABLE_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
const FOLLOW = 0.28; // glow follows the pointer with a little easing (0–1, higher = snappier)

const fields = new Set(); // every registered lattice
const visible = new Set(); // registered lattices currently on screen
const pointer = { x: 0, y: 0, inside: false };
let raf = 0;
let enabled = false;
let observer;
let mq;

function schedule() {
  if (!raf) raf = requestAnimationFrame(tick);
}

function onPointerMove(event) {
  if (event.pointerType === 'touch') return;
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.inside = true;
  schedule();
}

function onPointerOut(event) {
  if (event.relatedTarget) return; // still inside the document
  pointer.inside = false;
  schedule();
}

function onScroll() {
  if (pointer.inside) schedule(); // content moved under a still pointer
}

function deactivate(field) {
  if (!field.active) return;
  field.active = false;
  field.key = '';
  field.root.classList.remove('is-lit');
  field.cells.forEach((cell) => cell.classList.remove('on'));
}

/** Returns true while the glow is still easing toward the pointer. */
function update(field, navBottom) {
  const box = field.root.getBoundingClientRect();
  const hit =
    pointer.inside &&
    pointer.y > navBottom && // the sticky navbar sits over the lattice; don't light hexagons behind it
    pointer.x >= box.left &&
    pointer.x <= box.right &&
    pointer.y >= box.top &&
    pointer.y <= box.bottom;

  if (!hit) {
    deactivate(field);
    return false;
  }

  // Lattice coordinates: the SVG may be translated (drift / parallax), so measure it directly.
  const svgBox = field.svg.getBoundingClientRect();
  const x = pointer.x - svgBox.left;
  const y = pointer.y - svgBox.top;

  if (!field.active) {
    field.active = true;
    field.gx = x;
    field.gy = y;
    field.root.classList.add('is-lit');
  }

  // Soft glow on nearby lines: a radial mask centred (with easing) on the pointer.
  field.gx += (x - field.gx) * FOLLOW;
  field.gy += (y - field.gy) * FOLLOW;
  const gx = field.gx.toFixed(1);
  const gy = field.gy.toFixed(1);
  field.gradient.setAttribute('cx', gx);
  field.gradient.setAttribute('cy', gy);
  const ax = (field.gx - field.r).toFixed(1);
  const ay = (field.gy - field.r).toFixed(1);
  field.areas.forEach((area) => {
    area.setAttribute('x', ax);
    area.setAttribute('y', ay);
  });

  // Strongest outline on the hexagon under the pointer. Two outline layers alternate so the
  // previous hexagon fades out while the new one fades in, instead of snapping.
  const col = Math.floor(x / field.w);
  const row = Math.floor(y / field.h);
  const key = `${col}:${row}`;
  if (key !== field.key) {
    field.key = key;
    field.cells[field.which].classList.remove('on');
    field.which ^= 1;
    const next = field.cells[field.which];
    next.setAttribute('transform', `translate(${col * field.w} ${row * field.h}) scale(${field.w / 84} ${field.h / 96})`);
    next.classList.add('on');
  }

  return Math.abs(x - field.gx) > 0.5 || Math.abs(y - field.gy) > 0.5;
}

function tick() {
  raf = 0;
  let easing = false;
  const navBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0;
  visible.forEach((field) => {
    if (update(field, navBottom)) easing = true;
  });
  if (easing) schedule();
}

function setEnabled(on) {
  if (on === enabled) return;
  enabled = on;
  if (on) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
  } else {
    window.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerout', onPointerOut);
    window.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(raf);
    raf = 0;
    fields.forEach(deactivate);
  }
}

function onMediaChange() {
  setEnabled(mq.matches);
}

function register(field) {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const f = entry.target.__hexField;
        if (!f) return;
        if (entry.isIntersecting) visible.add(f);
        else {
          visible.delete(f);
          deactivate(f);
        }
      });
    });
    mq = window.matchMedia(ENABLE_QUERY);
  }
  if (fields.size === 0) {
    mq.addEventListener('change', onMediaChange);
    setEnabled(mq.matches);
  }
  fields.add(field);
  field.root.__hexField = field;
  observer.observe(field.root);
}

function unregister(field) {
  observer.unobserve(field.root);
  deactivate(field);
  delete field.root.__hexField;
  fields.delete(field);
  visible.delete(field);
  if (fields.size === 0) {
    mq.removeEventListener('change', onMediaChange);
    setEnabled(false);
  }
}

/**
 * Connect a HexField to the shared pointer interaction.
 * @param {React.RefObject<HTMLElement>} rootRef  the .hex-field container
 * @param {{ width: number, height: number, radius: number }} tile  lattice cell size and glow radius in px
 */
export function useHexPointer(rootRef, { width, height, radius }) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return undefined;

    const field = {
      root,
      svg: root.querySelector('svg'),
      gradient: root.querySelector('.hex-lit-gradient'),
      cells: [...root.querySelectorAll('.hex-cell')],
      areas: [...root.querySelectorAll('.hex-lit-area')],
      r: radius,
      w: width,
      h: height,
      which: 0,
      key: '',
      active: false,
      gx: 0,
      gy: 0,
    };
    register(field);
    return () => unregister(field);
  }, [rootRef, width, height, radius]);
}
