import MetricCard from '../components/MetricCard.jsx';
import { snapshot } from '../data/site.js';

export default function Snapshot() {
  return (
    <section aria-label="Company snapshot" className="border-y border-line bg-bg-secondary">
      <dl className="wrap grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
        {snapshot.map((item) => (
          <MetricCard key={item.label} value={item.value} label={item.label} />
        ))}
      </dl>
    </section>
  );
}
