import { CHAKRAS } from '@/lib/chakras';

/* The three lower chakras — root, sacral, solar. Grounding, feeling, then
   will: the form fills in that order as it is completed. */
const METER_CHAKRAS = CHAKRAS.slice(0, 3);

/**
 * The raw chakra hue the panel takes at a given completion, 0 → 1. It is handed
 * over raw because the stylesheet lifts it toward the paper tone for the ink
 * ground — root's #A7361D is nearly invisible on --ink until it is mixed.
 */
export function hueFor(progress: number) {
  const i = Math.min(METER_CHAKRAS.length - 1, Math.floor(progress * METER_CHAKRAS.length));
  return METER_CHAKRAS[Math.max(0, i)].colors.light;
}

type Props = { progress: number; count?: number };

/**
 * The completion meter: three lotus petals that open root → solar as the
 * required fields are filled. On a single-panel form nothing else tells you how
 * much is left, so this carries that job while staying ornament rather than UI.
 */
export default function RegisterPetals({ progress, count = 3 }: Props) {
  // the same rounding the page's scroll rail uses, so the two behave alike
  const lit = Math.min(count, Math.ceil(progress * count + 0.001));
  const partial = progress * count - (lit - 1);

  return (
    <div className="rf-petals" role="presentation">
      <svg viewBox="0 0 132 44" aria-hidden="true">
        <defs>
          <path id="rf-petal" d="M22 40C6 27.5 6 15.5 22 3c16 12.5 16 24.5 0 37z" />
        </defs>

        {/* the thread running through all three, so they read as one line */}
        <path className="rf-thread" d="M22 40h88" />
        <path
          className="rf-thread rf-thread--lit"
          d="M22 40h88"
          style={{ '--fill': progress } as React.CSSProperties}
        />

        {Array.from({ length: count }, (_, i) => {
          const c = METER_CHAKRAS[Math.min(i, METER_CHAKRAS.length - 1)];
          const isDone = i < lit - (partial < 1 ? 1 : 0);
          const isNow = !isDone && i < lit;
          return (
            <g
              key={c.id}
              className={`rf-petal ${isDone ? 'is-done' : isNow ? 'is-now' : 'is-waiting'}`}
              transform={`translate(${i * 44}, 0)`}
              style={{
                '--c': c.colors.light,
                '--c-deep': c.colors.deep,
                // a part-filled petal opens by however much of it is done
                '--open': isDone ? 1 : isNow ? Math.max(0.18, partial) : 0,
              } as React.CSSProperties}
            >
              <use href="#rf-petal" className="rf-petal-fill" />
              <use href="#rf-petal" className="rf-petal-line" />
              <path className="rf-petal-rib" d="M22 36V10" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * The watermark behind the panel — a full eight-petal lotus over a faint
 * mandala ring. Purely decorative, and it stills under reduced motion.
 */
export function RegisterMandala() {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg className="rf-mandala" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="86" />
      <circle cx="100" cy="100" r="70" strokeDasharray="2 7" />
      {petals.map((deg) => (
        <path
          key={deg}
          d="M100 100C82 76 82 52 100 28c18 24 18 48 0 72z"
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="9" />
    </svg>
  );
}

/**
 * §1's three drifting orbs — gold, clay, sage — the atmosphere the panel sits
 * in. It is rendered by whatever does NOT scroll: the dialog shell in the modal,
 * the card itself inline. Put it inside the scrolling form and it slides away,
 * leaving flat ink behind.
 */
export function RegisterGlow() {
  return <span className="rf-glow" aria-hidden="true"><i /><i /><i /></span>;
}
