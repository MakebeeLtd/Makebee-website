import { ArrowUpRightIcon } from './Icons.jsx';

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

/**
 * Renders an <a> when given `href`, otherwise a real <button>.
 * variant: primary | secondary | ghost      size: md | sm
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  external = false,
  className = '',
  children,
  ...rest
}) {
  // Full class names (not `btn-${variant}`) so Tailwind's content scan keeps them.
  const classes = ['btn', VARIANTS[variant], size === 'sm' && 'btn-sm', className]
    .filter(Boolean)
    .join(' ');

  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {children}
        {external && (
          <>
            <ArrowUpRightIcon className="-mr-1 opacity-80" />
            <span className="sr-only"> (opens in a new tab)</span>
          </>
        )}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
