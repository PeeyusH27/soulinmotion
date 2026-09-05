/**
 * Google Apps Script — the Sheets mirror.
 *
 * Setup, once:
 *   1. Open the Google Sheet that should hold registrations.
 *   2. Extensions → Apps Script, and paste this file over Code.gs.
 *   3. Edit SECRET below to a long random string.
 *   4. Deploy → New deployment → type "Web app".
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      Copy the /exec URL it gives you.
 *   5. In .env.local set
 *        SHEETS_WEBHOOK_URL=<that /exec url>
 *        SHEETS_WEBHOOK_SECRET=<the same string as SECRET>
 *
 * "Anyone" is why the secret matters: the URL is unguessable but public, and
 * the secret is the only thing standing between it and junk rows.
 */

var SECRET = 'change-me-to-a-long-random-string';
var SHEET_NAME = 'Registrations';

var HEADERS = [
  'Timestamp', 'Name', 'Email', 'Phone', 'City',
  'Experience', 'Heard from', 'Intention', 'Consent', 'Source', 'Page', 'UTM',
];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) return reply({ ok: false, error: 'bad secret' });

    var r = body.row || {};
    var sheet = getSheet();

    // one row per person: a re-registration overwrites rather than piling up
    var emails = sheet.getRange(2, 3, Math.max(sheet.getLastRow() - 1, 1), 1).getValues();
    var at = -1;
    for (var i = 0; i < emails.length; i++) {
      if (String(emails[i][0]).toLowerCase() === String(r.email).toLowerCase()) { at = i + 2; break; }
    }

    var row = [
      new Date(), r.name, r.email, r.phone, r.city,
      r.experience, r.heard_from, r.intention, r.consent ? 'Yes' : 'No',
      r.source, r.page, r.utm ? JSON.stringify(r.utm) : '',
    ];

    if (at > 0) sheet.getRange(at, 1, 1, row.length).setValues([row]);
    else sheet.appendRow(row);

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
