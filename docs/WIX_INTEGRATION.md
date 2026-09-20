# Wix Headless Integration

How the Next.js storefront reads its product catalog from Wix, why it works
that way, and what will break if someone changes the wrong thing.

Started 2026-09-20. Supersedes the Prisma-backed product catalog described in
`ECOMMERCE_BUILDOUT.md` Phase 2 — see [What happened to the database](#what-happened-to-the-database)
below, because that stack still exists and is deliberately not deleted.

## The decision

The client owns a Wix Premium plan with Wix Stores installed, and asked to
manage the store from the Wix dashboard rather than from the custom admin
panel we built. That single requirement settled the architecture:

> **Wix is the source of truth for commerce. This repo is the source of truth
> for presentation.**

The client adds products, sets prices, uploads images and manages orders in
Wix. We render them. Neither side needs the other's permission.

What this cost us, stated plainly: the Postgres catalog, the PayU checkout and
the admin dashboard from Phases 2–4 are no longer on the critical path. They
work, they are tested, and they are kept as a fallback — but the storefront no
longer reads from them.

## Site facts worth knowing before you touch anything

| | |
|---|---|
| Wix site | Nouriqo — `8d7684e1-d857-4e66-875d-152e448720c5` |
| Catalog version | **V1** (not V3) |
| Currency / locale | INR, India, Asia/Kolkata |
| Headless client | "Nouriqo Next.js Storefront" |

**Catalog V1 is the single most important fact here.** Wix is rolling out
Catalog V3 and most search results and AI answers will hand you V3 endpoints.
They return 404 or nonsense against this site. Every endpoint in
`lib/products-wix.ts` is V1 (`/stores/v1/...`). If you are reading Wix docs,
check the version badge before you copy anything.

## Who controls what

| Client controls (Wix dashboard) | This repo controls |
|---|---|
| Product names, descriptions | Page layout and design |
| Prices, per pack size | Ordering, filtering, which products appear where |
| Product images | Home, story, testimonials, blogs, legal pages |
| Stock and availability | Which product fields render, and in what order |
| Adding and deleting products | Cart UX, checkout entry point |
| Collections, coupons, discounts | Accent colours, taglines, ingredient badges |
| Shipping rates and zones | SEO structure and metadata |
| Orders — view, fulfil, refund | |

Both sides *can* write product data — the API can do everything the dashboard
can, and the whole 2026-09-20 catalog restructure was done over the API.

**After go-live, don't.** Last write wins. Product data belongs to the client;
touch it from code only for deliberate structural migrations.

## How it fits together

```
Wix Stores (source of truth)
   │  REST, visitor token
   ▼
lib/wix-client.ts        auth + fetch + cache tagging
   ▼
lib/products-wix.ts      maps Wix shapes → the app's Product type
   ▲
lib/product-presentation.ts   fields Wix has no home for
   ▼
layout.tsx / ProductGrid / products/[slug]
```

### `lib/wix-client.ts`

Visitor-token auth and the authenticated `fetch` wrapper.

Two things here are easy to get wrong:

- **The `Authorization` header takes the bare token.** No `Bearer ` prefix.
  Adding one returns 401.
- **The token is cached in memory, not in Next's data cache.** It is a
  credential, not page data. A recycled serverless instance just fetches a
  fresh one; that is cheaper than persisting a token to disk next to cached
  responses.

Reading the catalog needs **only the client ID**, which is public by design.
The client secret is for admin operations we do not currently perform.

### `lib/products-wix.ts`

Maps Wix products onto the app's existing `Product` type. That type is
unchanged from the Prisma era, which is why swapping the backend touched only
three import lines.

Pack sizes come from Wix **variants**, sorted by each variant's numeric weight
rather than its label — so the order stays right no matter how the client
names or reorders the choices in the dashboard. A product with no variants at
all falls back to a single pack built from the product-level price.

`getProductBySlug` filters the cached full list rather than making a second
request. V1 has no get-by-slug endpoint, and with a catalog this size the
round trip costs more than the filter.

### `lib/product-presentation.ts` — the hybrid model

Wix Stores has no field for our accent colour, the "Since 1958" ribbon, the
ingredient badges, or the variant sub-label. Those live here, under one rule:

> **Defaults must make a brand-new product look right with zero code changes.**

When the client adds a product tomorrow, it appears fully styled — a real
tagline, real badges, and a stable accent colour derived from its slug. The
per-slug `OVERRIDES` map exists only to pin styling we specifically care
about, and partial entries are fine: override the accent and everything else
still falls back to defaults.

**To pin styling for a new product**, add an entry keyed by its Wix slug:

```ts
const OVERRIDES: Record<string, Partial<Presentation>> = {
  "new-product-slug": { variant: "Cashew & Pistachio", accent: "gold" },
};
```

If the client later renames that slug in Wix, the override silently stops
applying and the product falls back to defaults. It degrades to *generic but
correct*, never to broken. That is intentional.

## Checkout

**Status: built, gated off, blocked on one DNS change.** See the blocker below
before enabling anything.

### How it works

The browser cart stays local (localStorage) while the customer shops — "Add to
Cart" makes no network call and works offline. A real Wix cart is created only
when they click **Checkout**:

```
CheckoutButton  →  POST /api/checkout
                     → lib/wix-checkout.ts
                        → fresh visitor token
                        → POST /ecom/v2/carts          (catalogItems)
                        → POST /ecom/v2/carts/{id}/get-checkout-url
                     ← { checkoutUrl }
                →  browser redirects to Wix hosted checkout
```

Deliberate choices:

- **Cart created at checkout, not per click.** Keeps add-to-cart instant, and
  Wix still gives the client abandoned-*checkout* recovery from this point —
  a warmer signal than an abandoned cart anyway.
- **A fresh visitor token per checkout.** Catalog reads share one cached token
  because they're public and identical for everyone. A cart belongs to a
  shopper, so each checkout mints its own session rather than hanging every
  order off one shared identity.
- **Nothing from the browser is trusted.** Lines are re-resolved against the
  live catalog by slug and pack size; anything deleted, renamed or out of
  stock is dropped. Prices are never read from the request — Wix prices the
  cart from its own catalog, so a tampered payload can't buy sweets cheaply.
- **Variants are referenced by `variantId`.** These products have
  `manageVariants: true`, so passing option names instead returns
  `ITEM_NOT_FOUND_IN_CATALOG`.

### 🚧 Blocker: the Wix pages domain

`get-checkout-url` currently returns:

```
https://www.nouriqo.com/checkout?checkoutId=...
```

**That domain points at Vercel, not Wix.** A customer following it would land
on this repo's own PayU checkout page with a stray query param. Checkout
cannot work until this is fixed.

Wix serves its hosted pages from a *separate* site with its own domain, and
per Wix's docs **you cannot use the external site's own domain** for it. The
fix is a subdomain:

1. **Wix dashboard** → Settings → Development & integrations → Headless
   Settings → **Manage URLs** → **Wix pages domain** → Manage domain
2. Connect something like `checkout.nouriqo.com`
3. Add the matching DNS record at the domain registrar

Leaving it on the free `*.wixsite.com` default also works and needs no DNS —
it's just less polished, since the customer visibly lands on a Wix domain.

### Feature flags

Both must be `"true"`, and **neither should be set in Vercel until the domain
above is sorted**:

| Flag | Guards |
|---|---|
| `WIX_CHECKOUT_ENABLED` | `POST /api/checkout` — returns 503 when off |
| `NEXT_PUBLIC_WIX_CHECKOUT_ENABLED` | Whether the cart drawer shows the button |

With the flags off, the cart drawer behaves exactly as it does in production
today: a single "Checkout via WhatsApp" button. With them on, Wix checkout
becomes the primary action and WhatsApp drops to a secondary link — per
`ECOMMERCE_BUILDOUT.md`, there is never a moment where checkout doesn't work.
Remove the WhatsApp link at cutover.

### A note on deprecated APIs

Checkout V1 (`/ecom/v1/checkouts`) is **fully deprecated** — all 13 methods.
Don't build on it, and be wary of Wix's own headless guides that still route
through it via the Redirects API and `ecomCheckout.checkoutId`.

Cart V2's `get-checkout-url`, which this code uses, is current. Cart V2 also
drops the checkout entity entirely: the alternative flow is `SetDeliveryMethod`
then `PlaceOrder`, which would keep the customer on our site but means we
handle payment ourselves. Worth revisiting if the hosted checkout's branding
break becomes a problem.

## Caching and freshness

Product reads are tagged `wix-products` and sit behind a 60-second ISR window
(`export const revalidate = 60` in `app/(site)/layout.tsx`). A dashboard edit
therefore appears within a minute on its own.

For an immediate flush, `POST /api/revalidate` with the shared secret:

```bash
curl -X POST https://www.nouriqo.com/api/revalidate \
  -H "x-revalidate-secret: $REVALIDATE_SECRET"
```

It calls `revalidateTag(WIX_PRODUCTS_TAG, { expire: 0 })`. The `{ expire: 0 }`
is deliberate — the caller wants fresh data *now*, so the next request should
block on a real refetch rather than be served stale content while it happens.
Note that Next 16 deprecated the single-argument form of `revalidateTag`; pass
a profile.

## Environment variables

| Variable | Secret? | Purpose |
|---|---|---|
| `WIX_CLIENT_ID` | No — public by design | Visitor tokens for catalog reads |
| `REVALIDATE_SECRET` | **Yes** | Authorises `POST /api/revalidate` |

Both must be set in the Vercel project, not just `.env.local`.

**The Wix client secret is not in this repo and should stay that way.** It was
returned once at client-creation time and has been through a chat transcript,
so it must be regenerated in **Settings → Headless Settings → Nouriqo Next.js
Storefront** before launch, and the fresh value stored only in Vercel.

## Things the client can do in Wix that break the site

Most dashboard edits are harmless. These are not:

| Client action | Effect | Our defence |
|---|---|---|
| Renaming a product slug | That product's URL 404s; inbound links break | Presentation override falls back to defaults, page still renders |
| Deleting a product | Links to it 404 | `notFound()` — intended behaviour |
| Renaming/removing the `Weight` option | Pack-size selector loses its options | Falls back to a single "Standard pack" built from the product price |
| Adding a second option (e.g. "Flavour") | Creates a variant matrix the UI doesn't model | **Not handled** — see Known gaps |
| Uploading no image | `next/image` would get an empty src | Falls back to a local placeholder photo |

Tell the client that slugs are effectively URLs, and renaming one is a real
change, not a cosmetic one.

## What happened to the database

`lib/products-db.ts`, `lib/orders-db.ts`, the Prisma schema, the PayU
integration and the whole `/admin` section are **still in the repo and still
work**. Nothing reads `products-db.ts` any more, but it has not been deleted.

That is deliberate. Until a real payment has gone through Wix end to end, the
PayU-backed checkout is the fallback. Delete it only after the Wix checkout
has taken live money successfully.

### Keeping Postgres in sync

A fallback that doesn't work isn't a fallback. The two catalogs drifted the
moment Wix took over — Postgres still held `classic-ghee-papri` and had no
200 gram pack, so any cart built on the live site failed PayU checkout with
`<slug> (<weight>) is no longer available`.

Re-mirror Wix into Postgres after any structural catalog change:

```bash
npx tsx --env-file=.env.local scripts/sync-products-from-wix.ts
```

It upserts by slug, replaces pack sizes wholesale (so a size removed in Wix
disappears here too), and deletes products Wix no longer sells. Past
`OrderItem` rows keep their snapshotted details — the schema nulls their
`productId` rather than cascading.

**Do not run `prisma/seed.ts`.** It seeds from the static pre-Wix array in
`lib/products.ts` and would reintroduce the old slugs and prices. It carries a
warning header saying so.

WhatsApp checkout also stays live until that same cutover, per the rule in
`ECOMMERCE_BUILDOUT.md`: there is never an in-between state where checkout
doesn't work.

## Known gaps

- **Checkout is built but disabled.** Blocked on the Wix pages domain — see
  [Checkout](#checkout). Nothing else stands in its way.
- **Shipping resolves, but it's free.** Verified 2026-09-20 with a real
  variant to a New Delhi address: Wix returns a "Free shipping" option at
  ₹0.00, so checkout won't stall. But the PayU flow charges a flat ₹50, so
  moving to Wix as-is silently drops that. Client decision: free, flat ₹50, or
  weight-based (per-pack weights are already set, so all three work).
- **Tax is 0%.** No tax region is configured, so nothing is collected. May be
  correct for their turnover; worth confirming if GST applies.
- **International shipping is active.** A region covering everywhere outside
  India exists with the same carrier. Probably a Wix default nobody reviewed —
  confirm it's intentional before launch.
- **Payments are not connected.** Wix Payments does **not** support India. The
  site must use a third-party provider; **PayU India is available** in Wix's
  India payment method list, alongside Razorpay, Cashfree, Easebuzz, Nimbbl,
  airpay and UPI. KYC was in progress as of 2026-09-20. Zero orders have ever
  been placed through this store.
- **No Wix webhook for automatic revalidation.** `/api/revalidate` is manual
  and secret-protected. Wiring Wix's "Product Changed" webhook needs JWT
  signature verification, not a shared secret.
- **Multi-option products are not modelled.** One option (`Weight`) is
  assumed. A second option would need real UI work.
- **Cost prices exist only on the 500g variant.** Adding pack sizes left the
  200g and 1kg variants with no cost recorded, so Wix profit reporting reads
  ₹0 on those. Storefront is unaffected; the client needs to fill these in.

## Reference

- `WIX_PROGRESS.md` — where the migration got to and what's next; **start there**
- Wix Headless docs: https://dev.wix.com/docs/go-headless
- Catalog V1 API: https://dev.wix.com/docs/api-reference/business-solutions/stores/catalog-v1
- `ECOMMERCE_BUILDOUT.md` — the original five-phase plan this changes course from
- `docs/COMPONENT_ARCHITECTURE.md` — component and lib structure
