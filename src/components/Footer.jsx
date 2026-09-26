import Logo from './Logo.jsx';
import { mailto, site, visibleNavItems } from '../data/site.js';
import { services } from '../data/services.js';

const linkClass = 'text-sm text-ink-2 transition-colors hover:text-gold-label';

function Column({ title, children }) {
  return (
    <div>
      <h2 className="mb-4 font-sans text-[12.5px] font-semibold tracking-normal text-ink-2">{title}</h2>
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="pb-10 pt-16">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-10 border-b border-line pb-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo size={34} />
            <p className="mt-4 max-w-[280px] text-[13.5px]">{site.description}</p>
          </div>

          <Column title="Navigation">
            <nav aria-label="Footer">
              <ul className="grid gap-3">
                {visibleNavItems.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className={linkClass}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Column>

          <Column title="Services">
            <ul className="grid gap-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#services" className={linkClass}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Contact">
            <ul className="grid gap-3">
              <li>
                <a href={mailto} className={`${linkClass} break-all`}>
                  {site.email}
                </a>
              </li>
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className={linkClass} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Column>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-7 text-[13px] text-ink-2">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>{site.location}</span>
        </div>
      </div>
    </footer>
  );
}
