# Ecommerce Build-Out Plan

Plan discussed and confirmed with the user 2026-09-13, turning Nouriqo
from a brand + catalog site into a real transactional store: online
payment via PayU, a database-backed product catalog and order system,
an admin dashboard, and shipping via Shiprocket. This supersedes the
old "Ecommerce build-out" stub in `TODO.md`, which now just points
here.

Five phases, discussed and locked in this order — but "Phase N" here
means a labeled scope, not a strict execution sequence. Phase 1's
remaining work, Phase 2, and Phase 3 are tightly coupled and actually
get built as two slices, not three separate phases — see "Suggested
Build Order" below.

> ## ⚠️ Course change, 2026-09-20 — read this first
>
> The client asked to manage the store from the **Wix dashboard** they already
> pay for, not from the admin panel built in Phase 4. Wix Stores is now the
> source of truth for products, and will be for carts, checkout and orders.
>
> **See `docs/WIX_INTEGRATION.md`** — that document, not this one, describes
> how the storefront works today.
>
> Phases 2–4 below are still accurate as a record of what was built, and the
> code still exists and works. It is kept as the fallback until a real payment
> has gone through Wix end to end. Nothing here is deleted; it is superseded.

## Status Snapshot (2026-09-20)

| Phase | Status |
|---|---|
| 1 — Website | **Done** |
| 2 — Backend (Postgres) | **Built and working, now superseded** — the storefront reads products from Wix instead (2026-09-20). Schema, Prisma Client and the live database all still exist; nothing reads `lib/products-db.ts` any more |
| 3 — PayU | **Built and tested against sandbox-shaped placeholder credentials** — full flow works end-to-end locally; not yet linked from the live cart drawer (by design), and not yet run against PayU's actual hosted page (needs a real test key/salt — see below) |
| 4 — Admin | **Built and tested** — login, dashboard, product/order/user management all working; still needs the real Super Admin phone number to bootstrap the actual account (see below) |
| 5 — Shiprocket | Not started, and deliberately deferred — no account/KYC yet, confirmed. Wix has its own shipping rules, so this may not be needed as a separate integration |
| **6 — Wix Headless** | **In progress (2026-09-20)** — catalog reads are live; checkout and payments not started. See `docs/WIX_INTEGRATION.md` |

## Phase 1 — Website (Next.js, Vercel)

**Goal:** the customer-facing browsing and purchase flow.

| Item | Status |
|---|---|
| Home | ✅ Done |
| Products (listing) | ✅ Done — `/sweets`, `ProductGrid`, reading live from the database (`lib/products-db.ts`, since 2026-09-13) |
| Product details | ✅ Done, 2026-09-13 — `/products/[slug]`, `ProductDetails` |
| Cart | ✅ Done — `localStorage`-persisted, product/price lookups via `lib/products-db.ts` |
| Checkout | ✅ Built, 2026-09-13 — `/checkout` (form + summary), real order creation, real PayU redirect. Not yet linked from the cart drawer — see the WhatsApp note below |
| Order success | ✅ Built, 2026-09-13 — `/order-success`, only renders for an order whose `paymentStatus` is actually `PAID` |

**Already deployed on Vercel**, GitHub repo `prashant-1012/nouriqo`
connected — no separate hosting setup needed for this build-out.

**Scope note:** Product details, Checkout, and Order success can't be
finished independently of Phase 2 — a real checkout has to write an
order somewhere, and that "somewhere" is the Phase 2 database. Treat
these three as the first slice of Phase 2's work, not a standalone
Phase 1 task. As of 2026-09-13, this also merges with Phase 3: the
Checkout page is built as a real PayU-backed checkout from the start
(against PayU's sandbox credentials — see Phase 3), not a placeholder
that gets payment bolted on later.

**WhatsApp checkout stays live and untouched until cutover.**
Confirmed 2026-09-13: WhatsApp checkout is being fully replaced, not
kept as a permanent fallback. But since it's the only working checkout
today, it keeps running exactly as-is in production while the new
PayU-backed checkout is built and tested — it only comes out at the
single cutover moment described in Phase 3, once the client's live
PayU account is ready. There is no in-between state where checkout
doesn't work.

**Also part of this phase's remaining work:** since admin will manage
products (see Phase 2), every place that currently reads
`lib/products.ts` directly — `ProductGrid`/`ProductCard`, the home
page teaser, `/sweets` — needs to switch to querying the database
instead. This is a real piece of migration work, not just "add an
admin screen."

## Phase 2 — Backend (Next.js API routes + PostgreSQL)

**Goal:** real data behind products, orders, and payments, using
Next.js Route Handlers — no separate backend service, everything
stays in this one repo/deploy.

**Decisions locked 2026-09-13:**

- **Database:** Vercel Postgres (Neon-backed) — one-click "Storage →
  Create Database" in the existing Vercel project, auto-injects
  connection env vars. Chosen over Supabase/Neon-direct/Railway since
  the site's already on Vercel and there was no existing preference.
- **ORM:** Prisma.
- **Products are DB-backed and admin-managed**, not just mirrored from
  code — admin gets a real add/edit/price screen in Phase 4. This was
  the one real scope decision in this phase: the user's original
  Phase 4 sketch only showed Orders/Payments/Shipment, but confirmed
  product management should be included too.
- **Guest checkout only** — no customer accounts, no login, no
  password reset for customers. An order stores whatever contact and
  shipping details the guest enters at checkout; there's no `users`
  table for customers. (There is still an `AdminUsers`-type table for
  Phase 4's admin login — that's a separate, internal-only concern.)
- **Core entities**, now live in `prisma/schema.prisma`: `Product` +
  `ProductWeightOption` (one row per pack size), `Order` + `OrderItem`
  (order items snapshot product name/variant/weight/price at purchase
  time, so editing or deleting a product later never rewrites order
  history), `Payment` (one row per PayU transaction attempt — an order
  can have more than one if a customer retries), and `AdminUser` (with
  a `role` field for Phase 4's Super Admin / Admin-Manager split).

**Integrity rule to build in from the start:** the cart's displayed
prices come from the client. When an order is created, its total must
be recalculated server-side from the database's current product
prices — never trust a price value submitted from the browser. This
matters more once real money moves through PayU in Phase 3.

**Done, 2026-09-13:**
- Vercel Postgres database created and linked (`prashant-1012s-projects/nouriqo`,
  Neon-backed, ap-southeast-1).
- Prisma pinned to **7.10.0** — `npm install prisma` actually resolves
  `8.0.0-rc.14` right now (a release-candidate rewrite into a
  platform-coupled CLI), which isn't something to build on; 7.10.0 is
  the last stable pre-v8 release and keeps the classic
  schema/migrate/generate workflow, just with Prisma 7's now-mandatory
  driver adapter (`@prisma/adapter-pg`) and explicit `prisma7.config.ts`
  (env vars aren't auto-loaded by the CLI in v7 — loads `.env` then
  `.env.local`, matching Next.js's own precedence, since
  `vercel env pull` writes to `.env.local`).
- Schema written, initial migration applied, Prisma Client generated,
  `lib/db.ts` (connection singleton) added, and `prisma/seed.ts`
  migrated the 3 SKUs out of `lib/products.ts` — verified live in the
  database with correct pricing.
- **Read side migrated off `lib/products.ts`:** `lib/products-db.ts`
  (`getProducts()`/`getProductBySlug()`) now backs `ProductGrid`
  (`/` and `/sweets`), and a new `/products/[slug]` PDP route exists
  (`ProductDetails` component, reachable from `ProductCard`'s image/
  name, which was previously a dead end). `lib/products.ts`'s array is
  seed-only now. `CartDrawer` (a client component — Prisma can't run in
  the browser) gets the catalog via a new `products` prop on
  `CartProvider`, fetched once server-side in `app/layout.tsx`.
- **Caught during verification:** a plain Prisma call doesn't opt a
  route into dynamic rendering the way `fetch()` does — every route
  came back fully static on the first build, meaning a future admin
  product edit wouldn't appear until the next deploy. Fixed with
  `export const revalidate = 60` on the root layout (see
  `COMPONENT_ARCHITECTURE.md` for the full explanation); `/products/[slug]`
  has no `generateStaticParams` so it's fully dynamic regardless.
- Verified with Playwright: Home/`/sweets` list all 3 DB-backed
  products, the PDP renders correctly and 404s on an unknown slug,
  and adding an item from the PDP shows the right product/price in the
  cart drawer — confirming the client-side lookup refactor works
  end-to-end, not just compiles.

**Manual (you):** done — Vercel Postgres created, `vercel login` +
`vercel link` completed.

**Coded (me):** schema, migrations, seed script, and the read-side
migration (including the new PDP route) are done. Still to build: the
order-creation and admin-product API routes, the checkout page, and
the order-success page.

## Phase 3 — PayU

**Goal:** real online payment at checkout.

**Correction, 2026-09-13:** the original version of this doc assumed
PayU publishes anonymous public sandbox credentials. Checking PayU's
actual current docs (docs.payu.in) before writing any code showed
that's not quite right — test-mode credentials still require at least
a PayU account and dashboard login (toggle "Test Mode" → Developer →
API Keys), just not the full business KYC that gates *live* credentials.
Smaller manual step than originally assumed, but not zero.

**Flow, confirmed against PayU's actual integration docs (not just
memory):** the checkout page creates an `Order`/`OrderItem`s/`Payment`
row, then redirects to a page that auto-submits a hidden HTML form
(POST) to PayU's hosted payment page
(`https://test.payu.in/_payment` in test mode,
`https://secure.payu.in/_payment` once `PAYU_ENV=production`). PayU
handles the actual payment UI, then POSTs the result back to a single
callback URL (used as both `surl` and `furl`) with a reverse SHA-512
hash for integrity. Before trusting that redirect, the callback also
calls PayU's `verify_payment` API — a direct server-to-server call
*we* make *to* PayU, which PayU explicitly recommends over trusting
the redirect alone (this is the "webhook → verify" step from the
original plan; PayU's classic integration doesn't have a true
asynchronous push webhook the way Stripe/Razorpay do, so the redirect
+ verify_payment combination plays that role).

**Built and tested 2026-09-13, against placeholder credentials:**
- `lib/payu.ts` — request-hash generation, reverse-hash verification
  (constant-time compare, since this is a security check), and the
  `verify_payment` reconciliation call. Defaults to PayU's test
  endpoints; only `PAYU_ENV=production` switches to live.
- `lib/orders-db.ts` — `createOrderFromCart()`, which re-reads every
  line's price from the database (never trusts the cart's client-side
  prices) and creates the Order/OrderItems/Payment rows together.
- `/checkout` (`CheckoutForm`) → `/checkout/payu-redirect`
  (`PayuAutoSubmitForm`) → PayU → `/api/payu/callback` →
  `/order-success` or `/checkout/failed`.
- Verified end-to-end with Playwright, using placeholder key/salt
  values (`PAYU_KEY`/`PAYU_SALT`/`PAYU_ENV` in `.env`) that are
  internally consistent but not real PayU credentials: added an item,
  filled the checkout form, confirmed the real Order/Payment rows and
  correct PayU form fields (amount, hash, etc.), simulated a correctly-
  signed PayU success callback and confirmed it updates the order and
  reaches `/order-success` (which correctly clears the cart), and
  separately confirmed a **tampered** callback (wrong amount → invalid
  hash) is rejected and redirected to `/checkout/failed` instead.
- **Real bug caught by this testing, unrelated to PayU itself:** the
  cart wasn't actually clearing on `/order-success`. `ClearCartOnMount`
  called `clearCart()` on mount, but React fires child effects before
  parent effects on the same commit — `CartProvider`'s own one-time
  localStorage-hydration effect (a parent) ran *after* `clearCart()`,
  reading the still-stale stored cart and overwriting the clear a
  moment later. Fixed by exposing a `hasHydrated` flag from
  `CartProvider` and having `ClearCartOnMount` wait for it — see
  `COMPONENT_ARCHITECTURE.md`'s `cart-context.tsx` entry.

**Not yet done — needs your PayU dashboard access, not more code:** a
real test key/salt to run one actual transaction through PayU's real
hosted page (everything above proves the code is correct; it hasn't
touched PayU's actual servers with real credentials yet). Also: a
deployed URL, since PayU's redirect back to `surl`/`furl` needs a
publicly reachable HTTPS address — plain `localhost` can't receive it,
which is why this round-trip was tested by simulating PayU's callback
directly rather than through PayU's real page.

**Cutover** (still as planned): swap the test key/salt for the
client's real live ones, set `PAYU_ENV=production`, set the live
webhook/callback URL in PayU's dashboard, and remove the WhatsApp
checkout path from `CartDrawer` — the moment the two checkout systems
actually change places, all in one pass.

**Manual (you):** get a real PayU **test** key/salt from your
dashboard (Test Mode toggle → Developer → API Keys) so we can run one
transaction through PayU's actual page, not just a simulated callback.
At cutover: finish PayU KYC (already in progress), get the real live
key/salt, and set the live callback URL in PayU's dashboard.

**Coded (me):** done, pending that real test key/salt for a true
end-to-end run through PayU's own page.

**Known caveat already tracked in `TODO.md`:** the four legal pages
describe this future PayU-based checkout, not today's WhatsApp-only
one — they need re-verifying once this phase actually ships.

## Phase 4 — Admin

**Goal:** a dashboard for managing products and reviewing orders,
payments, and shipments.

**Auth approach, updated 2026-09-14:** login is by **phone number**,
not email (a late decision — the client's "mobile and password" phrase
prompted asking directly rather than assuming). Credentials-based,
bcrypt-hashed, with DB-backed sessions (an `AdminSession` row per
login — logging out or revoking access is just deleting a row; no JWT
to worry about invalidating). Two roles, as originally scoped:

- **Super Admin** — everything Admin/Manager can do, plus the only
  role that can create or remove other Admin/Manager logins.
- **Admin/Manager** — full day-to-day access: manage products, view
  and update orders, payments, and shipment status. Cannot manage
  other users' logins — that's the entire difference between the two
  roles, deliberately kept simple.

**No public admin-signup page — deliberately.** Exposing one would be
a real security hole (anyone who found the URL could try registering
as an admin). Instead: the *first* Super Admin is bootstrapped directly
into the database via `scripts/create-admin.ts` (see
`COMPONENT_ARCHITECTURE.md`), and every account after that gets
created through the dashboard's own Users screen — real frontend UI,
just authenticated and Super-Admin-gated.

**Built and tested, 2026-09-14:**
- `lib/admin-auth.ts` — hashing, DB-backed sessions, `requireAdmin()`/
  `requireSuperAdmin()`. Every admin Server Action calls one of these
  itself, not just the page/layout — a layout only gates rendering, and
  a Server Action is independently invocable once a page that uses it
  has loaded. See the security note in `COMPONENT_ARCHITECTURE.md`.
- Login (`/admin/login`), logout, and a dashboard home with product/
  order/revenue counts.
- Product management: list, create, edit, delete — the same
  `ProductForm` handles create and edit. **Scope limit, not an
  oversight:** the image field is a text path (e.g.
  `/assets/products/example.jpg`), not a file upload — the image file
  itself still has to be placed into `public/assets/products/` some
  other way (by a developer, or a future upload feature). Building a
  real upload pipeline (blob storage, processing) wasn't asked for and
  would have meaningfully expanded this pass.
- Order management: list (with payment/shipment status badges) →
  detail (customer, address, items, payment-attempt history) →
  shipment-status control (auto-saves on change).
- User management (Super-Admin-only): list, create, delete — can't
  delete your own account while logged in, can't delete the last
  Super Admin.
- **Required a structural change:** Next.js only allows more than one
  root layout (`<html>/<body>`) via route groups, and the admin panel
  needed its own (no customer Navbar/Footer/cart). Every existing
  route moved into `app/(site)/` — invisible in the URL, nothing about
  the site's actual paths changed. See `COMPONENT_ARCHITECTURE.md`.
- Non-interactive migration workaround: `prisma migrate dev` refuses
  to run in a non-interactive shell whenever there's a warning to
  confirm (this schema change had one — an empty table, so harmless,
  but the CLI doesn't know that). Worked around with `prisma migrate
  diff --script` to generate the SQL directly, then `prisma migrate
  deploy` to apply it without prompting — see `COMPONENT_ARCHITECTURE.md`.
- Verified with Playwright end-to-end, using temporary test accounts
  (deleted afterward): unauthenticated `/admin` redirects to login;
  login works; the dashboard's counts render correctly; creating,
  editing, and deleting a test product all worked *and* the storefront
  (`/sweets`) reflected each change immediately (`revalidatePath`
  working); logging out actually ends the session (a subsequent
  protected-page visit redirects to login again); and — the specific
  thing worth calling out — an Admin/Manager account was confirmed
  genuinely blocked from `/admin/users` (redirected to `/admin`), not
  just hidden from the sidebar.
- One bug the tests initially found was in the *test itself*, not the
  app: a generic `button[type="submit"]` selector matched the
  sidebar's "Log Out" button before the form's own submit button (both
  share that type, and the sidebar renders first in the DOM) — scoped
  the selectors more precisely rather than the app having a real issue.

**Not yet done:** the real Super Admin account. Needs the actual phone
number to run `scripts/create-admin.ts` for real — see `TODO.md`.

**Manual (you):** give the Super Admin's real phone number so the
actual account can be created (a strong password will be generated and
shared back to you). Decide who else should get Admin/Manager access —
you can create those yourself afterward, through the Users screen,
without needing me again.

**Coded (me):** done.

## Phase 5 — Shiprocket

**Goal:** get orders shipped, manually at first, then automated.

**Initially manual:** the admin dashboard shows each order's shipping
details; you manually re-enter that into Shiprocket's own dashboard to
book the shipment.

**Later, automated:** a Shiprocket API integration that creates the
shipment/AWB directly from an order, and pulls tracking status back
into the admin dashboard.

**Status, confirmed 2026-09-13:** no account/KYC started yet, and
that's deliberate — unlike PayU, nothing here can be built ahead of
the account existing (the manual step *is* the whole of this phase's
first stage), so there's no cost to starting it at the end, whenever
the client is ready to provide it.

**Manual (you):** Shiprocket account signup + KYC (pickup address,
bank details), whenever the client's ready to provide it — no rush
relative to the rest of this plan. Later: nothing new beyond keeping
the account current.

**Coded (me, later phase only):** the API integration, once you're
ready to move past manual booking.

## Manual vs. Coded — Summary

| Phase | You do manually | I code |
|---|---|---|
| 1 | ✅ Done — already deployed on Vercel | ✅ PDP, checkout page, order-success page all built |
| 2 | ✅ Done — Vercel Postgres created, `vercel login`/`link` | ✅ Schema, migrations, seed script, read-side DB migration, and admin product management all done |
| 3 | Get a real PayU **test** key/salt from your dashboard now, so we can run one transaction through PayU's actual page; at cutover: finish PayU KYC, get live keys, set the live callback URL | ✅ Full flow built + tested end-to-end (against placeholder credentials); live-credential swap + WhatsApp removal at cutover |
| 4 | Give the real Super Admin phone number; decide who gets Admin/Manager access (addable later, yourself, via the dashboard) | ✅ Auth (with role split), dashboard, all product/order/payment/shipment/user-management views |
| 5 | Shiprocket account + KYC, whenever the client provides it; manually re-key orders initially | Later: Shiprocket API integration |

## Suggested Build Order

1. ✅ Phase 2 — schema + Products-in-DB.
2. ✅ Phase 1 + Phase 3, merged — PDP, checkout page (a real PayU-backed
   checkout, built and tested against placeholder credentials), and
   order-success page. WhatsApp checkout stays live and untouched
   throughout — the new checkout isn't linked from the cart drawer yet.
3. ✅ Phase 4 — admin dashboard, with Super Admin / Admin-Manager roles,
   including product management (the Phase 2 piece originally scoped
   alongside this, done together since it's the same dashboard/auth
   work either way). Only the real Super Admin account is still
   outstanding — needs the real phone number.
4. **Cutover** (whenever the client's live PayU account is ready):
   swap the test key/salt for live ones, set `PAYU_ENV=production`,
   set the live callback URL, remove the WhatsApp checkout path from
   `CartDrawer`. The only step actually gated on something from the
   client, and can happen any time now — not necessarily last.
5. Phase 5 — Shiprocket, whenever the client provides that account;
   manual booking first, API integration once ready to automate.

## Decisions Log

All decisions this plan depends on are now resolved — nothing open as
of 2026-09-13. Full discussion trail lives in `docs/CHANGELOG.md`;
summarized here for quick reference:

- WhatsApp checkout: fully replaced, not kept as a fallback — but
  stays live until the Phase 3 cutover (see above).
- Shiprocket: no account/KYC yet, confirmed — deliberately deferred to
  whenever the client provides it, since Phase 5 has no earlier
  dependency on it.
- Admin auth: two roles, Super Admin and Admin/Manager — identical
  day-to-day access, Super Admin-only user management. Login is by
  phone number, not email (2026-09-14) — no OTP/SMS provider involved,
  still a plain password, just phone as the unique identifier.
- PayU and Shiprocket account setup both happen at the end, from the
  client — but only Shiprocket's *coding* also waits until then; PayU's
  is built and tested well before that point (though, corrected
  2026-09-13: getting even *test* PayU credentials needs a PayU account
  and dashboard login — not the fully anonymous public sandbox this
  doc originally assumed, just much lighter than the full KYC that
  gates live credentials).
- Shipping charge: flat ₹50 per order — an explicit placeholder the
  client asked for rather than a courier-rate calculation, added
  2026-09-13 alongside the checkout build. See `TODO.md`.

## Related Docs

- `TODO.md` — the old "Ecommerce build-out" section now just points
  here; still tracks the historical log of what shipped before this
  plan existed (cart + WhatsApp checkout, "Add to Cart" copy change).
- `docs/CHANGELOG.md` (2026-09-13) — the four legal pages shipped
  ahead of PayU KYC, referenced throughout Phase 3 above.
- `docs/COMPONENT_ARCHITECTURE.md` — current component/lib structure;
  update it as each phase below actually lands, the same way every
  other feature in this codebase has been documented.
