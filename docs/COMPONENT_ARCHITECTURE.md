# Component Architecture

**Two root layouts, added 2026-09-14 (ECOMMERCE_BUILDOUT.md Phase 4).**
Next.js allows more than one `<html>/<body>` root layout only via route
groups, and every top-level route must belong to exactly one. The
admin panel needed its own root layout (no customer Navbar/Footer/
cart), so every pre-existing route moved into `app/(site)/` — the
group is invisible in the URL, `app/(site)/page.tsx` is still just
`/`. `app/admin/layout.tsx` is the second, independent root layout.
`app/globals.css` and `app/favicon.ico` stay at the true top level and
are imported/referenced by both.

```
app/
  (site)/
    layout.tsx              root layout — CartProvider wraps Navbar + Footer + CartDrawer + {children}
    page.tsx                Home ("/")
    sweets/page.tsx         Our Sweets
    story/page.tsx          Our Story
    gifting/page.tsx        Gifting
    blogs/page.tsx          Journal (blog index)
    blogs/[slug]/page.tsx   individual post — generateStaticParams + generateMetadata
    testimonials/page.tsx   Testimonials
    contact/page.tsx        Contact
    privacy-policy/page.tsx      Privacy Policy
    terms-of-service/page.tsx    Terms of Service
    refund-policy/page.tsx       Refund & Cancellation Policy
    shipping-policy/page.tsx     Shipping & Delivery Policy
    products/[slug]/page.tsx     added 2026-09-13 (Phase 2) — PDP,
                               generateMetadata only, no generateStaticParams (see
                               WEBSITE_STRUCTURE.md for why: renders fresh every request)
    checkout/page.tsx            added 2026-09-13 (Phase 3) — delivery-details form + order
                               summary (CheckoutForm), not yet linked from the cart drawer
    checkout/actions.ts           "use server" — submitOrder(customer, lines): creates the
                               Order/OrderItem/Payment rows via lib/orders-db.ts, then
                               redirect()s to /checkout/payu-redirect?txnid=... on success,
                               or returns { error } for CheckoutForm to show inline
    checkout/payu-redirect/page.tsx   reads ?txnid=, loads the Payment+Order, computes the
                               PayU request hash, renders PayuAutoSubmitForm. Fully dynamic
                               (no generateStaticParams — every txnid is a fresh payment)
    checkout/failed/page.tsx      reached only via a failed/rejected PayU callback — "your
                               cart is still saved" message + link back to /checkout
    order-success/page.tsx        reads ?order=<orderNumber>, 404s unless that order's
                               paymentStatus is PAID (never shows an unpaid order's details,
                               even to someone who guesses/reuses the URL) — renders the
                               confirmation and mounts ClearCartOnMount
  admin/                      added 2026-09-14 (Phase 4) — own root layout, no
                             Navbar/Footer/CartProvider (see the note above)
    layout.tsx                 root layout — fonts + globals.css only, no auth check
                             (it wraps /admin/login too — see below)
    login/page.tsx              public — phone + password (LoginForm)
    login/actions.ts             "use server" — login(phone, password): same generic
                             error for "no such phone" and "wrong password" (don't let
                             the form reveal which phone numbers are registered admins)
    (protected)/layout.tsx        requireAdmin() gate + AdminShell (sidebar/header/logout)
                             — a route group so it applies to every /admin/* route
                             EXCEPT /admin/login, which sits outside it as a sibling
    (protected)/actions.ts         "use server" — logout()
    (protected)/page.tsx            dashboard home ("/admin") — product/order/revenue counts
    (protected)/products/page.tsx    list, links to new/edit, DeleteButton per row
    (protected)/products/new/page.tsx        ProductForm (create mode)
    (protected)/products/[id]/edit/page.tsx  ProductForm (edit mode)
    (protected)/products/actions.ts           "use server" — createProduct/updateProduct/
                             deleteProduct, each calling requireAdmin() independently (see
                             the security note below — a page-level gate alone isn't enough)
    (protected)/orders/page.tsx      list — order number, customer, total, payment/shipment
                             status badges
    (protected)/orders/[id]/page.tsx  detail — customer/address/items/payment-attempt
                             history + ShipmentStatusControl
    (protected)/orders/actions.ts     "use server" — updateShipmentStatus()
    (protected)/users/page.tsx       Super-Admin-only — list + CreateUserForm + DeleteButton
                             per row (can't delete yourself; can't delete the last Super Admin)
    (protected)/users/actions.ts      "use server" — createAdminUser/deleteAdminUser, each
                             calling requireSuperAdmin() independently
  api/payu/callback/route.ts    POST-only — both PayU's surl and furl point here. Verifies
                             the reverse hash (lib/payu.ts), looks up the Payment by
                             txnid, calls PayU's verify_payment API as a second server-to-
                             server reconciliation (falls back to the hash-verified
                             redirect status if that call itself fails/times out — see the
                             code comment), updates Payment + Order, then redirects to
                             /order-success or /checkout/failed. Never trusts the redirect
                             payload without the hash check first
```

**Every admin Server Action calls `requireAdmin()`/`requireSuperAdmin()` itself
— the `(protected)` layout's gate isn't enough on its own.** A layout only
gates *page rendering*; a Server Action is independently invocable (the
client holds a reference to it once the page that uses it has loaded), so
skipping the check inside e.g. `deleteProduct()` on the theory that "the
page already checked" would let that one action be called without a
valid session. Same reasoning for `deleteAdminUser`/`createAdminUser`
needing their own `requireSuperAdmin()` call, not just `requireAdmin()` —
and `/admin/users/page.tsx` itself also calls `requireSuperAdmin()`
directly, since the `(protected)` layout only checks *some* admin is
logged in, not which role.

```
components/
  admin/                      added 2026-09-14 (Phase 4) — all "use client"; these are
                             the interactive pieces admin pages (server components) compose
    LoginForm.tsx               phone + password, calls the login action directly (same
                             call-as-a-function pattern as CheckoutForm, not native
                             <form action>, so it can show the returned error inline)
    AdminShell.tsx               sidebar nav (usePathname() for active-link highlight) +
                             logout form + main content area. Renders the Users nav link
                             only for role === "SUPER_ADMIN" — but see the security note
                             above the app/ tree: this is a UI convenience, not the
                             actual access control (the page and its actions gate too)
    ProductForm.tsx              create AND edit share this one component (an optional
                             `product` prop switches modes) — dynamic pack-size/price rows
                             (add/remove), comma-separated attributes text field
    CreateUserForm.tsx            name/phone/password/role — used only on the Users page
    DeleteButton.tsx              generic confirm-then-call-server-action button, reused by
                             the products list and users list (takes the bound action —
                             e.g. deleteProduct.bind(null, product.id) — as a prop)
    StatusBadge.tsx               color-coded pill for any Order/Payment status enum value
    ShipmentStatusControl.tsx     select + auto-save (useTransition, no explicit save
                             button) for an order's shipmentStatus
  layout/
    Container.tsx         max-width + responsive padding wrapper
    PageHeader.tsx          shared sub-page banner: eyebrow + h1 + description, on a cream band
  navigation/
    Navbar.tsx            server component: logo, sticky header, renders NavLinks + CartButton
    NavLinks.tsx           "use client" (needs usePathname()): desktop nav, animated
                           active-link indicator (line — lucide Leaf — line, echoing the
                           brand mark) via Framer Motion layoutId
    MobileMenu.tsx         "use client": hamburger + animated drawer, active-row highlight
  cart/
    CartButton.tsx          "use client": navbar icon + item-count badge, opens the drawer
    CartDrawer.tsx           "use client": line items, qty steppers, total, WhatsApp checkout —
                             rendered once in app/(site)/layout.tsx, NOT inside Navbar's <header>
                             (see the stacking-context note below). Looks up each line's
                             product/price from useCart()'s products array (added 2026-09-13),
                             not a direct lib/products.ts import — Prisma can't run in a
                             client component, so the database read happens once, server-side,
                             in app/(site)/layout.tsx, and is passed down as a prop
  checkout/
    CheckoutForm.tsx          "use client" — added 2026-09-13. Delivery-details form +
                             order summary in one component (deliberately not split
                             further — tightly coupled content for a single page). Calls
                             the submitOrder server action directly as a function (not a
                             native <form action={...}>, since cart lines come from
                             useCart(), not form fields) and shows its returned { error }
                             inline; a successful call never returns — the action
                             redirect()s server-side
    PayuAutoSubmitForm.tsx    "use client" — renders a hidden form with the PayU fields as
                             props and submits it via a useEffect on mount (a <noscript>
                             fallback button covers the no-JS case). This is the one place
                             a real network request leaves the app straight to PayU
    ClearCartOnMount.tsx      "use client" — mounted only on /order-success, after payment
                             is already confirmed server-side. Waits for CartProvider's
                             hasHydrated flag before calling clearCart() — see the
                             lib/cart-context.tsx entry below for why that ordering matters
  enquiry/                    added 2026-09-20
    EnquiryPopup.tsx           "use client" — timed modal enquiry form (name/
                             mobile/email/address/message, all required),
                             opening 5s after landing and handing off to
                             WhatsApp via lib/whatsapp.ts. Rendered in
                             app/(site)/layout.tsx beside CartDrawer, NOT
                             inside Navbar (same backdrop-filter containing-
                             block reason — see the note below). Shows once
                             per browsing session (sessionStorage flag set on
                             show, so X / Escape / backdrop / submit all
                             behave alike), skips the routes listed in
                             lib/enquiry-popup.ts, and declines to open if the
                             cart drawer is already open rather than stacking
                             two overlays. Unlike CartDrawer it implements a
                             real focus trap: focus goes to the dialog
                             container itself (tabIndex={-1}) so screen
                             readers announce the title, Tab/Shift+Tab wrap
                             inside, and focus is restored on close. Inputs
                             are 16px, not the 14px used by /contact's inline
                             form — below 16px iOS Safari auto-zooms the
                             viewport on focus
  hero/
    Hero.tsx               art-directed (desktop/mobile) hero — Home only
  products/
    ProductCard.tsx         one product's image+badge, title, and AddToCartControl — no
                             description/attributes/rating on the card (see below). Image
                             and title link to /products/[slug] (added 2026-09-13 — the
                             card used to be a dead end with no detail page to reach)
    ProductGrid.tsx          async server component (added 2026-09-13), maps
                             lib/products-db.ts's getProducts() -> ProductCard — used on
                             both `/` and `/sweets`. lib/products.ts is no longer the live
                             read path, see the lib/ entries below
    ProductDetails.tsx       added 2026-09-13 — /products/[slug]'s content: image + eyebrow/
                             h1/variant/description/attribute chips + AddToCartControl, in
                             the same asymmetric lg:grid-cols-12 layout as Gifting.tsx
    AddToCartControl.tsx     "use client": owns pack-size (weightOptions) selection state,
                             renders the price row (reactive to selection) + dropdown + "Add to Cart".
                             Used identically by both ProductCard and ProductDetails
    QuantityStepper.tsx      "use client", controlled (value/onChange) — used only by
                             CartDrawer's per-line qty control (ProductCard has no stepper;
                             quantity is adjusted in the cart, not before adding)
  blog/
    BlogCard.tsx             one post's cover image + date/read-time + title + excerpt
    BlogGrid.tsx             section wrapper, maps lib/blog-posts.ts -> BlogCard — `/blogs`
    BlogPostHeader.tsx       "Back to Journal" + date/read-time + h1 — `/blogs/[slug]`
    BlogContent.tsx          renders a post's heading/paragraph blocks
  legal/
    LegalContent.tsx         renders a legal page's heading/paragraph/list blocks
                             (same block-renderer pattern as BlogContent, plus a
                             "list" block type for numbered/bulleted clauses) —
                             used by all four /privacy-policy, /terms-of-service,
                             /refund-policy, /shipping-policy pages
  sections/
    BrandIntro.tsx          Home only, between ProductGrid and WhyNouriqo. bg-cream (not
                             ivory) specifically so it doesn't repeat ProductGrid's ivory
                             tone right after it — see DESIGN_SYSTEM.md's rhythm rule
    WhyNouriqo.tsx          Home only — photo collage (3 process shots, CSS-grid row-span
                             layout) + heading + 4-item icon/title/description feature list,
                             sourced from lib/benefits.ts. Redesigned 2026-09-05 (3) from a
                             plain 6-icon grid to this richer two-column layout
    Counters.tsx             "use client" — Home only, between WhyNouriqo and Certifications.
                             4 stat tiles with a scroll-triggered count-up (Framer Motion
                             useInView + animate on a useMotionValue), reduced-motion aware.
                             Figures are provisional placeholders — see lib/counters.ts.
    Certifications.tsx       Home only, between Counters and Partners. Logos are
                             PLACEHOLDERS ONLY, not confirmed real certifications — see the
                             BLOCKING item in TODO.md before touching this section's content.
    Partners.tsx             Home only, between Certifications and FinalCta. "We're Also
                             On" — 14 real, client-confirmed stockist logos (ROADMAP.md #8)
                             in a continuously auto-scrolling CSS marquee (--animate-marquee
                             in globals.css). No placeholder disclaimer — unlike
                             Certifications, these are confirmed real.
    LifestyleStory.tsx      `/story`
    Ingredients.tsx         `/sweets`
    OurCraft.tsx            `/sweets`
    BrandStory.tsx          `/story`
    Gifting.tsx             `/gifting`
    Testimonials.tsx         `/testimonials` — three auto-scrolling columns
                             (components/ui/TestimonialsColumn.tsx) built from
                             lib/testimonials.ts, each showing 3 of the 9
                             testimonials, visible from `sm:`/`lg:` up. Below
                             `sm:` those three are replaced by a single
                             `sm:hidden` column carrying all 9 testimonials
                             (added 2026-09-13 — the 3-column split otherwise
                             left 6 of 9 testimonials permanently invisible on
                             mobile, since two of the three columns were just
                             CSS-hidden, not redistributed). Content is
                             illustrative, not from real named customers —
                             see the note atop lib/testimonials.ts and
                             CONTENT_GUIDELINES.md
    FinalCta.tsx             Home + `/gifting`
    EnquiryForm.tsx           "use client" — `/contact`, above ContactInfo. Name/contact/
                             email/message fields; submits by building a WhatsApp deep link
                             (lib/whatsapp.ts's buildWhatsAppEnquiryUrl) and opening it in a
                             new tab — same honest no-backend pattern as cart checkout, not
                             a fake "message sent" claim (the page copy says "opens WhatsApp
                             with your message pre-filled")
    ContactInfo.tsx          `/contact` — business name, email/phone/address list.
                             Business Name and Phone are real (Nouriqo /
                             +91 99606 25495, added 2026-09-13); Email and
                             Address remain bracketed placeholders
  ui/
    Button.tsx              primary/secondary/ghost/inverted link-button
    SectionHeading.tsx       eyebrow + title + description, light/dark tone
    TestimonialsColumn.tsx   "use client" — one auto-scrolling column of
                             testimonial cards (framer-motion translateY
                             loop, reduced-motion aware — same if/return
                             pattern as motion/Reveal.tsx). Each card's
                             avatar is a next/image render of a photo from
                             lib/testimonials.ts's image field — see the
                             note there and in ASSET_MAP.md's testimonials/
                             section on where those photos came from
  decorative/
    Motif.tsx                thin wrapper around next/image for aria-hidden decorative PNGs
  motion/
    Reveal.tsx               Reveal / RevealGroup / RevealItem (Framer Motion, reduced-motion aware)
  footer/
    Footer.tsx              renders once, in app/(site)/layout.tsx. Bottom bar (below the
                             4-column grid) links the four legal pages next to the
                             copyright line — not a 5th grid column, since the grid
                             is already full (Brand spans 2, Explore 1, Contact 1)

lib/
  products.ts               Product/WeightOption TYPES (still the shared shape every
                             component uses) + the original static data array — as of
                             2026-09-13 that array is only the seed source for the database
                             (see prisma/seed.ts), not the live read path. Each product has
                             a weightOptions: { weight, price }[] array (currently 500 gram
                             / 1 kg, 1 kg priced at exactly 2x) instead of a single
                             weight/price pair — see CHANGELOG.md 2026-09-05 (2)
  products-db.ts             added 2026-09-13 (ECOMMERCE_BUILDOUT.md Phase 2) — getProducts()
                             / getProductBySlug(), the live, database-backed replacements
                             for lib/products.ts's array. Both wrapped in React's cache() so
                             one request calling both (e.g. app/(site)/layout.tsx + a page) only
                             queries the database once. Maps Prisma's generated Product/
                             ProductWeightOption rows back into the same Product/WeightOption
                             shape lib/products.ts always exposed, so ProductCard/
                             AddToCartControl/CartDrawer needed no prop-type changes.
                             SUPERSEDED 2026-09-20 — nothing imports this any more; the live
                             read path is products-wix.ts. Kept as the fallback until a real
                             payment clears through Wix. See docs/WIX_INTEGRATION.md
  wix-client.ts              added 2026-09-20 — visitor-token auth and the authenticated fetch
                             wrapper for the Wix REST API. Token cached in memory (it's a
                             credential, not page data); Authorization takes the BARE token,
                             no "Bearer " prefix. Exports WIX_PRODUCTS_TAG, the cache tag every
                             catalog read carries
  products-wix.ts            added 2026-09-20 — getProducts() / getProductBySlug() reading the
                             live Wix Stores catalog, replacing products-db.ts. Returns the
                             exact same Product shape, which is why the swap touched only three
                             import lines. Pack sizes come from Wix variants sorted by numeric
                             weight, not label. CATALOG V1 endpoints only — V3 will not work
                             against this site
  product-presentation.ts    added 2026-09-20 — the fields Wix Stores has no home for (accent,
                             tagline, variant sub-label, ingredient badges, image alt). Hybrid
                             model: defaults make any brand-new client-added product look right
                             with zero code changes; OVERRIDES pins per-slug styling. Unknown
                             products get a slug-hashed accent so it stays stable across deploys
  counters.ts                 Counter type + data for the home page Counters section — icon,
                             target value, suffix, label. Figures are provisional placeholders,
                             not confirmed metrics (see CONTENT_GUIDELINES.md and TODO.md)
  certifications.ts           Certification type + data for the home page Certifications
                             section — logo, name. PLACEHOLDER LOGOS, not confirmed real
                             certifications — see the BLOCKING item in TODO.md
  partners.ts                 Partner type + data for the home page Partners marquee —
                             logo, name. Real, client-confirmed stockists (ROADMAP.md #8)
  blog-posts.ts              BlogPost type + data (title/excerpt/date/readTime/coverImage/content
                             blocks) — same data-driven pattern as products.ts, no MDX/CMS
                             tooling; see the note below on why
  benefits.ts                Benefit type + data for WhyNouriqo's feature list — icon, title,
                             description (4 items; not every icon.png in public/assets/icons
                             is referenced here, see ASSET_MAP.md)
  testimonials.ts             Testimonial type + data (name, role, text) for the
                             /testimonials page — illustrative content, not from real named
                             customers; see the source comment and CONTENT_GUIDELINES.md
  legal-pages.ts               LegalBlock/LegalPage types + formatLegalDate(), and the four
                             named page exports (privacyPolicy, termsOfService, refundPolicy,
                             shippingPolicy) each route reads directly — no lookup array,
                             since these are four fixed routes, not a growing catalog like
                             blog-posts.ts. Drafted content, not lawyer-reviewed — see TODO.md
  db.ts                        added 2026-09-13 (ECOMMERCE_BUILDOUT.md Phase 2) — Prisma
                             Client singleton, using the @prisma/adapter-pg driver adapter
                             (mandatory in Prisma 7) and Vercel Postgres's pooled
                             DATABASE_URL. Next.js hot-reload-safe (globalThis-cached).
                             Used by lib/products-db.ts (see above) — the site's read side
                             now queries the database; lib/products.ts's array is seed-only
  admin-auth.ts                 added 2026-09-14 (Phase 4) — hashPassword/verifyPassword
                             (bcryptjs), createSession/destroySession (DB-backed
                             AdminSession rows, not JWT — logging out or revoking access is
                             just deleting a row), getCurrentAdmin (returns null, never
                             throws), and requireAdmin/requireSuperAdmin (redirect to
                             /admin/login or /admin if the check fails — for use in pages,
                             layouts, and every admin Server Action, see the note above the
                             app/ tree). Tagged `import "server-only"` so it can never end
                             up in a client bundle
  enquiry-popup.ts             added 2026-09-20 — EnquiryPopup's tuning knobs in
                             one place: ENQUIRY_POPUP_SESSION_KEY (versioned
                             sessionStorage key), ENQUIRY_POPUP_DELAY_MS (5s,
                             client-specified), and isEnquiryPopupSuppressed()
                             — prefix match over /checkout, /order-success and
                             /contact. The first two are mid-payment or
                             just-paid states where covering the screen risks a
                             real order; /contact already shows the same form
                             inline. /admin/* needs no entry — separate root
                             layout, so the popup never mounts there
  nav-links.ts               shared nav link list + isNavLinkActive(pathname, href) — real
                              paths, not anchors; used by both NavLinks and MobileMenu
  cart-context.tsx            "use client": CartProvider + useCart() — lines are keyed by
                              slug+weight together (the same product can sit in the cart at
                              two different pack sizes as independent lines), persisted to
                              localStorage. CartProvider now also takes a products prop
                              (added 2026-09-13 — the app/(site)/layout.tsx-fetched catalog,
                              exposed through the context) so client components can look up
                              product/price by slug+weight without their own database access.
                              Also exposes hasHydrated (added 2026-09-13) — a real bug
                              turned up during Phase 3 testing: ClearCartOnMount's own
                              mount effect fires BEFORE this provider's localStorage-
                              hydration effect (child effects run before parent effects on
                              mount), so calling clearCart() unconditionally on mount got
                              silently overwritten a moment later when hydration read the
                              still-stale stored cart. hasHydrated lets a consumer wait for
                              that hydration to actually finish first
  orders-db.ts                 added 2026-09-13 (Phase 3) — createOrderFromCart(customer,
                             lines): re-reads every line's product/price from the database
                             (never trusts the client-submitted cart), computes
                             subtotal/shippingCharge/total, and creates the Order +
                             OrderItem rows (with product details snapshotted, per the
                             schema.prisma comment) + an initial Payment row (status
                             INITIATED) in one call. Throws CheckoutError for
                             checkout.tsx's server action to turn into a user-facing
                             message (e.g. a line's product/weight no longer exists)
  payu.ts                       added 2026-09-13 (Phase 3) — PayU hosted-checkout
                             integration: generatePayuRequestHash() (request hash),
                             verifyPayuResponseHash() (reverse hash, constant-time compare
                             via timingSafeEqual — this is a security check, not just
                             validation), and verifyPayuPayment() (the verify_payment
                             server-to-server reconciliation API PayU itself recommends
                             running after the redirect, rather than trusting it alone).
                             Defaults to PayU's test/sandbox endpoints unless
                             PAYU_ENV=production — see ECOMMERCE_BUILDOUT.md Phase 3 for
                             the cutover story and TODO.md for what's still needed from
                             the client (a real test key/salt, then real live ones)
  currency.ts                 formatINR() — Intl.NumberFormat("en-IN", { currency: "INR" })
  whatsapp.ts                 builds the itemized order message + wa.me checkout URL, and
                             (added 2026-09-05 (7)) the name/contact/email/message enquiry
                             message + wa.me URL used by EnquiryForm — both share the same
                             WHATSAPP_ORDER_NUMBER
  config.ts                   WHATSAPP_ORDER_NUMBER — the one place that number is defined,
                             used for both order checkout and general enquiries. Also
                             SHIPPING_CHARGE (added 2026-09-13 — flat ₹50, an explicit
                             placeholder, see TODO.md) and SITE_URL (builds PayU's
                             surl/furl — Vercel's own VERCEL_URL by default, since PayU
                             needs a publicly reachable HTTPS URL, not localhost)

prisma/                      added 2026-09-13 (ECOMMERCE_BUILDOUT.md Phase 2)
  schema.prisma               Product/ProductWeightOption, Order/OrderItem, Payment,
                             AdminUser/AdminSession models — see the lib/db.ts entry above
                             for the Prisma-version-specific setup notes. AdminUser logs in
                             by phone (unique), not email (2026-09-14 decision); AdminSession
                             is one row per login (DB-backed sessions, not JWT — see
                             lib/admin-auth.ts)
  migrations/                  on-disk migration history, applied against the live Vercel
                             Postgres (Neon-backed) database. Created via `prisma migrate
                             diff --from-config-datasource --to-schema ... --script` +
                             `prisma migrate deploy` rather than the usual `migrate dev`,
                             since this CLI refuses to run interactively (which `migrate
                             dev` always is when there's a warning to confirm) in a
                             non-interactive shell — `migrate deploy` applies a
                             pre-generated migration file without prompting

scripts/create-admin.ts       added 2026-09-14 (Phase 4) — the only way to create the first
                             Super Admin (no public admin-signup page, deliberately — see
                             ECOMMERCE_BUILDOUT.md Phase 4). `npx tsx scripts/create-admin.ts
                             "<name>" <phone> <password> [SUPER_ADMIN|ADMIN_MANAGER]`;
                             re-running with an existing phone resets that account's
                             password instead of failing, which doubles as the forgot-
                             password recovery path until a self-service one exists
  seed.ts                      migrates lib/products.ts's 3 SKUs into the database — run
                             via `npx prisma db seed`, not directly with tsx (it relies on
                             prisma7.config.ts having already loaded .env/.env.local into
                             the process before the seed subprocess inherits them)

generated/prisma/            Prisma Client output (gitignored, regenerated via
                             `npx prisma generate` after any schema change) — not
                             committed, same treatment as .next/
```

**`app/(site)/layout.tsx` sets `export const revalidate = 60`, added 2026-09-13.**
A plain Prisma call in a Server Component — unlike `fetch()` — doesn't
tell Next.js a route needs dynamic rendering on its own. Without this,
`getProducts()`'s result (read by both the root layout, for the cart,
and `ProductGrid`, on `/` and `/sweets`) would have frozen at build
time: every route in the app rendered fully `○ (Static)` the first
time this was tried, meaning a future admin product edit (Phase 4)
wouldn't appear on the live site until the next deploy. Since the
layout wraps every route, this revalidate window applies site-wide —
harmless for pages that don't touch product data (`/story`,
`/contact`, the legal pages), and keeps `/`/`/sweets` reasonably fresh
without losing static-generation performance entirely. `/products/[slug]`
has no `generateStaticParams` at all, so it's fully dynamic regardless
(see the `app/` tree entry above).

**Fixed-position UI must not nest inside `backdrop-blur`/`filter`
ancestors.** `CartDrawer` was originally rendered inside `Navbar`'s
`<header>`, which has `backdrop-blur-sm` (`backdrop-filter`). Per the
CSS Transforms spec, `filter`/`backdrop-filter` makes an element the
containing block for its `position: fixed` descendants — so the
drawer's `inset-y-0` resolved against `header`'s own ~80px height
instead of the viewport, breaking it. `CartDrawer` now renders directly
in `app/(site)/layout.tsx` instead. Keep this in mind before adding any other
`fixed`-positioned overlay as a descendant of `Navbar`.

**`NavLinks`' animated active indicator depends on the root layout
staying mounted across navigations.** `Navbar` (and therefore
`NavLinks`) lives in `app/(site)/layout.tsx`, and Next.js App Router keeps
shared layouts mounted across route transitions — only `{children}`
swaps out. That's what lets Framer Motion's
`layoutId="nav-active-indicator"` animate the line—leaf—line motif
sliding (and resizing, since it spans `inset-x-0` of each link and link
widths differ) from the old active link to the new one, instead of it
just disappearing and reappearing. If `Navbar` ever moves somewhere
that gets remounted on navigation, this animation silently degrades to
an instant jump (still correct, just less polished) — not a functional
bug, but worth knowing if the animation stops working.

**Why a leaf glyph, not the underline bar it replaced (2026-09-08).**
Originally a flat 2px `bg-emerald-800` bar. Replaced with a small
`lucide-react` `Leaf` icon flanked by two thin lines
(`h-px flex-1 bg-emerald-800/40`), echoing the two-leaf logo mark
instead of a generic underline — per `ui-ux-pro-max`'s
`no-emoji-icons` rule, an actual SVG icon (already a dependency, matches
`DESIGN_SYSTEM.md`'s "UI chrome uses lucide-react" convention) rather
than a literal 🍃 emoji character. `size={12}`, default lucide outline
style (no `fill` override — an earlier pass set `fill="currentColor"`
for legibility, but that renders a solid silhouette rather than the
actual lucide icon and was reverted at the user's explicit request);
the whole indicator is `aria-hidden` since `aria-current="page"` on the
`Link` itself already carries the semantic state.

**Navigation is route-based, not anchor-based.** Every internal link uses
`next/link`'s `<Link>` (not a plain `<a href="#...">`) so navigating
between pages gets a client-side transition rather than a full reload.
This changed on 2026-09-04 when the site moved from one scrolling
homepage to five separate routes — see `WEBSITE_STRUCTURE.md` and
`CHANGELOG.md`.

## Responsibilities & Conventions

- **Server components by default.** `MobileMenu.tsx`, `NavLinks.tsx`,
  `motion/Reveal.tsx`, `QuantityStepper.tsx`, `AddToCartControl.tsx`,
  `CartButton.tsx`, `CartDrawer.tsx`, and `cart-context.tsx` are
  `"use client"` — everything else renders on the server. Client
  components are leaves
  (`ProductCard` stays a server component and just renders
  `<AddToCartControl />` as one interactive child), not wrappers around
  the whole page. The one necessary exception is `CartProvider`, which
  wraps the entire app in `app/(site)/layout.tsx` — Context providers are the
  standard exception to "leaves only," since the alternative (prop-
  drilling cart state through every page) would be worse. (This list
  predates Phase 3/4 — see the `checkout/` and `admin/` entries above
  for those components instead of expanding this one indefinitely.)
- **Data-driven, not repeated JSX.** Products (`lib/products.ts`),
  benefit icons (`lib/benefits.ts`), and blog posts (`lib/blog-posts.ts`)
  are arrays mapped over in the section components. Adding a fourth
  product, or a fourth blog post, means adding one object to the
  relevant file — no JSX changes required.
- **Blog posts are plain typed data, not MDX.** `ROADMAP.md` #6
  suggested in-repo MDX as the lower-effort starting point; a typed
  `BlogBlock[]` array (`{ type: "heading" | "paragraph", text }`)
  ended up lower-effort still, for a 3-post blog with no embedded
  components or rich formatting — no new dependency, no `next.config.ts`
  changes, and it matches every other content source in this codebase
  (`products.ts`, `benefits.ts`). Revisit if posts start needing
  richer formatting (images mid-post, lists, embeds) — that's where
  MDX starts earning its cost.
- **`Motif` is intentionally dumb.** It takes a `src` and a `size` and
  renders a decorative, `aria-hidden`, non-interactive image. Sections
  decide placement (`absolute -top-5 -right-3`, etc.) via `className` —
  the component itself has no opinion on where it sits.
- **`SectionHeading` centralizes the eyebrow/title/description pattern**
  used at the top of most sections, with a `tone` prop (`dark`/`light`) so
  it also works on the dark sections (`BrandStory`, `FinalCta`).
  `PageHeader` is the page-level counterpart — it renders the page's only
  `h1`; `SectionHeading` always renders an `h2` nested under it.
- **Typed props throughout**, no `any`. `Product["accent"]` is used as a
  discriminated key into a lookup object in `ProductCard` rather than a
  chain of conditionals.

## Growing the Product Catalog

`ProductGrid` and `ProductCard` were built assuming more than three SKUs
will exist eventually:

1. Add a new entry to `products` in `lib/products.ts` (image path, alt
   text, real attributes only — do not invent claims for a new product).
2. Drop the product photo into `public/assets/products/`.
3. Nothing else changes — the grid re-flows automatically
   (`sm:grid-cols-2 lg:grid-cols-3`).

The architecture intentionally stops short of full PDP components
(`ProductDetails`, `ProductGallery`, `ProductBenefits`) suggested in the
brief — see `TODO.md` for why, and what triggers building them.

## Growing the Blog

1. Add a new entry to `blogPosts` in `lib/blog-posts.ts` — a unique
   `slug`, a `coverImage` (reuse an existing asset from
   `public/assets/` where it fits, per `ASSET_MAP.md`, rather than
   sourcing something new), and `content` as an array of
   `{ type: "heading" | "paragraph", text }` blocks. **Content must be
   genuinely reviewed, not fabricated** — the three seed posts are
   general editorial/informational writing (what ghee does, gifting
   etiquette, what papri is) using only facts already established
   elsewhere on the site (desi ghee, no maida/preservatives, since
   1958); they don't invent new claims about Nouriqo specifically. Any
   future post should hold to the same bar, and per `ROADMAP.md` #6,
   ideally get client sign-off before publishing.
2. `generateStaticParams` in `app/blogs/[slug]/page.tsx` maps over
   `blogPosts` automatically — a new slug is statically generated on
   the next build with no route changes needed.
3. `BlogGrid` sorts by `date` (newest first) and re-flows automatically
   (`sm:grid-cols-2 lg:grid-cols-3`) — nothing to adjust there either.
