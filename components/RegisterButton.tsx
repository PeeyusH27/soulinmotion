'use client';

import { HAS_FORM, REGISTER_HREF, USE_MODAL } from '@/lib/register';
import { useRegister } from './RegisterProvider';
import { ArrowRight } from './Icons';

type Props = {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'clay' | 'gold' | 'ink';
  block?: boolean;
  className?: string;
  /** overrides the section name that is otherwise read off the DOM on click */
  source?: string;
};

/**
 * The single register action, used in eleven places. In modal mode it opens the
 * dialog; in google mode it stays the link it always was.
 */
export default function RegisterButton({
  children = 'Save my free seat',
  size = 'md',
  tone = 'clay',
  block = false,
  className = '',
  source,
}: Props) {
  const { openRegister } = useRegister();

  const cls = [
    'btn',
    size === 'sm' && 'btn--sm',
    size === 'lg' && 'btn--lg',
    tone === 'gold' && 'btn--gold',
    tone === 'ink' && 'btn--ink',
    block && 'btn--block',
    className,
  ].filter(Boolean).join(' ');

  if (USE_MODAL) {
    return (
      <button
        type="button"
        className={cls}
        data-register
        onClick={(e) => {
          // which CTA earned the seat, without threading a prop through
          // all eleven call sites: the enclosing section already knows
          const near = e.currentTarget.closest<HTMLElement>('[id]')?.id;
          openRegister(source ?? near ?? 'page');
        }}
      >
        {children}
        <ArrowRight />
      </button>
    );
  }

  return (
    <a
      className={cls}
      href={REGISTER_HREF}
      target={HAS_FORM ? '_blank' : undefined}
      rel={HAS_FORM ? 'noopener noreferrer' : undefined}
      data-register
    >
      {children}
      <ArrowRight />
    </a>
  );
}
