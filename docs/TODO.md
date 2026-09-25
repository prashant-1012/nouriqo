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

- [ ] **`components/sections/Testimonials.tsx` (`/testimonials`) renders
      nine fabricated testimonials attributed to fictional named
      people.** Added 2026-09-08 at the user's explicit instruction,
      after this exact request was flagged as conflicting with
      `CONTENT_GUIDELINES.md`'s original "no fake reviews" rule — see
      `CHANGELOG.md` and the note atop `lib/testimonials.ts`. Unlike
      Certifications, this ships with **no on-page disclaimer** (that
      option was explicitly declined). **Before this goes to a live or
      client-facing build:** confirm the client is aware fabricated
      testimonials are on the site and is comfortable with that risk
      (consumer-protection/advertising-standards rules in most
      jurisdictions, including India's ASCI code, restrict presenting
      testimonials that don't come from real customers), or replace
      `lib/testimonials.ts` with real customer quotes.

- [x] ~~Four legal pages describe payments as processed by PayU~~ —
      resolved 2026-09-25: all four (`/privacy-policy`,
      `/terms-of-service`, `/refund-policy`, `/shipping-policy`) are now
      the client's own text, which refers to "third-party payment
      service providers" rather than naming PayU. The client supplied
      the wording; we haven't had it legally reviewed, so whether it
      meets India's DPDP Act and Consumer Protection (E-Commerce) Rules
      is the client's call. See `CHANGELOG.md` 2026-09-25.
- [ ] **"Terms and Conditions" vs "Terms of Service".** The client's
      Privacy Policy (intro paragraph) refers to our "Terms and
      Conditions"; the client's own terms page is titled "Terms of
      Service". Left as supplied — ask the client which name to use in
      both.

## Needed from the client before launch

- [x] ~~Confirm the working defaults used in the legal pages~~ —
      superseded 2026-09-25: `refundPolicy` and `shippingPolicy` are
      now the client's own text with their own figures (5-day window
      for damaged/incorrect/missing, 10-day for spoiled, 24–48h
      response; dispatch within 3 working days, up to 10 for
      made-to-order/out-of-stock). Our 48-hour / 5–7 day / 1–2 day /
      3–7 day defaults are gone.
- [ ] **Wix shipping settings vs the client's Shipping Policy.** The
      policy (2026-09-25) says shipping charges apply and free shipping
      is only offered as a stated promotion. Wix currently returns
      "Free shipping" at ₹0.00 for every order, and an international
      shipping region is active (see `WIX_PROGRESS.md`). Configure Wix
      shipping rates to match the policy before the Wix checkout goes
      live.
- [x] Refund page name — the page is now titled "Refund, Return &
      Replacement Policy" (2026-09-25), matching the client's text and
      the Shipping Policy's reference to it. URL stays `/refund-policy`
      and the footer label stays "Refund Policy".
- [ ] Confirm the legal/registered business name to use in
      `ContactInfo.tsx`'s new "Business Name" row and the legal pages'
      company-identification lines. Currently set to the brand name,
      "Nouriqo," per the client's explicit answer — flagging only in
      case PayU's own KYC needs a distinct registered entity name.
- [ ] **Real shipping charge.** `lib/config.ts`'s `SHIPPING_CHARGE` is a
      flat ₹50 per order — an explicit placeholder the client asked for
      rather than a courier-rate calculation, added 2026-09-13 alongside
      the checkout build. Confirm the real rate (or rule, if it should
      vary by weight/location) before launch.
- [ ] **PayU live credentials, at cutover.** The checkout/payment flow
      (`lib/payu.ts`, `.env`'s `PAYU_KEY`/`PAYU_SALT`/`PAYU_ENV`) is built
      and tested against sandbox-shaped placeholder credentials — see
      `ECOMMERCE_BUILDOUT.md` Phase 3. Before this goes live: (1) a real
      PayU **test** key/salt (from the PayU dashboard, Test Mode toggle)
      to run one real transaction through PayU's actual hosted page —
      not yet done, since that needs the client's PayU account access,
      not just the placeholder values used for local development; (2)
      at cutover, the real **live** key/salt and `PAYU_ENV=production`.
- [x] The real Super Admin account — created 2026-09-14 via
      `scripts/create-admin.ts` (phone `7972052896`, name "Super Admin"
      as a placeholder display name — there's no self-edit-profile
      screen yet to change it; ask if that's wanted). Password was
      generated and shared with the client directly, not recorded here.
      **Still worth doing:** the client should change this password
      once a self-service "change password" screen exists (not built
      yet — `scripts/create-admin.ts` re-run is the only reset path
      today).
- [ ] **Product image uploads are out of scope for now.** Admin can
      add/edit/delete products (`/admin/products`), but the image field
      is a text path (e.g. `/assets/products/example.jpg`), not a file
      upload — the actual image file still needs to be placed into
      `public/assets/products/` some other way (by a developer, or a
      future upload feature). A deliberate scope limit, not an
      oversight — see `ECOMMERCE_BUILDOUT.md` Phase 4.

- [x] Phone — `+91 99606 25495` added 2026-09-13 to `ContactInfo.tsx`,
      `Footer.tsx`, and `WHATSAPP_ORDER_NUMBER` (`lib/config.ts`), per
      client instruction.
- [x] Email (`sales1earth@gmail.com`) and address ("Pune, Maharashtra,
      India") added 2026-09-25 to `ContactInfo.tsx` and `Footer.tsx`,
      taken from the client's Privacy Policy text.
- [ ] **Two phone numbers are live.** All four of the client's legal
      pages (2026-09-25) list `+91 92701 31986` as Phone/WhatsApp; the
      footer, `/contact`, and `WHATSAPP_ORDER_NUMBER` still use
      `+91 99606 25495`. Kept that way at the user's instruction — confirm with the client which is
      current, then make them match.
- [ ] Real social media URLs, if any exist — none are currently linked
      (deliberately, per the brief's "no fabricated links" rule).
- [ ] **Real customer testimonials.** A `/testimonials` page shipped
      2026-09-08 with nine fabricated illustrative testimonials (see
      `CONTENT_GUIDELINES.md`'s "What We Do NOT Claim Without
      Confirmation" section and `lib/testimonials.ts`) — built at
      explicit user instruction, overriding this project's original
      "no fake reviews" rule. Flagging here the same way as the
      Certifications BLOCKING item above: the client should confirm
      they're aware fabricated testimonials are live before this goes
      to a real launch, and ideally supply real ones to replace them.
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

## Ecommerce build-out

Full plan now lives in **`ECOMMERCE_BUILDOUT.md`** (added 2026-09-13)
— a 5-phase plan (Website → Backend/Postgres → PayU → Admin →
Shiprocket) covering the real payment gateway, order system, admin
dashboard, and shipping that this section used to stub out. This
section now just keeps the historical log of what shipped before that
plan existed:

- [x] Cart state + WhatsApp checkout — done 2026-09-04, see `ROADMAP.md`
      #4 and `lib/cart-context.tsx` / `components/cart/`. No payment
      gateway involved — checkout is a `wa.me` deep link with an
      itemized message; the client confirms/adjusts the order over chat.
      Whether this stays as a fallback once PayU checkout ships (per
      `ECOMMERCE_BUILDOUT.md`) is an open decision — see that doc's
      "Open Decisions" section.
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

- [ ] **Hydration mismatch under `prefers-reduced-motion`.** Found
      2026-09-20 while testing the enquiry popup; pre-existing and
      unrelated to it (reproduces on `/contact`, where the popup never
      renders). `components/motion/Reveal.tsx`'s `Reveal`/`RevealGroup`/
      `RevealItem` all call `useReducedMotion()` and early-return a plain
      `<div>`. That hook returns false during SSR, so the server emits
      `motion.div`'s `initial` styles (`opacity: 0; transform:
      translateY(20px)`) while the client renders the unstyled `<div>` —
      React logs a hydration mismatch, and since it explicitly "won't be
      patched up" those inline styles can leave content stuck invisible.
      Affects only visitors with reduced motion enabled — but for them
      it's every revealed section on every page. Usual fix: gate on a
      mounted flag (always render the motion element, disable the
      animation via props) rather than branching which element is
      returned. See `CHANGELOG.md` 2026-09-20 (2).

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
