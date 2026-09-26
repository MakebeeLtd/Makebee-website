import { useEffect, useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from './Icons.jsx';

/**
 * mailto: does nothing for visitors without a configured mail app
 * (common with webmail-only users), so the address is always visible
 * and one click copies it.
 */
export default function CopyEmail({ email }) {
  const [status, setStatus] = useState('idle'); // idle | copied | failed
  const timer = useRef();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), 2500);
  }

  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
      <a href={`mailto:${email}`} className="font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-gold-label hover:decoration-gold-deep">
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] font-medium text-ink-2 transition-colors hover:text-gold-label"
      >
        {status === 'copied' ? <CheckIcon /> : <CopyIcon />}
        {status === 'copied' ? 'Copied' : 'Copy email'}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {status === 'copied' && 'Email address copied to clipboard'}
        {status === 'failed' && 'Could not copy. Select the email address to copy it manually.'}
      </span>
    </span>
  );
}
