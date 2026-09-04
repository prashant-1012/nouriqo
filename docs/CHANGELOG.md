# Changelog

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
