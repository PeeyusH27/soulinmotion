import { NextResponse } from 'next/server';
import { normalise, validate, type Registration } from '@/lib/registration';
import { mirrorToSheet, saveRegistration, StoreError, type Row } from '@/lib/store';

export const runtime = 'nodejs';
/** never cached, never prerendered — every call is a write */
export const dynamic = 'force-dynamic';

/**
 * A submit that arrives faster than this was not typed by a person moving
 * through three steps. Kept low so a fast autofilling human is never caught.
 */
const MIN_ELAPSED_MS = 1500;

/**
 * Per-IP throttle. In-memory, so on serverless it is per warm instance rather
 * than global — enough to stop a single script hammering one lambda, not a
 * substitute for a real limiter if this ever gets seriously targeted.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // keep the map from growing without bound on a long-lived instance
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t > WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request) {
  const fwd = req.headers.get('x-forwarded-for');
  return (fwd?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown').trim();
}

/** pulls utm_* and gclid/fbclid off the page url the form was submitted from */
function utmFrom(page: string): Record<string, string> | null {
  const q = page.split('?')[1];
  if (!q) return null;
  const out: Record<string, string> = {};
  for (const [k, v] of new URLSearchParams(q)) {
    if (/^(utm_|gclid$|fbclid$)/.test(k) && v) out[k] = v.slice(0, 120);
  }
  return Object.keys(out).length ? out : null;
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'That is a lot of submissions from one place. Give it a few minutes.' },
      { status: 429 },
    );
  }

  let body: Partial<Registration> & { source?: string; elapsedMs?: number; page?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }

  // Bots get a 200 they can do nothing with. Telling them why they were
  // blocked only teaches the next attempt how to get through.
  const trapped = Boolean(body.website?.trim());
  const tooFast = typeof body.elapsedMs === 'number' && body.elapsedMs < MIN_ELAPSED_MS;
  if (trapped || tooFast) return NextResponse.json({ ok: true });

  const values: Registration = {
    name: String(body.name ?? ''),
    dial: String(body.dial ?? ''),
    phone: String(body.phone ?? ''),
    email: String(body.email ?? ''),
    city: String(body.city ?? ''),
    experience: String(body.experience ?? ''),
    heardFrom: String(body.heardFrom ?? ''),
    intention: String(body.intention ?? ''),
    consent: Boolean(body.consent),
    website: '',
  };

  // the same rules the browser just ran, re-run where they cannot be skipped
  const errors = validate(values);
  const firstBad = Object.keys(errors)[0] as keyof Registration | undefined;
  if (firstBad) {
    return NextResponse.json({ error: errors[firstBad], field: firstBad }, { status: 422 });
  }

  const page = String(body.page ?? '').slice(0, 400);
  const row: Row = {
    ...normalise(values),
    source: String(body.source ?? 'unknown').slice(0, 60),
    page,
    utm: utmFrom(page),
    user_agent: (req.headers.get('user-agent') ?? '').slice(0, 300),
  };

  try {
    const saved = await saveRegistration(row);
    // the mirror is awaited so it runs before the lambda freezes, but its
    // outcome only ever lands in the response as a note, never as a failure
    const mirror = await mirrorToSheet(row);
    if (mirror === 'failed') console.error('[register] sheet mirror failed for', row.email);

    return NextResponse.json({ ok: true, id: saved.id ?? null, mirror });
  } catch (err) {
    const status = err instanceof StoreError ? err.status : 500;
    console.error('[register] save failed:', err);
    return NextResponse.json(
      {
        error:
          status === 503
            ? 'Registration is not connected yet. Please try again shortly.'
            : 'We could not save that just now. Please try again.',
      },
      { status },
    );
  }
}
