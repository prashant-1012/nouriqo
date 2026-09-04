# Website Structure

## Current Sitemap

- `/` — homepage (single page, sections linked via anchor IDs)

Only one route exists today. `TODO.md` lists the routes an ecommerce
build-out would add (`/products/[slug]`, `/cart`, `/checkout`, etc.).

## Homepage Sections (in order)

| # | Component | Anchor | Purpose |
|---|---|---|---|
| — | `Navbar` | — | Logo, primary nav, mobile drawer, sticky on scroll. |
| 1 | `Hero` | — | Brand statement + primary/secondary CTA. Asymmetric text/image split, not a full-bleed banner (source photography is too low-resolution to stretch edge-to-edge without visible upscaling — see `PERFORMANCE_GUIDELINES.md`). |
| 2 | `BrandIntro` | — | One-paragraph "why we exist," centred, low-key. Bridges hero energy into the rest of the page. |
| 3 | `WhyNouriqo` | — | 6 benefit icons (real packaging claims), grid layout. Carries the "trust" role since no real testimonials exist yet. |
| 4 | `ProductGrid` | `#sweets` | Data-driven product cards (`lib/products.ts`) — the actual "shop" surface today. |
| 5 | `LifestyleStory` | — | Editorial image + short copy ("A Sweet Pause"). Breaks the grid rhythm before the next data-dense section. |
| 6 | `Ingredients` | — | Ingredient photography + copy, image-left/text-right on desktop, reversed stacking on mobile so the image still leads. |
| 7 | `OurCraft` | — | Three-image process strip (cooking → shaping → garnishing) with one caption line each. |
| 8 | `BrandStory` | `#story` | Dark (`emerald-950`) anchor section — heritage note ("Since 1958"), the only two dark sections on the page are this and the Final CTA. |
| 9 | `Gifting` | `#gifting` | Gift-box photography + CTA into contact. |
| 10 | `FinalCta` | — | Second dark anchor section, single strong CTA back to `#sweets`. |
| — | `Footer` | `#contact` | Logo, nav recap, contact placeholders, legal line. |

## CTA Strategy

- **Primary path:** Hero → `#sweets` (product grid) → product card "Enquire
  Now" → `#contact` (footer). This is the realistic conversion path today,
  since there is no live cart/checkout.
- **Secondary path:** Hero → `#story` for visitors who want brand context
  before products.
- Every CTA that implies a transaction ("Enquire Now", "Enquire About
  Gifting") is honest about the current capability — it routes to contact,
  not a fake checkout.

## Responsive Behavior (summary — full detail in `RESPONSIVE_GUIDELINES.md`)

- Grid sections collapse from asymmetric multi-column (`lg:grid-cols-12`
  spans) to a single column below `lg:` (1024px).
- Image-led sections (Ingredients, Gifting) reorder so the photo still
  appears before the copy on mobile, even when the image is visually
  "second" in the desktop column order.
- The hero swaps to a dedicated portrait crop (`hero-mobile.jpg`) below
  `lg:` rather than force-cropping the landscape desktop image.
