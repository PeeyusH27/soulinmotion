# Soul in Motion — webinar landing page

Next.js (App Router) landing page for the live webinar
**See clearly. Question deeply. Live freely.**, hosted by Shradha Saha.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

## Registration (Google Form)

Every register button on the page opens the same Google Form, and the
register section embeds it. Point it at your form:

```bash
cp .env.example .env.local
# NEXT_PUBLIC_REGISTER_URL=https://docs.google.com/forms/d/e/<id>/viewform
```

Until that is set the buttons scroll to the register section, which says what
is missing. The URL is read in `lib/register.ts`.

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
  RegisterButton  the single register action (opens the form in a new tab)
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
    Register        §9 Google Form button + embed, event badges, FAQ
    FinalCta        §10 crown on ink, the largest button on the page
lib/event.ts      the date, time, price and seat cap — one place
lib/chakras.ts    typed manifest for the chakra assets
lib/register.ts   the form URL and its embed variant
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
