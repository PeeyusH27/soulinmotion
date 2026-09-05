/**
 * Where a registration goes. Two sinks, deliberately unequal:
 *
 *   Supabase — the source of truth. If this write fails the whole request
 *              fails and the visitor is told, because the seat is not saved.
 *   Sheets   — a convenience mirror for whoever runs the session. If it fails
 *              nobody is told and the registration still stands.
 *
 * Talks to Supabase over PostgREST with fetch rather than through
 * @supabase/supabase-js: this is one INSERT, and the SDK is not worth a
 * dependency for it.
 */

const SUPABASE_URL = process.env.SUPABASE_URL?.trim().replace(/\/$/, '') || '';
/** service role — server only. Never prefix this with NEXT_PUBLIC_. */
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || '';
const SHEETS_URL = process.env.SHEETS_WEBHOOK_URL?.trim() || '';
const SHEETS_SECRET = process.env.SHEETS_WEBHOOK_SECRET?.trim() || '';

export const HAS_SUPABASE = Boolean(SUPABASE_URL && SUPABASE_KEY);
export const HAS_SHEETS = Boolean(SHEETS_URL);

export const TABLE = 'registrations';

export type Row = {
  name: string;
  email: string;
  phone: string;
  city: string;
  experience: string;
  heard_from: string;
  intention: string;
  consent: boolean;
  source: string;
  page: string;
  utm: Record<string, string> | null;
  user_agent: string;
};

export class StoreError extends Error {
  constructor(message: string, readonly status = 500) {
    super(message);
  }
}

/**
 * Insert, or update the existing row when this email has registered before.
 * Registering twice is a normal thing for a person to do — a second submit
 * refreshes their details instead of erroring or making a duplicate seat.
 */
export async function saveRegistration(row: Row) {
  if (!HAS_SUPABASE) {
    throw new StoreError(
      'Registration storage is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
      503,
    );
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}?on_conflict=email`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'content-type': 'application/json',
      // merge-duplicates turns the unique-email violation into an update
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify([row]),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new StoreError(`Supabase rejected the write (${res.status}): ${detail.slice(0, 300)}`);
  }

  const [saved] = (await res.json().catch(() => [])) as Array<{ id?: string; created_at?: string }>;
  return saved ?? {};
}

/**
 * Google Sheets parses any cell beginning with = + - or @ as a formula, which
 * turns the perfectly ordinary phone number "+91 98765 43210" into #ERROR! and
 * lets a registrant who types `=IMPORTXML(...)` as their name run it inside the
 * sheet. A leading apostrophe is Sheets' own escape for "this is literally
 * text"; it is consumed on entry, so the cell still reads and exports as the
 * bare value. Applied on the way out rather than at the source: Supabase stores
 * these strings correctly and must keep them unprefixed.
 */
function sheetSafe<T>(value: T): T | string {
  if (typeof value !== 'string' || !/^[=+\-@\t\r]/.test(value)) return value;
  return `'${value}`;
}

/**
 * Appends the same row to a Google Sheet through an Apps Script Web App.
 * Never throws: the caller has already saved the seat, and a spreadsheet that
 * is a few rows behind is not worth failing a registration over.
 */
export async function mirrorToSheet(row: Row): Promise<'ok' | 'skipped' | 'failed'> {
  if (!HAS_SHEETS) return 'skipped';

  try {
    const res = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        secret: SHEETS_SECRET,
        row: Object.fromEntries(Object.entries(row).map(([k, v]) => [k, sheetSafe(v)])),
      }),
      signal: AbortSignal.timeout(6000),
      redirect: 'follow',
    });
    if (!res.ok) return 'failed';

    // A 200 is not success on its own: the Apps Script answers a bad secret —
    // and any error it catches — with 200 and {ok:false}, and a Google sign-in
    // interstitial is also a 200. Both would otherwise be reported as mirrored.
    const body = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    return body?.ok === true ? 'ok' : 'failed';
  } catch {
    return 'failed';
  }
}
