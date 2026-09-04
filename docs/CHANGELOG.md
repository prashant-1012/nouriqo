# Changelog

## 2026-09-05 — Dark mode withdrawn; mobile hero rebuilt full-screen

**`ROADMAP.md` #10 withdrawn.** Client confirmed a light/dark theme
toggle isn't needed after all — no code existed for it yet (it was
still queued behind #8), so this is a pure scope removal, not a
revert. `PROJECT_CONTEXT.md`'s original "no dark mode" decision stands.

**Mobile hero rebuilt as a full-screen overlay**, matching the desktop
treatment built for `ROADMAP.md` #2 instead of the boxed-card layout
that shipped that day (text above, rounded image card below — see the
2026-09-04 (3) entry below for why that was the safer choice at the
time). Client asked for it directly: full-screen image, title over it.

- `Hero.tsx` restructured so mobile and desktop now share the same
  underlying pattern: a full-bleed image layer + a scrim + one
  absolutely-positioned text layer, differing only in the image crop,
  the section height (`h-dvh` on mobile vs. a fixed `640px` on `lg:`),
  and the scrim direction (top-to-bottom vs. left-to-right). Used
  `h-dvh` rather than `h-screen`/`100vh` specifically to avoid the
  classic mobile-browser bug where `100vh` gets cut off behind the
  address bar — `dvh` (dynamic viewport height) adjusts as browser
  chrome shows/hides.
- **Bug caught and fixed during QA** (the same failure mode flagged as
  a risk back on 2026-09-04 (3), now actually hit): tested a 9-point
  width×height matrix (375×667, 390×844, 430×932, 393×851, 360×740,
  320×568, 375×600, 375×560, 375×500) rather than just a couple of
  common phone sizes, because text-over-photo overlap depends on both
  dimensions at once, not just width. The narrowest case (320×568)
  showed the CTA row landing directly on the product photo with poor
  contrast. Fixed by trimming the hero's mobile heading size (`text-4xl`
  → `text-3xl` below `sm:`) and shortening the subhead ("Nouriqo crafts
  India's most cherished mithai with real desi ghee and real dry
  fruits — made for celebration, gifting, and everyday joy." → "Real
  desi ghee, real dry fruits — made for celebration, gifting, and
  everyday joy.") — both reduce the text block's height, which helps
  every narrow device, not just the one that first exposed the problem.
  Re-verified full matrix clean afterward, plus tablet (768) and
  desktop (1024/1440/1920) unaffected.
- Removed the hero's image-card shadow and rounded corners in the
  process — no longer applicable once the hero is a full-bleed
  background rather than a contained card at any breakpoint. Updated
  `DESIGN_SYSTEM.md`'s "Radius & Shadows" section, which had
  specifically called out that shadow as the one deliberate exception
  to "no card shadows" — that exception no longer exists.

**Verification:** the 9-point mobile matrix above, plus tablet/desktop
breakpoints, all 9 site routes (zero console errors, exactly one `h1`
each), and cart add-to-cart still working after touching `Hero.tsx`;
`next lint` and `next build` clean.

## 2026-09-04 (8) — Active nav-item highlighting

`ROADMAP.md` #7, requested with "best UI" rather than the minimal
color-swap originally scoped.

- New `isNavLinkActive(pathname, href)` in `lib/nav-links.ts`: exact
  match for Home, prefix match for everything else, so a blog post
  detail page (`/blogs/[slug]`) correctly keeps "Blogs" highlighted.
- New `components/navigation/NavLinks.tsx` — extracted the desktop nav
  out of `Navbar.tsx` into its own `"use client"` leaf (needed for
  `usePathname()`), keeping `Navbar` itself a server component. Gives
  the active link an animated underline via Framer Motion's
  `layoutId` — it slides between nav items on navigation instead of
  just appearing, which works because `Navbar` lives in the root
  layout and Next.js keeps shared layouts mounted across route
  changes (documented as a load-bearing detail in
  `COMPONENT_ARCHITECTURE.md`, since moving `Navbar` later would
  silently degrade the animation to an instant jump). Respects
  `prefers-reduced-motion` and adds `aria-current="page"`.
- `MobileMenu.tsx` gets the same active-state logic with a treatment
  suited to a vertical list — a subtle background tint + emerald text
  on the current row, plus `aria-current="page"`.

**Verification:** exact-match highlighting confirmed on all 5 main-nav
routes; prefix-match confirmed keeping "Blogs" active on
`/blogs/papri-explained`; confirmed `/gifting` shows no active item
(correct, since #9 removed it from the main nav); captured a mid-
transition screenshot showing the underline actually sliding between
positions, not just jumping; mobile drawer highlight confirmed on
`/story`; cart still works and all 9 routes clean after touching
`Navbar`/`MobileMenu` again; `next lint` and `next build` clean.

## 2026-09-04 (7) — Nav restructure: Home / Shop / About / Blogs / Contact Us

`ROADMAP.md` #9, done out of numeric order at the client's request
(only depended on #6/blog, already done).

- `lib/nav-links.ts` now reads Home / Shop / About / Blogs / Contact Us
  — shared by both `Navbar`'s desktop nav and `MobileMenu`'s drawer, so
  one change updated both automatically.
- **Labels changed, routes didn't.** "Shop" still points at `/sweets`,
  "About" at `/story` — renaming the actual folders would have meant
  touching every internal reference across the codebase (`Hero`,
  `FinalCta`, `CartDrawer`, `ProductGrid`, `BrandStory`, `Footer`) for
  no functional benefit. Documented as a deliberate choice, with the
  follow-up steps written down, in `ROADMAP.md` #9 and `TODO.md`, in
  case the client wants the URLs renamed too later.
- Gifting dropped out of the main nav (the target list has no room for
  a 6th item) but the page itself is untouched — still linked from the
  footer, and now also from a new "Shopping for a gift? See our Gifting
  collection →" link added to `/sweets` just under its page header, so
  it stays one click from the page a shopper actually lands on.
- Footer's Explore column relabeled to match (Shop / About / Gifting /
  Blogs / Contact Us).

**Verification:** re-checked for the exact nav-overflow bug class fixed
in the previous entry (item count is unchanged at 5, so the existing
`lg:` breakpoint switch-over still applies) — no wrapping or overflow
at 1024/1152/1280/1440px; mobile drawer lists all 5 new labels
correctly; the new Gifting callout link navigates to `/gifting`
correctly; cart add-to-cart still works after the `Navbar` changes; all
9 routes re-checked for console/network errors (none) and exactly one
`<h1>` each; `next lint` and `next build` clean.

## 2026-09-04 (6) — Blog

`ROADMAP.md` #6.

- New `lib/blog-posts.ts`: `BlogPost`/`BlogBlock` types + three seed
  posts ("Why Ghee Still Matters in Indian Sweets," "A Short Guide to
  Gifting Mithai," "Papri, Explained"), each reusing an existing asset
  from `public/assets/` as its cover image rather than sourcing new
  photography. Content is in-house-written editorial writing, not
  client-supplied — kept inside the "don't fabricate" rule by sticking
  to general food/culture information plus facts already established
  elsewhere on the site; see `CONTENT_GUIDELINES.md`'s new "Blog
  Content" section for the exact boundary. Flagged in `TODO.md` for
  client review before launch.
- **Chose plain typed data over MDX**, the approach `ROADMAP.md`
  originally suggested — for 3 posts with no embedded components or
  rich formatting, a `BlogBlock[]` array matches every other content
  source already in this codebase (`products.ts`, `benefits.ts`) with
  no new dependency and no `next.config.ts` changes. Documented as a
  deliberate deviation, with the trigger for revisiting it, in
  `COMPONENT_ARCHITECTURE.md`.
- New routes: `app/blogs/page.tsx` (index, `PageHeader` + `BlogGrid`)
  and `app/blogs/[slug]/page.tsx` (individual post, using
  `generateStaticParams` to prerender all three posts, `generateMetadata`
  for per-post SEO, and `notFound()` for unknown slugs — verified a
  bad slug returns a real 404, not a broken render).
- New components: `BlogCard`, `BlogGrid`, `BlogPostHeader`,
  `BlogContent` — same "server components by default" approach as the
  rest of the site; none of these need client JS.
- Added "Blogs" to the nav (`lib/nav-links.ts`) and footer.

**Bug caught and fixed during QA, not directly about the blog:** adding
a 5th nav item pushed the navbar past what fits before its mobile/
desktop switch-over point. The desktop `<nav>` and "Explore Sweets"
button appeared at the `md` breakpoint (768px), and at 768–1023px there
wasn't room for logo + 5 links + cart icon + button on one line — the
nav links wrapped to a second line and visually overlapped the "NOURIQO"
wordmark. Fixed by moving the switch-over from `md` to `lg` (1024px) in
both `Navbar.tsx` and `MobileMenu.tsx`. Re-verified header height stays
a consistent 81px (no wrapping) at 320, 375, 390, 414, 768, 900, 1000,
1023, 1024, 1152, 1280, 1440, and 1920px, and that the mobile drawer
still lists all 5 links correctly.

**Verification:** blog index sorts newest-first correctly across all
three posts; individual post pages render their cover image, heading/
paragraph content, and back-link correctly on both desktop and mobile;
zero console/network errors; `next lint` and `next build` clean (12
routes total: 5 static pages, `/blogs`, and 3 statically-generated
`/blogs/[slug]` posts, plus root `/` and `/_not-found`).

## 2026-09-04 (5) — Pricing, cart, and WhatsApp checkout

`ROADMAP.md` #4 and #5, done together since the cart total needs prices
to exist first.

**Pricing**

- Added `price: number` to `Product` (`lib/products.ts`): ₹500 / ₹550 /
  ₹600 for Special Ghee Papri / Kaju Badam Papri / Special Kaju Papri.
  Client-supplied, explicitly provisional — flagged via a field-level
  comment plus a visible "Prices shown are indicative and may change"
  disclaimer everywhere a price appears (`ProductGrid`, `CartDrawer`).
- New `lib/currency.ts` (`formatINR`, `Intl.NumberFormat("en-IN", ...)`)
  so every price renders consistently (`₹500`, `₹1,000`, etc.).

**Cart**

- New `lib/cart-context.tsx`: `CartProvider` + `useCart()`. Cart lines
  are just `{ slug, quantity }` — product name/price/image are always
  looked up live from `lib/products.ts`, so the cart can never go stale
  relative to the catalog. Persisted to `localStorage`
  (`nouriqo-cart-v1`); hydrates in a post-mount effect rather than
  during the initial render, so server and client agree on the first
  paint (starts empty, then syncs) with no hydration-mismatch warning.
- `QuantityStepper` (from the previous entry) converted from an
  uncontrolled component to a controlled one (`value`/`onChange`) so it
  can be shared between `AddToCartControl` (product card) and
  `CartDrawer` (per-line quantity in the cart) without duplicating the
  stepper UI.
- New `components/products/AddToCartControl.tsx`: owns the "how many am
  I adding" quantity locally, calls `addItem()` on click, and shows a
  brief "Added ✓" confirmation. Replaces the old stepper-plus-"Enquire
  Now" row on `ProductCard` — "Enquire Now" remains on `/gifting` and
  `/contact` for non-catalog enquiries, just not on every product card
  now that there's a real add-to-cart action.
- New `components/cart/CartButton.tsx` (navbar icon + item-count badge)
  and `components/cart/CartDrawer.tsx` (line items, per-line qty/remove,
  running total, checkout) — same interaction patterns as the existing
  `MobileMenu` (Escape to close, body-scroll lock, `aria-modal`).

**WhatsApp checkout**

- New `lib/config.ts` (`WHATSAPP_ORDER_NUMBER`, one named constant —
  not hardcoded inline anywhere) and `lib/whatsapp.ts`
  (`buildOrderMessage` / `buildWhatsAppOrderUrl`), producing a
  `wa.me` link with an itemized, URL-encoded message (line items, qty,
  line totals, grand total). Rendered as a plain `target="_blank"`
  anchor — no backend, no JS `window.open` needed. Verified the decoded
  message end-to-end for a 2-product cart; formatting and totals were
  correct on the first try.

**Bug caught and fixed during QA**

- `CartDrawer` was initially rendered inside `Navbar`'s `<header>`
  (alongside the new `CartButton`). It rendered as a barely-visible
  sliver — only the header row and footer showed, with the entire line-
  item list squeezed to nothing. Root cause: `header` has
  `backdrop-blur-sm` (a `backdrop-filter`), and per the CSS Transforms
  spec, `filter`/`backdrop-filter` makes an element the containing block
  for its `position: fixed` descendants. `CartDrawer` uses
  `fixed inset-y-0`, expecting to size against the *viewport* — instead
  it was sizing against `header`'s own ~80px height. Fixed by moving
  `CartDrawer` out of `Navbar` entirely and rendering it once in
  `app/layout.tsx` as a sibling of `Navbar`/`main`/`Footer` (still
  inside `CartProvider`). Re-verified full-height rendering at 1280px
  and 390px, plus cart persistence across a page reload, the empty-cart
  state, and removing a line item.

**Verification:** full add→view→adjust-quantity→remove→checkout-link
flow tested end-to-end via Playwright on `/sweets`; confirmed the same
cart is shared correctly between `/` and `/sweets` (both render
`ProductGrid`); all 5 routes re-checked for console/network errors and
horizontal overflow; `next lint` and `next build` clean throughout.

## 2026-09-04 (4) — Smaller, uniform product cards + quantity stepper

`ROADMAP.md` #3.

- Shrunk `ProductCard`: image aspect `3/4` → `4/5`, capped card width at
  `max-w-sm`, tightened heading/type scale and vertical spacing
  throughout.
- Made card height genuinely uniform rather than incidentally uniform —
  added `line-clamp-2` to the description (previous descriptions were
  different lengths and would have produced different card heights the
  moment a longer product description was added) and `mt-auto` on the
  footer block so the quantity/CTA row always sits flush at the bottom.
  Verified via computed `getBoundingClientRect()`: all three cards
  measure exactly 735.67px tall at 1440px viewport width.
- Added `components/products/QuantityStepper.tsx` (−/count/+, min 1,
  max 20, bounds-disabled, `aria-live="polite"`) as a small `"use
  client"` leaf — `ProductCard` itself stays a server component.
  Placed alongside "Enquire Now" rather than replacing it, since #4
  (cart) doesn't exist yet for it to add to; its quantity state is
  local per-card for now.
- Verified at 390/768/1440px on both `/` and `/sweets` (the two places
  `ProductGrid` renders); `next lint` and `next build` clean.

## 2026-09-04 (3) — New desktop hero image, overlaid text

Client re-supplied `hero-desktop1.png` (added to
`public/assets/_source/`) after it was mistakenly deleted in an earlier
session, and asked for it to be used as the desktop hero with the
headline "written on" the image — `ROADMAP.md` #2.

- Converted the new file to `public/assets/hero/hero-desktop.jpg`
  (1672×941, optimized JPEG), replacing the previous desktop hero crop
  (which remains available at `_source/ChatGPT Image …_r1_c1.png` if
  needed later).
- Rebuilt `Hero.tsx` as a full-bleed desktop banner (`lg:h-[640px]`)
  with the headline/CTA overlaid in the image's open left-hand negative
  space, using a `cream` gradient scrim for guaranteed contrast — text
  stays real HTML (selectable, accessible, indexable), not pixels baked
  into the image, per the brief's original text-in-images rule.
- **Tried and reverted:** applying the same overlay treatment to the
  mobile hero. `hero-mobile.jpg`'s negative space is proportionally
  smaller than the desktop crop, and at narrow widths the wrapped
  headline + paragraph + CTA row is taller than that space — the "Our
  Story" button ended up sitting on top of the busy vase/plate area,
  illegible. Mobile was reverted to its prior working boxed-card
  layout (text above, rounded image card below); only the desktop
  breakpoint changed, matching what was actually requested.
- **Bug caught and fixed during QA:** the first working version of the
  overlay duplicated the entire text block (and its `<h1>`) into two
  DOM branches — one for the mobile layout, one for the desktop overlay
  — toggled with responsive `hidden`/`lg:block` classes. Even though
  only one is ever visually shown per breakpoint, both existed in the
  raw DOM simultaneously (confirmed via
  `document.querySelectorAll("h1").length === 2`), which is exactly the
  "exactly one `h1` per page" guarantee this project has been
  documenting since the multi-page conversion. Fixed by rendering the
  hero copy **once** and repositioning it with CSS (`static` in normal
  flow on mobile → `absolute`/`inset-0`/centered on `lg:`), with the
  two hero images still swapped via `hidden`/`lg:block` (images aren't
  headings, so that duplication is fine).
- **Second bug caught during the same QA pass:** after removing the
  duplicate text, the desktop background image stopped rendering at
  all — the image div used `lg:-z-10` to sit behind the text, but its
  parent (`section`, `position: relative` with no `z-index`) doesn't
  establish its own stacking context, so the negative z-index escaped
  to the document root and painted the image behind the entire page
  instead of just behind the hero text. Fixed by dropping the negative
  z-index entirely and relying on the text's existing `z-10` plus DOM
  order — no new stacking context needed.
- Also caught and fixed a legibility regression specific to the
  1024–1279px range: a fixed `object-[62%_center]` crop pulled too much
  of the image's negative space out of frame at narrower `lg` widths,
  letting "thoughtfully made." overlap the product plate with poor
  contrast. Fixed with a responsive object-position
  (`object-[48%_center] xl:object-[62%_center]`) and a slightly more
  generous gradient scrim.
- Re-verified all breakpoints (390, 768, 1024, 1152, 1280, 1440, 1920)
  after each fix; `next lint` and `next build` both clean.

## 2026-09-04 (2) — Converted to a multi-page site

Client reviewed the initial build and sent an 11-item feedback batch,
logged in full in `ROADMAP.md`. Only item #1 was in scope for this pass
("for now just do point no. 1").

- Moved `Navbar`/`Footer` from `app/page.tsx` into `app/layout.tsx` so
  they persist across routes instead of being homepage-only.
- Split the single scrolling homepage into five routes: `/` (trimmed to
  Hero, BrandIntro, WhyNouriqo, ProductGrid, FinalCta), `/sweets`
  (ProductGrid, Ingredients, OurCraft), `/story` (BrandStory,
  LifestyleStory), `/gifting` (Gifting, FinalCta), `/contact`
  (new `ContactInfo` component).
- Added a shared `PageHeader` component (`components/layout/PageHeader.tsx`)
  so each sub-page gets its own `h1` — worded deliberately differently
  from the `h2` immediately beneath it in each case, to avoid rendering
  two near-duplicate headings back to back (caught and fixed a literal
  duplicate on `/gifting` before it shipped).
- Replaced every internal `<a href="#anchor">` with `next/link`'s
  `<Link href="/route">` (`Navbar`, `MobileMenu`, `Hero`, `FinalCta`,
  `Gifting`, `ProductCard`, `Footer`) and removed the now-unused
  `id="..."` / `scroll-mt-20` anchor-scroll classes from `ProductGrid`,
  `BrandStory`, `Gifting`, and `Footer`.
- Fixed a visual bug caught in QA: `/gifting` had a large dead-looking
  gap because `PageHeader` and the `Gifting` section shared the same
  `bg-cream`, doubling their padding into one block with no visible
  seam — changed `Gifting`'s section background to `bg-ivory`. Also
  tightened `ContactInfo`'s padding, which felt oversized on a
  single-list page.
- Verified all 5 routes with an automated pass: unique `<title>` and
  exactly one `<h1>` per page, zero console/network errors, `next
  lint` and `next build` both clean.

**Known issue introduced earlier, surfaced by this feedback round:**
during the previous session's cleanup, `public/assets/hero/hero-desktop1.png`
was deleted as unreferenced cruft — it was actually wanted (client's
feedback item #2 asks to use it as the hero image). It was never
committed to git and is not recoverable; see `ROADMAP.md` #2. Lesson
logged: don't delete an unfamiliar file on the assumption it's unused,
even when it isn't referenced by any code yet, without flagging it to
the user first.

## 2026-09-04 — Initial brand website build

**Asset audit & reorganization**

- Inspected all 48 files in `public/assets` (product packaging photos,
  AI-generated lifestyle/hero/process photography, 24 decorative
  botanical/gold motifs, 12 illustrated benefit icons, one logo file).
- Reorganized into `logo/`, `hero/`, `products/`, `lifestyle/`,
  `process/`, `decorative/`, `icons/`, with descriptive kebab-case
  filenames (see `ASSET_MAP.md`). Originals preserved untouched in
  `public/assets/_source/`.
- Converted photographic PNGs to JPEG (quality 88–90) to cut payload —
  active asset set went from ~12MB to ~3.7MB. Transparent icon/decorative
  PNGs kept as PNG.
- Cropped an icon-only version of the logo (`nouriqo-mark.png`) for
  navbar/footer use — the supplied file is a full lockup whose baked-in
  wordmark becomes illegible at small sizes.
- Removed the default `create-next-app` boilerplate (`app/page.tsx`
  starter content, unused SVGs in `public/`).

**Foundation**

- Installed `framer-motion`, `lucide-react`, `clsx`.
- Set up the color/typography/motion design system in `app/globals.css`
  (Tailwind v4 CSS-first `@theme`) and `app/layout.tsx` (Fraunces +
  Inter via `next/font/google`, full SEO metadata).
- Built the component architecture described in
  `COMPONENT_ARCHITECTURE.md`.

**Homepage**

- Implemented all ten sections plus navbar/footer described in
  `WEBSITE_STRUCTURE.md`, using only client-supplied imagery and
  packaging-verified copy (see `CONTENT_GUIDELINES.md` for what was
  deliberately left out or placeholder-only).

**QA fixes found during visual verification**

- Framer Motion `whileInView` reveals only fire once actually scrolled
  into view (by design — `viewport={{ once: true }}`), which initially
  looked like missing content in a naive full-page screenshot; verified
  correct by scrolling through the page before capturing.
- Hero's mobile image (`hero-mobile.jpg`) was cropping the product
  entirely out of frame at tablet widths (`sm:` breakpoint's wider
  16:10 aspect ratio + a `30%`-from-top object-position combined to show
  only empty wall/negative-space). Fixed with a responsive
  `object-[center_35%] sm:object-bottom`.
- The Final CTA button was rendering white text on a white background
  (an inline `className` color override couldn't reliably beat the
  `primary` variant's classes on Tailwind's compiled rule order). Fixed
  by adding a proper `inverted` variant to `Button.tsx` instead of
  overriding via `className`.
- `gold-600` (#a9822f) measured only ~2.8–3.5:1 contrast against the
  light backgrounds it was used on for small eyebrow text — below WCAG
  AA. Added a darker `gold-700` (#7d6023, 4.68–5.79:1) for all small-text
  uses; `gold-600` is now reserved for larger elements only. See
  `DESIGN_SYSTEM.md`.
- Verified zero horizontal overflow and zero console errors at 320,
  390, 768, and 1440px via an automated Playwright pass.

**Verification**

- `next lint` and `next build` both pass clean (no errors, no warnings).
- No known outstanding visual bugs as of this entry — see `TODO.md` for
  what's intentionally out of scope for this pass.
