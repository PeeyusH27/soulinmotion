import Image from 'next/image';
import Headline from '../Headline';
import { Check } from '../Icons';

/**
 * Session-fit copy aligned to the latest brief from Shradha.
 */
const ITEMS = [
  'You’ve done the courses and read the books — but life still feels painful.',
  'You know what needs to change, but keep finding yourself in the same patterns.',
  'You are totally lost and trying to find a way to resolve your struggles.',
  'You’re curious about chakras and want to experience them beyond concepts and labels.',
  'You’re ready to stop becoming someone else and start uncovering who you already have the potential to be.',
];

/** §2 — root chakra: the ground you stand on. */
export default function Patterns() {
  return (
    <section
      className="sec tint patterns"
      id="about"
      style={{ '--tint': 'var(--root)', '--tint-x': '0%', '--tint-y': '0%' } as React.CSSProperties}
    >
      {/* Wide, this is the picture beside the copy. Narrow, the same file is the
          section's own ground at a tenth — the column would otherwise become a
          band of image nobody scrolls past on the way to the list. */}
      <span className="patterns-wash" aria-hidden="true" />

      <div className="wrap patterns-grid">
        <div className="patterns-copy">
          <div className="sec-head reveal">
            <span className="kicker">Recognise yourself</span>
            <Headline text="This session is for you if…" mark={['you']} />
          </div>

          <ul className="check-list">
            {ITEMS.map((text, i) => (
              <li className="reveal" data-delay={i + 1} key={text}>
                <span className="ck"><Check /></span>
                {text}
              </li>
            ))}
          </ul>

          {/* exclusion raises desire and pre-qualifies the list */}
          <p className="not-for reveal" data-delay="6">
            <b>And it isn’t for you if</b> you want someone to tell you what to do, or you’re
            after a quick fix you don’t have to practise. Ninety minutes won’t undo a decade —
            but it will show you what you’re actually working with.
          </p>
        </div>

        <figure className="patterns-art reveal" data-delay="2">
          {/* The one true content image on the page, so it is the one that
              earns next/image: AVIF/WebP and a srcset, instead of shipping a
              1000px JPEG to a column that renders at ~430px. */}
          <Image
            src="/meditating-bg.jpg"
            alt="A figure seated in meditation inside a lotus halo, lit from within"
            width={1000}
            height={1333}
            sizes="(max-width: 900px) 100vw, 43vw"
          />
        </figure>
      </div>
    </section>
  );
}
