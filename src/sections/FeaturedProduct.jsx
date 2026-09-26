import Button from '../components/Button.jsx';
import HexField from '../components/HexField.jsx';
import ProductShowcase from '../components/ProductShowcase.jsx';
import Reveal from '../components/Reveal.jsx';

const STUDIE_URL = 'https://studie-frontend.pages.dev/';

const points = [
  'Mock exams generated with AI',
  'Built around Nigerian university courses',
  'Runs in the browser, nothing to install',
];

export default function FeaturedProduct() {
  return (
    <section aria-labelledby="studie-title" className="pb-20 md:pb-24">
      <div className="wrap">
        <Reveal className="relative isolate grid items-center gap-10 overflow-hidden rounded-panel border border-line bg-surface p-6 sm:p-9 lg:grid-cols-2 lg:gap-12 lg:p-14">
          <HexField id="hex-product" tile={52} opacity={0.3} />

          <div>
            <span className="tag-gold">Flagship product</span>
            <h2 id="studie-title" className="mt-[18px] text-[1.7rem] font-bold leading-tight">
              Studie AI
            </h2>
            <p className="mt-3.5 max-w-[440px] text-[15.5px]">
              AI-powered exam preparation for Nigerian university students. We designed, built and run it
              ourselves, so when we talk about shipping products, this is what we mean.
            </p>

            <ul className="mt-6 grid gap-2.5">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[14.5px] text-ink-2">
                  <svg width="14" height="16" viewBox="0 0 84 96" aria-hidden="true" className="mt-[3px] shrink-0">
                    <path d="M42 4L80 26V70L42 92L4 70V26Z" fill="var(--gold-label)" opacity="0.9" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>

            <Button href={STUDIE_URL} external variant="secondary" className="mt-8">
              Visit Studie AI
            </Button>
          </div>

          <ProductShowcase />
        </Reveal>
      </div>
    </section>
  );
}
