# Responsive Guidelines

Designed mobile-first with Tailwind's `sm` (640px) / `lg` (1024px)
breakpoints as the two structural thresholds — most sections only need
"stacked" vs. "grid," not five different layouts.

## Breakpoint Behavior by Section

| Section | < 640px | 640–1023px | ≥ 1024px |
|---|---|---|---|
| Navbar | Logo + hamburger, links in slide-down drawer | Same as mobile | Full horizontal nav + CTA button |
| Hero | Full-screen (`h-dvh`) `hero-mobile.jpg`, headline overlaid on top with a top-to-bottom scrim | Same overlay treatment, same image | Fixed `640px`-tall `hero-desktop.jpg`, headline overlaid on the left with a left-to-right scrim |
| WhyNouriqo | 2-column icon grid | 3-column | 6-column (single row) |
| ProductGrid | 1 column | 2 columns | 3 columns |
| LifestyleStory / Ingredients / Gifting / BrandStory | Stacked, image first (via DOM order or `order-*` utilities) | Stacked | 12-col asymmetric grid, text and image side by side |
| OurCraft | 1 column (3 stacked images) | 3-column row | 3-column row |
| Footer | Stacked columns | 2-column grid | 4-column grid |

## Rules Applied Throughout

- No fixed pixel widths on content containers — `Container` uses
  `max-w-7xl` with responsive padding, never a hard `width`.
- Every `next/image` using `fill` has an explicit `sizes` attribute tuned
  to its actual rendered width at each breakpoint (e.g. product cards:
  `(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw`) so the
  browser never downloads a desktop-sized image on mobile.
- Decorative `Motif` accents are hidden below `sm:` (`hidden sm:block`)
  wherever they sit near a rounded photo corner, so they never overlap
  headline text on narrow viewports.
- Buttons are full pill shapes with `px-7 py-3.5` — comfortably above the
  44×44px touch-target minimum.
- The mobile nav drawer locks body scroll while open and closes on
  `Escape` or route change.

## Tested Widths

Verified with automated screenshots (Playwright) against the dev server
at 320, 375, 390, 768, 1024 (the exact `lg` breakpoint boundary), 1440,
and 1920px — zero horizontal overflow and zero console errors at every
width. 414 and 1280px were not captured individually, but since Tailwind
only defines breakpoints at `sm` (640) and `lg` (1024) here, layout
scales continuously between the tested points on either side — flag it
in `TODO.md` if a regression ever turns up specifically at one of those.

Two real bugs were caught and fixed during this pass (see
`CHANGELOG.md`): the hero's product photo being cropped out of frame at
tablet widths, and invisible white-on-white Final CTA button text. Both
are the kind of thing that only surfaces in an actual rendered
screenshot, not in a code read-through — worth re-running this kind of
visual pass after any future layout change.

**Mobile hero specifically** (2026-09-05, when it became a full-screen
overlay) was tested against a wider matrix than the rest of the site —
width AND height both vary the risk here, since text overlaid on a
photo can overlap the product at the wrong combination of the two.
Checked 375×667, 390×844, 430×932, 393×851, 360×740, 320×568, 375×600,
375×560, and 375×500 (nine device/edge-case sizes). The narrowest one
(320×568) initially showed the CTA row sitting directly on the product
photo with poor contrast — fixed by trimming the hero's mobile type
scale and shortening its subhead copy (both add up: less text height
means more clearance above the product on every narrow device, not
just the one that first exposed it). Re-verify against this same
width×height matrix if the hero copy or type scale changes again.
