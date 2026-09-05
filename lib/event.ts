/**
 * Every fact about the session lives here. Change it once and the hero, the
 * promo strips, the sticky bar, the badges, the FAQ, the final call and the
 * page title all follow.
 *
 * ┌─ SET THIS ────────────────────────────────────────────────────────────┐
 * │ `date` and `time` are the only two blanks on the page. Until they are │
 * │ filled the copy falls back to waitlist wording ("announced soon"),    │
 * │ which is honest but converts far worse than a real date.             │
 * └───────────────────────────────────────────────────────────────────────┘
 */
export const EVENT = {
  /** e.g. 'Thursday 18 September' */
  date: 'Sunday, 6th September',
  /** e.g. '7:00 pm IST' */
  time: '11:00 am IST',

  /**
   * The same moment as `date` + `time`, machine-readable, so the success screen
   * can hand people a calendar file. Leave it empty and the calendar button
   * simply does not appear — it is never guessed from the prose above.
   */
  startISO: '2026-09-06T11:00:00+05:30',

  durationLabel: '90 minutes',
  where: 'Live on Zoom',

  /** the session costs nothing to attend */
  isFree: true,
  /** nothing is sold on the call */
  hasPitch: false,

  /**
   * How many seats the room is capped at. Scarcity is only claimed when this
   * is a real number — leave it at 0 and every "limited seats" line disappears
   * rather than asserting urgency the page cannot stand behind.
   */
  seats: 0,
};

export const HAS_DATE = EVENT.date.trim().length > 0;

/** bare, for the cell that already sits under a “Date” label */
export const DATE_VALUE = HAS_DATE ? EVENT.date : 'Announced soon';

/** bare, for the cell that already sits under a “Time” label */
export const TIME_VALUE = EVENT.time || 'Announced soon';

/** reads as a phrase inside a sentence or a dot-separated run */
export const DATE_LABEL = HAS_DATE
  ? [EVENT.date, EVENT.time].filter(Boolean).join(', ')
  : 'Date announced soon';

/** the short form used in tight spaces: badges, the sticky bar */
export const DATE_SHORT = HAS_DATE ? EVENT.date : 'Date announced soon';

export const HAS_SEATS = EVENT.seats > 0;
export const SEATS_LABEL = HAS_SEATS ? `${EVENT.seats} seats` : '';

export const HAS_START = EVENT.startISO.trim().length > 0;

/** ISO instants for the calendar file: start, and start + the session length */
export const START_AT = HAS_START ? new Date(EVENT.startISO) : null;
export const END_AT = START_AT ? new Date(START_AT.getTime() + 90 * 60 * 1000) : null;
