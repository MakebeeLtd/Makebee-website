/**
 * One cell of the company snapshot strip (render inside a <dl>).
 * `value` can be a number or a short statement — only use a number if verified.
 */
export default function MetricCard({ value, label }) {
  return (
    <div className="flex flex-col px-6 py-7 text-center md:py-10">
      <dt className="order-2 mt-2 text-[13.5px] text-ink-2">{label}</dt>
      <dd className="order-1 font-display text-[1.55rem] font-bold leading-tight tracking-[-0.02em] text-gold-label md:text-[1.75rem]">
        {value}
      </dd>
    </div>
  );
}
