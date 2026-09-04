# TODO

See `ROADMAP.md` for the 2026-09-04 client feedback batch. Done so far:
multi-page site, the desktop hero image swap, smaller/uniform product
cards, cart + WhatsApp checkout, pricing, the blog, the nav restructure,
active nav-state highlighting, and the partner logo strip. Not yet done:
a design polish pass (theme toggle was withdrawn, not deferred — see
`ROADMAP.md`). This file covers everything else.

## BLOCKING — must not go live as-is

- [ ] **`components/sections/Certifications.tsx` renders placeholder
      certification logos (India Organic, FDA, USOCA, FSSAI, an organic
      seal) that Nouriqo has NOT confirmed holding.** Added 2026-09-05
      (4) explicitly as a design-reference mockup only, per the client's
      own answer when asked ("placeholders for design purposes only") —
      see `CHANGELOG.md` for the full exchange. This is categorically
      different from the other provisional content below (pricing,
      counters): those are soft marketing claims that a disclaimer
      legitimately softens, but a certification/registration logo is a
      binary legal claim. **Before this can ship to a live or
      client-facing build:** either (a) get real, confirmed
      certifications from the client — FSSAI in particular requires a
      real license number displayed alongside the logo, and unauthorized
      use of the FDA mark is separately restricted regardless of the
      product's actual regulatory status — and swap them into
      `lib/certifications.ts`, or (b) remove the section entirely if no
      real certifications exist yet. Do not simply remove the on-page
      "placeholders, pending verified credentials" disclaimer without
      doing one of those two things first.

## Needed from the client before launch

- [ ] Real contact details (email, phone, address) to replace the
      bracketed placeholders in `Footer.tsx`.
- [ ] Real social media URLs, if any exist — none are currently linked
      (deliberately, per the brief's "no fabricated links" rule).
- [ ] Real customer testimonials, if the brand wants a trust section —
      currently omitted rather than faked.
- [x] Pricing — added 2026-09-04 (see `ROADMAP.md` #5), but it's
      placeholder pricing the client explicitly called provisional.
      **Still needed:** confirmation of real, final retail pricing
      before launch, at which point the "indicative and may change"
      disclaimer (`ProductGrid`, `CartDrawer`) should come off.
- [ ] Confirmation on whether "Since 1958" and "Pride of India" (sourced
      from packaging photography) are approved for use as on-site copy.
- [ ] Any certifications (FSSAI number, etc.) legally required to display
      for an Indian food ecommerce site — see the BLOCKING item above;
      a section now exists but renders unconfirmed placeholder logos.
- [ ] Real numbers for the home page `Counters` section (positive
      feedback %, customers, followers, retail stores) — added
      2026-09-05 (2) using the reference screenshot's numbers
      (92% / 18K+ / 18K+ / 180+) explicitly as provisional placeholders,
      not confirmed Nouriqo metrics (client's call — see
      `CONTENT_GUIDELINES.md` and `lib/counters.ts`). **Still needed:**
      real figures before launch, at which point the "provisional
      placeholders" disclaimer under the row should come off.
- [ ] Confirmation of the 1 kg = 2x the 500 gram price rule
      (`lib/products.ts`'s `weightOptions`) as real, final pricing —
      it's a client-specified rule, not invented, but still pairs with
      the same "indicative and may change" pricing disclaimer above.

## Ecommerce build-out (not started — brief explicitly says don't fake it)

The current site is a brand + catalog page, not a working store. To make
it transactional:

- [ ] `/products/[slug]` route + `ProductDetails`, `ProductGallery`,
      `ProductBenefits` components (architecture is ready for this —
      `lib/products.ts` already has a `slug` per product).
- [x] Cart state + WhatsApp checkout — done 2026-09-04, see `ROADMAP.md`
      #4 and `lib/cart-context.tsx` / `components/cart/`. No payment
      gateway involved — checkout is a `wa.me` deep link with an
      itemized message; the client confirms/adjusts the order over chat.
- [ ] A real payment gateway integration (Razorpay is the common choice
      for Indian ecommerce) remains a further-out option if WhatsApp
      checkout isn't sufficient long-term.
- [ ] Order management / confirmation emails — currently the WhatsApp
      message itself *is* the order; there's no record of it on the
      site side (no order history, no confirmation email).
- [x] "Enquire Now" replaced with "Add to Cart" on `ProductCard` — done
      2026-09-04. (It remains as an explicit link on `/gifting` and
      `/contact` for non-catalog enquiries.)

## Content

- [x] A real About/Story page — done 2026-09-04, see `/story`.
- [ ] Decide whether to surface the other 6 "Why Nouriqo" benefit icons
      (already in `public/assets/icons`, catalogued in `ASSET_MAP.md`) on
      a future ingredients or trust page.
- [x] Blog — done 2026-09-04, see `/blogs` and `ROADMAP.md` #6. **Still
      needed:** the client should review/approve the three seed posts
      (`lib/blog-posts.ts`) before launch — they're in-house-written
      editorial content, not client-supplied, per `CONTENT_GUIDELINES.md`'s
      "Blog Content" section.

## Technical

- [ ] Revisit the dual hero image preload trade-off if Lighthouse LCP
      numbers come back tight — see `PERFORMANCE_GUIDELINES.md`.
- [ ] Add `sitemap.xml` / `robots.txt` file conventions
      (`app/sitemap.ts`, `app/robots.ts`) once the site has a real
      production domain — worth doing now that 5 routes exist (was
      lower priority when there was only `/`).
- [ ] Add Product structured data (`schema.org/Product`) once pricing and
      availability are confirmed — not added yet since the brief forbids
      inventing structured data.
- [ ] Run a full Lighthouse pass against a deployed (not local dev)
      build once hosting is decided.
- [ ] Consider a Lottie micro-interaction for a future "added to
      enquiry"/cart confirmation moment, once that flow exists — no
      genuine use case for one exists yet on the current static page.

## Explicitly deferred, not forgotten

- URL slugs (`/sweets`, `/story`) weren't renamed to match the new nav
  labels (Shop, About) — see `ROADMAP.md` #9 for why. If the client
  wants `/shop` and `/about` as the actual URLs too (not just nav text),
  that's a well-defined but separate follow-up: rename the two route
  folders and update every internal `Link`/`Button` `href` that points
  to them (`Hero`, `FinalCta`, `CartDrawer`, `Footer`, `nav-links.ts`),
  plus the `docs/` references to those paths.
- Cart is `localStorage`-only: it doesn't sync across devices/browsers
  and clears if the visitor clears site data. Fine for a WhatsApp-
  handoff checkout with no accounts; would need real backend-backed
  cart state if accounts/order history are ever added.
- Dark mode: intentionally not implemented (see `PROJECT_CONTEXT.md`).
- A second CMS-editable content layer (e.g. moving `lib/products.ts` /
  `lib/benefits.ts` to a headless CMS): not needed at 3 SKUs, worth
  revisiting once the catalog grows past ~10 products.
