# Soul in Motion — webinar landing page

Next.js (App Router) landing page for the live webinar
**See clearly. Question deeply. Live freely.**, hosted by Shradha Saha.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

## Slot booking (Calendly)

The booking section embeds a Calendly inline widget. Point it at your event:

```bash
cp .env.example .env.local
# NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/<account>/<event>
```

Until that is set the panel says so rather than rendering an empty widget.
Widget colours are themed to the palette in `components/sections/Booking.tsx`.

## Structure

```
app/
  layout.tsx    fonts (Fraunces · Inter · JetBrains Mono), metadata, Motion mount
  globals.css   the design system — sage / terracotta / paper, taken from the mark
  page.tsx      section order
components/
  Header  Footer  Motion  Icons
  sections/
    Hero            large left-hand type, detail chips, booking CTA, lotus mark
    Patterns        the "for you if…" rows beside a sticky chakra ring on wide
                    screens; the two stack below 1100px
    ChakraRing      the seven discs on a turning ring — drag to spin, click a
                    disc to bring it forward. variant="panel" for the pair
    YouWill         "In this webinar you will…" — auto-advancing showcase
    Flow            the seven steps ride sideways while the section is pinned;
                    a swipeable snap track on touch
    Shifts          what actually changes, plus the one-line transformation
    Quote           full-bleed image that scales and un-skews on scroll, with
                    the line set on frosted glass
    LiveExperience  the live experience + you will walk away with
    Host            dark band with an arched portrait and a detail table
    WhyMe           the host's own story, told as editorial copy
    Testimonials    scroll-driven card stack (placeholder copy)
    Faq             seven questions, accordion
    Booking         details, contact and the Calendly slot picker
    FinalCta        the closing terracotta block
lib/chakras.ts    typed manifest for the chakra assets
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
