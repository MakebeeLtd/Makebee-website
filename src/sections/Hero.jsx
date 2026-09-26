import Button from '../components/Button.jsx';
import HexField from '../components/HexField.jsx';
import HexTileCluster from '../components/HexTileCluster.jsx';
import { markUrl } from '../components/Logo.jsx';
import { mailto } from '../data/site.js';

const enter = (delay) => ({ animationDelay: `${delay}ms` });

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-16 pt-10 nav:pb-20 nav:pt-24">
      <HexField id="hex-hero" tile={60} drift opacity={0.5} />

      <div className="wrap grid items-center gap-6 nav:grid-cols-[1.15fr_0.85fr] nav:gap-14">
        <div className="order-2 nav:order-1">
          <p className="enter mb-4 text-[13px] font-semibold text-ink-2" style={enter(0)}>
            We build digital products
          </p>
          <h1
            id="hero-title"
            className="enter max-w-[14ch] text-[clamp(2.3rem,4.6vw,3.6rem)] font-bold leading-[1.08]"
            style={enter(60)}
          >
            Products that make ideas <span className="text-gold-label">real.</span>
          </h1>
          <p className="enter mt-5 max-w-[480px] text-[16px] sm:text-[17px]" style={enter(160)}>
            Makebee is a software studio focused on building modern web applications, AI solutions, automation
            systems and scalable digital products.
          </p>
          <div className="enter mt-8 flex flex-wrap gap-3.5" style={enter(260)}>
            <Button href={`${mailto}?subject=${encodeURIComponent('New project enquiry')}`}>Start a Project</Button>
            <Button href="#projects" variant="secondary">
              See Our Work
            </Button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative isolate order-1 flex h-[210px] items-center justify-center [perspective:1100px] nav:order-2 nav:h-[360px]"
        >
          <HexTileCluster />
          <img
            src={markUrl}
            alt=""
            width="150"
            height="165"
            fetchPriority="high"
            className="hero-mark enter h-auto w-[112px] nav:w-[150px]"
            style={enter(120)}
          />
        </div>
      </div>
    </section>
  );
}
