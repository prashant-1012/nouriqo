# Changelog

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
