import ServiceIcon from './ServiceIcon.jsx';

const HEX = 'M42 0L84 24V72L42 96L0 72V24Z';

/**
 * One service "chapter". The same markup serves both layouts:
 *  - static (mobile, short screens, reduced motion, no JS): a card in a stacked grid
 *  - cinematic (see .svc rules in index.css): one layer in the pinned stage,
 *    driven by the GSAP timeline in sections/Services.jsx
 * Class names prefixed `svc-` are animation hooks — keep them if you restyle.
 */
export default function ServiceCard({ id, icon, title, description, includes = [], index, total }) {
  const titleId = `svc-${id}-title`;

  return (
    <article className="svc-slide" aria-labelledby={titleId}>
      <div className="svc-visual" aria-hidden="true">
        {/* Depth layers: outer ring (slowest), inner frame, icon (front) */}
        <svg className="svc-ring" viewBox="0 0 84 96" focusable="false">
          <path d={HEX} fill="none" stroke="var(--border)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg className="svc-frame" viewBox="0 0 84 96" focusable="false">
          <path d={HEX} fill="none" stroke="var(--gold-label)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="svc-front">
          <ServiceIcon name={icon} className="svc-icon text-gold-label" />
        </span>
      </div>

      <div className="svc-text">
        <p className="svc-reveal svc-step text-[12.5px] font-semibold text-gold-label">
          {index + 1} of {total}
        </p>
        <h3 id={titleId} className="svc-title font-bold">
          <span className="svc-title-inner">{title}</span>
        </h3>
        <p className="svc-reveal svc-desc">{description}</p>
        {includes.length > 0 && (
          <ul className="svc-reveal svc-includes" aria-label={`${title} includes`}>
            {includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
