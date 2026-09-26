import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import WhatWeDo from './sections/WhatWeDo.jsx';
import Snapshot from './sections/Snapshot.jsx';
import Services from './sections/Services.jsx';
import FeaturedProduct from './sections/FeaturedProduct.jsx';
import Projects from './sections/Projects.jsx';
import About from './sections/About.jsx';
import ContactCTA from './sections/ContactCTA.jsx';

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-3 z-[60] rounded-lg bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-lg ring-1 ring-line"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <WhatWeDo />
        <Snapshot />
        <Services />
        <FeaturedProduct />
        <Projects />
        <About />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
