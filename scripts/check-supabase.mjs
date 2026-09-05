/**
 * Confirms the app can actually reach Supabase and write to `registrations`.
 * Run after filling SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local:
 *
 *   node --env-file=.env.local scripts/check-supabase.mjs
 *
 * It writes one row for check@example.invalid and deletes it again, so it
 * exercises the same upsert path the API route uses without leaving a seat
 * behind. Read-only apart from that one round-trip.
 */

const URL_ = process.env.SUPABASE_URL?.trim().replace(/\/$/, '') || '';
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || '';
const TABLE = 'registrations';
const PROBE = 'check@example.invalid';

const ok = (m) => console.log(`  ok    ${m}`);
const bad = (m) => { console.error(`  FAIL  ${m}`); process.exitCode = 1; };

if (!URL_ || !KEY) {
  bad('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is empty in .env.local');
  process.exit(1);
}

console.log(`\nchecking ${URL_}\n`);

if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(URL_)) {
  console.warn(`  warn  URL does not look like a Supabase project url: ${URL_}`);
}
if (KEY.split('.').length !== 3 && !KEY.startsWith('sb_secret_')) {
  console.warn('  warn  key is neither a JWT nor an sb_secret_ key — is it the real service-role key?');
}

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'content-type': 'application/json',
};

async function main() {
  // 1. can we see the table at all?
  const head = await fetch(`${URL_}/rest/v1/${TABLE}?select=id&limit=1`, { headers });
  if (head.status === 401 || head.status === 403) {
    return bad(`auth rejected (${head.status}) — the key is wrong, or it is the anon key, not service-role`);
  }
  if (head.status === 404) {
    return bad(`table "${TABLE}" not found — run supabase/registrations.sql in the SQL editor first`);
  }
  if (!head.ok) return bad(`${head.status}: ${(await head.text()).slice(0, 200)}`);
  ok(`table "${TABLE}" is reachable`);

  // 2. does the upsert path work end to end?
  const row = {
    name: 'Connection Check', email: PROBE, phone: '+91 0000000000',
    city: 'Nowhere', experience: 'new', heard_from: 'Somewhere else',
    intention: '', consent: true, source: 'check-script', page: '',
    utm: null, user_agent: 'check-supabase.mjs',
  };
  const write = await fetch(`${URL_}/rest/v1/${TABLE}?on_conflict=email`, {
    method: 'POST',
    headers: { ...headers, Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify([row]),
  });
  if (!write.ok) {
    const detail = (await write.text()).slice(0, 300);
    if (detail.includes('42P10')) {
      return bad('upsert failed: the unique index on lower(email) is missing — re-run the SQL file');
    }
    return bad(`write rejected (${write.status}): ${detail}`);
  }
  const [saved] = await write.json();
  ok(`upsert works — wrote row ${saved?.id ?? '(no id returned)'}`);

  // 3. clean up after ourselves
  const del = await fetch(`${URL_}/rest/v1/${TABLE}?email=eq.${encodeURIComponent(PROBE)}`, {
    method: 'DELETE', headers,
  });
  del.ok ? ok('probe row removed') : console.warn(`  warn  could not delete probe row (${del.status}) — remove ${PROBE} by hand`);

  // 4. how many real registrations are in there?
  const count = await fetch(`${URL_}/rest/v1/${TABLE}?select=id`, {
    headers: { ...headers, Prefer: 'count=exact', Range: '0-0' },
  });
  const total = count.headers.get('content-range')?.split('/')[1];
  if (total) ok(`${total} registration${total === '1' ? '' : 's'} currently stored`);

  console.log('\nSupabase is connected.\n');
}

main().catch((e) => bad(e.message));
