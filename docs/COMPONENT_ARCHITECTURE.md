# Component Architecture

```
app/
  layout.tsx              root layout — renders Navbar + Footer once, wraps {children}
  page.tsx                Home ("/")
  sweets/page.tsx         Our Sweets
  story/page.tsx          Our Story
  gifting/page.tsx        Gifting
  contact/page.tsx        Contact

components/
  layout/
    Container.tsx         max-width + responsive padding wrapper
    PageHeader.tsx          shared sub-page banner: eyebrow + h1 + description, on a cream band
  navigation/
    Navbar.tsx            server component: logo, desktop nav, sticky header
    MobileMenu.tsx         "use client": hamburger + animated drawer
  hero/
    Hero.tsx               art-directed (desktop/mobile) hero — Home only
  products/
    ProductCard.tsx         one product's image + copy + attributes + CTA
    ProductGrid.tsx          section wrapper, maps lib/products.ts -> ProductCard — used on both `/` and `/sweets`
  sections/
    BrandIntro.tsx          Home only
    WhyNouriqo.tsx          Home only
    LifestyleStory.tsx      `/story`
    Ingredients.tsx         `/sweets`
    OurCraft.tsx            `/sweets`
    BrandStory.tsx          `/story`
    Gifting.tsx             `/gifting`
    FinalCta.tsx             Home + `/gifting`
    ContactInfo.tsx          `/contact` — the placeholder email/phone/address list
  ui/
    Button.tsx              primary/secondary/ghost/inverted link-button
    SectionHeading.tsx       eyebrow + title + description, light/dark tone
  decorative/
    Motif.tsx                thin wrapper around next/image for aria-hidden decorative PNGs
  motion/
    Reveal.tsx               Reveal / RevealGroup / RevealItem (Framer Motion, reduced-motion aware)
  footer/
    Footer.tsx              renders once, in app/layout.tsx

lib/
  products.ts               Product type + data (source of truth for the catalog)
  benefits.ts                "Why Nouriqo" icon/label pairs
  nav-links.ts               shared nav link list (desktop + mobile menu) — real paths, not anchors
```

**Navigation is route-based, not anchor-based.** Every internal link uses
`next/link`'s `<Link>` (not a plain `<a href="#...">`) so navigating
between pages gets a client-side transition rather than a full reload.
This changed on 2026-09-04 when the site moved from one scrolling
homepage to five separate routes — see `WEBSITE_STRUCTURE.md` and
`CHANGELOG.md`.

## Responsibilities & Conventions

- **Server components by default.** Only `MobileMenu.tsx` and
  `motion/Reveal.tsx` are `"use client"` — everything else renders on the
  server. Client components are leaves, not wrappers around the whole page.
- **Data-driven, not repeated JSX.** Products (`lib/products.ts`) and
  benefit icons (`lib/benefits.ts`) are arrays mapped over in the section
  components. Adding a fourth product means adding one object to
  `products.ts` — no JSX changes required.
- **`Motif` is intentionally dumb.** It takes a `src` and a `size` and
  renders a decorative, `aria-hidden`, non-interactive image. Sections
  decide placement (`absolute -top-5 -right-3`, etc.) via `className` —
  the component itself has no opinion on where it sits.
- **`SectionHeading` centralizes the eyebrow/title/description pattern**
  used at the top of most sections, with a `tone` prop (`dark`/`light`) so
  it also works on the dark sections (`BrandStory`, `FinalCta`).
  `PageHeader` is the page-level counterpart — it renders the page's only
  `h1`; `SectionHeading` always renders an `h2` nested under it.
- **Typed props throughout**, no `any`. `Product["accent"]` is used as a
  discriminated key into a lookup object in `ProductCard` rather than a
  chain of conditionals.

## Growing the Product Catalog

`ProductGrid` and `ProductCard` were built assuming more than three SKUs
will exist eventually:

1. Add a new entry to `products` in `lib/products.ts` (image path, alt
   text, real attributes only — do not invent claims for a new product).
2. Drop the product photo into `public/assets/products/`.
3. Nothing else changes — the grid re-flows automatically
   (`sm:grid-cols-2 lg:grid-cols-3`).

The architecture intentionally stops short of full PDP components
(`ProductDetails`, `ProductGallery`, `ProductBenefits`) suggested in the
brief — see `TODO.md` for why, and what triggers building them.
