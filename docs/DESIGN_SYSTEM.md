# Design System

All tokens live in `app/globals.css` under `:root` and are exposed to
Tailwind via the `@theme inline` block (Tailwind v4 CSS-first config — there
is no `tailwind.config.js`). Use the Tailwind utility (`bg-emerald-800`,
`text-gold-600`, `font-display`, etc.) rather than hard-coded hex values.

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `ivory` | `#fffdf8` | Default page background, cards |
| `cream` | `#faf3e6` | Section backgrounds (hero, gifting) |
| `beige` | `#f0e4cf` | Alternating section backgrounds (Why Nouriqo, Ingredients) |
| `ink` | `#211d16` | Primary text |
| `ink-soft` | `#4a453b` | Secondary/body text |
| `emerald-950` | `#0e2c22` | Darkest brand green — Brand Story background |
| `emerald-900` | `#123a2d` | Deep green — Final CTA background, headings on light |
| `emerald-800` | `#1a5240` | Primary buttons, links, icon accents |
| `emerald-700` | `#21684f` | Hover state for primary buttons |
| `emerald-600` | `#2c7f61` | Rarely used, lighter accents |
| `leaf-500` | `#4c8f6c` | Reserved for illustration work |
| `gold-600` | `#a9822f` | Eyebrow labels, small caps text |
| `gold-500` | `#c9a227` | Reserved |
| `gold-400` | `#dcb84f` | Eyebrow labels on dark backgrounds |
| `saffron-500` | `#dd9a44` | Reserved for food-tone accents |
| `rose-200` | `#f0d9d3` | Pastel accent — Special Kaju Papri card |
| `lilac-200` | `#ddd0ea` | Pastel accent — Kaju Badam Papri card |

**Rhythm rule:** sections alternate `ivory` → `beige/50` → `ivory` →
`emerald-950` (dark) → `cream` → `emerald-900` (dark) → `cream` (footer), so
no more than one section in a row shares a background tone, and green is
reserved for two intentional "anchor" moments (Brand Story, Final CTA)
rather than tinting every section.

## Typography

- **Display / headings:** `Fraunces` (variable, optical size + soft/wonk
  axes enabled) via `next/font/google`, exposed as `font-display`. Used for
  all `h1`/`h2` and the wordmark. Warm, editorial serif with just enough
  character to feel "heritage" without becoming a novelty font.
- **Body / UI:** `Inter` via `next/font/google`, exposed as `font-sans`
  (the default body font — no class needed for body text).
- Headings use `leading-tight`/`leading-snug`; body copy uses
  `leading-relaxed` for readability at premium point sizes.
- A single italic word inside the hero headline (`thoughtfully`) is the
  only decorative typographic flourish — restraint is deliberate.

## Spacing & Layout

- Page content is constrained by `Container` (`max-w-7xl`, responsive
  horizontal padding `px-6 sm:px-8 lg:px-12`).
- Section vertical rhythm: `py-20 sm:py-28` as the default; hero and dense
  sections may vary slightly but stay within that range.
- Grids favour asymmetric column spans (`lg:col-span-7` / `lg:col-span-4`
  offset with `lg:col-start-9`, etc.) over even 50/50 splits, to avoid the
  "text | image" template look called out in the brief.

## Radius & Shadows

- Photography containers: `rounded-2xl` (cards) or `rounded-[2rem]` (hero).
- Shadows are used exactly once, on the hero image, as a soft long shadow
  (`shadow-[0_35px_70px_-30px_rgba(14,44,34,0.45)]`) — not applied to every
  card, to avoid generic "elevated card" template style.
- No glassmorphism, no blur panels, no neumorphism.

## Buttons

Defined in `components/ui/Button.tsx`:

- `primary`: solid `emerald-800`, `ivory` text, pill-shaped
  (`rounded-full`), hover darkens slightly.
- `secondary`: outlined, transparent background, for pairing with a
  primary CTA (e.g. hero's "Our Story").
- `ghost`: underlined text link, used for lower-emphasis actions (product
  card "Enquire Now").

## Icons

- **UI chrome** (menu/close): `lucide-react`, stroke-based, 1.5–2px.
- **Brand benefit icons** ("Why Nouriqo"): the 12 client-supplied
  illustrated icons in `/public/assets/icons` — never replaced with emoji
  or generic icon-font equivalents.
- **Decorative motifs**: the 24 client-supplied botanical/gold assets in
  `/public/assets/decorative`, used sparingly (1–2 per section, at low
  opacity or small scale, never centred as a hero element) via the
  `Motif` component.

## Motion Principles

- `Reveal` / `RevealGroup` / `RevealItem` (`components/motion/Reveal.tsx`)
  wrap Framer Motion's `whileInView`, animating `opacity` + `transform`
  only (GPU-cheap, no layout thrashing).
- All three respect `prefers-reduced-motion` via Framer's
  `useReducedMotion()` hook and render a plain `<div>` (no animation) when
  it's set.
- Stagger is subtle (`0.1s` per item) and reveals happen once
  (`viewport={{ once: true }}`) — no repeated bounce on re-scroll.
- The mobile menu drawer uses a short (`0.2s`) fade/slide, not a spring
  bounce.
