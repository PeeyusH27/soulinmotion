import type { ElementType } from 'react';

type Props = {
  /** the heading text; words listed in `mark` get the highlight treatment */
  text: string;
  mark?: string[];
  as?: ElementType;
  className?: string;
};

const clean = (w: string) => w.replace(/[^\p{L}\p{N}'’-]/gu, '').toLowerCase();

/**
 * A heading that arrives word by word, with the important phrase highlighted.
 * The stagger is CSS-driven off --w, so it costs no JavaScript at runtime.
 */
export default function Headline({ text, mark = [], as: Tag = 'h2', className = 'd2' }: Props) {
  const marks = mark.map((m) => m.toLowerCase());

  return (
    <Tag className={`headline ${className}`}>
      {text.split(' ').map((word, i) => (
        <span className="hw" style={{ '--w': i } as React.CSSProperties} key={`${word}-${i}`}>
          {marks.includes(clean(word)) ? <em className="hl">{word}</em> : word}
        </span>
      ))}
    </Tag>
  );
}
