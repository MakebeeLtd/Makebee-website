import Reveal from './Reveal.jsx';

export default function SectionHeading({ id, kicker, title, children, className = '' }) {
  return (
    <Reveal className={`mb-10 max-w-[560px] md:mb-[52px] ${className}`}>
      {kicker && <p className="mb-3 text-[13px] font-semibold text-gold-label">{kicker}</p>}
      <h2 id={id} className="text-[clamp(1.7rem,2.6vw,2.3rem)] font-bold leading-[1.15]">
        {title}
      </h2>
      {children && <p className="mt-3.5 text-[15.5px]">{children}</p>}
    </Reveal>
  );
}
