# Saffron-Centric Spiritual Landing Page — Design Token System

## 1. Design Psychology

The visual direction should communicate four primary psychological triggers:

| Psychological Trigger | Design Expression |
|---|---|
| **Curiosity** | Large editorial headlines, partially revealed information, visual depth |
| **Self-recognition** | Personal language, intimate spacing, human imagery |
| **Trust & authority** | Serif typography, restrained composition, real-person imagery, structured information |
| **Transformation** | Saffron light, upward visual movement, glow, gradients from darkness to warmth |

### Emotional progression

**Darkness → Curiosity → Recognition → Understanding → Trust → Transformation → Action**

Saffron should represent **awakening / illumination**, rather than simply functioning as a brand color.

---

# 2. Design System Architecture

```text
Design System
│
├── Typography
│   ├── Display
│   ├── Headings
│   ├── Body
│   ├── Labels
│   └── CTA
│
├── Color
│   ├── Saffron
│   ├── Deep
│   ├── Ivory
│   ├── Gold
│   └── Semantic
│
├── Spacing
├── Radius
├── Shadows
├── Borders
├── Motion
├── Layout
└── Effects
```

---

# 3. Typography System

## Primary Display / Editorial Font

**Cormorant Garamond**

Use for:

- Hero headlines
- Major section headings
- Quotes
- Emotional statements
- Large numbers
- Spiritual statements

### Psychological purpose

The editorial serif character communicates:

- Wisdom
- Heritage
- Refinement
- Contemplation
- Depth

It prevents the spiritual brand from looking like a generic modern SaaS product.

---

## Secondary UI / Body Font

**Manrope**

Use for:

- Body copy
- Navigation
- Buttons
- Metadata
- Cards
- Form fields
- Small descriptions

### Psychological purpose

Manrope provides the modern counterbalance to the serif.

The combination becomes:

**Ancient wisdom → Cormorant Garamond**

**Modern clarity → Manrope**

---

## Optional Indic Font

**Noto Serif Devanagari**

Use only for small decorative Sanskrit / Indian-language phrases when required.

Do not make the entire interface Devanagari-heavy.

---

# 4. Typography Tokens

```css
:root {
  /* Font Families */
  --font-display: "Cormorant Garamond", serif;
  --font-body: "Manrope", sans-serif;
  --font-indic: "Noto Serif Devanagari", serif;

  /* Display */
  --text-display-xl: clamp(4rem, 7vw, 7rem);
  --text-display-lg: clamp(3.25rem, 6vw, 5.5rem);
  --text-display-md: clamp(2.75rem, 4.5vw, 4.5rem);

  /* Headings */
  --text-h1: clamp(3rem, 5vw, 5rem);
  --text-h2: clamp(2.25rem, 3.5vw, 3.5rem);
  --text-h3: clamp(1.75rem, 2.5vw, 2.5rem);
  --text-h4: clamp(1.25rem, 1.8vw, 1.75rem);

  /* Body */
  --text-body-xl: 1.25rem;
  --text-body-lg: 1.125rem;
  --text-body-md: 1rem;
  --text-body-sm: 0.875rem;

  /* UI */
  --text-label: 0.75rem;
  --text-caption: 0.6875rem;
  --text-button: 0.8125rem;
}
```

---

# 5. Typography Weight System

## Cormorant Garamond

```text
Regular     400
Medium      500
SemiBold    600
```

## Manrope

```text
Regular     400
Medium      500
SemiBold    600
Bold        700
```

| Element | Font | Weight |
|---|---|---:|
| Hero | Cormorant Garamond | 500 |
| Section Heading | Cormorant Garamond | 500 |
| Quote | Cormorant Garamond | 400 |
| Body | Manrope | 400 |
| Navigation | Manrope | 500 |
| CTA | Manrope | 600 |
| Eyebrow | Manrope | 600 |
| Metrics | Cormorant Garamond | 500 |
| Card Title | Cormorant Garamond | 500 |
| Metadata | Manrope | 500 |

---

# 6. Typography Alignment

The reference visual language relies heavily on **left-aligned editorial typography**.

### Hero

Left aligned.

### Major section headings

Primarily centered.

### Cards

Left aligned.

### Metrics

Centered.

### Quotes

Centered or slightly left-biased.

### CTA

Centered within the button.

Do not center every piece of content.

The combination of:

**Left editorial copy + centered spiritual statements + structured metadata**

creates visual sophistication.

---

# 7. Hero Typography

The hero should be the strongest typographic moment.

Example structure:

```text
YOUR DATE OF BIRTH MAY REVEAL

Why Certain Problems Keep
Repeating In Your Life
```

Recommended:

```css
.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-display-lg);
  font-weight: 500;
  line-height: 0.94;
  letter-spacing: -0.025em;
}
```

Tight line-height should be reserved for large editorial headlines.

---

# 8. Saffron Typography Highlight

Do not make entire headlines saffron.

Highlight **one psychologically important phrase**.

Example:

> Your Date Of Birth May Reveal  
> **Why Certain Problems Keep Repeating**

The highlighted phrase becomes the emotional hook.

```css
--color-text-highlight: var(--saffron-400);
```

Saffron should function as an **attention marker**.

---

# 9. Eyebrow Typography

The reference image uses small uppercase labels such as:

> LIVE WEBINAR

Replicate this hierarchy.

```css
.eyebrow {
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
```

Use:

**Saffron 400**

Optional small glowing dot:

```text
●
```

Only animate the dot when it represents live or active information.

---

# 10. Body Typography

Body typography should remain highly readable against dark backgrounds.

```css
.body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.7;
  letter-spacing: -0.005em;
}
```

For emotional copy:

```css
.emotional-copy {
  font-size: 1.125rem;
  line-height: 1.75;
}
```

---

# 11. Quote Typography

Quotes should feel intimate and reflective.

```css
.quote {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 3rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.15;
}
```

Saffron quotation marks may be used as decorative elements.

---

# 12. Color Philosophy

The reference image is fundamentally:

**Dark + warm metallic + parchment**

For the saffron-centric version:

**Deep Black + Saffron + Kesari + Ivory**

The palette should not become orange-heavy.

Saffron should **emerge from darkness**.

Think:

**Black → Brown → Deep Saffron → Saffron → Antique Gold → Ivory**

This creates a visual metaphor for:

**confusion → awareness → clarity**

---

# 13. Primary Saffron Palette

```css
:root {
  --saffron-50:  #FFF7E8;
  --saffron-100: #FDECC8;
  --saffron-200: #F8D99D;
  --saffron-300: #F0BD68;
  --saffron-400: #E5A33D;
  --saffron-500: #D98B22;
  --saffron-600: #C67516;
  --saffron-700: #A85A12;
  --saffron-800: #783D12;
  --saffron-900: #48240D;
}
```

### Primary brand saffron

**#D98B22**

Use for:

- Primary CTA
- Highlighted text
- Icons
- Borders
- Dividers
- Active states

---

# 14. Deeper Kesari Palette

```css
--kesari-deep: #8F4B16;
--kesari-dark: #67320F;
--kesari-brown: #3B2415;
--burnished-saffron: #B96B1C;
--sacred-saffron: #E29A32;
```

Use primarily in:

- Gradients
- Image overlays
- Glow effects
- Decorative geometry

---

# 15. Antique Gold Palette

The reference image has a metallic gold feeling.

Keep a secondary gold family:

```css
--gold-100: #F8E6C5;
--gold-200: #EBCB98;
--gold-300: #DDB175;
--gold-400: #C89550;
--gold-500: #A86F32;
--gold-600: #81501F;
```

Primary decorative gold:

**#C89550**

Use for:

- Fine borders
- Icons
- Dividers
- Logos
- Decorative geometry

Saffron should remain the **action color**.

Gold should remain the **heritage / decorative color**.

---

# 16. Dark Palette

The dark background is psychologically important.

```css
--dark-950: #080706;
--dark-900: #0D0B09;
--dark-850: #11100E;
--dark-800: #171310;
--dark-750: #211A14;
--dark-700: #2A2119;
```

Recommended primary page background:

**#0D0B09**

This is preferable to pure black because it allows saffron to feel warmer.

---

# 17. Spiritual Brown Palette

Brown bridges black and saffron.

```css
--spiritual-brown-900: #241810;
--spiritual-brown-800: #342116;
--spiritual-brown-700: #49301E;
--spiritual-brown-600: #604127;
--spiritual-brown-500: #795536;
```

Use in:

- Image overlays
- Secondary cards
- Borders
- Background gradients
- Report mockups

---

# 18. Ivory / Parchment Palette

The reference image uses warm cream panels.

Do not use pure white.

```css
--ivory-50: #FFF9EF;
--ivory-100: #F8EFE2;
--ivory-200: #EDE0CF;
--ivory-300: #DCCBB7;
--ivory-400: #C9B49B;
```

Primary light section:

**#F8EFE2**

This creates a handcrafted, spiritual editorial quality.

---

# 19. Text Colors

## On Dark Backgrounds

```css
--text-primary-dark: #F8EFE2;
--text-secondary-dark: #D5C6B3;
--text-muted-dark: #9F907F;
--text-accent-dark: #E5A33D;
```

## On Light Backgrounds

```css
--text-primary-light: #241810;
--text-secondary-light: #5A4634;
--text-muted-light: #806C57;
--text-accent-light: #A85A12;
```

---

# 20. Complete Theme Tokens

```css
:root {

  /* =========================
     BRAND
  ========================= */

  --brand-primary: #D98B22;
  --brand-primary-hover: #E5A33D;
  --brand-primary-active: #B96B1C;

  --brand-secondary: #C89550;

  /* =========================
     SAFFRON
  ========================= */

  --saffron-50: #FFF7E8;
  --saffron-100: #FDECC8;
  --saffron-200: #F8D99D;
  --saffron-300: #F0BD68;
  --saffron-400: #E5A33D;
  --saffron-500: #D98B22;
  --saffron-600: #C67516;
  --saffron-700: #A85A12;
  --saffron-800: #783D12;
  --saffron-900: #48240D;

  /* =========================
     GOLD
  ========================= */

  --gold-100: #F8E6C5;
  --gold-200: #EBCB98;
  --gold-300: #DDB175;
  --gold-400: #C89550;
  --gold-500: #A86F32;
  --gold-600: #81501F;

  /* =========================
     DARK
  ========================= */

  --dark-950: #080706;
  --dark-900: #0D0B09;
  --dark-850: #11100E;
  --dark-800: #171310;
  --dark-750: #211A14;
  --dark-700: #2A2119;

  /* =========================
     SPIRITUAL BROWN
  ========================= */

  --brown-900: #241810;
  --brown-800: #342116;
  --brown-700: #49301E;
  --brown-600: #604127;
  --brown-500: #795536;

  /* =========================
     IVORY
  ========================= */

  --ivory-50: #FFF9EF;
  --ivory-100: #F8EFE2;
  --ivory-200: #EDE0CF;
  --ivory-300: #DCCBB7;
  --ivory-400: #C9B49B;

  /* =========================
     TEXT
  ========================= */

  --text-primary-dark: #F8EFE2;
  --text-secondary-dark: #D5C6B3;
  --text-muted-dark: #9F907F;
  --text-accent-dark: #E5A33D;

  --text-primary-light: #241810;
  --text-secondary-light: #5A4634;
  --text-muted-light: #806C57;
  --text-accent-light: #A85A12;

}
```

---

# 21. Saffron Gradient System

Use gradients sparingly.

## Primary CTA

```css
background:
  linear-gradient(
    135deg,
    #E5A33D,
    #C67516
  );
```

## Spiritual Glow

```css
background:
  radial-gradient(
    circle,
    rgba(229,163,61,0.32),
    rgba(217,139,34,0.12),
    transparent 70%
  );
```

## Deep Atmospheric Gradient

```css
background:
  radial-gradient(
    circle at 70% 40%,
    rgba(168,90,18,0.20),
    transparent 45%
  ),
  #0D0B09;
```

---

# 22. Saffron Glow Tokens

```css
--glow-saffron-sm:
  0 0 15px rgba(229, 163, 61, 0.20);

--glow-saffron-md:
  0 0 35px rgba(229, 163, 61, 0.22);

--glow-saffron-lg:
  0 0 70px rgba(217, 139, 34, 0.20);
```

Never use a strong glow around every component.

Glow should indicate:

**importance / awakening / active state**

---

# 23. Border Tokens

The reference image uses very thin borders.

```css
--border-dark:
  1px solid rgba(200,149,80,0.28);

--border-dark-strong:
  1px solid rgba(200,149,80,0.48);

--border-light:
  1px solid rgba(168,111,50,0.28);

--border-saffron:
  1px solid rgba(217,139,34,0.55);
```

Avoid heavy borders.

---

# 24. Radius Tokens

```css
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
--radius-xl: 22px;
--radius-pill: 999px;
```

Recommended:

- Cards: `16px`
- Large panels: `18–22px`
- CTA: `999px`
- Images: `16–20px`
- Small metadata: `8px`

---

# 25. Spacing System

Use generous spacing.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
--space-40: 160px;
```

### Major section spacing

Desktop:

**96–160px vertical padding**

Mobile:

**64–96px**

The page should breathe.

---

# 26. Content Width

```css
--container-sm: 720px;
--container-md: 960px;
--container-lg: 1180px;
--container-xl: 1320px;
```

Recommended primary container:

**1180–1240px**

The visual language should remain relatively narrow and editorial rather than extremely wide.

---

# 27. CTA Design Token

Primary CTA:

```css
--cta-height: 52px;
--cta-padding-x: 28px;
--cta-radius: 999px;

--cta-background: #D98B22;
--cta-background-hover: #E5A33D;

--cta-text: #1A1109;
```

Typography:

```text
Manrope
13px
600
letter-spacing: 0.04em
```

The CTA should feel like:

**a warm invitation**

rather than:

**a sales button**

---

# 28. Secondary CTA

```css
background: transparent;
border: 1px solid rgba(229,163,61,0.55);
color: #E5A33D;
```

Hover:

```css
background: rgba(217,139,34,0.10);
```

---

# 29. Card System

## Dark Card

```css
background: #11100E;
border: 1px solid rgba(200,149,80,0.28);
color: #F8EFE2;
```

## Light Card

```css
background: #F8EFE2;
border: 1px solid rgba(168,111,50,0.25);
color: #241810;
```

## Featured Saffron Card

```css
background:
  linear-gradient(
    145deg,
    #D98B22,
    #A85A12
  );

color: #FFF9EF;
```

Use featured saffron cards extremely selectively.

---

# 30. Image Treatment

The reference image relies heavily on warm atmospheric imagery.

For images:

```css
.image-spiritual {
  filter:
    saturate(0.82)
    contrast(1.04);
}
```

Dark section images should use:

```css
background:
  linear-gradient(
    90deg,
    rgba(13,11,9,0.75),
    rgba(13,11,9,0.05)
  );
```

Saffron atmospheric overlay:

```css
background:
  linear-gradient(
    135deg,
    rgba(168,90,18,0.18),
    transparent 60%
  );
```

This helps photography belong to the same visual world.

---

# 31. Section Theme Tokens

Create three primary themes.

## Theme A — Midnight

```text
Background: #0D0B09
Surface: #11100E
Text: #F8EFE2
Muted: #9F907F
Accent: #E5A33D
Border: Gold 28%
```

Use for:

- Hero
- Emotional sections
- Testimonial sections
- Final CTA

---

## Theme B — Parchment

```text
Background: #F8EFE2
Surface: #FFF9EF
Text: #241810
Muted: #806C57
Accent: #A85A12
Border: Brown/Gold
```

Use for:

- Founder
- Report information
- Benefits
- FAQ

---

## Theme C — Saffron Glow

```text
Background:
  linear-gradient(
    135deg,
    #8F4B16,
    #D98B22
  );

Text: #FFF9EF
Accent: #F8D99D
```

Use only for:

- Important transitions
- Special CTA moments
- Highlight panels

---

# 32. Psychological Use of Saffron

Do not treat saffron simply as:

> “the orange brand color.”

Instead create a visual hierarchy:

### Dark

Represents:

**uncertainty / introspection / unanswered questions**

### Brown

Represents:

**grounding / human experience / depth**

### Saffron

Represents:

**awakening / insight / possibility**

### Gold

Represents:

**wisdom / authority / heritage**

### Ivory

Represents:

**clarity / peace / understanding**

This creates a coherent psychological visual journey.

---

# 33. Recommended Section Color Flow

```text
HERO
████████████████
MIDNIGHT

EMOTIONAL
████████████████
MIDNIGHT

FOUNDER
░░░░░░░░░░░░░░░░
PARCHMENT

BLUEPRINT
████████████████
MIDNIGHT

BENEFITS
░░░░░░░░░░░░░░░░
PARCHMENT

TESTIMONIALS
████████████████
MIDNIGHT

TRANSFORMATION
████████████████
DEEP SAFFRON

OFFER
████████████████
MIDNIGHT

FAQ
░░░░░░░░░░░░░░░░
PARCHMENT

FOOTER
████████████████
MIDNIGHT
```

Alternating these surfaces prevents the long page from becoming visually monotonous.

---

# 34. Decorative Design Tokens

Use a consistent decorative vocabulary:

- Fine dots
- Thin circular rings
- Lotus outlines
- Sacred geometry
- Fine horizontal rules
- Small diamond separators
- Circular image frames
- Subtle radial glows

Keep opacity low:

```css
--decorative-opacity: 0.25;
```

Decorative elements should be **discovered**, not immediately noticed.

---

# 35. Animation Tokens

The spiritual tone requires slow movement.

```css
--motion-fast: 180ms;
--motion-normal: 350ms;
--motion-slow: 700ms;
--motion-cinematic: 1200ms;

--ease-spiritual:
  cubic-bezier(0.22, 1, 0.36, 1);
```

Recommended:

### Hover

180–300ms

### Card entrance

700–900ms

### Hero reveal

900–1400ms

### Background movement

4–10 seconds

### Floating spiritual element

6–12 seconds

---

# 36. Scroll Psychology

The landing page should not reveal everything immediately.

Use:

### Hero

**Question**

↓

### Emotional Section

**Recognition**

↓

### Founder

**Trust**

↓

### Blueprint

**Evidence**

↓

### Testimonials

**Validation**

↓

### Offer

**Decision**

This is the primary psychological structure of the design.

---

# 37. Attention Hierarchy

At any moment, the visitor should immediately see only a few things.

### Level 1

Primary headline

### Level 2

Supporting statement

### Level 3

Primary CTA

### Level 4

Proof / supporting information

Everything else should remain visually quieter.

Do not allow decorative spiritual elements to compete with the CTA.

---

# 38. Avoid Generic Astrology Design

Avoid:

```text
Bright purple gradients
+
Zodiac symbols everywhere
+
Gold everywhere
+
Huge horoscope icons
+
Excessive stars
+
Overly mystical typography
```

Instead:

```text
Editorial typography
+
Human photography
+
Dark atmospheric backgrounds
+
Saffron illumination
+
Parchment sections
+
Thin sacred geometry
+
Premium whitespace
+
Psychological storytelling
```

---

# 39. Final Design Character

The interface should communicate:

> “There is something I don't yet understand about myself.”

Then:

> “Maybe this can help me understand it.”

Then:

> “This feels credible.”

Then:

> “I want to discover mine.”

The visual language should therefore be:

**quietly persuasive rather than aggressively promotional.**

---

# 40. Final Core Token Summary

| Token | Value |
|---|---|
| Primary Brand | `#D98B22` |
| Saffron Highlight | `#E5A33D` |
| Deep Saffron | `#A85A12` |
| Antique Gold | `#C89550` |
| Deep Background | `#0D0B09` |
| Dark Surface | `#11100E` |
| Spiritual Brown | `#342116` |
| Ivory | `#F8EFE2` |
| Warm White | `#FFF9EF` |
| Primary Dark Text | `#F8EFE2` |
| Primary Light Text | `#241810` |
| Display Font | Cormorant Garamond |
| UI Font | Manrope |
| Primary Radius | `16px` |
| CTA Radius | `999px` |
| Main Container | `1180–1240px` |
| Section Padding | `96–160px` desktop |
| Primary CTA | Saffron |
| Decorative Accent | Antique Gold |
| Primary Theme | Midnight |
| Secondary Theme | Parchment |
| Transformation Theme | Deep Saffron |

---

## Core Principle

**Make saffron the light that emerges from the darkness, rather than making the entire website orange.**

This preserves the sophisticated visual character of the reference while making the design feel rooted in Indian spirituality and the psychological idea of:

**awakening → insight → clarity → transformation**
