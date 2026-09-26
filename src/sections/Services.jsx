import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HexField from '../components/HexField.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { services } from '../data/services.js';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Must match the media query that switches on the `.svc` cinematic layout in index.css.
 * Below 768px wide, under 640px tall, or with reduced motion, the section stays a
 * normal stacked list.
 */
const CINEMATIC_QUERY = '(min-width: 768px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)';
const MOTION_QUERY = '(prefers-reduced-motion: no-preference)';

/** Timeline units per service: 1 unit of transition + 1 unit of hold (the "read" time). */
const TRANSITION = 1;
const HOLD = 1;
/** Scroll distance per service, as a fraction of the viewport height. */
const SCROLL_PER_SERVICE = 0.85;
/** Opacity of inactive list items (0.6 keeps them above 4.5:1 contrast in both themes). */
const INACTIVE = 0.6;

const navOffset = () => document.querySelector('header')?.offsetHeight ?? 76;

export default function Services() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const timelineRef = useRef(null); // only used by the list buttons to jump to a service
  const total = services.length;

  useGSAP(
    () => {
      // gsap.matchMedia() runs each setup only while its query matches and reverts it
      // (inline styles, tweens, ScrollTriggers, pin spacer) the moment it stops matching —
      // resizing across the breakpoint or toggling reduced motion is handled for us.
      const mm = gsap.matchMedia();

      // Small screens / short viewports: no pin, just a light scroll-linked reveal per card.
      function setupSimple() {
        const q = gsap.utils.selector(sectionRef);
        gsap.from(q('.svc-intro')[0].children, {
          y: 24,
          autoAlpha: 0,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', end: 'top 55%', scrub: 0.5 },
        });
        q('.svc-slide').forEach((slide) => {
          gsap.from(slide, {
            y: 28,
            autoAlpha: 0.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: slide, start: 'top 95%', end: 'top 70%', scrub: 0.5 },
          });
        });
        return undefined;
      }


      mm.add({ cinematic: CINEMATIC_QUERY, motion: MOTION_QUERY }, (context) => {
        const { cinematic, motion } = context.conditions;
        if (!motion) return undefined; // reduced motion: static layout, no animation at all
        if (!cinematic) return setupSimple();

        const q = gsap.utils.selector(sectionRef);
        const slides = q('.svc-slide');
        const titles = q('.svc-title-inner');
        const bodies = slides.map((slide) => slide.querySelectorAll('.svc-reveal'));
        const rings = q('.svc-ring');
        const frames = q('.svc-frame');
        const fronts = q('.svc-front');
        const items = q('.svc-nav-item');
        const [fill] = q('.svc-rail-fill');
        const [lattice] = q('.svc-stage .hex-field svg');
        const [intro] = q('.svc-intro');
        const [stage] = q('.svc-stage');

        // ---- Resting state: service 1 visible, 2–5 waiting "below the mask" ----
        gsap.set(slides, { autoAlpha: 0 });
        gsap.set(slides[0], { autoAlpha: 1 });
        gsap.set(titles.slice(1), { yPercent: 110 });
        gsap.set(bodies.slice(1), { y: 28, autoAlpha: 0 });
        gsap.set(frames.slice(1), { scale: 1.14, rotation: 12, autoAlpha: 0 });
        gsap.set(rings.slice(1), { scale: 1.3, autoAlpha: 0 });
        gsap.set(fronts.slice(1), { scale: 0.82, y: 16, autoAlpha: 0 });
        gsap.set(items, { autoAlpha: INACTIVE });
        gsap.set(items[0], { autoAlpha: 1 });
        gsap.set(fill, { scaleY: 1 / total, transformOrigin: 'top center' });

        // ---- Entrance (before the pin): heading block and stage are revealed by scroll.
        // scrub ties progress to the scrollbar instead of playing once, so scrolling
        // back up plays it in reverse.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: () => `top ${navOffset() + 40}px`,
              scrub: 0.6,
            },
          })
          .from(intro.children, { y: 36, autoAlpha: 0, stagger: 0.12, ease: 'power3.out' })
          .fromTo(
            stage,
            { clipPath: 'inset(10% 6% 10% 6% round 18px)', y: 40 },
            { clipPath: 'inset(0% 0% 0% 0% round 18px)', y: 0, ease: 'power2.out' },
            0.1,
          );

        // ---- Main story timeline. Its playhead is driven by scroll (see scrollTrigger below).
        // Layout in timeline units: [hold] [transition → hold] × (n − 1) [hold]
        const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
        tl.addLabel('s0', 0);

        for (let i = 1; i < total; i += 1) {
          const at = HOLD / 2 + (i - 1) * (TRANSITION + HOLD);
          const prev = i - 1;

          // Outgoing service: title slides up out of its mask, copy lifts away, visual recedes.
          tl.to(titles[prev], { yPercent: -110, duration: 0.55, ease: 'power2.in' }, at)
            .to(bodies[prev], { y: -22, autoAlpha: 0, duration: 0.45, stagger: 0.04, ease: 'power2.in' }, at)
            .to(frames[prev], { scale: 0.86, rotation: -12, autoAlpha: 0, duration: 0.7 }, at)
            .to(rings[prev], { scale: 0.8, autoAlpha: 0, duration: 0.7 }, at)
            .to(fronts[prev], { scale: 0.85, y: -16, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, at)
            .set(slides[prev], { autoAlpha: 0 }, at + TRANSITION * 0.8)

            // Incoming service: same direction of travel, arriving from below.
            .set(slides[i], { autoAlpha: 1 }, at)
            .to(frames[i], { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }, at + 0.2)
            .to(rings[i], { scale: 1, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }, at + 0.15)
            .to(fronts[i], { scale: 1, y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' }, at + 0.4)
            .to(titles[i], { yPercent: 0, duration: 0.65, ease: 'power3.out' }, at + 0.35)
            .to(bodies[i], { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out' }, at + 0.45)

            // Index list and progress rail follow the active service.
            .to(items[prev], { autoAlpha: INACTIVE, duration: 0.5 }, at)
            .to(items[i], { autoAlpha: 1, duration: 0.5 }, at + 0.3)
            .to(fill, { scaleY: (i + 1) / total, duration: TRANSITION }, at)
            .addLabel(`s${i}`, at + TRANSITION);
        }
        tl.to({}, { duration: HOLD / 2 }); // final hold so service 5 can be read before release

        // Parallax: layers move at different speeds across the whole pin.
        // Background lattice (slowest) < service visual (moderate) < text (fastest, per transition above).
        const length = tl.duration();
        tl.fromTo(lattice, { y: 0 }, { y: -48, duration: length, ease: 'none' }, 0).fromTo(
          q('.svc-visual'),
          { y: 26 },
          { y: -26, duration: length, ease: 'none' },
          0,
        );

        // Keep aria-current on the active list item without React state (no re-render per frame).
        let active = 0;
        const labelTimes = Array.from({ length: total }, (_, i) => tl.labels[`s${i}`]);
        const syncActive = () => {
          const t = tl.time();
          let idx = 0;
          labelTimes.forEach((time, i) => {
            if (t >= time - TRANSITION / 2) idx = i;
          });
          if (idx === active) return;
          items[active]?.removeAttribute('aria-current');
          items[idx]?.setAttribute('aria-current', 'step');
          active = idx;
        };

        // ScrollTrigger maps scroll distance onto the timeline:
        //  - pin: holds the section in place so the story plays while the page "stands still";
        //    when the timeline ends the pin releases and the page scrolls on normally.
        //  - scrub: 0.8 = the playhead eases toward the scroll position over 0.8s (smooth, not jumpy).
        //  - snap: after scrolling stops, settle on the next service in the scroll direction,
        //    so the story never rests halfway between two services. If the scroll already stopped
        //    on a service (e.g. after a list-button jump), stay there.
        // 1 (the end) is included so a scroll past the last service releases the pin instead of snapping back.
        const labelProgress = [...Object.values(tl.labels).map((time) => time / tl.duration()), 1];
        const snapToService = ScrollTrigger.snapDirectional(labelProgress);
        const snap = (progress, self) =>
          labelProgress.find((p) => Math.abs(p - progress) < 0.01) ?? snapToService(progress, self.direction);
        tl.eventCallback('onUpdate', syncActive); // fires while scrub is still easing, not just on scroll

        ScrollTrigger.create({
          animation: tl,
          trigger: pinRef.current,
          start: () => `top top+=${navOffset()}`,
          end: () => `+=${Math.round(window.innerHeight * SCROLL_PER_SERVICE * total)}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: snap,
            inertia: false, // snap from where the scroll actually stopped, not a velocity projection
            duration: { min: 0.2, max: 0.6 },
            delay: 0.08,
            ease: 'power2.inOut',
          },
        });

        timelineRef.current = tl;
        items[0]?.setAttribute('aria-current', 'step');

        // Runs when the query stops matching or the component unmounts (after mm reverts
        // every tween/ScrollTrigger created above).
        return () => {
          timelineRef.current = null;
          items.forEach((el) => el.removeAttribute('aria-current'));
        };
      });

      // Web fonts change text heights after first layout; recompute trigger positions once they land.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    // useGSAP scopes selectors to this section and reverts the matchMedia (and so every
    // animation and ScrollTrigger above) on unmount — no manual kill() calls needed.
    { scope: sectionRef },
  );

  // List buttons jump to a service: convert that service's timeline label into a scroll position.
  const goTo = (index) => {
    const st = timelineRef.current?.scrollTrigger;
    if (!st) return;
    window.scrollTo({ top: Math.round(st.labelToScroll(`s${index}`)), behavior: 'smooth' });
  };

  return (
    <section id="services" ref={sectionRef} aria-labelledby="services-title" className="svc">
      <div ref={pinRef} className="svc-pin">
        <div className="wrap svc-layout">
          <div className="svc-side">
            <div className="svc-intro">
              <p className="mb-3 text-[13px] font-semibold text-gold-label">Services</p>
              <h2 id="services-title" className="text-[clamp(1.7rem,2.6vw,2.3rem)] font-bold leading-[1.15]">
                What we build
              </h2>
              <p className="mt-3.5 max-w-[440px] text-[15.5px]">
                Five disciplines, one product mindset. Every engagement is treated like something we’d ship
                ourselves.
              </p>
            </div>

            {/* Index of services — only shown in the pinned layout */}
            <nav className="svc-nav" aria-label="Services">
              <div className="svc-nav-track">
                <div className="svc-rail" aria-hidden="true">
                  <span className="svc-rail-fill" />
                </div>
                <ol className="svc-nav-list">
                  {services.map((s, i) => (
                    <li key={s.id}>
                      <button type="button" className="svc-nav-item" onClick={() => goTo(i)}>
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          </div>

          <div className="svc-stage">
            <HexField id="hex-services" tile={56} radial className="svc-lattice" />
            {services.map((s, i) => (
              <ServiceCard key={s.id} {...s} index={i} total={total} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
