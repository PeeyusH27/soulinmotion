# Soul in Motion — webinar landing page

Next.js (App Router) landing page for the live webinar
**See clearly. Question deeply. Live freely.**, hosted by Shradha Saha.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

## Registration

Registration is a built-in form on a single panel, in three labelled sections.
It opens as a dialog from every register button on the page, and the same
component renders inline inside the register section.

It is themed off §1: ink ground, cream type, the same three drifting glow orbs,
and gold for the action — which is what gold already means everywhere else on
this page. The completion meter's petals take their hue from the chakra the
form has reached, lifted toward the paper tone so the jewel tones read on ink. Submissions go to Supabase, and are mirrored into a Google
Sheet if you set one up.

### 1. Supabase — required

Create a project, then in **SQL Editor → New query** run
[`supabase/registrations.sql`](supabase/registrations.sql). From
**Project Settings → API** copy the project URL and the **service role** key:

```bash
cp .env.example .env.local
# SUPABASE_URL=https://<project>.supabase.co
# SUPABASE_SERVICE_ROLE_KEY=<service role key>
```

The service-role key bypasses row-level security, so it is server-only — it is
read in `lib/store.ts` from an API route and must never be renamed to
`NEXT_PUBLIC_*`. Until both are set the form returns a "not connected yet"
message and the register section says which variables are missing.

Registrations are keyed on email: registering twice updates the first row
rather than creating a second seat.

### 2. Google Sheet — optional mirror

Open the sheet that should hold registrations, go to **Extensions → Apps
Script**, and paste [`scripts/sheets-webhook.gs`](scripts/sheets-webhook.gs)
over `Code.gs`. Set `SECRET` to a long random string, then **Deploy → New
deployment → Web app** with *Execute as: Me* and *Who has access: Anyone*.
Copy the `/exec` URL:

```bash
# SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/<id>/exec
# SHEETS_WEBHOOK_SECRET=<the same string as SECRET in the script>
```

The mirror is best-effort by design: if the sheet is unreachable the
registration still succeeds and the failure is logged, because the seat is
already saved in Supabase.

### 3. WhatsApp community

The success screen's main action is the WhatsApp community invite:

```bash
# NEXT_PUBLIC_WHATSAPP_URL=https://chat.whatsapp.com/<invite>
```

Leave it empty and the button is omitted rather than pointing nowhere.

### Falling back to the Google Form

The old form is still wired up as an escape hatch. Set
`NEXT_PUBLIC_REGISTER_MODE=google` and every button reverts to opening
`NEXT_PUBLIC_REGISTER_URL` in a new tab. The modal also offers that link once a
submission has failed twice, so it is worth keeping the URL set.

### Changing the questions

`lib/registration.ts` is the only file to edit. It holds the section headings,
the dial codes, the options, the city suggestions and their aliases, which
fields are required, and the validation rules — and both the browser and the
API route import it, so a field cannot be checked one way on the client and
another on the server. A new column also needs adding to
`supabase/registrations.sql` and to `HEADERS` in the Apps Script.

`CITIES` is a suggestion list, not a closed one: the city field is a combobox,
so anything typed is accepted. `CITY_ALIASES` is what makes searching
"Bangalore" find Bengaluru — extend that rather than renaming the cities.

## Structure

```
app/
  layout.tsx    fonts (Fraunces · Manrope · JetBrains Mono), metadata, Motion mount
  globals.css   the design system — ink / paper / terracotta / gold, plus one
                chakra tint per section (root → crown)
  page.tsx      section order and the three promo strips
components/
  Header          sticky, register button at every width, chakra progress rail
  Footer          nav + register link
  RegisterButton  the single register action; opens the dialog, or the Google
                  Form in a new tab when NEXT_PUBLIC_REGISTER_MODE=google
  RegisterProvider  mounted once in the layout; every CTA opens the one dialog
  RegisterModal   the <dialog> shell — focus trap, Escape, scroll lock
  RegisterForm    the form itself, used by the dialog and inline in §9
  RegisterCombo   the city field: a dropdown you can also type into, so a town
                  that is not on the list never blocks a registration
  RegisterPetals  the lotus-petal completion meter, the mandala watermark and
                  §1's glow orbs (rendered by the dialog shell, which does not
                  scroll — inside the form they would slide away)
  PromoStrip      gold / ink reminder strip between sections
  Badge           live · seats · zoom · time · date pills
  StickyBar       mobile bottom bar; hides while the register section is visible
  ChakraRail      seven segments under the header that light up as you scroll
  ChakraOrbit     the wheel: seven discs on a tilted circle that drifts on its
                  own, takes a drag, carries a flick, and brings a tapped disc
                  round to the front. Whatever ends up in front names itself
                  underneath, so the label can never fall out of step.
  Motion  Headline  Icons
  sections/
    Hero            on ink — headline and CTAs left, the chakra wheel right,
                    one hairline row of event detail, then the seven-step
                    marquee. The header rides it transparently until it sticks.
                    Folds to one column at 900px with the wheel leading.
    Patterns        §2 "for you if…" written as scenes, + who it isn't for (root)
    YouWill         §3 what we'll actually do — five deliverables (sacral)
    Testimonials    §4 real WhatsApp messages as chat cards (solar plexus)
    Flow            §5 seven steps on ink, timed, each on its chakra disc
    Quote           §6 the line on a heart-green wash, signed
    LiveExperience  §7 "what this is not" (throat) + what you leave with (sage)
    Host            §8 portrait, specialisms and the host's story (ajna)
    Register        §9 the registration form inline, event badges, FAQ
    FinalCta        §10 crown on ink, the largest button on the page
lib/event.ts      the date, time, price and seat cap — one place
lib/chakras.ts    typed manifest for the chakra assets
lib/register.ts     modal vs google mode, the WhatsApp url, the form fallback
lib/registration.ts the fields, options and validation — shared client/server
lib/store.ts        the Supabase write and the Sheets mirror
lib/calendar.ts     the Google Calendar link and .ics for the success screen
app/api/register/   the POST endpoint: bot traps, rate limit, validate, store
supabase/           the table definition to run once in the SQL editor
scripts/sheets-webhook.gs  the Apps Script that appends to the Sheet
```

## Assets

`public/brand/`

| File | Notes |
|---|---|
| `logo.png` | the mark with its ground keyed out and trimmed — sits on any surface |
| `host.png` | portrait crop of the host shot, framed to leave the other event's banner out |

`public/chakras/` — the seven discs, cropped from the source plate as circular
PNGs with transparent corners. `lib/chakras.ts` carries name, English name,
bija, petal count, path and colours sampled from each disc.

Regenerate any of it:

```bash
node scripts/prep-brand.mjs  [logo.jpg] [host.jpg]   # → public/brand/*
node scripts/crop-chakras.mjs [plate.jpg]            # → public/chakras/* + lib/chakras.ts
node scripts/gen-chakras.mjs                         # optional vector redraw of the discs
```

All three use headless Chrome as the image processor, so nothing needs
installing. Set `CHROME=/path/to/chrome` if it is not at the default macOS
location.

## Dev helper

```bash
node scripts/shots.mjs http://localhost:3000 shots
```

Captures the running page in one tall pass and slices it into readable chunks.
Note that headless Chrome clamps its window to a 500px minimum, so narrow-mobile
captures are really 500px wide.

## On mobile

Three sections change shape rather than just stacking:

- **Host** — the portrait shrinks to a round 116px and sits beside the name,
  with the details table underneath.
- **Testimonials** — the wall becomes a swipeable snap rail; each conversation
  scrolls internally past 340px.
- **What actually shifts** — the eight cards become a sticky pile, each one
  shrinking slightly as the next rides over it.

## Before this goes live

**Set the date.** `lib/event.ts` holds every fact about the session — the date,
the time, the duration, whether it is free, and the seat cap. `date` and `time`
are the only two blanks. Fill them and the hero, the meta row, the promo strips,
the sticky bar, the badges, the FAQ and the final call all update together.
Until then the copy falls back to waitlist wording ("date announced soon"),
which is honest but converts far worse than a real date.

Two more optional wins in the same file and one component:

- `EVENT.seats` — leave it `0` and no scarcity is claimed anywhere. Set it to a
  real cap and the page can say a number instead of "limited seats", which the
  old copy asserted eight times without ever quantifying.
- `CREDENTIALS` in `Host.tsx` — training, year, session count. The array is empty
  and the line stays hidden rather than inventing credentials; fill any entry and
  it appears. A sceptical reader currently finds no anchor at all.
- Social links in `Footer.tsx`, and a contact route beside the privacy line.

The copy itself was rewritten against a full audit in Aug 2026: promises became
deliverables, the "for you if" list became scenes rather than diagnoses, the
testimonial wall moved from seventh to fourth (which also repairs the root→crown
chakra order), §7 became "what this is not", and the FAQ was rebuilt around
objections — free, pitch, camera — instead of information.
