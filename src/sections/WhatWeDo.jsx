import Marquee from '../components/Marquee.jsx';
import { whatWeDo } from '../data/site.js';

export default function WhatWeDo() {
  return (
    <section aria-label="What we do" className="border-t border-line bg-bg py-4 sm:py-5">
      <Marquee items={whatWeDo} label="What we do" />
    </section>
  );
}
