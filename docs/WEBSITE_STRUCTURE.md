# Website Structure

## Admin panel is a separate app, not part of this sitemap

`/admin/*` (login, dashboard, products, orders, users) is internal
staff tooling, not a customer-facing route — see
`COMPONENT_ARCHITECTURE.md` for its structure and `ECOMMERCE_BUILDOUT.md`
Phase 4 for what it does. Added 2026-09-14, it required restructuring
every route below into an `app/(site)/` route group, since Next.js
only allows one `<html>/<body>` root layout per top-level segment tree
and the admin panel deliberately has its own (no customer Navbar/
Footer/cart). The route group is invisible in the URL — every path in
the table below is unchanged.

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
| `/testimonials` | Testimonials | "Testimonials" | `PageHeader`, `Testimonials` |
| `/contact` | Contact Us | "Get in touch" | `PageHeader`, `ContactInfo` |
| `/products/[slug]` | *(reached from a `ProductCard`)* | the product name | `ProductDetails` — image + copy + `AddToCartControl`, no shared `PageHeader` (its own "Back to Our Sweets" link instead) |
| `/privacy-policy` | *(footer only)* | "Privacy Policy" | `PageHeader`, `LegalContent` |
| `/terms-of-service` | *(footer only)* | "Terms of Service" | `PageHeader`, `LegalContent` |
| `/refund-policy` | *(footer only)* | "Refund, Return & Replacement Policy" | `PageHeader`, `LegalContent` |
| `/shipping-policy` | *(footer only)* | "Shipping & Delivery Policy" | `PageHeader`, `LegalContent` |
| `/checkout` | *(not linked yet — see note below)* | "Checkout" | `PageHeader`, `CheckoutForm` — delivery-details form + order summary |
| `/checkout/payu-redirect` | *(reached only via order creation)* | none — auto-submits to PayU | `PayuAutoSubmitForm`, no header chrome |
| `/checkout/failed` | *(reached only via a failed PayU callback)* | "Payment didn't go through" | plain message + "Try Again" link back to `/checkout` |
| `/order-success` | *(reached only via a successful PayU callback)* | "Thank you, [name]!" | order confirmation + `ClearCartOnMount` |

**Nav label ≠ route slug, deliberately.** As of the 2026-09-04 nav
restructure (`ROADMAP.md` #9), the main nav shows Home/Shop/About/Blogs/
Contact Us, but the underlying routes and page `<h1>`s were left as
`/sweets` ("Our Sweets"), `/story` ("Our Story"), `/contact` — renaming
folders would have meant touching every internal reference across the
codebase for no functional benefit. `/gifting` dropped out of the main
nav entirely but still exists, linked from the footer and from a small
callout on `/sweets`.

**Testimonials added as a 6th main nav item (see `CHANGELOG.md`).**
`ROADMAP.md` #9 had assumed 5 items was the ceiling the `lg:` (1024px)
breakpoint could hold without wrapping — re-verified with Playwright at
1024/1152/1280/1440px with the 6th item in place: still a consistent
81px header, no wrapping, no horizontal overflow. `/gifting` still sits
out of the main nav (footer + `/sweets` callout only), so there was no
need to revisit that call.

**Four legal pages added 2026-09-13** (`/privacy-policy`,
`/terms-of-service`, `/refund-policy`, `/shipping-policy`) ahead of
integrating the PayU payment gateway — PayU's merchant approval
process expects these to already exist on the live site. Deliberately
footer-only, not in the main nav (already at its 6-item ceiling — see
above); linked from the footer's bottom bar next to the copyright
line rather than a 5th grid column, since the existing `lg:grid-cols-4`
footer layout is already full (Brand spans 2, Explore 1, Contact 1).
The original 2026-09-13 text was our draft, with working-default
figures. **On 2026-09-25 all four pages were replaced with the client's
own text**, including their own figures (see `CHANGELOG.md`).

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

**`/products/[slug]` added 2026-09-13** (`ECOMMERCE_BUILDOUT.md` Phase
2), reachable by clicking a `ProductCard`'s image or name (previously
inert — the card was the dead end). No `generateStaticParams`,
deliberately: unlike `/blogs/[slug]`'s fixed seed posts, products will
be admin-editable once Phase 4 ships, so this route renders fresh on
every request rather than freezing prices/descriptions at build time.

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

- **Primary path:** Home → `/sweets` → "Add to Cart" on a product card
  (or a detour through `/products/[slug]` first, added 2026-09-13, for
  a visitor who wants the full description/attributes before adding) →
  cart drawer → "Checkout via WhatsApp". This is now a real, working
  conversion path (see `ROADMAP.md` #4) — there's still no payment
  gateway, the "checkout" is a WhatsApp handoff with an itemized order
  message, not a fake add-to-cart that goes nowhere.
- **The real PayU checkout exists as of 2026-09-13 but isn't linked yet
  — deliberately.** `/checkout` → `/checkout/payu-redirect` →
  PayU's hosted page → `/order-success` or `/checkout/failed` is fully
  built and tested end-to-end against sandbox-shaped credentials (see
  `ECOMMERCE_BUILDOUT.md` Phase 3), but the cart drawer's button still
  says "Checkout via WhatsApp" and doesn't point here. Per the agreed
  plan, WhatsApp checkout stays the only *linked* checkout path until
  the client's real PayU account is ready — that single swap (point the
  button at `/checkout`, remove the WhatsApp one) is the Phase 3
  "cutover" moment, not something that happens piecemeal.
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
  `lg:` rather than force-cropping the landscape desktop image, and runs
  full-screen (`h-dvh`) with the headline overlaid on it — same overlay
  treatment as desktop, just a taller/narrower crop and a top-to-bottom
  scrim instead of left-to-right (see `CHANGELOG.md` 2026-09-05).
