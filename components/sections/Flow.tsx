import Headline from '../Headline';
import RegisterButton from '../RegisterButton';
import { CHAKRAS } from '@/lib/chakras';

const STEPS = [
  { title: 'Life as we experience it', text: 'Starting point of our reality' },
  { title: 'Patterns we repeat', text: 'What keeps us stuck' },
  { title: 'Questions we ask', text: 'Shape the thoughts we think' },
  { title: 'Filters & conditioning', text: 'Beliefs, past & perception' },
  { title: 'Perception & energy', text: 'How we see shapes how we feel' },
  { title: 'Awareness & choice', text: 'The key to creating a new experience' },
  { title: 'Chakra meditation', text: 'Align, heal & evolve' },
];

/** §4 — the one section on ink. Seven steps, each numbered by its chakra disc. */
export default function Flow() {
  const left = STEPS.slice(0, 4);
  const right = STEPS.slice(4);

  const Step = ({ i }: { i: number }) => {
    const step = STEPS[i];
    const chakra = CHAKRAS[i];
    return (
      <div className="step reveal" data-delay={(i % 4) + 1}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={chakra.file} alt="" aria-hidden="true" />
        <div>
          <span className="step-n">Step {i + 1} · {chakra.english}</span>
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
          <Headline text="A powerful flow — seven steps, one evening" mark={['flow']} />
        </div>

        <div className="steps">
          <div>{left.map((_, i) => <Step i={i} key={i} />)}</div>
          <div>
            {right.map((_, i) => <Step i={i + 4} key={i + 4} />)}
            <div className="steps-cta reveal" data-delay="4">
              <RegisterButton>Join the flow</RegisterButton>
              <span className="body" style={{ color: 'var(--on-ink-2)' }}>Limited seats · Live on Zoom</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
