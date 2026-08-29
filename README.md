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
  Motion  HeroMark  Headline  Icons
  sections/
    Hero            badges, large headline, register button, the lotus mark
    Patterns        §2 "for you if…" checklist beside the root disc
    YouWill         §3 five promise cards + a register card (sacral)
    Flow            §4 seven steps on ink, each numbered by its chakra disc
    Quote           §5 the line on a heart-green wash
    LiveExperience  §6 the live experience (throat) + walk away with (sage)
    Testimonials    §7 real WhatsApp messages as chat cards (solar plexus)
    Host            §8 portrait, specialisms and the host's story (ajna)
    Register        §9 Google Form button + embed, event badges, FAQ
    FinalCta        §10 crown on ink, the largest button on the page
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

## Placeholders to replace

- Testimonial copy in `Testimonials.tsx` — every card is chipped "Placeholder".
- Contact rows in `Booking.tsx` — email, WhatsApp and Instagram.
- Social links in `Footer.tsx`.
- The webinar date, which currently reads "Coming soon", as in the brief.
