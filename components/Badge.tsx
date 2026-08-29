import { CalendarIcon, ClockIcon, GlobeIcon, SeatIcon } from './Icons';

type Kind = 'live' | 'seats' | 'zoom' | 'time' | 'date';

const ICON: Partial<Record<Kind, (p: { className?: string }) => React.JSX.Element>> = {
  seats: SeatIcon,
  zoom: GlobeIcon,
  time: ClockIcon,
  date: CalendarIcon,
};

export default function Badge({ kind, children }: { kind: Kind; children: React.ReactNode }) {
  const Icon = ICON[kind];
  return (
    <span className={`badge badge--${kind}`}>
      {Icon ? <Icon className="" /> : null}
      {children}
    </span>
  );
}

/** the standard set shown in the hero and the register section */
export function EventBadges({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <Badge kind="live">Live webinar</Badge>
      <Badge kind="time">{compact ? '90 min' : '90 minutes'}</Badge>
      <Badge kind="zoom">Live on Zoom</Badge>
      {!compact && <Badge kind="date">Date coming soon</Badge>}
    </>
  );
}
