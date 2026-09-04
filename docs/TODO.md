# TODO

See `ROADMAP.md` for the 2026-09-04 client feedback batch (multi-page
site and the desktop hero image swap — done; cart + WhatsApp checkout,
pricing, blog, nav restructure, theme toggle, partner logo strip, and a
design polish pass — not yet done). This file covers everything else.

## Needed from the client before launch

- [ ] Real contact details (email, phone, address) to replace the
      bracketed placeholders in `Footer.tsx`.
- [ ] Real social media URLs, if any exist — none are currently linked
      (deliberately, per the brief's "no fabricated links" rule).
- [ ] Real customer testimonials, if the brand wants a trust section —
      currently omitted rather than faked.
- [ ] Pricing for each product, if the site should show prices.
- [ ] Confirmation on whether "Since 1958" and "Pride of India" (sourced
      from packaging photography) are approved for use as on-site copy.
- [ ] Any certifications (FSSAI number, etc.) legally required to display
      for an Indian food ecommerce site — not currently shown because none
      were supplied.

## Ecommerce build-out (not started — brief explicitly says don't fake it)

The current site is a brand + catalog page, not a working store. To make
it transactional:

- [ ] `/products/[slug]` route + `ProductDetails`, `ProductGallery`,
      `ProductBenefits` components (architecture is ready for this —
      `lib/products.ts` already has a `slug` per product).
- [ ] Cart state + WhatsApp checkout — client has requested this
      specifically (no payment gateway, just a `wa.me` deep link with an
      itemized message); scoped in `ROADMAP.md` #4.
- [ ] A real payment gateway integration (Razorpay is the common choice
      for Indian ecommerce) remains a further-out option if WhatsApp
      checkout isn't sufficient long-term.
- [ ] Order management / confirmation emails.
- [ ] Replace "Enquire Now" CTAs with "Add to Cart" once the above exists.

## Content

- [x] A real About/Story page — done 2026-09-04, see `/story`.
- [ ] Decide whether to surface the other 6 "Why Nouriqo" benefit icons
      (already in `public/assets/icons`, catalogued in `ASSET_MAP.md`) on
      a future ingredients or trust page.

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

- Dark mode: intentionally not implemented (see `PROJECT_CONTEXT.md`).
- A second CMS-editable content layer (e.g. moving `lib/products.ts` /
  `lib/benefits.ts` to a headless CMS): not needed at 3 SKUs, worth
  revisiting once the catalog grows past ~10 products.
