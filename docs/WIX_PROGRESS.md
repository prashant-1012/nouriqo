# Wix Migration — Progress & Next Steps

Working state as of **2026-09-20**. Read this first when picking the work back
up; `WIX_INTEGRATION.md` is the reference for *how* things work, this is
*where we got to* and *what's next*.

## Orientation in one paragraph

The client wants to run the store from the Wix dashboard they already pay for.
Wix Stores is now the source of truth for products, and the Next.js storefront
reads from it live. Checkout is built but switched off, blocked on one Wix
dashboard setting. The old Postgres + PayU + `/admin` stack still exists and
still works, kept as the fallback until a real payment clears through Wix.

## Status

| Area | State |
|---|---|
| Product catalog from Wix | ✅ Live |
| Catalog restructure (pack sizes, slugs, stock) | ✅ Done |
| Postgres mirrored from Wix | ✅ Done, via script |
| Shipping regions & rates | ✅ Working — but **free** |
| Checkout code | ✅ Built, ⛔ gated off |
| Wix pages domain | ❌ **Blocker** |
| Payment method in Wix | ❌ Not connected |
| Real order placed end to end | ❌ Never — store has 0 orders all-time |

## What's done

**Catalog reads from Wix.** `lib/wix-client.ts` (auth + cache-tagged fetch),
`lib/products-wix.ts` (Wix → `Product`), `lib/product-presentation.ts` (the
hybrid styling model: defaults make any new client-added product look right,
per-slug overrides pin specific styling). Swapping the backend touched three
import lines because the old `Product` contract was kept intact.

**Wix catalog restructured** via API: fixed two leftover template slugs
(`artisanal-cheese-platter` → `ghee-papri`, `organic-quinoa-salad` →
`kaju-papri`), added a `Weight` option with 200 gram / 500 gram / 1 kg priced
per variant with real shipping weights, and put Kaju Badam back in stock.

**Checkout built** — `lib/wix-checkout.ts`, `POST /api/checkout`,
`components/cart/CheckoutButton.tsx`. Cart stays local while shopping; a real
Wix cart is created only at checkout. Gated behind two flags, both off.

**Postgres re-mirrored** — `scripts/sync-products-from-wix.ts`. The catalogs
had drifted and broken the PayU fallback; this fixed it.

## ⛔ The one blocker

Wix returns checkout URLs on `https://www.nouriqo.com/checkout?checkoutId=…`.
**That domain points at Vercel, not Wix**, so the link lands on this app's own
legacy PayU checkout page. Wix hosts its pages as a separate site and cannot
reuse the external site's domain.

**Fix (dashboard only — not settable via API; `UpdateOAuthApp` only accepts
name, description, domains and login/logout URLs):**

> Wix dashboard → Settings → Development & integrations → **Headless Settings**
> → **Manage URLs** → **Wix pages domain** → Manage domain

Either connect `checkout.nouriqo.com` (needs a DNS record at the registrar),
or take the free `*.wixsite.com` default — which needs no DNS and is perfectly
good for testing.

Until then `createCheckoutUrl` refuses with a clear message rather than
redirecting customers into the broken loop.

## Pending

### 1. Unblock checkout — do these in order

| # | Task | Who |
|---|---|---|
| 1 | Set the Wix pages domain (above) | You / client |
| 2 | Enable **Manual Payments** in Wix → Accept Payments (few clicks, no KYC) | Client |
| 3 | Set `WIX_CHECKOUT_ENABLED` + `NEXT_PUBLIC_WIX_CHECKOUT_ENABLED` to `true` in Vercel | You |
| 4 | Place a real end-to-end test order, confirm it lands in the Wix dashboard | Both |
| 5 | Connect **PayU India** once KYC clears (was 1–2 days out on 2026-09-20) | Client |

Manual Payments is the key unlock: it exercises the whole pipeline without a
gateway, so PayU stops being on the critical path.

### 2. Client decisions outstanding

- **Shipping is currently FREE.** Verified with a real variant to New Delhi:
  Wix returns "Free shipping" at ₹0.00. The PayU flow charges a flat ₹50, so
  that charge silently vanishes at cutover. Choose: free, flat ₹50, or
  weight-based (per-pack weights are already set, so all three work).
- **Tax is 0%** — no tax region configured. Confirm whether GST applies.
- **International shipping is active** — a region covering everywhere outside
  India exists. Probably an unreviewed Wix default; confirm it's intentional.
- **Cost prices** exist only on the 500 gram variant. The 200 gram and 1 kg
  variants read ₹0 cost, so Wix profit reporting is wrong for them.
- **1 kg / 200 gram prices** were reasonable derivations, flagged for the
  client to adjust.

### 3. Security / housekeeping

- **Regenerate the Wix client secret.** It was returned at creation time and
  passed through a chat transcript. Headless Settings → the client →
  regenerate, then store only in Vercel. Not needed for catalog reads (client
  ID alone suffices), so nothing breaks meanwhile.
- **Add the Vercel preview domain** (`*.vercel.app`) to Allowed Redirect
  Domains, or checkout won't work on previews.
- **Revoke the Wix connector** from claude.ai connector settings when this
  engagement ends — it grants full write access to the client's store.

### 4. Engineering still to do

- **Wix webhook for cache revalidation.** Catalog edits currently appear
  within 60s (ISR); `POST /api/revalidate` forces it instantly. Automatic
  flushing needs Wix's "Product Changed" webhook with JWT signature
  verification — a shared secret isn't enough.
- **Post-checkout return handling.** Decide where Wix sends the customer back
  to and what that page shows.
- **Remove the WhatsApp link** from the cart drawer at cutover.
- **Retire Prisma / PayU / `/admin`** — only after a real payment has cleared
  through Wix. Not before.

## Facts you'll want on resume

| | |
|---|---|
| Wix site | Nouriqo — `8d7684e1-d857-4e66-875d-152e448720c5` |
| Catalog version | **V1** — V3 endpoints will not work |
| Headless client ID | `e41bc778-9b9e-4c77-9ae0-f7c5710dda8b` (public by design) |
| Wix Stores app ID | `215238eb-22a5-4c36-9e7b-e7c08025e04e` (same on every site) |
| Currency / locale | INR, India, Asia/Kolkata |
| Orders all-time | 0 |

**Env vars:** `WIX_CLIENT_ID`, `REVALIDATE_SECRET` (both already in Vercel),
plus `WIX_CHECKOUT_ENABLED` / `NEXT_PUBLIC_WIX_CHECKOUT_ENABLED` (not yet set
in Vercel — deliberately).

## Traps

- **Catalog V1, not V3.** Search results and AI answers will hand you V3
  endpoints. They fail against this site. Check the version badge.
- **Checkout V1 is fully deprecated** (all 13 methods). Wix's own headless
  guides still route through it via the Redirects API. Cart V2's
  `get-checkout-url` is the current path and is what this code uses.
- **Don't run `prisma/seed.ts`.** It seeds the pre-Wix static array and would
  reintroduce old slugs, breaking PayU checkout. Use
  `scripts/sync-products-from-wix.ts` instead. The seed file has a warning
  header.
- **Variants need `variantId`,** not option names — these products have
  `manageVariants: true`, and names return `ITEM_NOT_FOUND_IN_CATALOG`.
- **The `Authorization` header takes the bare token** — no `Bearer ` prefix.
- **Renaming a product slug in Wix** breaks that URL and silently drops its
  presentation override (degrades to defaults, never to broken).

## Uncommitted work

Branch `main`, last commit `9321176 wix backend integrated`. The checkout work
is staged but **not committed**:

```
A  app/api/checkout/route.ts
A  components/cart/CheckoutButton.tsx
A  lib/wix-checkout.ts          (untracked: scripts/sync-products-from-wix.ts)
M  components/cart/CartDrawer.tsx   lib/config.ts       lib/products.ts
M  lib/products-wix.ts              lib/wix-client.ts   prisma/seed.ts
M  docs/CHANGELOG.md  docs/COMPONENT_ARCHITECTURE.md  docs/WIX_INTEGRATION.md
```

Typecheck, lint and build were all clean at the point of stopping. Safe to
commit as-is — everything new is behind flags that are off.

## Related docs

- `WIX_INTEGRATION.md` — how the integration works; the reference
- `CHANGELOG.md` — entries (3), (4) and (5) on 2026-09-20 cover this work
- `ECOMMERCE_BUILDOUT.md` — the original five-phase plan this changed course from
- `COMPONENT_ARCHITECTURE.md` — where the new lib modules sit
