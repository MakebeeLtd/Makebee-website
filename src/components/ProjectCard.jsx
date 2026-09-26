import { useEffect, useRef, useState } from 'react';
import Skeleton from './Skeleton.jsx';
import Button from './Button.jsx';
import { markUrl } from './Logo.jsx';
import HexField from './HexField.jsx';

/** Thumbnail frame shared by the real card and its skeleton (same aspect ratio → no layout shift). */
const THUMB = 'relative aspect-[16/7] overflow-hidden border-b border-line bg-bg-secondary';

function ProjectImage({ image }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  // Covers images that finished loading before hydration (onLoad never fires for them).
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <img
        ref={imgRef}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}

function PlaceholderThumb({ id }) {
  return (
    <div className="relative isolate flex h-full items-center justify-center">
      <HexField id={`thumb-${id}`} tile={44} radial opacity={0.7} />
      <img
        src={markUrl}
        width="46"
        height="50"
        alt=""
        className="opacity-80 transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transform-none"
      />
    </div>
  );
}

export default function ProjectCard({ id, label, title, description, tags = [], image, link }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-[border-color,box-shadow,transform] duration-200 hover:border-gold-deep hover:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)]">
      <div className={THUMB}>
        {image ? <ProjectImage image={image} /> : <PlaceholderThumb id={id} />}
        {/* hover overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--gold)_10%,transparent)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-[22px]">
        <span className="tag self-start">{label}</span>
        <h3 className="mt-3.5 text-base font-bold">{title}</h3>
        <p className="mt-2 text-[13.5px]">{description}</p>

        {tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Categories">
            {tags.map((tag) => (
              <li key={tag} className="rounded-md bg-bg-soft px-2 py-1 text-xs text-ink-2">
                {tag}
              </li>
            ))}
          </ul>
        )}

        {link && (
          <div className="mt-auto pt-5">
            <Button href={link.href} external={link.external} variant="secondary" size="sm">
              {link.label}
              <span className="sr-only">: {title}</span>
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

/** Same footprint as ProjectCard. Use while project data is actually loading. */
export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-surface" aria-hidden="true">
      <div className={THUMB}>
        <Skeleton className="absolute inset-0 rounded-none" />
      </div>
      <div className="px-6 pb-6 pt-[22px]">
        <Skeleton className="h-[22px] w-24" />
        <Skeleton className="mt-4 h-5 w-2/3" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-4/5" />
      </div>
    </div>
  );
}
