import { useReveal } from '../hooks/useReveal.js';

/**
 * Fades content in once when it scrolls into view. Content is fully visible
 * without JavaScript and with reduced motion (see .js .reveal in index.css).
 */
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, style, children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms`, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
