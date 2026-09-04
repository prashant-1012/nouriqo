# Roadmap — Client Feedback (2026-09-04)

Logged from client feedback in one batch. Only **#1** has been
implemented so far, per explicit instruction ("for now just do point
no. 1"). Everything else below is scoped but not yet built.

## 1. Multi-page site (not single-page scroll) — ✅ DONE

Converted from one long scrolling homepage into separate routes, one per
current nav item: `/` (Home), `/sweets` (Our Sweets), `/story` (Our
Story), `/gifting` (Gifting), `/contact` (Contact). `Navbar`/`Footer`
moved into `app/layout.tsx` so they persist across routes. See
`CHANGELOG.md` for the full breakdown and `WEBSITE_STRUCTURE.md` for the
updated sitemap.

Note: item **#9** below redefines the nav as Home/Shop/About/Blogs/
Contact — when that lands, `/sweets` → effectively "Shop", `/story` →
"About", and `/gifting` likely folds into the Shop page rather than
staying a standalone nav item. Routes were kept close to today's nav
labels rather than pre-built around #9's future structure, since only
#1 was in scope for this pass.

## 2. Use `hero-desktop1.png` as the hero image, with text overlaid on it — ✅ DONE

Client re-supplied the file (added to `public/assets/_source/hero-desktop1.png`
on 2026-09-04, after it was mistakenly deleted as unreferenced cruft in
an earlier session — see `CHANGELOG.md`). Converted to
`public/assets/hero/hero-desktop.jpg` and made the new desktop hero.

**Text is overlaid in HTML, not baked into the image pixels** — this
satisfies the visual request (it reads as "text on the image" to any
visitor) while keeping the text selectable, accessible, SEO-indexable,
and responsive, per the brief's original "HTML text must remain HTML"
rule (`AGENTS.md` section 7). A `cream`-tinted gradient scrim over the
image's left side guarantees contrast regardless of the underlying
photo. If the client specifically meant pixels-baked-into-the-file
rather than a visual overlay, flag that back — but the overlay
achieves the same look with none of the downsides.

Mobile keeps its earlier (pre-existing, unrelated to this request)
boxed-card hero treatment rather than also switching to an overlay —
see `CHANGELOG.md` for why that was tried and reverted.

## 3. Smaller, uniform product card size + quantity stepper

Shrink `ProductCard` and enforce one fixed aspect ratio/size across all
three products (currently `aspect-[3/4]`, already uniform — likely means
"smaller overall footprint," e.g. tighter grid columns or a max-width per
card). Add a quantity stepper (−, count, +) at the bottom of each card,
replacing/augmenting the current "Enquire Now" link.

## 4. Cart + WhatsApp checkout

- Add cart state (item + quantity per product), persisted at least for
  the session (localStorage is reasonable for a no-backend cart).
- Cart icon/count in the navbar, opening a drawer or mini-cart.
- "Checkout via WhatsApp": build a formatted message (line items, qty,
  unit price, line total, grand total) and open
  `https://wa.me/917972052896?text=<url-encoded message>`. This requires
  no backend — it's a `wa.me` deep link — but the phone number
  (+91 7972052896) needs to be stored somewhere reviewable (env var or
  a constant with a comment), not hardcoded invisibly in three places.

## 5. Pricing

Add price per product: ₹500 / ₹550 / ₹600 per piece (placeholder
pricing "for now," per the client, not yet final/confirmed retail
pricing — flag clearly in the UI or a code comment that this is
provisional so it doesn't get mistaken for confirmed pricing later. This
also reopens `CONTENT_GUIDELINES.md`'s current "no price shown, none
supplied" note.

## 6. Blog

New `/blogs` (or `/blog`) index + individual post pages, plus a nav
entry. Needs: content source decision (MDX in-repo vs. a headless CMS —
in-repo MDX is the lower-effort starting point for a small site), a
`BlogCard`/`BlogGrid`, and actual post content (client will need to
supply or approve draft posts — brief's "don't fabricate content" rule
applies to blog copy too).

## 7. Active nav-item highlighting

Once multiple real routes exist (done in #1), highlight the current
page's nav link (e.g. via `usePathname()` from `next/navigation`,
compared against each link's `href`). Small, mechanical — good candidate
to bundle with whichever future pass touches `Navbar.tsx` next.

## 8. Auto-scrolling partner/stockist logo strip

Horizontal, continuously auto-scrolling row of partner logos (Amazon,
Blinkit, Zepto, Flipkart, etc.) — a "as seen on / available on" trust
strip. **Needs real logos and confirmed real partnerships from the
client before this can ship** — placing recognizable third-party brand
logos implies an actual commercial relationship; using them without one
would be a false/misleading claim (this crosses the same "don't fabricate
trust signals" line as the fake-testimonials rule already documented in
`CONTENT_GUIDELINES.md`). Once confirmed, implementation is a simple CSS
`@keyframes` marquee (translateX loop, duplicated logo set for a seamless
loop, `prefers-reduced-motion` fallback to a static row).

## 9. Navbar restructure: Home / Shop / About / Blogs / Contact Us

Supersedes today's Home/Our Sweets/Our Story/Gifting/Contact nav once
Blog (#6) exists. Likely mapping: Our Sweets → Shop, Our Story → About,
Gifting → folds into Shop (or stays as a Shop sub-section), Contact →
Contact Us. Should land in the same pass as #6, since it depends on the
blog route existing.

## 10. Light/dark theme toggle

`PROJECT_CONTEXT.md` currently documents "no dark mode" as a deliberate
brand decision (premium F&B sites usually commit to one fixed look).
Client has now asked for a toggle, which reverses that decision —
noting the reversal explicitly since it's a documented call being
undone. Needs: a dark-mode token set for every color in
`DESIGN_SYSTEM.md` (not just an inversion — cream/gold read very
differently on dark), a toggle control (navbar, most likely), and
`localStorage` + `prefers-color-scheme` handling to avoid a flash of
wrong theme on load.

## 11. Reduce "AI feel," lean harder into `ui-ux-pro-max` / `ui-styling` + more motion

General direction note rather than a discrete task: audit the current
visual design against the `ui-ux-pro-max` skill's style/palette/font-
pairing references, and add more Framer Motion throughout (current
`Reveal`/`RevealGroup` usage is intentionally restrained per
`DESIGN_SYSTEM.md`'s "don't animate everything" rule — this asks for
more, so that restraint should be revisited). Best tackled as a
dedicated design pass once the structural items above (multi-page,
cart, pricing) settle, rather than piecemeal — the layout is still
moving under items 3/4/6/9.

---

**Suggested build order** for the remaining items, given dependencies:
5 (pricing) → 3 (card resize + qty) → 4 (cart + WhatsApp) →
6 (blog) → 9 (nav restructure, depends on 6) → 7 (active nav state) →
8 (partner strip — blocked on client confirming real partners/logos) →
10 (theme toggle) → 11 (design polish pass, last, since earlier items
still reshape layout).

**Status as of 2026-09-04 (2):** #1 and #2 done. Everything else above
still open.
