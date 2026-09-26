import Reveal from '../components/Reveal.jsx';
import { aboutPoints } from '../data/site.js';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 md:py-24">
      <div className="wrap grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <p className="mb-3 text-[13px] font-semibold text-gold-label">About Makebee</p>
          <h2 id="about-title" className="max-w-[420px] text-[clamp(1.7rem,2.6vw,2.3rem)] font-bold leading-[1.15]">
            We turn ideas into useful digital products.
          </h2>
          <p className="mt-4 max-w-[420px] text-[15.5px]">
            A software and product studio in Lagos. We take on client work and build our own products, and each
            makes us better at the other.
          </p>
        </Reveal>

        <Reveal as="ul" delay={80} className="grid gap-[22px]">
          {aboutPoints.map((point) => (
            <li key={point.title} className="flex gap-4 border-b border-line pb-[22px] last:border-b-0 last:pb-0">
              <svg viewBox="0 0 100 110" width="30" height="33" aria-hidden="true" className="shrink-0">
                <polygon
                  points="50,8 84,28 84,70 50,90 16,70 16,28"
                  fill="none"
                  stroke="var(--gold-label)"
                  strokeWidth="5"
                />
              </svg>
              <div>
                <h3 className="text-[15px] font-bold">{point.title}</h3>
                <p className="mt-1.5 text-sm">{point.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
