# Performance Guidelines

## Images

- All imagery renders through `next/image` — no raw `<img>` tags anywhere
  in the codebase.
- Photographic assets (hero, lifestyle, process, products) were converted
  from PNG to JPEG (quality 88–90) during asset reorganization purely to
  cut source payload — see `ASSET_MAP.md`. `next/image` still re-encodes
  to modern formats (AVIF/WebP) and generates responsive sizes on top of
  that at request time.
- `priority` is set only on the two hero images (mobile + desktop
  variants) since one of them is the LCP element on every load. All other
  images lazy-load by default (`next/image`'s default `loading="lazy"`).
- Every `fill`-based image has a tuned `sizes` attribute — see
  `RESPONSIVE_GUIDELINES.md` — so the browser requests an appropriately
  sized asset rather than the largest available.

### Known trade-off: dual hero preload

The hero uses two `<Image priority>` elements (`hero-mobile.jpg` /
`hero-desktop.jpg`) toggled with responsive `hidden`/`lg:block` classes so
each breakpoint gets a purpose-cropped image (per the brief's "use the
mobile asset, don't force-crop desktop" rule). Next.js's `priority` prop
emits a `<link rel="preload">` regardless of the element's CSS
`display`, so **both** hero images are preloaded on every load (combined
~150KB). This is an accepted trade-off for now, given how small the
combined payload already is — if a stricter LCP budget is needed later,
revisit with a CSS `background-image` + media-query approach for the hero
specifically (sacrificing `next/image`'s automatic format negotiation for
that one element).

## Fonts

- `Fraunces` and `Inter` are loaded via `next/font/google`, which
  self-hosts them (no runtime request to Google Fonts) and sets
  `display: swap` to avoid blocking text render.
- Only the axes actually used are requested for `Fraunces`
  (`opsz`, `SOFT`, `WONK`) rather than the full variable font.

## JavaScript / Components

- The homepage (`app/page.tsx`) and every section component are Server
  Components. The only Client Components are `MobileMenu.tsx` (needs
  `useState`/keyboard handling) and `motion/Reveal.tsx` (needs Framer
  Motion's browser APIs). This keeps the vast majority of the page's
  markup shippable with zero client JS.
- Framer Motion is used only for `opacity`/`transform` animations
  (compositor-friendly, no layout-triggering properties).
- No third-party analytics/chat/marketing scripts are included — add them
  behind `next/script` with an appropriate `strategy` if/when needed, not
  as a blocking `<script>` tag.

## Layout Shift (CLS)

- Every image has explicit dimensions or a `fill` parent with a fixed
  aspect-ratio class (`aspect-[4/5]`, `aspect-[16/10]`, etc.) — nothing
  reflows in as images load.
- The sticky navbar has a fixed height (`h-20`) so it doesn't shift page
  content on hydration.

## Lottie

Not currently used. The brief allows it "only where it genuinely improves
the experience" — no such moment was identified for v1 (see `TODO.md`).
Adding it later should go through a lightweight player
(`@lottiefiles/dotlottie-react` or similar) loaded dynamically
(`next/dynamic`, `ssr: false`) so it never blocks initial render.
