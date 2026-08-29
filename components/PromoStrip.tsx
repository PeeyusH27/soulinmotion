import RegisterButton from './RegisterButton';

type Props = {
  tone?: 'gold' | 'ink';
  label: string;
  text: string;
  cta: string;
};

/** A full-width reminder between sections. Gold or ink — never any other colour. */
export default function PromoStrip({ tone = 'gold', label, text, cta }: Props) {
  return (
    <aside className={`strip strip--${tone}`} aria-label={label}>
      <span className="strip-k">{label}</span>
      <span>{text}</span>
      <RegisterButton size="sm" tone={tone === 'gold' ? 'ink' : 'clay'}>{cta}</RegisterButton>
    </aside>
  );
}
