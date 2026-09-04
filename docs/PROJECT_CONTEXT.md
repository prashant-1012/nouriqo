# Project Context

## Brand

**Nouriqo** — a premium Indian sweets (mithai) brand. The logo mark is a
botanical, two-leaf motif in a teal-to-emerald gradient, paired with the
wordmark "NOURIQO" and the line "Empower Health."

Product packaging (photographed and supplied in `/public/assets/_source`)
confirms these real, verifiable facts used throughout the site:

- Product line: **Papri** (a traditional Indian sweet), in three variants —
  Special Ghee Papri ("Classic Delicious"), Kaju Badam Papri, and Special
  Kaju Papri.
- Heritage claim printed on packaging: **"Since 1958"**.
- Tagline printed on packaging: **"Pride of India"**.
- Claims printed on packaging: **No Maida · No Artificial Color · No
  Preservatives · Made with Desi Ghee**.
- Net weight: 500 gram (per current SKU).

No other factual claims (certifications, awards, manufacturing locations,
years of experience beyond 1958, or customer testimonials) were supplied.
None have been invented — see `CONTENT_GUIDELINES.md`.

## Business

Indian sweets / traditional food. The brand deliberately sits at the
intersection of **premium + healthy**, without becoming a clinical
"health food" brand — it is still, first and foremost, a mithai brand.

## Website Goals

1. **Brand awareness** — communicate premium, heritage, and trust.
2. **Online selling** — showcase the product catalog in a way that scales
   as more products are added, with an architecture ready to plug into a
   real cart/checkout system later (see `COMPONENT_ARCHITECTURE.md` and
   `TODO.md`).

## Target Audience (assumption, not client-confirmed)

Urban, quality-conscious Indian consumers who buy mithai for personal
enjoyment and for gifting during celebrations — comfortable paying a
premium for ingredient transparency (no maida, no preservatives) without
wanting the brand to feel like a "diet" product.

## Visual Direction

Premium + Traditional + Natural + Modern. Deep emerald green (from the
logo), warm cream/ivory, muted gold, and soft pastel accents pulled
directly from the three product packaging colourways (gold, lilac, rose).
Editorial layout rhythm rather than repeating card grids — see
`DESIGN_SYSTEM.md` and `WEBSITE_STRUCTURE.md`.

## Brand Personality

Confident but not loud. Warm, generous, unhurried. Rooted in tradition
without being nostalgic-for-its-own-sake. Honest about ingredients rather
than clinical about health.

## Important Constraints

- **No fabricated content.** No invented certifications, awards, health
  claims, ingredients beyond what packaging shows, customer reviews, or
  company history beyond "Since 1958" (which is on the client's own
  packaging).
- **No ecommerce backend exists yet.** Product CTAs point to an "Enquire"
  contact anchor rather than a fake "Add to Cart" flow. See
  `TODO.md` for what's needed to wire up real commerce.
- **Real assets only.** All hero, lifestyle, product, process, icon, and
  decorative imagery comes from `/public/assets` (client-supplied). Product
  packaging photography is used unaltered.

## Tech Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict)
- Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`)
- Framer Motion for scroll reveals and micro-interactions
- Lucide React for UI icons (menu, close, etc.) — brand-specific benefit
  icons use the client-supplied illustrated assets instead
- `next/image` for all imagery, `next/font/google` for typography

## Important Decisions

See `CHANGELOG.md` for a running log. Notable ones:

- **No dark mode.** The cream/emerald/gold palette is a fixed brand
  identity, consistent with most premium F&B/DTC brand sites — it does not
  invert to a dark theme.
- **Logo background handling.** The supplied logo file has a white
  background (not transparent). Rather than regenerating the logo (which
  the brief explicitly forbids), it is rendered with CSS
  `mix-blend-mode: multiply` (`.logo-blend` in `globals.css`) so the white
  drops out against the site's light backgrounds without touching the
  source pixels.
- **Testimonials section omitted.** No real customer testimonials were
  supplied, and the brief explicitly forbids fabricating them. The
  "Trust" role in the page flow is carried by the `WhyNouriqo` benefits
  section instead.
