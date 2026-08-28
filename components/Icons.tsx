import type { SVGProps } from 'react';

/* Thin gold line-art set. Every glyph shares the same 24x24 grid,
   1.1 stroke and rounded joins so the page reads as one hand. */

type IconProps = SVGProps<SVGSVGElement>;

export function Icon({ className = 'icon-line', children, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...rest}>
      {children}
    </svg>
  );
}

/* ---------- hero metadata ---------- */
export const CalendarIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M4 10h16M9 3v4M15 3v4" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></Icon>
);

export const GlobeIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M4 12h16M12 4c2.5 2.6 2.5 12.4 0 16-2.5-3.6-2.5-13.4 0-16z" />
  </Icon>
);

/* ---------- this webinar is for you if… ---------- */
export const ThoughtLoopIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 12a3.4 3.4 0 01.5-6.7A4 4 0 0116 5.6 3.2 3.2 0 0117 12z" />
    <circle cx="8.5" cy="16" r="1.4" />
    <circle cx="6" cy="19.4" r=".9" />
  </Icon>
);

export const OverthinkIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="9" r="2.6" />
    <path d="M12 11.6v5.4M9 20l3-3 3 3" />
    <path d="M12 2v2.2M5.6 4.4l1.6 1.6M18.4 4.4l-1.6 1.6M3 10h2.2M18.8 10H21" />
  </Icon>
);

export const ClarityHeadIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M15.5 20v-2.4c2.2-1.2 3.5-3.3 3.5-5.8A7 7 0 005 11.4c0 1.6.6 2.7 1.6 3.6H8.5V20" />
    <path d="M14 12a2 2 0 10-3.4-1.4c-.5.6-1.6.6-2.1 0" />
  </Icon>
);

export const LotusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4c2 3 3 5.5 3 7.5s-1.3 3.7-3 5c-1.7-1.3-3-3-3-5s1-4.5 3-7.5z" />
    <path d="M12 16.5c-1.6 1-3.7 1.2-5.5.4-1.6-.8-2.7-2.2-3-3.8 1.7-.7 3.8-.7 5.5.2 1.4.7 2.4 1.9 3 3.2z" />
    <path d="M12 16.5c1.6 1 3.7 1.2 5.5.4 1.6-.8 2.7-2.2 3-3.8-1.7-.7-3.8-.7-5.5.2-1.4.7-2.4 1.9-3 3.2z" />
    <path d="M6.5 18c1.7 2 3.5 3 5.5 3s3.8-1 5.5-3" />
  </Icon>
);

export const TransformIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="10.5" r="1.9" />
    <path d="M8.6 17c.6-2 1.9-3 3.4-3s2.8 1 3.4 3" />
    <path d="M12 3.2V1.6M6 5.2L5 4M18 5.2L19 4" />
  </Icon>
);

/* ---------- in this webinar you will… ---------- */
export const EyeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.6 12S6 6.5 12 6.5 21.4 12 21.4 12 18 17.5 12 17.5 2.6 12 2.6 12z" />
    <circle cx="12" cy="12" r="2.8" />
  </Icon>
);

export const BrainIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5.5a2.6 2.6 0 00-4.6-1A2.4 2.4 0 004 7.2 2.5 2.5 0 004 12a2.5 2.5 0 001.7 4.4A2.6 2.6 0 0012 18.5z" />
    <path d="M12 5.5a2.6 2.6 0 014.6-1A2.4 2.4 0 0120 7.2 2.5 2.5 0 0120 12a2.5 2.5 0 01-1.7 4.4A2.6 2.6 0 0112 18.5z" />
    <path d="M12 5.5v13" />
  </Icon>
);

export const FunnelIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 5h16l-6 7v6l-4 2v-8z" />
    <path d="M12 21.5v-1" />
  </Icon>
);

export const MeditateIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="5.6" r="2.2" />
    <path d="M12 8.4c-1.6 0-2.8 1.2-2.8 2.8v2.2" />
    <path d="M9.2 13.4L5 15.6c-.8.4-.9 1.5-.2 2l3.4 2.2h7.6l3.4-2.2c.7-.5.6-1.6-.2-2l-4.2-2.2" />
    <path d="M14.8 11.2v2.2" />
  </Icon>
);

/* ---------- you will walk away with ---------- */
export const SpeechClarityIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 12.5c0 3.6-3.6 6.5-8 6.5-1 0-2-.15-2.9-.42L4 20l1.5-3.3C4.6 15.6 4 14.1 4 12.5 4 8.9 7.6 6 12 6s8 2.9 8 6.5z" />
    <path d="M9 12.5h6" />
  </Icon>
);

export const ShiftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 9h13l-3-3M20 15H7l3 3" />
  </Icon>
);

export const InnerSelfIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 20s-7-4.3-7-9a4 4 0 017-2.6A4 4 0 0119 11c0 4.7-7 9-7 9z" />
    <circle cx="12" cy="11.4" r="2.1" />
  </Icon>
);

export const EnergyIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.4 5.4l1.9 1.9M16.7 16.7l1.9 1.9M18.6 5.4l-1.9 1.9M7.3 16.7l-1.9 1.9" />
  </Icon>
);

/* ---------- live experience column ---------- */
export const SparkIcon = (p: IconProps) => (
  <Icon {...p}><path d="M12 3l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.3l5-.7z" /></Icon>
);


/* ---------- the live experience ---------- */
export const SystemIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 3.5v5.3M12 15.2v5.3M3.5 12h5.3M15.2 12h5.3" />
  </Icon>
);

export const PatternIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 8h4v4H4zM10 8h4v4h-4zM16 8h4v4h-4zM4 14h4v4H4zM16 14h4v4h-4z" />
    <path d="M10 14h4v4h-4z" opacity=".4" />
  </Icon>
);

export const BodyIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="4.6" r="2.1" />
    <path d="M12 7v7M8 10.5h8M9.5 20l2.5-6 2.5 6" />
  </Icon>
);

export const IdentityIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 20c-3-1-5-4-5-8a8 8 0 1116 0c0 4-2 7-5 8z" />
    <path d="M9.5 11.5l2 2 3.5-4" />
  </Icon>
);

export const JourneyIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 19c0-4 3-5 7-5s7-1 7-5" />
    <circle cx="5" cy="19" r="1.8" />
    <circle cx="19" cy="9" r="1.8" />
  </Icon>
);

/* ---------- contact ---------- */
export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="M4 7.5l8 5.5 8-5.5" />
  </Icon>
);

export const ChatIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 12.5c0 3.6-3.6 6.5-8 6.5-1 0-2-.15-2.9-.42L4 20l1.5-3.3C4.6 15.6 4 14.1 4 12.5 4 8.9 7.6 6 12 6s8 2.9 8 6.5z" />
  </Icon>
);

export const PinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </Icon>
);

/* ---------- utility ---------- */
export function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLine() {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function Check() {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8.5 10V7.5a3.5 3.5 0 017 0V10" />
    </svg>
  );
}

export const SeatIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 11V6a2 2 0 012-2h8a2 2 0 012 2v5" />
    <path d="M4 11h16v6H4zM7 17v3M17 17v3" />
  </Icon>
);

/* Brand lotus — used in the header, the offer panel and the footer. */
export function Lotus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 6c4 6 6 11 6 15s-2.7 7.5-6 10c-3.3-2.5-6-6-6-10s2-9 6-15z" />
      <path d="M24 31c-3.2 2-7.5 2.4-11 .8-3.2-1.5-5.3-4.4-6-7.6 3.4-1.4 7.6-1.3 11 .4 2.8 1.4 4.8 3.7 6 6.4z" />
      <path d="M24 31c3.2 2 7.5 2.4 11 .8 3.2-1.5 5.3-4.4 6-7.6-3.4-1.4-7.6-1.3-11 .4-2.8 1.4-4.8 3.7-6 6.4z" />
      <path d="M13 34c3.4 4 7 6 11 6s7.6-2 11-6" />
    </svg>
  );
}

export function LotusMini() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 6c4 6 6 11 6 15s-2.7 7.5-6 10c-3.3-2.5-6-6-6-10s2-9 6-15z" />
      <path d="M13 34c3.4 4 7 6 11 6s7.6-2 11-6" />
    </svg>
  );
}
