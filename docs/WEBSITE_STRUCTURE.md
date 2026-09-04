# Website Structure

## Current Sitemap

Converted from a single-page scroll site into separate routes on
2026-09-04, per client feedback (`ROADMAP.md` item #1) — clicking a nav
item now navigates to a real page instead of scrolling the homepage.

| Route | Nav label | Page `<h1>` | Components (in order) |
|---|---|---|---|
| `/` | Home | (no separate h1 needed — `Hero`'s headline serves as it) | `Hero`, `BrandIntro`, `WhyNouriqo`, `ProductGrid`, `FinalCta` |
| `/sweets` | Shop | "Our Sweets" | `PageHeader`, Gifting callout link, `ProductGrid`, `Ingredients`, `OurCraft` |
| `/story` | About | "Our Story" | `PageHeader`, `BrandStory`, `LifestyleStory` |
| `/gifting` | *(footer only — see note below)* | "Gifting" | `PageHeader`, `Gifting`, `FinalCta` |
| `/blogs` | Blogs | "From the Nouriqo Kitchen" | `PageHeader`, `BlogGrid` |
| `/blogs/[slug]` | *(reached from `/blogs`)* | the post title | `BlogPostHeader`, cover image, `BlogContent` |
| `/contact` | Contact Us | "Get in touch" | `PageHeader`, `ContactInfo` |

**Nav label ≠ route slug, deliberately.** As of the 2026-09-04 nav
restructure (`ROADMAP.md` #9), the main nav shows Home/Shop/About/Blogs/
Contact Us, but the underlying routes and page `<h1>`s were left as
`/sweets` ("Our Sweets"), `/story` ("Our Story"), `/contact` — renaming
folders would have meant touching every internal reference across the
codebase for no functional benefit. `/gifting` dropped out of the main
nav entirely (no room for a 6th item) but still exists, linked from the
footer and from a small callout on `/sweets`.

`Navbar` and `Footer` render once, in `app/layout.tsx`, and persist
across every route — as does `CartDrawer` (see `COMPONENT_ARCHITECTURE.md`
for why it's rendered there rather than inside `Navbar`). `TODO.md`
lists what a fuller ecommerce build-out would still add
(`/products/[slug]` PDP routes, a real payment gateway, order
management) and `ROADMAP.md` tracks what's left of the client's
2026-09-04 feedback batch (active nav-state highlighting, a partner
logo strip, a theme toggle, and a design polish pass).

`ProductGrid` intentionally appears on both `/` (as a "shop" teaser —
there are only 3 SKUs today, so the teaser is the full catalog) and
`/sweets` (as the dedicated listing, paired with supporting Ingredients/
Craft content). Not a bug — see `COMPONENT_ARCHITECTURE.md`.

## Page Purpose & Heading Structure

Every route has exactly one `<h1>`. On `/`, it's inside `Hero`. On
`/sweets`, `/story`, `/gifting`, `/contact`, and `/blogs`, it's inside
the shared `PageHeader` component (eyebrow + `h1` + short description,
on a `cream` band) — deliberately worded *differently* from the `h2`
immediately beneath it in each case (e.g. `/gifting`'s `h1` is
"Gifting," its `Gifting` section's own `h2` is "Gifting, made
graceful.") to avoid rendering two near-identical headings back to
back. `/blogs/[slug]` uses its own `BlogPostHeader` instead (its `h1`
*is* the post title — there's no separate `h2` to disambiguate from).

| Page | Purpose |
|---|---|
| Home | Brand awareness + a fast path into the shop. Everything a first-time visitor needs without clicking anywhere. |
| Our Sweets | The actual product listing (with real add-to-cart), plus the ingredient/craft content that supports a purchase decision. |
| Our Story | Heritage and brand philosophy — for visitors who want context before they buy, not required to. |
| Gifting | A dedicated pitch for gifting occasions, since it's a distinct use case from personal purchase. |
| Journal (`/blogs`) | Editorial content — ingredient/technique explainers and gifting guidance. Builds trust and gives the site something worth returning to besides the (small, 3-SKU) catalog. |
| Contact | Real contact information (currently placeholders — see `TODO.md`) for anything not covered elsewhere. |

## CTA Strategy

- **Primary path:** Home → `/sweets` → "Add to Cart" on a product card →
  cart drawer → "Checkout via WhatsApp". This is now a real, working
  conversion path (see `ROADMAP.md` #4) — there's still no payment
  gateway, the "checkout" is a WhatsApp handoff with an itemized order
  message, not a fake add-to-cart that goes nowhere.
- **Secondary path:** Home → `/story` for visitors who want brand context
  before products; `/blogs` for visitors arriving via search/editorial
  content, funneled back toward `/sweets` via its nav link and footer.
- "Enquire Now" still appears on `/gifting` and `/contact` for requests
  the cart doesn't cover (bulk orders, gifting customization) — it
  routes to `/contact`, honestly, not a fake form submission.

## Responsive Behavior (summary — full detail in `RESPONSIVE_GUIDELINES.md`)

- Grid sections collapse from asymmetric multi-column (`lg:grid-cols-12`
  spans) to a single column below `lg:` (1024px).
- Image-led sections (Ingredients, Gifting) reorder so the photo still
  appears before the copy on mobile, even when the image is visually
  "second" in the desktop column order.
- The hero swaps to a dedicated portrait crop (`hero-mobile.jpg`) below
  `lg:` rather than force-cropping the landscape desktop image.
