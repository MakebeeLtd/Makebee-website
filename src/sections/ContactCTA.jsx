import Button from '../components/Button.jsx';
import CopyEmail from '../components/CopyEmail.jsx';
import HexField from '../components/HexField.jsx';
import Reveal from '../components/Reveal.jsx';
import { mailto, site } from '../data/site.js';

export default function ContactCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden border-y border-line bg-bg-secondary py-20 text-center md:py-[88px]"
    >
      <HexField id="hex-cta" tile={60} radial opacity={0.6} />
      <Reveal className="wrap">
        <h2 id="contact-title" className="mx-auto max-w-[620px] text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.12]">
          Have an idea worth building?
        </h2>
        <p className="mx-auto mt-4 max-w-[460px] text-[15.5px]">
          Tell us what you’re trying to build and where you’re stuck. A short email is enough to start.
        </p>
        <Button href={mailto} className="mt-8">
          Let’s Talk
        </Button>
        <p className="mt-5 text-sm text-ink-2">
          <span className="mr-1">Or write to</span>
          <CopyEmail email={site.email} />
        </p>
      </Reveal>
    </section>
  );
}
