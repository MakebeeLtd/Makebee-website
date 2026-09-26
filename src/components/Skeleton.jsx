/**
 * Theme-aware skeleton block. Give it the exact size of what it replaces
 * (className or aspect-ratio) so nothing shifts when content arrives.
 */
export default function Skeleton({ className = '', style }) {
  return <span aria-hidden="true" className={`skeleton block rounded-md ${className}`} style={style} />;
}
