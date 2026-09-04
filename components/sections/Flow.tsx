import Headline from '../Headline';
import RegisterButton from '../RegisterButton';
import { LeafIcon } from '../Icons';
import { DATE_LABEL } from '@/lib/event';

/* The titles were already good; the sub-lines say what actually happens in the
   room rather than naming the topic. One leaf per step instead of the chakra
   discs, so the section reads as one growing sequence. */
const STEPS = [
  { title: 'Life as we experience it', text: 'Why two people in the same room live in different worlds.' },
  { title: 'Patterns we repeat', text: 'You pick one loop of your own to work with for the rest of the session.' },
  { title: 'Questions we ask', text: 'The question running underneath the loop — and why it always gets the answer it asks for.' },
  { title: 'Filters & conditioning', text: 'Where the filter was installed. Usually earlier and smaller than you’d expect.' },
  { title: 'Perception & energy', text: 'How the filter shows up in the body, and which centre is holding it.' },
  { title: 'Awareness & choice', text: 'The moment of choice is very short. We practise catching it.' },
  { title: 'Chakra meditation', text: 'Root to crown, to settle what we’ve moved. Recorded for you to keep.' },
];

/** §4 — the one section on ink. Seven steps, each numbered by its chakra disc. */
export default function Flow() {
  const left = STEPS.slice(0, 4);
  const right = STEPS.slice(4);

  const Step = ({ i }: { i: number }) => {
    const step = STEPS[i];
    return (
      <div className="step reveal" data-delay={(i % 4) + 1}>
        <span className="step-leaf" aria-hidden="true"><LeafIcon /></span>
        <div>
          <b>{step.title}</b>
          <span>{step.text}</span>
        </div>
      </div>
    );
  };

  return (
    <section className="sec on-ink" id="flow">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="kicker">The journey</span>
          <Headline text="A powerful flow — seven steps, ninety minutes" mark={['flow']} />
        </div>

        <p className="lead reveal" data-delay="1" style={{ maxWidth: '62ch', marginBottom: 'var(--s-4)', color: 'var(--on-ink-2)' }}>
          A free 90-minute live session with Shradha Saha on the patterns running your life — where they came from, how your body holds them, and the one practice that loosens them.
        </p>

        <div className="steps">
          <div>{left.map((_, i) => <Step i={i} key={i} />)}</div>
          <div>
            {right.map((_, i) => <Step i={i + 4} key={i + 4} />)}
            <div className="steps-cta reveal" data-delay="4">
              <RegisterButton>Save my free seat</RegisterButton>
              <span className="body" style={{ color: 'var(--on-ink-2)' }}>Free · {DATE_LABEL} · Live on Zoom</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
