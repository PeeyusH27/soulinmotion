'use client';

import { useCallback, useId, useMemo, useRef, useState } from 'react';
import { RegisterGlow, hueFor } from './RegisterPetals';
import RegisterCombo from './RegisterCombo';
import { ArrowRight, Check, ClockIcon, GlobeIcon, LockIcon, MailIcon } from './Icons';
import { DATE_VALUE, EVENT, TIME_VALUE } from '@/lib/event';
import { calendarLinks } from '@/lib/calendar';
import { HAS_FORM, HAS_WHATSAPP, REGISTER_URL, WHATSAPP_URL } from '@/lib/register';
import {
  CITIES,
  CITY_ALIASES,
  clampNational,
  DIAL_CODES,
  dialFor,
  EMPTY,
  EXPERIENCE,
  GROUPS,
  HEARD_FROM,
  MAX,
  type Errors,
  type Registration,
  progressOf,
  validate,
} from '@/lib/registration';

type Props = {
  /** 'modal' sits in the dialog; 'inline' is the same form inside §8 */
  variant?: 'modal' | 'inline';
  /** which button opened it, stored with the row */
  source?: string;
  onDone?: () => void;
};

type Status = 'editing' | 'sending' | 'done';

export default function RegisterForm({ variant = 'modal', source = 'unknown', onDone }: Props) {
  /* Both copies of this form are mounted at once — the dialog and the inline
     one in §8 — so every id and every radio-group name has to be per-instance.
     Sharing them would make one form's label point at the other's input, and
     would make the two experience radio groups clear each other. */
  const uid = useId();
  const fid = (name: string) => `rf-${name}-${uid}`;

  const [values, setValues] = useState<Registration>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Registration, boolean>>>({});
  const [status, setStatus] = useState<Status>('editing');
  const [failures, setFailures] = useState(0);
  const [serverError, setServerError] = useState('');

  /** filled once on mount: a submit that arrives implausibly fast is a bot */
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement | null>(null);

  const errors: Errors = useMemo(() => validate(values), [values]);
  const progress = useMemo(() => progressOf(values), [values]);

  const set = useCallback(<K extends keyof Registration>(key: K, v: Registration[K]) => {
    setValues((prev) => ({ ...prev, [key]: v }));
  }, []);

  const blur = useCallback((key: keyof Registration) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }, []);

  /** an error is only shown once the field has been left, or a submit forced it */
  const show = (key: keyof Registration) => (touched[key] ? errors[key] : undefined);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;

    if (Object.keys(errors).length > 0) {
      setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])));
      // on one long panel the first problem can be well above the fold, so go to it
      window.requestAnimationFrame(() => {
        const bad = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
        bad?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        bad?.focus({ preventScroll: true });
      });
      return;
    }

    setStatus('sending');
    setServerError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...values,
          source,
          elapsedMs: Date.now() - startedAt.current,
          page: typeof window === 'undefined' ? '' : window.location.pathname + window.location.search,
        }),
      });

      const body = (await res.json().catch(() => ({}))) as { error?: string; field?: keyof Registration };

      if (!res.ok) {
        if (body.field) setTouched((prev) => ({ ...prev, [body.field!]: true }));
        throw new Error(body.error || 'That did not go through.');
      }

      setStatus('done');
      onDone?.();
    } catch (err) {
      setFailures((n) => n + 1);
      setStatus('editing');
      setServerError(err instanceof Error ? err.message : 'That did not go through.');
    }
  }

  if (status === 'done') return <Welcome name={values.name.trim().split(' ')[0]} />;

  return (
    <form
      className={`rf rf--${variant}`}
      style={{ '--step-c': hueFor(progress) } as React.CSSProperties}
      onSubmit={submit}
      ref={formRef}
      noValidate
    >
      {variant === 'inline' && <RegisterGlow />}

      {/* ---------- masthead: who, what, and how far in you are ---------- */}
      <header className="rf-head">
        <div className="rf-head-row">
          <p className="rf-eyebrow">Soul in Motion</p>
        </div>

        {/* The inline copy sits directly under §8's own "Save your seat"
            heading, so it names the form instead of repeating that line —
            three identical headings on one page tells a crawler nothing. */}
        <h3 className="d3 rf-title">
          {variant === 'inline' ? 'Your details' : 'Save your seat'}
        </h3>

        {/* One aligned block rather than a dot-separated run: three columns,
            each label / value / qualifier on the same three baselines. */}
        <dl className="rf-facts">
          <RecapFacts />
        </dl>
      </header>

      {/* honeypot: off-screen, unlabelled, never tabbable */}
      <div className="rf-trap" aria-hidden="true">
        <label htmlFor={fid('website')}>Leave this empty</label>
        <input
          id={fid('website')}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>

      {/* ---------- 01 · you ---------- */}
      <section className="rf-sect">
        <GroupHead group={GROUPS[0]} />

        <div className="rf-rows">
          <div className="rf-pair">
            <Field label="Full name" error={show('name')} htmlFor={fid('name')}>
              <input
                id={fid('name')}
                type="text"
                autoComplete="name"
                maxLength={MAX.name}
                placeholder="Shradha Saha"
                value={values.name}
                onChange={(e) => set('name', e.target.value)}
                onBlur={() => blur('name')}
                aria-invalid={Boolean(show('name'))}
              />
            </Field>

            <Field label="Email" error={show('email')} htmlFor={fid('email')} hint="The Zoom link goes here.">
              <input
                id={fid('email')}
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={MAX.email}
                placeholder="you@example.com"
                value={values.email}
                onChange={(e) => set('email', e.target.value)}
                onBlur={() => blur('email')}
                aria-invalid={Boolean(show('email'))}
              />
            </Field>
          </div>

          <Field
            label="Phone"
            error={show('phone') || show('dial')}
            htmlFor={fid('phone')}
            hint="For the WhatsApp community invite."
          >
            <div className="rf-phone">
              <select
                className="rf-dial rf-glass"
                aria-label="Country code"
                value={values.dial}
                /* switching country re-trims what is already typed, so the
                   field can never sit holding more digits than the new code allows */
                onChange={(e) => {
                  const dial = e.target.value;
                  setValues((prev) => ({ ...prev, dial, phone: clampNational(dial, prev.phone) }));
                }}
              >
                {DIAL_CODES.map((d) => (
                  <option key={d.code} value={d.code}>{d.label}</option>
                ))}
              </select>
              <input
                id={fid('phone')}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                maxLength={MAX.phone}
                /* the example follows the country picker, so the field always shows
                   a number of the length it is about to ask for */
                placeholder={dialFor(values.dial)?.sample ?? '98765 43210'}
                value={values.phone}
                onChange={(e) => set('phone', clampNational(values.dial, e.target.value))}
                onBlur={() => blur('phone')}
                aria-invalid={Boolean(show('phone'))}
              />
            </div>
          </Field>
        </div>
      </section>

      {/* ---------- 02 · where you are ---------- */}
      <section className="rf-sect">
        <GroupHead group={GROUPS[1]} />

        <div className="rf-rows">
          <div className="rf-pair">
            <Field label="City" error={show('city')} htmlFor={fid('city')} hint="Pick one, or type your own.">
              <RegisterCombo
                id={fid('city')}
                options={CITIES}
                aliases={CITY_ALIASES}
                placeholder="Pune"
                autoComplete="address-level2"
                maxLength={MAX.city}
                value={values.city}
                onChange={(v) => set('city', v)}
                onBlur={() => blur('city')}
                invalid={Boolean(show('city'))}
              />
            </Field>

            <Field label="How did you hear?" error={show('heardFrom')} htmlFor={fid('heard')}>
              <select
                id={fid('heard')}
                className="rf-select rf-glass"
                value={values.heardFrom}
                onChange={(e) => set('heardFrom', e.target.value)}
                onBlur={() => blur('heardFrom')}
                aria-invalid={Boolean(show('heardFrom'))}
              >
                <option value="" disabled>Choose one…</option>
                {HEARD_FROM.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </Field>
          </div>

          <Field
            label="Where are you with this work?"
            error={show('experience')}
            htmlFor={fid('experience')}
            hint="Whichever is closest — it shapes how much is assumed on the day."
          >
            <select
              id={fid('experience')}
              className="rf-select rf-glass"
              value={values.experience}
              onChange={(e) => set('experience', e.target.value)}
              onBlur={() => blur('experience')}
              aria-invalid={Boolean(show('experience'))}
            >
              <option value="" disabled>Choose one…</option>
              {EXPERIENCE.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label} — {opt.note}</option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      {/* ---------- 03 · what you bring ---------- */}
      <section className="rf-sect">
        <GroupHead group={GROUPS[2]} optional />

        <div className="rf-rows">
          <Field
            label="One pattern you're curious about"
            error={show('intention')}
            htmlFor={fid('intention')}
            hint="Shradha reads these before the session."
          >
            <div className="rf-area">
              <textarea
                id={fid('intention')}
                rows={3}
                maxLength={MAX.intention}
                placeholder="The same argument keeps happening and I cannot see where it starts…"
                value={values.intention}
                onChange={(e) => set('intention', e.target.value)}
                onBlur={() => blur('intention')}
              />
              <span className="rf-count-chars">{values.intention.length}/{MAX.intention}</span>
            </div>
          </Field>

          <label className={`rf-consent${values.consent ? ' is-on' : ''}`}>
            <input
              type="checkbox"
              checked={values.consent}
              onChange={(e) => set('consent', e.target.checked)}
            />
            <span className="rf-consent-box" aria-hidden="true"><Check /></span>
            <span>Send me the Zoom link and a reminder before we start.</span>
          </label>
        </div>
      </section>

      {serverError && (
        <p className="rf-alert" role="alert">
          {serverError}
          {failures >= 2 && HAS_FORM && (
            <>
              {' '}
              <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
                Use the old form instead →
              </a>
            </>
          )}
        </p>
      )}

      <footer className="rf-foot">
        <button type="submit" className="btn btn--gold btn--lg rf-submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Saving your seat…' : 'Save my free seat'}
          {status === 'sending' ? <span className="rf-spin" aria-hidden="true" /> : <ArrowRight />}
        </button>
        <p className="rf-fine">
          <LockIcon /> Free · No card needed · We only email about this session
        </p>
      </footer>
    </form>
  );
}

/* ---------- pieces ---------- */

/**
 * The three facts, as a three-by-three block: label, value, and the qualifier
 * that would otherwise have to be said again further down the panel. The date
 * is split so the day-and-month carries the row and the weekday sits under it,
 * which keeps all three values on one line in a third of the panel's width.
 */
function RecapFacts() {
  const { weekday, dayMonth } = splitDate(DATE_VALUE);

  /* The value leads and the qualifier follows it on the same line: the labels
     the old block carried ("Date", "Time", "Where") said nothing a reader could
     not already tell from "13th September" or "Live on Zoom", and they cost a
     line each. Three facts, three lines, one strip. */
  const facts = [
    { k: 'Date', v: dayMonth, note: weekday },
    { k: 'Time', v: TIME_VALUE, note: EVENT.durationLabel },
    { k: 'Where', v: EVENT.where, note: EVENT.isFree ? 'Free' : '' },
  ];

  return (
    <>
      {facts.map((f) => (
        <div className="rf-fact" key={f.k}>
          <dt className="rf-fact-k">{f.k}</dt>
          <dd>
            <b>{f.v}</b>
            {f.note && <span className="rf-fact-n">{f.note}</span>}
          </dd>
        </div>
      ))}
    </>
  );
}

/** the hairline heading between movements: numeral, title, then a rule */
function GroupHead({
  group, optional = false,
}: {
  group: (typeof GROUPS)[number];
  optional?: boolean;
}) {
  return (
    <div className="rf-grouphead">
      <span className="rf-grouphead-n">{group.n}</span>
      <span className="rf-grouphead-t">{group.title}</span>
      <span className="rf-grouphead-rule" aria-hidden="true" />
      {optional && <span className="rf-grouphead-opt">Optional</span>}
    </div>
  );
}

function Field({
  label, error, hint, htmlFor, children,
}: {
  label: string;
  error?: string;
  hint?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rf-field${error ? ' has-err' : ''}`}>
      <label className="rf-label" htmlFor={htmlFor}>{label}</label>
      {children}
      {/* the slot is always present, so a field that grows a hint or an error
          does not shove the field beside it out of alignment */}
      <p className={`rf-note${error ? ' is-err' : ''}`} aria-hidden={error || hint ? undefined : true}>
        {error || hint || '\u00A0'}
      </p>
    </div>
  );
}

/**
 * Splits 'Sunday, 13th September' into its weekday and the rest, so the recap
 * and the welcome screen can set the day-and-month large and the weekday as a
 * supporting line. A date written without a comma stays whole rather than
 * being cut at a guess, and that includes the 'Announced soon' fallback.
 */
function splitDate(value: string) {
  const i = value.indexOf(',');
  return i === -1
    ? { weekday: '', dayMonth: value }
    : { weekday: value.slice(0, i).trim(), dayMonth: value.slice(i + 1).trim() };
}

/** what happens between now and the session, in the order it happens */
const NEXT_STEPS = [
  {
    title: 'Check your inbox',
    text: 'The Zoom link is on its way, and a reminder follows before we start.',
  },
  {
    title: 'Join the WhatsApp community',
    text: 'The link, the reminder and the take-home material all land there.',
  },
  {
    title: 'Bring one pattern',
    text: 'One real situation you are curious about. That is the whole of the prep.',
  },
];

/**
 * The screen after a successful write. It is a welcome rather than a receipt:
 * the community is the one action, the session time is the one thing to
 * remember, and the three steps say what happens between now and then.
 */
function Welcome({ name }: { name: string }) {
  const { weekday, dayMonth } = splitDate(DATE_VALUE);
  const cal = calendarLinks();

  /* the WhatsApp step only stands as a step while there is a link behind it */
  const steps = HAS_WHATSAPP ? NEXT_STEPS : NEXT_STEPS.filter((s) => !s.title.startsWith('Join'));

  return (
    <div className="rf rf--done">
      <header className="rf-done-head">
        <span className="rf-crest" aria-hidden="true">
          <img src="/green-leaves-logo.png" alt="" width={560} height={512} loading="lazy" decoding="async" />
        </span>
        <p className="rf-eyebrow rf-done-eyebrow">Welcome to the community</p>
        <h3 className="d3 rf-done-title">
          {name ? `Your seat is saved, ${name}.` : 'Your seat is saved.'}
        </h3>
        <p className="rf-done-lead">
          You are on the list. Here is everything you need between now and the session.
        </p>
      </header>

      {/* The when, given the weight it actually carries. This is the one thing
          someone has to walk away remembering, so it is the largest thing on
          the screen after the confirmation itself — not a grey line of prose. */}
      <div className="rf-when">
        <p className="rf-when-k">Your session</p>
        <p className="rf-when-date">{dayMonth}</p>
        <p className="rf-when-time">
          {weekday && <span className="rf-when-day">{weekday}</span>}
          {TIME_VALUE}
        </p>
        <div className="rf-when-meta">
          <span><ClockIcon /> {EVENT.durationLabel}</span>
          <span><GlobeIcon /> {EVENT.where}</span>
        </div>
      </div>

      <ol className="rf-next">
        {steps.map((s, i) => (
          <li className="rf-next-step" key={s.title}>
            <span className="rf-next-n" aria-hidden="true">{i + 1}</span>
            <b>{s.title}</b>
            <small>{s.text}</small>
          </li>
        ))}
      </ol>

      <footer className="rf-done-foot">
        {HAS_WHATSAPP ? (
          <a className="btn btn--lg btn--block rf-wa" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppGlyph />
            Join the WhatsApp community
          </a>
        ) : (
          <p className="rf-zoom">
            <MailIcon /> Watch your inbox for the Zoom link — the WhatsApp community invite
            follows, and that is where the reminders go out.
          </p>
        )}

        {cal && (
          <div className="rf-cal">
            <span className="rf-cal-k">Add it to your calendar</span>
            <span className="rf-cal-links">
              <a href={cal.google} target="_blank" rel="noopener noreferrer">Google</a>
              <a href={cal.ics} download="soul-in-motion.ics">Apple / Outlook</a>
            </span>
          </div>
        )}
      </footer>
    </div>
  );
}

/* WhatsApp's mark, drawn on the same 24-grid as the rest of the icon set but
   filled rather than stroked, because the outline version is unrecognisable. */
function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="rf-wa-glyph" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 00-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1012.04 2zm0 1.8a8.1 8.1 0 016.9 12.4l-.24.4.6 2.2-2.27-.6-.38.22a8.1 8.1 0 01-11.9-9.9A8.1 8.1 0 0112.04 3.8zm-3.5 3.8c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26s.98 2.62 1.11 2.8c.14.18 1.9 3.02 4.7 4.12 2.32.92 2.8.74 3.3.69.5-.04 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.12-.25-.19-.53-.32-.27-.14-1.62-.8-1.87-.9-.25-.09-.44-.13-.62.14-.18.27-.71.9-.87 1.08-.16.18-.32.2-.6.07-.27-.14-1.15-.43-2.2-1.36-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.48.14-.16.18-.27.28-.45.09-.18.04-.34-.02-.48-.07-.13-.6-1.48-.84-2.03-.2-.48-.4-.42-.55-.43h-.47z" />
    </svg>
  );
}
