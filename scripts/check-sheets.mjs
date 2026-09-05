/**
 * Confirms the Google Sheets mirror is reachable and accepting writes.
 *
 *   node --env-file=.env.local scripts/check-sheets.mjs
 *
 * Writes one row for check@example.invalid into the sheet. The Apps Script
 * keys on email, so re-running updates that same row rather than piling up —
 * but unlike the Supabase check this cannot delete it afterwards (the webhook
 * only ever appends or updates), so remove that row by hand when you are done.
 */

const URL_ = process.env.SHEETS_WEBHOOK_URL?.trim() || '';
const SECRET = process.env.SHEETS_WEBHOOK_SECRET?.trim() || '';

const ok = (m) => console.log(`  ok    ${m}`);
const bad = (m) => { console.error(`  FAIL  ${m}`); process.exitCode = 1; };

if (!URL_) {
  console.log('\n  SHEETS_WEBHOOK_URL is empty — the mirror is off and registrations skip it.\n');
  process.exit(0);
}

console.log(`\nchecking ${URL_.slice(0, 72)}${URL_.length > 72 ? '…' : ''}\n`);

// The single most common mistake: pasting the spreadsheet's own address rather
// than the Apps Script deployment's. Worth naming before the request is made.
if (URL_.includes('docs.google.com/spreadsheets')) {
  bad('that is the spreadsheet URL, not the Apps Script Web App URL');
  console.error('        Deploy the script (Extensions → Apps Script → Deploy → Web app)');
  console.error('        and use the /exec URL it hands you.');
  process.exit(1);
}
// The deployment dialog shows a Library URL alongside the Web app one whenever
// the deployment type is Library; they are easy to mix up and only one works.
if (URL_.includes('/macros/library/')) {
  bad('that is the Library URL, not the Web app URL');
  console.error('        In Deploy → New deployment, click the gear and choose type "Web app"');
  console.error('        (not "Library"), then copy the URL under "Web app" — it ends in /exec.');
  process.exit(1);
}
if (!URL_.endsWith('/exec')) {
  console.warn('  warn  a Web App URL normally ends in /exec — /dev only works while signed in');
}
if (!SECRET) console.warn('  warn  SHEETS_WEBHOOK_SECRET is empty; the script will reject the write');

const row = {
  name: 'Connection Check', email: 'check@example.invalid', phone: '+91 0000000000',
  city: 'Nowhere', experience: 'new', heard_from: 'Somewhere else',
  intention: '', consent: true, source: 'check-script', page: '',
  utm: null, user_agent: 'check-sheets.mjs',
};

try {
  const res = await fetch(URL_, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ secret: SECRET, row }),
    redirect: 'follow',
    signal: AbortSignal.timeout(15000),
  });

  if (res.status === 401 || res.status === 403) {
    bad(`${res.status} — the deployment is not public. Redeploy with "Who has access: Anyone".`);
  } else if (!res.ok) {
    bad(`${res.status}: ${(await res.text()).slice(0, 200)}`);
  } else {
    const text = await res.text();
    let body = null;
    try { body = JSON.parse(text); } catch { /* not JSON — handled below */ }

    if (!body) {
      bad('the response was not JSON — the URL is probably not the Web App /exec endpoint');
      console.error(`        got: ${text.slice(0, 160).replace(/\s+/g, ' ')}`);
    } else if (body.ok !== true) {
      bad(`the script refused the write: ${body.error ?? JSON.stringify(body)}`);
      if (String(body.error).includes('secret')) {
        console.error('        SHEETS_WEBHOOK_SECRET must match SECRET in the Apps Script exactly.');
      }
    } else {
      ok('the webhook accepted the write');
      console.log('\nSheets mirror is connected. Delete the "Connection Check" row when you are done.\n');
    }
  }
} catch (e) {
  bad(e.name === 'TimeoutError' ? 'timed out after 15s' : e.message);
}
