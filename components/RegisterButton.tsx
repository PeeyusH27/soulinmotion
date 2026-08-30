import { HAS_FORM, REGISTER_HREF } from '@/lib/register';
import { ArrowRight } from './Icons';

type Props = {
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'clay' | 'gold' | 'ink';
  block?: boolean;
  className?: string;
};

/** The single register action. Opens the Google Form in a new tab. */
export default function RegisterButton({
  children = 'Save my free seat',
  size = 'md',
  tone = 'clay',
  block = false,
  className = '',
}: Props) {
  const cls = [
    'btn',
    size === 'sm' && 'btn--sm',
    size === 'lg' && 'btn--lg',
    tone === 'gold' && 'btn--gold',
    tone === 'ink' && 'btn--ink',
    block && 'btn--block',
    className,
  ].filter(Boolean).join(' ');

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
