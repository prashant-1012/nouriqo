# Component Architecture

```
app/
  layout.tsx              root layout — CartProvider wraps Navbar + Footer + CartDrawer + {children}
  page.tsx                Home ("/")
  sweets/page.tsx         Our Sweets
  story/page.tsx          Our Story
  gifting/page.tsx        Gifting
  blogs/page.tsx          Journal (blog index)
  blogs/[slug]/page.tsx   individual post — generateStaticParams + generateMetadata
  contact/page.tsx        Contact

components/
  layout/
    Container.tsx         max-width + responsive padding wrapper
    PageHeader.tsx          shared sub-page banner: eyebrow + h1 + description, on a cream band
  navigation/
    Navbar.tsx            server component: logo, sticky header, renders NavLinks + CartButton
    NavLinks.tsx           "use client" (needs usePathname()): desktop nav, animated
                           active-link underline via Framer Motion layoutId
    MobileMenu.tsx         "use client": hamburger + animated drawer, active-row highlight
  cart/
    CartButton.tsx          "use client": navbar icon + item-count badge, opens the drawer
    CartDrawer.tsx           "use client": line items, qty steppers, total, WhatsApp checkout —
                             rendered once in app/layout.tsx, NOT inside Navbar's <header>
                             (see the stacking-context note below)
  hero/
    Hero.tsx               art-directed (desktop/mobile) hero — Home only
  products/
    ProductCard.tsx         one product's image+badge, title, and AddToCartControl — no
                             description/attributes/rating on the card (see below)
    ProductGrid.tsx          section wrapper, maps lib/products.ts -> ProductCard — used on both `/` and `/sweets`
    AddToCartControl.tsx     "use client": owns pack-size (weightOptions) selection state,
                             renders the price row (reactive to selection) + dropdown + "Add to Cart"
    QuantityStepper.tsx      "use client", controlled (value/onChange) — used only by
                             CartDrawer's per-line qty control (ProductCard has no stepper;
                             quantity is adjusted in the cart, not before adding)
  blog/
    BlogCard.tsx             one post's cover image + date/read-time + title + excerpt
    BlogGrid.tsx             section wrapper, maps lib/blog-posts.ts -> BlogCard — `/blogs`
    BlogPostHeader.tsx       "Back to Journal" + date/read-time + h1 — `/blogs/[slug]`
    BlogContent.tsx          renders a post's heading/paragraph blocks
  sections/
    BrandIntro.tsx          Home only
    WhyNouriqo.tsx          Home only
    Counters.tsx             "use client" — Home only, between WhyNouriqo and ProductGrid.
                             4 stat tiles with a scroll-triggered count-up (Framer Motion
                             useInView + animate on a useMotionValue), reduced-motion aware.
                             Figures are provisional placeholders — see lib/counters.ts.
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
  products.ts               Product type + data (source of truth for the catalog).
                             Each product has a weightOptions: { weight, price }[] array
                             (currently 500 gram / 1 kg, 1 kg priced at exactly 2x) instead
                             of a single weight/price pair — see CHANGELOG.md 2026-09-05 (2)
  counters.ts                 Counter type + data for the home page Counters section — icon,
                             target value, suffix, label. Figures are provisional placeholders,
                             not confirmed metrics (see CONTENT_GUIDELINES.md and TODO.md)
  blog-posts.ts              BlogPost type + data (title/excerpt/date/readTime/coverImage/content
                             blocks) — same data-driven pattern as products.ts, no MDX/CMS
                             tooling; see the note below on why
  benefits.ts                "Why Nouriqo" icon/label pairs
  nav-links.ts               shared nav link list + isNavLinkActive(pathname, href) — real
                              paths, not anchors; used by both NavLinks and MobileMenu
  cart-context.tsx            "use client": CartProvider + useCart() — lines are keyed by
                              slug+weight together (the same product can sit in the cart at
                              two different pack sizes as independent lines), persisted to
                              localStorage, product/price details looked up by slug+weight
  currency.ts                 formatINR() — Intl.NumberFormat("en-IN", { currency: "INR" })
  whatsapp.ts                 builds the itemized order message + wa.me checkout URL
  config.ts                   WHATSAPP_ORDER_NUMBER — the one place that number is defined
```

**Fixed-position UI must not nest inside `backdrop-blur`/`filter`
ancestors.** `CartDrawer` was originally rendered inside `Navbar`'s
`<header>`, which has `backdrop-blur-sm` (`backdrop-filter`). Per the
CSS Transforms spec, `filter`/`backdrop-filter` makes an element the
containing block for its `position: fixed` descendants — so the
drawer's `inset-y-0` resolved against `header`'s own ~80px height
instead of the viewport, breaking it. `CartDrawer` now renders directly
in `app/layout.tsx` instead. Keep this in mind before adding any other
`fixed`-positioned overlay as a descendant of `Navbar`.

**`NavLinks`' animated underline depends on the root layout staying
mounted across navigations.** `Navbar` (and therefore `NavLinks`) lives
in `app/layout.tsx`, and Next.js App Router keeps shared layouts
mounted across route transitions — only `{children}` swaps out. That's
what lets Framer Motion's `layoutId="nav-active-underline"` animate the
underline sliding from the old active link to the new one, instead of
it just disappearing and reappearing. If `Navbar` ever moves somewhere
that gets remounted on navigation, this animation silently degrades to
an instant jump (still correct, just less polished) — not a functional
bug, but worth knowing if the underline animation stops working.

**Navigation is route-based, not anchor-based.** Every internal link uses
`next/link`'s `<Link>` (not a plain `<a href="#...">`) so navigating
between pages gets a client-side transition rather than a full reload.
This changed on 2026-09-04 when the site moved from one scrolling
homepage to five separate routes — see `WEBSITE_STRUCTURE.md` and
`CHANGELOG.md`.

## Responsibilities & Conventions

- **Server components by default.** `MobileMenu.tsx`, `NavLinks.tsx`,
  `motion/Reveal.tsx`, `QuantityStepper.tsx`, `AddToCartControl.tsx`,
  `CartButton.tsx`, `CartDrawer.tsx`, and `cart-context.tsx` are
  `"use client"` — everything else renders on the server. Client
  components are leaves
  (`ProductCard` stays a server component and just renders
  `<AddToCartControl />` as one interactive child), not wrappers around
  the whole page. The one necessary exception is `CartProvider`, which
  wraps the entire app in `app/layout.tsx` — Context providers are the
  standard exception to "leaves only," since the alternative (prop-
  drilling cart state through every page) would be worse.
- **Data-driven, not repeated JSX.** Products (`lib/products.ts`),
  benefit icons (`lib/benefits.ts`), and blog posts (`lib/blog-posts.ts`)
  are arrays mapped over in the section components. Adding a fourth
  product, or a fourth blog post, means adding one object to the
  relevant file — no JSX changes required.
- **Blog posts are plain typed data, not MDX.** `ROADMAP.md` #6
  suggested in-repo MDX as the lower-effort starting point; a typed
  `BlogBlock[]` array (`{ type: "heading" | "paragraph", text }`)
  ended up lower-effort still, for a 3-post blog with no embedded
  components or rich formatting — no new dependency, no `next.config.ts`
  changes, and it matches every other content source in this codebase
  (`products.ts`, `benefits.ts`). Revisit if posts start needing
  richer formatting (images mid-post, lists, embeds) — that's where
  MDX starts earning its cost.
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

## Growing the Blog

1. Add a new entry to `blogPosts` in `lib/blog-posts.ts` — a unique
   `slug`, a `coverImage` (reuse an existing asset from
   `public/assets/` where it fits, per `ASSET_MAP.md`, rather than
   sourcing something new), and `content` as an array of
   `{ type: "heading" | "paragraph", text }` blocks. **Content must be
   genuinely reviewed, not fabricated** — the three seed posts are
   general editorial/informational writing (what ghee does, gifting
   etiquette, what papri is) using only facts already established
   elsewhere on the site (desi ghee, no maida/preservatives, since
   1958); they don't invent new claims about Nouriqo specifically. Any
   future post should hold to the same bar, and per `ROADMAP.md` #6,
   ideally get client sign-off before publishing.
2. `generateStaticParams` in `app/blogs/[slug]/page.tsx` maps over
   `blogPosts` automatically — a new slug is statically generated on
   the next build with no route changes needed.
3. `BlogGrid` sorts by `date` (newest first) and re-flows automatically
   (`sm:grid-cols-2 lg:grid-cols-3`) — nothing to adjust there either.
