# TODO

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
- [ ] Cart state (context or a small store) + a cart drawer/page.
- [ ] Checkout flow + a real payment gateway integration (Razorpay is the
      common choice for Indian ecommerce, but this is the client's call).
- [ ] Order management / confirmation emails.
- [ ] Replace "Enquire Now" CTAs with "Add to Cart" once the above exists.

## Content

- [ ] A real About/Story page if the brand wants to go deeper than the
      homepage's one heritage section.
- [ ] Decide whether to surface the other 6 "Why Nouriqo" benefit icons
      (already in `public/assets/icons`, catalogued in `ASSET_MAP.md`) on
      a future ingredients or trust page.

## Technical

- [ ] Revisit the dual hero image preload trade-off if Lighthouse LCP
      numbers come back tight — see `PERFORMANCE_GUIDELINES.md`.
- [ ] Add `sitemap.xml` / `robots.txt` file conventions
      (`app/sitemap.ts`, `app/robots.ts`) once the site has a real
      production domain and, ideally, more than one route.
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
