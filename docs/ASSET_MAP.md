# Asset Map

Original client-supplied files are preserved, untouched, in
`public/assets/_source/` for reference/audit. Everything the site actually
renders lives in the organized subfolders below. Photographic assets were
re-encoded from PNG to optimized JPEG (quality 88–90, no crop/edit) purely
to cut payload size — no pixels were altered beyond format conversion.
Transparent illustrated assets (icons, decorative motifs, logo) were kept
as PNG to preserve alpha transparency.

## `logo/`

| File | Source | Notes |
|---|---|---|
| `nouriqo-logo.png` | `Screenshot 2026-08-31 221247.png` | Full lockup (leaf mark + "NOURIQO" + "EMPOWER HEALTH"), as supplied. Reserved for placements with enough room to show the wordmark at a legible size (none currently — kept for future use, e.g. an About page). |
| `nouriqo-mark.png` | Cropped from `nouriqo-logo.png` | Icon-only crop (just the two-leaf mark + ™), no resizing/recoloring of the artwork itself — cropped because the full lockup's baked-in wordmark becomes illegible at navbar/footer icon size (~36px). Used in `Navbar` and `Footer` next to an HTML "NOURIQO" text label. White background handled the same way via `.logo-blend`. |

## `hero/`

| File | Source | Usage |
|---|---|---|
| `hero-desktop.jpg` | `_source/hero-desktop1.png` (client-specified 2026-09-04, see `ROADMAP.md` #2) | Hero image, `lg:` breakpoint and up. Wide (1672×941) marble-counter shot with ~55% clean negative space on the left. Used as a full-bleed background with the headline overlaid in HTML on top of that negative space (a `cream`-tinted gradient scrim guarantees text contrast regardless of the underlying photo). The original `ChatGPT Image …_r1_c1.png` crop is still in `_source/` if a boxed (non-full-bleed) hero treatment is wanted later. |
| `hero-mobile.jpg` | `mobile-hero.png` | Hero image, below `lg:`. Portrait crop with a deliberately empty upper two-thirds. Used full-screen (`h-dvh`) with the headline overlaid on top, same approach as the desktop crop — see `CHANGELOG.md` 2026-09-05 for why an earlier *boxed*-card attempt (text above, rounded image card below) was tried and reverted first, and how the eventual full-screen version avoids the overlap problem that one had. |

## `products/`

| File | Source | Product |
|---|---|---|
| `classic-ghee-papri.jpg` | `IMG-20260810-WA0032.jpg` | Special Ghee Papri ("Classic Delicious") — yellow packaging |
| `kaju-badam-papri.jpg` | `IMG-20260810-WA0033.jpg` | Kaju Badam Papri — purple/lilac packaging |
| `special-kaju-papri.jpg` | `IMG-20260810-WA0037.jpg` | Special Kaju Papri — rose/pink packaging |

Packaging photography is used exactly as supplied — no crop, no relabeling,
no regenerated packaging, per the brief's explicit rule.

## `lifestyle/`

| File | Source | Usage |
|---|---|---|
| `evening-chai-papri.jpg` | `ChatGPT Image …_r1_c2.png` | "A Sweet Pause" editorial section — papri on a wooden tray beside chai. |
| `rustic-plate-papri.jpg` | `ChatGPT Image …_r2_c1.png` | "Our Story" section — simple ceramic-plate shot alongside heritage copy. |
| `gifting-box.jpg` | `ChatGPT Image …_r2_c2.png` | Gifting section — papri in a branded green gift box with ribbon and diya. |

## `process/`

| File | Source | Usage |
|---|---|---|
| `process-ingredients.jpg` | `process-1.png` | Ingredients section — raw cashews, almonds, saffron, rice, ghee. |
| `process-cooking.jpg` | `process-2.png` | Our Craft — hand-stirring the mixture in a brass kadhai. |
| `process-shaping.jpg` | `process-3.png` | Our Craft — hand-rolling a ladoo. |
| `process-garnishing.jpg` | `process-4.png` | Our Craft — garnishing a tray of papri with nuts. |

## `icons/` (12 — "Why Nouriqo" benefit icons)

Illustrated, circular, gold-outlined icons. Currently 6 are used on the
homepage (`lib/benefits.ts`); the remaining 6 are catalogued here for reuse
on a future ingredients/trust or product detail page.

| File | Depicts | Status |
|---|---|---|
| `icon-desi-ghee.png` | Ghee pot with spoon | Used — "Made with Desi Ghee" |
| `icon-no-maida.png` | Crossed-out flour bowl + wheat | Used — "No Maida" |
| `icon-no-chemicals.png` | Crossed-out flask | Used — "No Artificial Colour" |
| `icon-no-preservatives.png` | Crossed-out test tube | Used — "No Preservatives" |
| `icon-natural-ingredients.png` | Leaf sprig | Used — "Natural Ingredients" |
| `icon-handcrafted.png` | Hands cupping a ladoo | Used — "Handcrafted in Small Batches" |
| `icon-traditional-preparation.png` | Mortar and pestle | Available — traditional-preparation messaging |
| `icon-quality-assured.png` | Ribbon/rosette award | Available — quality/trust messaging |
| `icon-freshly-made.png` | Steaming bowl | Available — freshness messaging |
| `icon-made-with-love.png` | Heart with leaf | Available — emotional/care messaging |
| `icon-gifting.png` | Wrapped gift box | Available — could accent the Gifting section |
| `icon-trust-shield.png` | Shield with leaf | Available — quality/trust messaging |

## `decorative/` (24 — botanical & gold motifs)

Used sparingly (1–2 per section, small scale, `aria-hidden`) via the
`Motif` component to add heritage texture without becoming "random
floating decoration." Full list (all transparent PNG):

`leaf-branch-small`, `gold-lotus-mini`, `jasmine-buds-branch`,
`gold-sparkle-star`, `leaf-branch-buds`, `gold-swirl-leaf`,
`gold-dots-cluster`, `leaf-pair-small`, `gold-quatrefoil-pearl`,
`leaf-single-large`, `gold-sunburst`, `jasmine-flower-open`,
`gold-sparkle-wand`, `jasmine-branch-buds`, `gold-green-wave-duo`,
`gold-quatrefoil-leaf-pair`, `vine-curl-thin`, `sparkle-dots-vertical`,
`jasmine-flower-leaves`, `gold-branch-leaves`, `leaf-circle-brushstroke`,
`leaf-branch-medium`, `gold-heart-leaf`, `gold-lotus-dots`.

Currently placed: `gold-sparkle-star` + `leaf-branch-medium` (hero),
`gold-lotus-mini` (brand intro), `gold-swirl-leaf` (lifestyle story),
`leaf-single-large` (ingredients), `gold-lotus-dots` (brand story),
`gold-heart-leaf` (gifting), `gold-sunburst` (final CTA),
`gold-branch-leaves` (footer background). The remaining motifs are
available for future sections (e.g. a product detail page) without
needing new asset generation.
