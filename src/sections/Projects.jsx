import ProjectCard, { ProjectCardSkeleton } from '../components/ProjectCard.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { projects as staticProjects } from '../data/projects.js';

/**
 * `items` defaults to the static list. If projects ever come from a CMS/API,
 * pass `loading` while the request is in flight and the grid shows skeletons
 * with the same footprint as the cards.
 */
export default function Projects({ items = staticProjects, loading = false }) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-20 md:py-24">
      <div className="wrap">
        <SectionHeading id="projects-title" kicker="Selected work" title="Recent work and explorations">
          Our own product, internal builds and concepts. Each card says which is which.
        </SectionHeading>

        <div className="grid gap-[22px] md:grid-cols-2" aria-busy={loading || undefined}>
          {loading
            ? Array.from({ length: 4 }, (_, i) => <ProjectCardSkeleton key={i} />)
            : items.map((project, i) => (
                <Reveal key={project.id} delay={(i % 2) * 80} className="flex [&>article]:w-full">
                  <ProjectCard {...project} />
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}
