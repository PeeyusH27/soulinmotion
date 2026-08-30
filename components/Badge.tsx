import { CalendarIcon, ClockIcon, GlobeIcon, SeatIcon } from './Icons';
import { DATE_SHORT } from '@/lib/event';

type Kind = 'live' | 'seats' | 'zoom' | 'time' | 'date' | 'free';

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

/** the standard set shown in the register section and the mobile sheet */
export function EventBadges({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <Badge kind="free">Free</Badge>
      <Badge kind="live">Live webinar</Badge>
      <Badge kind="time">{compact ? '90 min' : '90 minutes'}</Badge>
      <Badge kind="zoom">Live on Zoom</Badge>
      {!compact && <Badge kind="date">{DATE_SHORT}</Badge>}
    </>
  );
}
