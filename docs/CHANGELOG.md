# Changelog

## 2026-09-25 (5) — Animated pack-size dropdown

The user supplied a 21st.dev reference component (emerald-ui's
`AnimatedDropdown`, MIT) and asked for it on the "quantity" dropdown. The
only storefront dropdown is the pack-size picker in `AddToCartControl`
(cart quantity uses `QuantityStepper`). The user confirmed that as the
target, and asked for each option to show its price.

**Adapted rather than pasted.** The original is shadcn-styled
(`bg-primary`, `border-input`, `text-foreground`, `dark:`). This project
has no shadcn theme and no dark mode, so those classes would have
rendered unstyled. It's also a menu of `<a href>` links rather than a
value picker. We didn't set up shadcn or add `tailwind-merge`.

**New `components/ui/AnimatedSelect.tsx`:**
- keeps the reference's motion: the rotating chevron, the fade/scale
  panel and the staggered options;
- is a controlled select that follows the ARIA listbox pattern
  (arrows, Home/End, Enter/Space, Escape back to the trigger, Tab, and
  closing on click outside);
- respects reduced motion, falling back to an opacity fade only;
- matches the old native `<select>` pill in brand ivory, ink and emerald.

`AddToCartControl` uses it with "size · price" options and gained a
`dropdownSide` prop. `ProductCard` passes `"top"`, because the card's
`overflow-hidden` would clip a list that opened downward. The product
page opens it downward.

**Verification:** `tsc --noEmit` and eslint are clean. Checked with
Playwright (system Chrome) at 1280px and 375px:
- on cards the list opens upward, inside the card;
- on the product page it opens downward;
- keyboard selection updates both the trigger and the price;
- clicking outside closes it, and Escape closes it and returns focus to
  the trigger;
- no console errors.

## 2026-09-25 (4) — Terms of Service replaced with the client's text

This is the last of the four legal pages. `termsOfService` in
`lib/legal-pages.ts` now holds the client's text word for word (12
numbered sections). As with the other three, the only changes are
structural:
- the text is split into blocks, with the contact details as a `lines`
  block;
- lines broken by the paste are rejoined;
- `&amp;` is written as "&";
- the duplicate "Last Updated" lines are dropped.

`lastUpdated` is 2026-09-15. The title stays "Terms of Service", which
matches the client's heading.

**All four legal pages are now the client's text.** None of our
2026-09-13 drafts remain, and nothing on these pages names PayU. That
closes the `TODO.md` item about the pages describing a PayU checkout
that didn't exist yet.

**Still open in `TODO.md`:**
- The Privacy Policy refers to "Terms and Conditions", but this page is
  titled "Terms of Service". Both are client text, so we left them for
  the client to decide.
- The phone number mismatch: the legal pages use 92701 31986, while the
  footer, `/contact` and WhatsApp checkout use 99606 25495.

**Verification:** `tsc --noEmit` and eslint are clean. On the dev server,
`/terms-of-service` renders all 12 sections and shows "Last updated: 15
September 2026".

## 2026-09-25 (3) — Refund policy replaced with the client's text

Third page from the client. `refundPolicy` in `lib/legal-pages.ts` now
holds their text word for word (13 numbered sections). As with the other
two pages, the only changes are structural:
- the text is split into blocks, and the contact details within sections
  2, 10, 11 and 13 use `lines` blocks;
- lines broken by the paste are rejoined;
- `&amp;` is written as "&";
- the duplicate "Last Updated" lines are dropped.

`lastUpdated` is 2026-09-15.

**The page title changed** from "Refund & Cancellation Policy" to
"Refund, Return & Replacement Policy". This matches the client's heading
and the Shipping Policy's section 8 reference to it. Kept as they were,
so existing links (and anything already submitted to PayU) still work:
- the URL `/refund-policy`;
- the export name `refundPolicy`;
- the footer's short "Refund Policy" label.

The Terms of Service draft's cross-reference was renamed to match.

**This replaces our working defaults.** The 48-hour reporting window and
5–7 business day refund timeline are gone. The client's figures are:
- 5 days from delivery to report damaged, incorrect or missing items;
- 10 days for spoiled products;
- a response within 24–48 hours;
- no refund-processing timeline promised.

**Verification:** `tsc --noEmit` and eslint are clean. On the dev server,
`/refund-policy` shows the new h1 and `<title>`, all 13 sections, and
"Last updated: 15 September 2026".

## 2026-09-25 (2) — Shipping & Delivery Policy replaced with the client's text

Second page from the client. `shippingPolicy` in `lib/legal-pages.ts` now
holds their text word for word (10 numbered sections). The only changes
are structural:
- the text is split into blocks;
- lines broken by the paste are rejoined ("re-delivery" was split across
  two lines);
- `&amp;` is written as "&";
- the duplicate "Last Updated" lines are dropped.

`lastUpdated` is 2026-09-15, the date the client's text gives. The
description is reworded to "How your order is packed, dispatched, and
delivered.", because the old one promised "where we ship" and the new
text doesn't cover that.

The client's contact block keeps its own phone number (`+91 92701
31986`), the same as the Privacy Policy.

**This replaces our working defaults.** The 1–2 day processing time,
3–7 day delivery window and "we ship across India" are gone. The new
figures are dispatch within 3 working days, or up to 10 for items
needing preparation or out of stock, with no delivery-day promise.

**New client decisions flagged in `TODO.md`:**
- The policy says free shipping only applies during a stated promotion,
  but Wix currently charges ₹0 shipping on every order.
- Section 8 refers to a "Refund, Return & Replacement Policy", which
  doesn't match our "Refund & Cancellation Policy" title.

**Verification:** `tsc --noEmit` and eslint are clean. On the dev server,
`/shipping-policy` renders all 10 sections and shows "Last updated: 15
September 2026".

## 2026-09-25 — Privacy Policy replaced with the client's text

The client is supplying their own text for the four legal pages, one
page at a time. First up: the Privacy Policy. `privacyPolicy` in
`lib/legal-pages.ts` now holds that text word for word (17 numbered
sections). The only changes are structural: the text is split into
blocks, the duplicate "Last Updated" lines are dropped because the page
already shows one, and a missing space in "Email:sales1earth" is fixed.
`lastUpdated` stays 2026-09-13, the date the client's text gives.

**Contact details, decided with the user:**
- Section 17 had "[Insert official email address]". It now uses
  `sales1earth@gmail.com`, the email section 15 already gives.
- The policy's phone number (`+91 92701 31986`) appears **only on this
  page**. The rest of the site keeps `+91 99606 25495` until the client
  confirms which number is current (see `TODO.md`).
- The email and "Pune, Maharashtra, India" now replace the bracketed
  placeholders in `Footer.tsx` and `ContactInfo.tsx`.

**`LegalContent` gained three block types** for the client's structure:
`subheading` (h3, for sub-sections 3A–3D), `orderedList` (section 4's
numbered purposes), and `lines` (the contact/address blocks: stacked
lines with no paragraph gap).

**Verification:** `tsc --noEmit` and eslint are clean. On the dev server,
`/privacy-policy` renders all 17 h2 sections, the four h3 sub-sections
and the ordered list, and shows "Last updated: 13 September 2026".
`/contact` and the footer show the new email and address.

## 2026-09-20 (5) — Fix "<slug> (<weight>) is no longer available" at checkout

Reported symptom: `ghee-papri (200 gram) is no longer available.` on every
checkout attempt. Two distinct causes, both fixed.

**Cause 1 — the catalogs had drifted.** That message comes from
`lib/orders-db.ts`, the *PayU* order path, which validates against Postgres.
Postgres still held the pre-Wix catalog: old slugs (`classic-ghee-papri`) and
no 200 gram pack. Any cart built on the live site — which now reads from Wix —
failed validation there.

Fixed with `scripts/sync-products-from-wix.ts`, which mirrors the Wix catalog
into Postgres: upsert by slug, pack sizes replaced wholesale, products Wix no
longer sells deleted. Ran it — 3 products synced, 2 stale slugs removed. The
PayU fallback works again, which matters: a fallback that doesn't work isn't
one. `prisma/seed.ts` now carries a warning header, since running it would
reintroduce exactly the stale data that caused this.

**Cause 2 — the domain collision, now with a customer-visible symptom.** The
reason anyone reached the PayU page at all is that Wix's `get-checkout-url`
returns `https://www.nouriqo.com/checkout?checkoutId=…`, and that domain
resolves to Vercel. Wix's checkout link lands on *this app's* legacy checkout
page, which then fails while validating a Wix cart against Postgres.

`createCheckoutUrl` now refuses to return a URL whose host is our own domain,
with a message naming the fix, rather than redirecting a paying customer into
that loop. The underlying fix is still a Wix pages domain — dashboard-only,
not settable through `UpdateOAuthApp` (which only accepts name, description,
domains, login/logout URLs).

## 2026-09-20 (4) — Wix checkout, built and gated off

Cart hand-off to Wix's hosted checkout. **Shipped disabled** behind
`WIX_CHECKOUT_ENABLED` / `NEXT_PUBLIC_WIX_CHECKOUT_ENABLED` — with the flags
off the cart drawer is byte-for-byte what production shows today.

**What shipped.** `lib/wix-checkout.ts`, `POST /api/checkout`,
`components/cart/CheckoutButton.tsx`, plus `wixProductId` / `variantId`
carried through the `Product` type so a cart line can name a real Wix variant.

**Cart stays local; the Wix cart is created at checkout.** Syncing every
add-to-cart to Wix would put a network call behind every click for little
gain. Wix tracks abandoned *checkouts*, so the client keeps recovery — and
someone who started checkout is a warmer lead than someone who merely added to
cart.

**A fresh visitor token per checkout.** Catalog reads share one cached token
(public data, identical for everyone). A cart belongs to a shopper, so each
checkout mints its own session rather than hanging every order off one shared
identity.

**Blocked on one DNS change.** `get-checkout-url` returns a URL on
`www.nouriqo.com` — which points at Vercel, not Wix, so a customer would land
on this repo's own PayU checkout page. Wix serves hosted pages from a separate
site and explicitly can't reuse the external site's domain. Needs a
`checkout.nouriqo.com` subdomain (or the free `*.wixsite.com` default). Details
in `docs/WIX_INTEGRATION.md`.

**Checkout V1 is fully deprecated** — all 13 methods. Wix's own headless guides
still route through it via the Redirects API, so that's a trap. Cart V2's
`get-checkout-url`, used here, is current.

**Also verified while building:** shipping rates *do* resolve for India, but as
"Free shipping" at ₹0.00 — the PayU flow charges a flat ₹50, so that charge
would silently vanish at cutover. Tax is 0% with no region configured, and an
active international shipping region exists. All three need a client decision;
none block the build.

## 2026-09-20 (3) — Wix Headless: the product catalog moves to Wix

The client asked to manage the store from the Wix dashboard they already pay
for, rather than from the Phase 4 admin panel. Wix Stores is now the source of
truth for products; this repo is the source of truth for presentation.

Full reference: **`docs/WIX_INTEGRATION.md`**.

**What shipped.** `lib/wix-client.ts` (visitor-token auth, cache-tagged fetch),
`lib/products-wix.ts` (Wix → `Product` mapping), `lib/product-presentation.ts`
(the hybrid styling model), `POST /api/revalidate`, and
`static.wixstatic.com` in the image config.

**Why it was a three-line change downstream.** The old `lib/products-db.ts`
exposed exactly two functions returning a `Product`. Keeping that contract
identical meant the cart, product grid and detail pages needed nothing beyond
a changed import path. The abstraction earned its keep.

**Hybrid presentation, decided explicitly.** Wix has no field for our accent
colour, the "Since 1958" ribbon, the ingredient badges or the variant
sub-label. The rule chosen: *defaults must make a brand-new product look right
with zero code changes*, with per-slug overrides for styling we care about.
Accent colours for unknown products are hashed from the slug, so they are
stable across deploys rather than reshuffling. A renamed slug drops its
override and falls back to generic-but-correct, never broken.

**Catalog restructure, done over the API.** The Wix store had three products
carrying leftover template slugs (`artisanal-cheese-platter` for GHEE PAPRI,
`organic-quinoa-salad` for KAJU PAPRI), a zero shipping weight, and no pack
sizes at all. Added a `Weight` option with 200 gram / 500 gram / 1 kg, priced
per variant, with real per-size weights so Wix can compute shipping. Kaju
Badam Papri was sitting out of stock with inventory tracking on while the
other two had it off; put back in stock to match.

**Pricing conflict, resolved toward Wix.** The repo seed and the Wix catalog
disagreed badly — repo said ₹600 for Kaju Papri against a ₹725 *cost*, i.e.
selling at a loss. `lib/products.ts` had always labelled its prices
provisional. Wix's prices were real and are now authoritative. 1kg and 200g
prices are reasonable derivations the client will adjust.

**What was deliberately not deleted.** Prisma, the Postgres catalog, PayU and
the whole `/admin` section still exist and still work. They are the fallback
until a real payment clears through Wix. WhatsApp checkout also stays live
until that same cutover — there is never an in-between state where checkout
doesn't work.

**Not done yet:** checkout, payments (PayU India KYC was in progress; Wix
Payments does not support India), and a Wix webhook for automatic cache
revalidation.

## 2026-09-20 (2) — Timed enquiry popup

A modal enquiry form that opens 5 seconds after a visitor lands, collecting
name, mobile, email, address and message, and handing off to WhatsApp —
the same honest no-backend pattern as `/contact`'s inline form and the
cart's checkout.

**Client decisions, asked before building:**
- **Once per browsing session** (`sessionStorage`, not `localStorage`) —
  reappears on a genuinely new session, never twice within one.
- **WhatsApp deep link only.** No database record, no admin Enquiries
  screen. Offered, explicitly declined — worth knowing that an enquiry
  which is abandoned at the WhatsApp step leaves no trace on our side.
- **All five fields required**, including address.
- **Fires on whatever page they land on first**, not homepage only —
  visitors arriving on `/sweets` or a blog post from search are landing too.

**Trigger mechanics.** The two timing decisions collapse into one
mechanism: a sessionStorage flag set the moment the popup is *shown*, so
dismissing via X, Escape or the backdrop all behave identically, as does
submitting. `EnquiryPopup` mounts in `app/(site)/layout.tsx`, which Next
keeps mounted across client-side navigations, so its scheduling effect runs
once per full page load — that is what gives "first page they land on"
without any extra bookkeeping. Pathname and cart state are read through
refs *synced in an effect* (not mutated during render — `react-hooks/refs`
correctly rejects that, and it is unsafe under concurrent rendering) so
navigating or opening the cart never restarts the countdown.

**Suppressed on `/checkout*`, `/order-success` and `/contact`** — the first
two are mid-payment or just-paid states where covering the screen risks a
real order, and `/contact` already renders the same form inline. Re-checked
at fire time, not just when scheduled, in case the visitor navigated into
checkout during the 5 seconds. `/admin/*` needs no entry: it is a separate
root layout, so the component never mounts there. The popup also declines
to open if the cart drawer happens to be open, rather than stacking two
overlays.

**Rendered in `app/(site)/layout.tsx`, not inside `Navbar`** — same reason
`CartDrawer` is: `Navbar`'s `<header>` has `backdrop-blur-sm`, and a
`filter`/`backdrop-filter` ancestor becomes the containing block for its
`position: fixed` descendants. Layering continues the existing scale
(MobileMenu 40 → Navbar 50 → cart 60/70): scrim `z-[80]`, panel `z-[90]`.

**No shadcn/Radix.** The `ui-styling` skill leans on them, but this project
has neither, and `CartDrawer` already establishes the house overlay pattern
(`AnimatePresence` + body scroll lock + Escape). Adding Radix for one
dialog would have been a new dependency doing what ~40 lines already do
here. One thing was added that `CartDrawer` lacks: a real **focus trap**.
Focus moves to the dialog container itself (`tabIndex={-1}`) rather than the
first control, so screen readers announce the title and the visitor isn't
met with a heavy focus ring on the close button; Tab and Shift+Tab both wrap
inside, and focus is restored to wherever it was on close.

**16px inputs, deliberately** — `/contact`'s inline form uses 14px, which
makes iOS Safari auto-zoom the viewport on focus. Tolerable on a page,
disorienting in a modal. Bottom sheet below `sm:`, centred card above,
`max-h-[90dvh]` with the form scrolling inside, since five fields plus a
textarea is tall.

**New/changed:**
- `components/enquiry/EnquiryPopup.tsx` — new, `"use client"`.
- `lib/enquiry-popup.ts` — new: session key, delay, suppressed-route list.
- `lib/whatsapp.ts` — `EnquiryDetails` gains an optional `address`, emitted
  as an `Address:` line only when present, so `/contact`'s four-field form
  is completely unchanged and both keep one message format.
- `app/(site)/layout.tsx` — mounts `<EnquiryPopup />` beside `CartDrawer`.

**Verified** with Playwright against the dev server, 26/26: does not appear
before 5s and does appear after; all five fields present and required;
focus enters and is trapped in both directions over a full cycle; body
scroll locks and releases; Escape closes; 16px inputs confirmed by computed
style; no re-fire after client-side navigation *or* a full reload in the
same session; does re-fire in a fresh session; suppressed on `/checkout`
and `/contact`; and the exact URL handed to `window.open` carries all five
values including the `Address:` line. Layout checked at 320/375/390/768/
1440 — panel fits vertically at every size, form scrolls internally below
`sm:`, no horizontal overflow, no console errors. Reduced-motion checked
separately: opens with `opacity: 1`, no transform, fully on screen.
`next build` and `eslint` clean.

**Pre-existing bug found while testing, NOT introduced here and NOT fixed:**
under `prefers-reduced-motion`, every `Reveal`/`RevealGroup`/`RevealItem`
causes a React hydration mismatch. `useReducedMotion()` returns false during
SSR, so the server emits `motion.div`'s `initial` styles
(`opacity: 0; transform: translateY(20px)`), while the client renders the
plain `<div>` early-return with no styles. Confirmed unrelated to this work
by reproducing it on `/contact`, where the popup is suppressed and never
renders. It affects only reduced-motion visitors, and the usual fix is to
gate on a mounted flag rather than branching the returned element. Left
alone as out of scope — see `TODO.md`.

## 2026-09-20 — Real favicon: brand mark replaces the Next.js default

The site had been serving the stock `create-next-app` favicon — the
black circle with the white Vercel triangle — since it was scaffolded
on 2026-09-04. On a live domain that means every browser tab, bookmark
and search result was branded Vercel, not Nouriqo. Replaced with the
brand's own leaf mark.

**Why the supplied logo could not just be dropped in.** Both logo files
are fully opaque: RGBA in format, but with zero transparent pixels and
a solid `rgb(254,254,254)` background (79% of the lockup, 65% of the
mark). The site works around this at runtime with `.logo-blend`'s
`mix-blend-mode: multiply` (`globals.css`), which only succeeds because
there is a cream page behind the logo — and which `globals.css` already
disables under `prefers-color-scheme: dark`, conceding the same
limitation. A favicon has no page behind it; the browser composites it
onto the tab strip, which CSS cannot reach and which is near-black in
dark mode. Dropped in as-is it would have been a white postage stamp in
a dark tab bar. So the transparency had to be baked into the file.

The full lockup (`nouriqo-logo.png`) was never a candidate — its
"NOURIQO" / "EMPOWER HEALTH" wordmark is baked into the pixels and turns
to mush at 16px. That is the same reasoning that produced
`nouriqo-mark.png` for the navbar at ~36px, only more so at 16px.

**What was done** — full detail, including how to reproduce it, is in
`ASSET_MAP.md`'s new "Browser / app icons" section. In short: the white
background was keyed out with a border-seeded flood fill (a global
"delete all white" would have punched a hole through the enclosed
highlight inside the right leaf), the ™ was dropped via connected-
component analysis (illegible at icon sizes, but still eating
contrast), and the mark was recropped from its off-centre position to
its true 187×187 bbox and re-padded square.

**Deliberately kept within the "do not alter the logo" rule.** No
redrawing, recoloring or regeneration — only background removal,
cropping and padding. This sits on the same side of the line as
`nouriqo-mark.png`, which is itself already a crop of the supplied
lockup. `nouriqo-logo.png` and `nouriqo-mark.png` are both untouched;
the ™ removal applies only to the icon derivatives.

**Resolution ceiling worth knowing:** the mark's actual ink is 187px in
the best available source, so every icon is generated at or below that
— nothing upscaled. Hence `icon.png` at 192×192 rather than the usual
512×512. A larger icon (PWA manifest, large app tile) would need
higher-resolution source artwork from the client.

**Files:**
- `app/favicon.ico` — 16/32/48, 32-bit BMP entries for widest
  compatibility, transparent, tight ~4% padding.
- `app/icon.png` — 192×192, transparent.
- `app/apple-icon.png` — 180×180 on opaque `cream` (#faf3e6), ~14%
  padding. Cannot be transparent: iOS renders a transparent
  apple-touch-icon as solid black and masks the corners itself.

**Also removed:** `app/(site)/layout.tsx`'s manual
`icons: { icon: "/favicon.ico" }` metadata entry. Next's file
conventions (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`)
emit the correct `<link>` tags automatically with sizes, types and
content hashes, and Next's own docs recommend the file-based API over
the config export "rather than having to sync the config export with
actual files." Left in place it would have fought the new `icon.png`.

**Verified:** `next build` clean, `eslint` clean. Both root layouts —
`(site)` and `admin` — emit exactly one set of tags (`icon` 48×48 ico,
`icon` 192×192 png, `apple-touch-icon` 180×180), confirmed in the built
HTML, since the convention files sit at the true top level of `app/`
and so resolve for both trees. The written `.ico` was decoded back out
of its own bytes and rendered against both a dark (#202124) and light
(#dee1e6) tab strip at all three sizes to confirm no white box, clean
edges, the interior leaf highlight intact, and the notch between the
two leaves still legible at 16px.

## 2026-09-14 (2) — Real Super Admin account created; phone UI treatment

Follow-up to the admin dashboard build: the client asked why they
couldn't see `/admin/login` yet (answer: nothing from this build-out
had been committed/pushed — it's all local, uncommitted work; the dev
server was running locally the whole time) and clarified the phone
number's format before the real account got created.

**Decision:** `+91` is a fixed UI label, never typed or stored — the
database holds only the bare 10-digit number (`7972052896`, not
`+917972052896`). `LoginForm`/`CreateUserForm` now show a static "+91"
next to the phone input (`pattern="[0-9]{10}"` + `maxLength={10}` for
a numeric-only, exactly-10-digit field), the Users list displays
`+91 {phone}`, and `createAdminUser`'s server action enforces the same
10-digit rule server-side too — the form's `pattern` attribute is a UX
nicety, not a security boundary, and phone was the only field without
an equivalent server-side check before this. `scripts/create-admin.ts`
gained the same validation plus a usage-comment update.

**Real Super Admin account created** via `scripts/create-admin.ts`
— phone `7972052896`, a cryptographically random password (generated,
shared with the client directly, never written to a file). Verified
with a real login (not a test account this time): correct redirect to
`/admin`, dashboard renders with the real product count. Display name
is currently the placeholder "Super Admin" — no self-edit-profile
screen exists yet to change it, noted in `TODO.md`.

## 2026-09-14 — Admin dashboard: auth, products, orders, users

Phase 4 of `ECOMMERCE_BUILDOUT.md`, the last major piece of the
ecommerce build-out plan before the PayU/Shiprocket cutover steps.

**Decision resolved first:** the user's "mobile and password" phrasing
in the original plan was ambiguous — asked directly rather than
assuming, and confirmed login is by **phone number**, not email (still
a plain password, no OTP/SMS provider). Also confirmed: no public
admin-signup page (a real security hole — anyone finding the URL could
try registering as an admin), so the first Super Admin gets bootstrapped
directly into the database via a script, using a password generated
for the client rather than one they'd have to think up themselves.

**Schema:** `AdminUser` switched from `email` to `phone` (unique) +
gained a `name` field; added `AdminSession` (one row per login — DB-
backed sessions, not JWT, so revoking access is just deleting a row).
Hit a real CLI limitation applying this: `prisma migrate dev` refuses
to run at all in a non-interactive shell whenever there's a warning to
confirm (this migration had one, harmless — the table was empty).
Worked around it with `prisma migrate diff --from-config-datasource
--to-schema prisma/schema.prisma --script` to generate the SQL
directly, then `prisma migrate deploy` (which doesn't prompt) to apply
it — same non-interactive-friendly pattern worth remembering for any
future schema change that trips this.

**Structural change required:** the admin panel needed its own root
layout (no customer Navbar/Footer/cart), but Next.js only allows more
than one `<html>/<body>` root layout via route groups, where every
top-level route must belong to exactly one. Moved every existing route
into `app/(site)/` to make room for `app/admin/` as an independent
second root layout — the route group is invisible in the URL, nothing
about the site's actual paths changed. One import (`CheckoutForm.tsx`'s
`@/app/checkout/actions`) needed updating to the new
`@/app/(site)/checkout/actions` path; everything else used the `@/`
alias to files that didn't move.

**New:**
- `lib/admin-auth.ts` — bcrypt hashing, session create/destroy,
  `getCurrentAdmin()`, and `requireAdmin()`/`requireSuperAdmin()` for
  gating pages *and* Server Actions (a layout only gates rendering; an
  action is independently invocable, so every admin action calls one
  of these itself — see the note in `COMPONENT_ARCHITECTURE.md`).
- `/admin/login` (public) → `/admin/(protected)/*` (gated by a layout,
  `/admin/login` sits outside that route group as a sibling so it
  isn't itself gated) → dashboard home, products (list/create/edit/
  delete), orders (list/detail/shipment-status), users (Super-Admin-
  only: list/create/delete, can't delete yourself or the last Super
  Admin).
- `scripts/create-admin.ts` — the only way to create/reset a Super
  Admin login (`npx tsx scripts/create-admin.ts "<name>" <phone>
  <password> [role]`); re-running with an existing phone resets the
  password, doubling as forgot-password recovery for now.
- Seven new `components/admin/*` client components (`LoginForm`,
  `AdminShell`, `ProductForm`, `CreateUserForm`, `DeleteButton`,
  `StatusBadge`, `ShipmentStatusControl`).

**Scope limit, flagged not hidden:** product image handling is a text
path field, not a file upload — the image itself still needs to land
in `public/assets/products/` some other way. Building a real upload
pipeline wasn't asked for and would have meaningfully expanded this
pass; noted in `TODO.md` as a deliberate limit, not an oversight.

**Verification:** `tsc --noEmit`, `next lint`, `next build` all clean.
End-to-end with Playwright using temporary test accounts (a Super
Admin and an Admin/Manager, deleted afterward): unauthenticated
`/admin` redirects to login; login works and the dashboard's counts
render correctly (verified by dumping the actual rendered HTML, not
just a flaky text-match check); the products list shows the 3 real
seeded products; creating, editing, and deleting a test product all
worked *and* `/sweets` reflected each change immediately
(`revalidatePath` confirmed working, not just called); logging out
actually ends the session — a subsequent visit to a protected page
redirects to login again, not just the UI looking logged out; and an
Admin/Manager account was confirmed genuinely blocked from
`/admin/users` (server-side redirect to `/admin`), not merely hidden
from the sidebar.

**Bug the tests found in the test itself, not the app:** an early pass
used a generic `button[type="submit"]` selector on the product-create
page, which matched the admin sidebar's "Log Out" button instead of
the form's own submit button — both share that type, and the sidebar
renders first in the DOM. Explains a confusing first run where the
session appeared to vanish mid-flow; the dev server log's own
`logout()` action-call trace gave it away. Fixed by scoping every
selector to the specific button text/container.

**Not yet done:** the real Super Admin account — needs the actual
phone number, tracked in `TODO.md`.

`ECOMMERCE_BUILDOUT.md`, `WEBSITE_STRUCTURE.md`, and
`COMPONENT_ARCHITECTURE.md` updated to match.

## 2026-09-13 (8) — Real checkout + PayU payment flow, built and tested

The biggest slice yet of `ECOMMERCE_BUILDOUT.md`: a genuine checkout
page, order creation, and a full PayU hosted-checkout integration —
not yet linked from the live site (WhatsApp checkout stays as the only
linked path until cutover, per the agreed plan), but built and tested
end-to-end.

**Researched before writing any code:** PayU's actual current
integration docs (docs.payu.in), rather than relying on training-data
memory for a payment integration. This caught and corrected two wrong
assumptions already sitting in `ECOMMERCE_BUILDOUT.md`: (1) there's no
anonymous public PayU test credential — a test key/salt still needs a
PayU account and dashboard login (Test Mode toggle), just not the full
business KYC that gates live credentials; (2) PayU's classic
integration doesn't have a true async push webhook — the "webhook"
role in the original plan is actually played by the surl/furl redirect
plus a `verify_payment` server-to-server reconciliation call PayU
itself recommends running afterward. Also pinned down the exact
production API hostname (`info.payu.in/merchant/postservice.php`,
with the `.php` — an earlier search result had suggested the same path
without it).

**New:**
- `lib/payu.ts` — request-hash generation, reverse-hash verification
  (constant-time compare via `timingSafeEqual`, since this is a
  security check), and the `verify_payment` reconciliation call.
  Sandbox by default; only `PAYU_ENV=production` switches endpoints.
- `lib/orders-db.ts` — `createOrderFromCart()`: re-reads every line's
  price from the database (never trusts the client's cart prices),
  computes subtotal/shipping/total, and creates the Order/OrderItems
  (snapshotting product details)/initial Payment row together.
- `/checkout` (`CheckoutForm`) — delivery-details form + order summary,
  calling a new `submitOrder` server action directly as a function
  (cart lines come from `useCart()`, not form fields).
- `/checkout/payu-redirect` (`PayuAutoSubmitForm`) — loads the pending
  Payment/Order, computes the PayU hash, auto-submits a hidden form to
  PayU's hosted page.
- `/api/payu/callback` — PayU's `surl` and `furl` both point here.
  Verifies the reverse hash, reconciles via `verify_payment` (falling
  back to the hash-verified redirect status if that call itself fails,
  so a PayU-side hiccup doesn't wrongly fail a real payment), updates
  the Payment/Order, redirects to `/order-success` or `/checkout/failed`.
- `/order-success` — 404s unless the order's `paymentStatus` is
  actually `PAID` (never renders an unpaid order's details, even to
  someone who guesses/reuses the URL); mounts `ClearCartOnMount`.
- `/checkout/failed` — "your cart is still saved" + a way back.
- `lib/config.ts` gained `SHIPPING_CHARGE` (flat ₹50/order — an
  explicit placeholder the client asked for, see `TODO.md`) and
  `SITE_URL` (builds PayU's callback URL from Vercel's own
  `VERCEL_URL`, since PayU needs a public HTTPS address).

**Real bug caught during verification, unrelated to PayU itself:** the
cart wasn't actually clearing on `/order-success`. `ClearCartOnMount`
called `clearCart()` on mount, but React fires child effects before
parent effects in the same commit — `CartProvider`'s own one-time
localStorage-hydration effect (a parent, higher in the tree) ran
*after*, read the still-stale stored cart, and silently overwrote the
clear a moment later. `localStorage` and the navbar badge both still
showed the old item after "successful" clearing. Fixed by exposing a
new `hasHydrated` flag from `CartProvider` and having
`ClearCartOnMount` wait for it before calling `clearCart()`.

**Verification:** `tsc --noEmit`, `next lint`, `next build` all clean
throughout. End-to-end with Playwright against placeholder
`PAYU_KEY`/`PAYU_SALT` (real values need the client's PayU dashboard
access — see below): added an item, filled out checkout, confirmed the
real DB rows and correct PayU form fields (amount, hash, etc.);
simulated a correctly-signed PayU success callback and confirmed it
updates the order and lands on a working `/order-success` that
actually clears the cart (re-verified after the fix above); separately
POSTed a **tampered** callback (wrong amount) and confirmed it's
rejected to `/checkout/failed` instead of being accepted — proving the
hash check is a real security boundary, not just present in the code.
All test orders deleted from the database afterward.

**Not yet done — needs the client's PayU dashboard access, not more
code:** a real test key/salt, to run one actual transaction through
PayU's real hosted page rather than a simulated callback (everything
above proves the code is correct; it hasn't touched PayU's real
servers yet). Also needs a deployed URL for that specific leg, since
PayU can't redirect back to `localhost`.

`ECOMMERCE_BUILDOUT.md`, `WEBSITE_STRUCTURE.md`,
`COMPONENT_ARCHITECTURE.md`, and `TODO.md` updated to match.

## 2026-09-13 (7) — Product catalog migrated to the database + PDP route

Continuation of Phase 2: the site's read side now queries the live
database instead of `lib/products.ts`, and a Product Details page
finally exists.

**New:**
- `lib/products-db.ts` — `getProducts()`/`getProductBySlug()`, wrapped
  in React's `cache()` (so a request touching both `app/layout.tsx` and
  a page only queries the database once), mapping Prisma's generated
  row types back into the exact `Product`/`WeightOption` shape
  `lib/products.ts` always exposed — so `ProductCard`, `AddToCartControl`,
  and `CartDrawer` needed no prop-type changes at all.
- `app/products/[slug]/page.tsx` + `components/products/ProductDetails.tsx`
  — the PDP `TODO.md` had listed as not-started since the original
  ecommerce-build-out stub. Image + eyebrow/h1/variant/description/
  attribute chips + `AddToCartControl`, same asymmetric grid pattern as
  `Gifting.tsx`. `ProductCard`'s image and title now link to it — it
  was a completely dead end before this.

**Changed:**
- `ProductGrid` is now an async server component reading
  `lib/products-db.ts` instead of importing the static array.
- `CartProvider` (`lib/cart-context.tsx`) takes a new `products` prop —
  `app/layout.tsx` fetches the catalog once, server-side, and passes it
  down, since `CartDrawer` is a client component and Prisma can't run
  in the browser. `CartDrawer` now looks products up from that context
  field instead of importing `getProductBySlug` from `lib/products.ts`.
- `lib/products.ts` is now seed-only (`prisma/seed.ts` is its only
  remaining reader) — a comment at the top of the file says so.

**Bug caught during verification, unrelated to the feature itself but
surfaced by it:** the first build came back with every route marked
fully static (`○`), including `/` and `/sweets`. A plain Prisma call —
unlike `fetch()` — doesn't signal to Next.js that a route needs dynamic
rendering, so `getProducts()`'s result would have frozen at build time;
once Phase 4 lets admin edit a product, that edit wouldn't reach the
live site until the next deploy. Fixed with `export const revalidate = 60`
on the root layout (applies site-wide since every route sits under it —
harmless for pages with no product data, like `/story`). `/products/[slug]`
was already fully dynamic on its own, since it has no `generateStaticParams`.

**Verification:** `tsc --noEmit`, `next lint`, `next build` all clean.
Playwright (system Chrome via `playwright-core`) confirmed: Home and
`/sweets` list all 3 database-backed products; the PDP renders with
correct copy/attributes and 404s on an unknown slug; adding an item
from the PDP and opening the cart drawer shows the correct product
name, variant, weight, and price — the full client-side lookup path
through the new `products` context field, not just a compile check.

`WEBSITE_STRUCTURE.md`, `COMPONENT_ARCHITECTURE.md`, and
`ECOMMERCE_BUILDOUT.md` updated to match.

## 2026-09-13 (6) — Phase 2 started: live database, schema, and seed data

First implementation step of `ECOMMERCE_BUILDOUT.md`. User created the
Vercel Postgres database and ran `vercel login` / `vercel link`
locally; from there this was all code/CLI work.

**Prisma version note:** `npm install prisma` currently resolves to
`8.0.0-rc.14` — a release candidate that rewrites the CLI into a
platform-coupled product (`project`, `deploy`, `service` commands,
Prisma's own hosting concepts), a poor fit for "just an ORM talking to
our own Vercel Postgres." Pinned to **7.10.0** instead, the last
stable pre-v8 release. Still meant reading Prisma's own bundled
AI-agent skill docs (`.claude/skills/prisma-*`, installed automatically
by `prisma init`) rather than assuming pre-v7 patterns still apply — v7
made driver adapters mandatory for SQL providers and moved datasource
URLs out of `schema.prisma` into a new `prisma7.config.ts`. One of
those skill docs' own examples (a `datasource.directUrl` config field)
didn't match this exact installed version's type — worth remembering
that even Prisma's own current docs can drift slightly from a specific
patch release; `tsc` caught it immediately.

**New:**
- `prisma/schema.prisma` — `Product` + `ProductWeightOption`, `Order` +
  `OrderItem` (price/product details snapshotted per line at order
  time — editing or deleting a product later never rewrites past
  orders), `Payment` (one row per PayU attempt), `AdminUser` (`role`
  field for Phase 4's Super Admin / Admin-Manager split).
- `lib/db.ts` — Prisma Client singleton using the `@prisma/adapter-pg`
  driver adapter (mandatory in v7), Next.js hot-reload-safe.
- `prisma/seed.ts` — migrates the 3 SKUs out of `lib/products.ts`.
  Run via `prisma db seed` (not directly with `tsx`) so it inherits
  the env vars `prisma7.config.ts` loads.
- `prisma7.config.ts` — loads `.env` then `.env.local` (Prisma 7
  doesn't auto-load env files, and `vercel env pull` writes to
  `.env.local`, which plain `dotenv/config` ignores by default);
  points the CLI's `url` at Vercel Postgres's **non-pooled** connection
  string (`DATABASE_URL_UNPOOLED`) since Prisma's migration engine
  needs session-level locks that don't reliably work through Neon's
  pgbouncer pool — `lib/db.ts` keeps using the pooled `DATABASE_URL`
  for the app itself.

**Verification:** `prisma migrate dev --name init` applied cleanly
against the live database; `prisma db seed` populated all 3 products;
a throwaway query script (deleted after) confirmed all 3 rows and
their weight-option prices match `lib/products.ts` exactly. `tsc
--noEmit`, `next lint`, and `next build` all clean throughout.

`ECOMMERCE_BUILDOUT.md` updated (status snapshot, Phase 2 section,
manual-vs-coded table) to reflect Phase 2 as in progress rather than
not started.

## 2026-09-13 (5) — Ecommerce build-out plan: open decisions resolved

Follow-up discussion (still docs only, no code) resolved every item
`ECOMMERCE_BUILDOUT.md` had flagged as open:

- **WhatsApp checkout is fully replaced, not a permanent fallback** —
  but stays live and untouched in production until a single cutover
  moment, once the client's live PayU account exists. No in-between
  state where checkout doesn't work.
- **Shiprocket confirmed not started** — and confirmed fine to defer
  entirely to the end, since Phase 5's manual first stage has no
  earlier dependency on the account existing at all.
- **Admin auth is role-based**: Super Admin + Admin/Manager, with
  identical day-to-day access — the only thing gated to Super Admin is
  creating/removing other Admin/Manager logins.
- **Reframed "PayU setup at the end":** the user wants the *account*
  from the client at the end, but that doesn't need to gate the
  *code* — PayU publishes public sandbox credentials for exactly this
  purpose, so the full transaction/redirect/webhook flow can be built
  and tested now. This changed the suggested build order: Phase 1's
  remaining pages and Phase 3 now merge into one slice (a real
  PayU-backed checkout built against sandbox from day one), with a
  distinct "cutover" step — swap to live credentials, remove WhatsApp
  checkout — as the only piece actually gated on the client.

`ECOMMERCE_BUILDOUT.md` updated throughout (status snapshot, all five
phase sections, the manual-vs-coded table, build order) and its old
"Open Decisions / Risks" section replaced with a "Decisions Log" now
that nothing is outstanding.

## 2026-09-13 (4) — Ecommerce build-out plan confirmed and documented

User laid out a 5-phase plan (Website → Backend/Postgres → PayU →
Admin → Shiprocket) to turn Nouriqo into a real transactional store,
and asked to discuss it before any code — this entry is docs only, no
code changed.

Corrected one assumption going in: the user described Phase 1
(Website) as "almost done." Checking the actual routes showed Home and
the product listing are done, but `/products/[slug]`, a real checkout
page, and an order-success page don't exist — today's "checkout" is
still just the cart drawer's WhatsApp deep link. Surfaced that before
scoping the rest so Phase 2/3 planning wasn't built on a wrong
starting point.

Discussion resolved several decisions that would otherwise have
blocked writing the plan down: admin will manage products through the
dashboard (not just code), guest checkout only (no customer accounts),
Vercel Postgres as the database (site's already on Vercel), and
confirmation the site's already deployed with PayU KYC already in
progress (which explains why PayU asked for the legal pages shipped
earlier today).

**New:** `docs/ECOMMERCE_BUILDOUT.md` — the full plan, phase by phase,
with a manual-vs-coded breakdown per phase, a suggested build order
(Phase 1's checkout/PDP work is really the same slice as Phase 2's
backend, not separable), and an "Open Decisions" section for what's
still unresolved (WhatsApp checkout's fate once PayU ships, Shiprocket
account status, single- vs. multi-admin auth).

**Updated:** `TODO.md`'s old "Ecommerce build-out" section now points
to the new doc instead of duplicating (and drifting from) it — kept
only the historical done-items log. `PROJECT_CONTEXT.md`'s "No
ecommerce backend exists yet" constraint was also stale (it still said
product CTAs point to `/contact`, predating the 2026-09-04 cart/
WhatsApp-checkout ship) — corrected to reflect what's actually built
and point at the new plan.

## 2026-09-13 (3) — Four legal pages added, ahead of PayU integration

User asked for a Privacy Policy, Terms of Service, and a "Contact Us"
business name, to be linked from the footer. Discussed scope before
writing anything (per the user's explicit "don't code, just discuss"
request): the user confirmed the client plans to integrate PayU as a
payment gateway later, and PayU's merchant-approval process requires
these pages to already exist on the live site — which expanded scope
to match what PayU typically checks for (also Refund/Cancellation and
Shipping/Delivery policies, not just the two originally named) and
settled several decisions that would otherwise have been fabricated
content: business name shown ("Nouriqo," same as the brand), payments
described in the *future* PayU state rather than today's WhatsApp-only
checkout, generic "laws of India" jurisdiction (no specific city/state),
refund policy (no returns except damaged/wrong/missing item), and
shipping basics (pan-India, 3–7 business days, customer pays shipping).

**New:**
- `lib/legal-pages.ts` — `LegalBlock`/`LegalPage` types (heading/
  paragraph/list blocks — list is new, blog's `BlogBlock` only has
  heading/paragraph) and `formatLegalDate()`, plus four named page
  exports: `privacyPolicy`, `termsOfService`, `refundPolicy`,
  `shippingPolicy`. Exported individually rather than as a lookup
  array, since these are four fixed routes, not a growing catalog.
- `components/legal/LegalContent.tsx` — block renderer, same pattern
  as `BlogContent.tsx` plus list-block support.
- Four new routes (`app/privacy-policy`, `app/terms-of-service`,
  `app/refund-policy`, `app/shipping-policy`), each a `PageHeader` +
  `LegalContent` + a "Last updated" date, matching every other
  sub-page's structure.
- `Footer.tsx` — the bottom bar (below the existing 4-column grid,
  which is already full) gained a `<nav aria-label="Legal">` linking
  all four pages next to the copyright line, rather than a 5th grid
  column.
- `ContactInfo.tsx` — new "Business Name" row ("Nouriqo") above the
  existing Email/Phone/Address list.

Numeric specifics not supplied by the client (48-hour damage-report
window, 5–7 business day refunds, 1–2 business day dispatch) are
working defaults, not confirmed figures — flagged in `TODO.md`
alongside the bigger caveat that all four pages describe the future
PayU checkout flow, not today's WhatsApp-only one, and are a
best-effort draft rather than lawyer-reviewed text.

**Verification:** `next lint` and `next build` clean (all four routes
prerender as static). Verified with Playwright (`playwright-core`,
system Chrome): all four pages return 200 with no console/page errors;
the footer's four legal links resolve to the correct hrefs at both
375px and 1280px; `ContactInfo`'s new "Business Name" row renders
correctly above Email/Phone/Address.

`WEBSITE_STRUCTURE.md` and `COMPONENT_ARCHITECTURE.md` updated to
match.

## 2026-09-13 (2) — Testimonials: fixed 6-of-9 hidden on mobile

User reported that mobile only ever showed the first 3 testimonials on
`/testimonials`. Root cause: `Testimonials.tsx` splits the 9
testimonials into 3 columns of 3, with column 2 hidden below `sm:` and
column 3 hidden below `lg:` — CSS `hidden`, not conditional rendering,
so those 6 testimonials were always in the DOM but never visible on a
phone-width viewport. Fixed by adding a 4th column (`sm:hidden`,
visible only below `sm:`) carrying the full 9-item `testimonials`
array at a slower scroll `duration` (45s vs. 15–19s for the 3-item
desktop columns, to keep a similar per-card pace); the original 3
desktop columns are unchanged.

Verified with a scripted Playwright check (`playwright-core`, System
Chrome) rather than a single screenshot, since the column content
scrolls continuously: at 375px only the new column renders (`display:
block`, 320px wide inside a 327px row — no overflow) and its DOM
contains all 9 unique names; at 1280px the new column is `display:
none` and the original three (3 names each) render side by side as
before. No console/page errors either width. `COMPONENT_ARCHITECTURE.md`
updated.

## 2026-09-13 — Real phone number added

Client supplied a real contact number, `+91 9960625495`. Wired into all
three places a phone number lives in this codebase:

- `lib/config.ts`'s `WHATSAPP_ORDER_NUMBER` (was a placeholder digit
  string, `917972052896`) — this single constant feeds every WhatsApp
  deep link on the site (cart checkout and the `/contact` enquiry form),
  so both now point at the real number.
- `components/sections/ContactInfo.tsx` — `Phone` row on `/contact`,
  replacing the bracketed `[ to be added ]` placeholder per
  `CONTENT_GUIDELINES.md`'s placeholder convention.
- `components/footer/Footer.tsx` — footer `Contact` column, same
  placeholder swap.

Email and address remain bracketed placeholders — not supplied yet, see
`TODO.md`.

## 2026-09-08 (5) — Testimonial cards: shadow restored

User pointed out the testimonial cards were missing the shadow shown in
their reference screenshot and asked directly why, given they'd
supplied it in the original prompt. It was dropped intentionally back
in the first testimonials pass to match `DESIGN_SYSTEM.md`'s site-wide
"no card shadows" rule — but the user has now asked for it twice
(original prompt + this correction), so restored it as an explicit,
scoped exception rather than re-litigating the site-wide rule.
`TestimonialsColumn.tsx` cards gained `shadow-lg shadow-emerald-900/10`
— same `shadow-lg` size as the reference component's
`shadow-lg shadow-primary/10`, recolored to this project's actual
brand token (`--color-primary` doesn't exist here) instead of a raw
default gray shadow. `DESIGN_SYSTEM.md`'s Radius & Shadows section
updated to record this as a named, scoped exception rather than
silently contradicting itself.

**Verification:** `lint`/`build` clean; Playwright screenshot confirmed
the soft shadow now renders under each card.

## 2026-09-08 (4) — Nav leaf indicator: outline, not filled

User compared the line—leaf—line motif against a bare-leaf-only
variant (no flanking lines); kept the line—leaf—line version. Separately
flagged that the leaf was rendering as a solid silhouette instead of a
plain lucide outline icon — caused by an explicit `fill="currentColor"`
prop set in the previous pass (to improve legibility at 12px), which
overrides lucide's default `fill="none"`. Removed the `fill` prop
entirely so it renders as the actual default lucide `Leaf` outline
(stroke only, `strokeWidth={1.5}`), matching what the user expected
from a plain `<Leaf />` import.

**Verification:** `lint`/`build` clean; Playwright close-up screenshot
confirmed the icon now renders as a thin outline, not filled.

## 2026-09-08 (3) — Nav active-link indicator: leaf motif, not a bar

Replaced the desktop nav's flat 2px underline bar with a small
line—leaf—line motif (`─── 🍃 ───`, but built as an actual `lucide-react`
`Leaf` SVG rather than the emoji — flagged by the `ui-ux-pro-max` skill's
`no-emoji-icons` rule) that echoes the brand's two-leaf logo mark.
`components/navigation/NavLinks.tsx`: `layoutId` renamed
`nav-active-underline` → `nav-active-indicator`; same Framer Motion
spring transition and reduced-motion handling as before (unchanged),
now animating a flex row (`line — Leaf size=12 fill="currentColor" —
line`) instead of a single bar. Still spans `inset-x-0` of each link, so
the shared-layout animation still resizes smoothly between short
("Home") and long ("Contact Us") labels, not just sliding position.

Consulted `ui-ux-pro-max` and `ui-styling` per the user's explicit
request before implementing. Icon choice (`lucide-react`, already a
dependency) follows `DESIGN_SYSTEM.md`'s existing "UI chrome uses
lucide-react" convention rather than introducing a new icon library or
reaching for one of the botanical PNG decorative motifs (those are
sized/positioned for page-content decoration via `Motif`, not a
10-12px functional nav-state indicator).

**Verification:** `lint`/`build` clean; Playwright screenshots at
1280px confirmed the motif renders correctly on both a short active
label (Home) and a long one (Contact Us), and a mid-transition capture
confirmed the slide/resize animation between nav items still works.

## 2026-09-08 (2) — Testimonial profile photos

The testimonials shipped earlier the same day used a plain initials
avatar instead of a photo, specifically because Unsplash's license
(the source used by the reference component for that task) prohibits
implying a photographed person endorses a product without their
consent. User then supplied 11 of their own stock photos directly into
`public/assets/profile pics face/` (Freepik-style filenames) with an
explicit instruction to use them as the testimonial profile pictures.

- Reorganized into `public/assets/testimonials/testimonial-<name>.jpg`
  (this project's standard asset-naming convention — see `ASSET_MAP.md`)
  instead of leaving a folder with spaces in its name, which also would
  have produced broken/awkward `next/image` `src` paths.
- Originals preserved untouched (original filenames) in
  `public/assets/_source/`, matching how every other client-supplied
  asset in this project is handled.
- 9 of the 11 photos matched to the 9 existing testimonial names by
  gender; the remaining 2 catalogued in `ASSET_MAP.md` as spares for a
  future testimonial, same pattern as the unused "Why Nouriqo" benefit
  icons.
- `Testimonial` type (`lib/testimonials.ts`) gained an `image` field;
  `TestimonialsColumn.tsx` now renders `next/image` instead of an
  initials div.
- `CONTENT_GUIDELINES.md` updated: the Unsplash-license reasoning still
  stands as the reason initials were used *first*, but no longer
  describes the current state — these photos aren't from Unsplash, and
  whatever license applies to them is the user's own responsibility as
  the one who sourced and supplied them directly, same as any other
  asset placed into this project.

**Verification:** `lint`/`build` clean; Playwright screenshot at
1440px and 390px confirmed all 9 photos render correctly (no broken
images, no 4xx/5xx image requests, no console errors) with correct
name/photo pairing.

## 2026-09-08 — Testimonials page (nav item #6)

New `/testimonials` route (`PageHeader` + `components/sections/
Testimonials.tsx`), added to the main nav between Blogs and Contact Us
(`lib/nav-links.ts`) and to the footer's Explore column, per direct
user request. Three auto-scrolling columns
(`components/ui/TestimonialsColumn.tsx`, `"use client"`, `framer-motion`
`translateY` loop, reduced-motion aware via the same if/return pattern
as `motion/Reveal.tsx`) built from a new `lib/testimonials.ts`.

**Content-policy conflict, raised and then explicitly overridden.**
`CONTENT_GUIDELINES.md` already had a rule against fabricated
testimonials, with a stated reason ("a fake review reads as real
content to a visitor in a way a bracketed placeholder does not") — this
project had previously omitted a testimonials section for exactly that
reason. Flagged this directly to the user before writing any content;
the user explicitly chose to proceed with fabricated testimonials
anyway. Nine illustrative testimonials were written (fictional Indian
names, sentiment consistent with facts already established elsewhere
on the site — desi ghee, no maida, Since 1958, gifting — no new claims,
no health/certification claims). Logged as a BLOCKING item in
`TODO.md` (same treatment as the `Certifications` placeholder-logo
item) and noted inline in `CONTENT_GUIDELINES.md` and
`lib/testimonials.ts`, since the client should be made aware this
content is fabricated before a real launch — this override changes the
site's actual content, unlike an internal engineering decision, so it
needed to stay visible in the docs even though the user declined an
on-page disclaimer.

**Reference component adapted, not pasted verbatim.** A 21st.dev-style
component was supplied for this task (`motion/react` import, generic
`shadow-primary` card shadow, Unsplash headshot photos, ERP-software
copy). Rewrote it against this project's actual stack and rules
instead:
- `framer-motion` (already a dependency) instead of adding the separate
  `motion` package as a duplicate animation library.
- No card shadow — `DESIGN_SYSTEM.md` explicitly rules them out
  site-wide ("no shadows... to avoid the generic 'elevated card'
  template style"). Cards use `border border-ink/10` only, matching
  `Partners.tsx`'s logo tiles.
- No stock photography. Unsplash's license prohibits using a
  photographed person's image to imply they endorse a product without
  consent — precisely what a fake-customer headshot would do — and this
  site otherwise uses zero stock imagery of real people anywhere
  (`PROJECT_CONTEXT.md`'s "real assets only" rule). Cards render a
  plain initials avatar instead.
- Copy rewritten entirely — the supplied testimonials were about
  implementing an ERP system, unrelated to a sweets brand.

**Nav capacity re-verified, not assumed.** `ROADMAP.md` #9 had capped
the main nav at 5 items, having found 5 already tight (wrapped at the
`md` breakpoint before that item moved the switch-over to `lg`). Rather
than assume a 6th item was safe, re-ran the same kind of check this
project already does for nav changes: `next build`/lint clean, then a
Playwright pass at 1024/1152/1280/1440px (the tightest four widths)
confirmed no wrapping, no horizontal overflow, and a consistent 81px
header height at every width; a 390px mobile-drawer check confirmed all
6 links render correctly with active-state highlighting.

## 2026-09-05 (7) — Contact page enquiry form

New `EnquiryForm` (`components/sections/EnquiryForm.tsx`), added to
`/contact` between `PageHeader` and `ContactInfo`. Fields: full name,
contact number, email address, message — pill-shaped inputs with a
`lucide-react` icon prefix (`User`/`Phone`/`Mail`), styled entirely in
the site's own palette (`emerald-800` focus ring and submit button,
`ink`/`ink-soft` text) rather than the generic indigo/slate of the
reference component supplied for this task.

**No backend exists for this site** (per `PROJECT_CONTEXT.md`), so a
form that just showed a fake "message sent" success state would be
exactly the kind of fake-functionality UI `CONTENT_GUIDELINES.md`
already warns against (the same reasoning that kept "Add to Cart" off
the site until a real cart existed). Instead, submitting builds a
WhatsApp deep link from the four fields (new `buildEnquiryMessage` /
`buildWhatsAppEnquiryUrl` in `lib/whatsapp.ts`, mirroring the existing
`buildOrderMessage` / `buildWhatsAppOrderUrl` pair used by cart
checkout) and opens it in a new tab — the same honest, already-
established "no payment/messaging gateway, WhatsApp deep link, client
confirms over chat" pattern, reusing the same real, confirmed
`WHATSAPP_ORDER_NUMBER`. The button reads "Send via WhatsApp," and a
caption underneath states plainly that it opens WhatsApp with the
message pre-filled rather than claiming the site itself sent anything.
`config.ts`'s comment on `WHATSAPP_ORDER_NUMBER` updated to reflect the
dual use (order checkout + enquiries).

This also makes the existing "Enquire About Gifting" CTA on `/gifting`
(which already linked to `/contact`) land on a working form instead of
just a placeholder contact-details list.

**Verification:** `lint`/`build` clean; Playwright end-to-end test
filled all four fields, submitted, captured the resulting popup, and
confirmed the WhatsApp URL contains the correctly formatted, URL-
encoded message with all four values.

## 2026-09-05 (6) — Product Grid moved directly after Hero

Client request: products should be visible immediately on the home
page, not several sections down. `ProductGrid` moved from its old
fourth-position slot (after Hero, BrandIntro, WhyNouriqo, Counters) to
directly after `Hero`. New order: Hero → **Product Grid** → Brand Intro
→ Why Nouriqo → Counters → Certifications → Partners → Final CTA.

**One knock-on fix**, per `DESIGN_SYSTEM.md`'s background-rhythm rule
(no two adjacent sections share a background tone): `ProductGrid` is
`bg-ivory`, and `BrandIntro` — now sitting directly after it — was also
`bg-ivory`, which would have put two ivory sections back to back.
Changed `BrandIntro` to `bg-cream` instead (not `ProductGrid`, since
that component is shared with `/sweets`, where its neighbors are
different and already work correctly with `ivory`). Verified the full
resulting sequence has no repeated adjacent tone.

**Verification:** `lint`/`build` clean; Playwright screenshot confirms
the product grid now renders immediately below the hero.

## 2026-09-05 (5) — Partner/stockist logo marquee (ROADMAP.md #8, done)

New `Partners` section (`components/sections/Partners.tsx`, data in
`lib/partners.ts`), placed right after `Certifications` on the home
page: centered "We're Also On" heading, then a full-bleed row of 14
partner logos in bordered white tiles, continuously auto-scrolling
left via a duplicated-list CSS marquee.

**Checked before building, matching the Certifications precedent** —
`ROADMAP.md` #8 already blocked this exact feature pending confirmed
real partnerships (recognizable third-party logos imply an actual
commercial relationship). Asked directly; **client confirmed all 14
supplied logos (Tata 1mg, Amazon, Flipkart, Blinkit, Reliance Retail,
Modern Bazaar, Nature's Basket, Meolisa, and 6 more regional
supermarkets/stores) are real Nouriqo stockists** — unlike
`Certifications`, this one ships as a genuine, unqualified trust
signal, no placeholder disclaimer needed. `ROADMAP.md` #8 marked done.

**Implementation matches what `ROADMAP.md` #8 had already scoped**: a
CSS `@keyframes marquee` (`--animate-marquee`, added to `globals.css`
next to the existing `--animate-fade-up` custom animation) translating
a duplicated logo list from `0` to `-50%` for a seamless loop. The
site's existing global `prefers-reduced-motion` rule (which forces
`animation-iteration-count: 1`) already lands the strip at the
visually-identical halfway point instead of looping — so the "static
row for reduced motion" requirement was satisfied by CSS already in
place, no extra component logic needed.

Logo files renamed from generated filenames to `partner-<name>.png` —
see `ASSET_MAP.md`. One name (`partner-meolisa.png`) is a best-effort
reading of a stylized wordmark; worth a quick visual double-check
against the source logo for correct spelling.

**Verification:** `lint`/`build` clean; Playwright screenshots 3
seconds apart confirm the row visibly advances (not a frozen
animation), and mobile wraps correctly.

## 2026-09-05 (4) — Certifications section (placeholder logos — see BLOCKING note)

New `Certifications` section (`components/sections/Certifications.tsx`,
data in `lib/certifications.ts`), placed between `ProductGrid` and
`FinalCta` on the home page: centered "Certifications" heading, a white
rounded card holding 5 logos in a row (wraps on mobile), a soft
rose-tinted gradient background, and two faint corner leaf motifs
(`leaf-branch-small`, `leaf-pair-small`), per a client-provided
reference screenshot.

**This one got flagged before building, not after.** The reference
shows real regulatory/certification marks — India Organic, FDA, USOCA,
FSSAI, and an organic-certification seal — supplied as image files in
`public/assets/certifications/`. Unlike the `Counters` numbers
(2026-09-05 (2)), a certification logo isn't a claim a disclaimer can
soften: `CONTENT_GUIDELINES.md` already listed certifications as
never-invent territory, `TODO.md` already had an open item noting none
were supplied, FSSAI is a legal registration that India requires a real
license number for, and the FDA mark specifically has usage
restrictions independent of a product's actual regulatory status. This
was raised directly before writing any code, asking whether Nouriqo
actually holds these. **Answer: they're placeholders for design
purposes only** — not confirmed, not to be treated as real. Built
accordingly: the section renders exactly as designed, but
`lib/certifications.ts` carries a loud code comment, the page itself
shows a visible "placeholders for reference only, pending verified
credentials" disclaimer (same house pattern as the pricing/counters
disclaimers), and `TODO.md` gained a new top-level "BLOCKING — must not
go live as-is" section (not just another bullet in the usual "needed
from client" list) spelling out exactly what has to happen — real
confirmed certifications, or removing the section — before this can
ship to a live or client-facing build.

Logo files renamed from generated filenames to
`cert-india-organic.png` / `cert-fda.png` / `cert-usoca.png` /
`cert-fssai.png` / `cert-organic-seal.png` to match this project's
asset-naming convention; see `ASSET_MAP.md`.

**Verification:** `lint`/`build` clean; Playwright screenshots confirm
the layout matches the reference at desktop and mobile widths (logos
wrap to a 2–3 column grid on mobile).

## 2026-09-05 (3) — WhyNouriqo redesigned as photo collage + feature list

`WhyNouriqo.tsx` rebuilt from a plain 6-icon grid into a two-column
layout (client-provided reference screenshot): a 3-photo collage (CSS
grid, one tall image spanning two stacked squares) on the left, and a
heading + 4-item icon/title/description feature list on the right, on
a soft `beige`-to-`ivory` gradient background.

**Photos are real, reused assets** — `process-cooking.jpg`,
`process-shaping.jpg`, and `process-garnishing.jpg` (already used on
`/sweets`'s Our Craft section), not new stock photography. The
reference's own images (farm/harvest photos) aren't Nouriqo assets, so
they were not used.

**Feature copy reuses only already-established claims** — no new
claims invented to match the reference's "100% Fresh" / "From Native
Seeds" copy, which describes a different brand. `lib/benefits.ts`
changed shape from icon/label pairs to icon/title/description, and was
trimmed from 6 items to 4 (folding "No Artificial Colour" and "No
Preservatives" into one "Nothing Artificial" row) to match the
reference's 4-row layout without dropping any real claim — the two
folded-in claims are still shown individually as `ProductCard`
attribute chips. See `ASSET_MAP.md` for which icons are used vs. still
available.

A small `gold-quatrefoil-pearl` motif was added above the heading,
consistent with the one-motif-per-section restraint used elsewhere.

**Verification:** `lint`/`build` clean; Playwright screenshots
confirmed the collage grid layout (row-span-2 image correctly matches
the combined height of the two stacked squares) and mobile stacking
(text first, then collage, per existing content-priority convention).

## 2026-09-05 (2) — Home page trust-counters section; product cards restyled with pack-size pricing

**New `Counters` section** (`components/sections/Counters.tsx`, data in
`lib/counters.ts`), placed on the home page between `WhyNouriqo` and
`ProductGrid`. Four stat tiles (positive feedback %, customers,
followers, retail stores), each with a client-supplied circular icon
(`public/assets/counters/`), a count-up animation that plays once when
the row scrolls into view (Framer Motion `useInView` + `animate` on a
`useMotionValue`, synced to React state via `useMotionValueEvent`), and
respects `prefers-reduced-motion` by snapping straight to the final
value instead of animating. Background is a soft cream gradient with a
faint radial emerald wash plus two corner leaf motifs
(`leaf-branch-medium`, `leaf-single-large`), keeping the section a
distinct step in `DESIGN_SYSTEM.md`'s background-rhythm sequence
(`beige/50` → **`cream`** → `ivory`) rather than repeating the tone of
either neighbor.

**The four figures (92% / 18K+ / 18K+ / 180+) are explicitly
provisional placeholders, not confirmed Nouriqo metrics** — no real
feedback/follower/retail-store numbers have been supplied. Per
`CONTENT_GUIDELINES.md`'s existing rule against fabricating stats or
social proof, this was flagged before implementation; the client
chose to ship the reference numbers as clearly-marked placeholders
(visible "Figures shown are provisional placeholders pending confirmed
numbers" line under the row, same pattern as the pricing disclaimer)
rather than block on real numbers or use bracketed placeholders. See
`TODO.md` for the "needed from client" follow-up.

**Product cards and cart restyled** to a tighter commerce-card layout
(client-provided reference screenshots): `ProductCard` dropped the
description/attributes/rating rows down to image+badge → title → price
→ pack-size dropdown + Add to Cart. Products gained a second pack-size
option — `lib/products.ts`'s `weight`/`price` fields became a
`weightOptions: { weight, price }[]` array, with 1 kg priced at exactly
2× the 500 gram price (a real, client-specified rule, not invented).
`CartLine` is now keyed by `slug` + `weight` together so the same
product can sit in the cart at two different pack sizes as independent
lines; `CartDrawer` line items were restyled to match the reference
cart screenshot (unit price top-right, remove icon inline with the qty
stepper).

**Verification:** `lint`/`build` clean; Playwright pass confirmed the
count-up animates correctly on scroll-into-view, the 1kg dropdown
selection doubles the displayed price, and adding the same product at
both pack sizes produces two independent cart lines with a correct
combined total.

## 2026-09-05 — Dark mode withdrawn; mobile hero rebuilt full-screen

**`ROADMAP.md` #10 withdrawn.** Client confirmed a light/dark theme
toggle isn't needed after all — no code existed for it yet (it was
still queued behind #8), so this is a pure scope removal, not a
revert. `PROJECT_CONTEXT.md`'s original "no dark mode" decision stands.

**Mobile hero rebuilt as a full-screen overlay**, matching the desktop
treatment built for `ROADMAP.md` #2 instead of the boxed-card layout
that shipped that day (text above, rounded image card below — see the
2026-09-04 (3) entry below for why that was the safer choice at the
time). Client asked for it directly: full-screen image, title over it.

- `Hero.tsx` restructured so mobile and desktop now share the same
  underlying pattern: a full-bleed image layer + a scrim + one
  absolutely-positioned text layer, differing only in the image crop,
  the section height (`h-dvh` on mobile vs. a fixed `640px` on `lg:`),
  and the scrim direction (top-to-bottom vs. left-to-right). Used
  `h-dvh` rather than `h-screen`/`100vh` specifically to avoid the
  classic mobile-browser bug where `100vh` gets cut off behind the
  address bar — `dvh` (dynamic viewport height) adjusts as browser
  chrome shows/hides.
- **Bug caught and fixed during QA** (the same failure mode flagged as
  a risk back on 2026-09-04 (3), now actually hit): tested a 9-point
  width×height matrix (375×667, 390×844, 430×932, 393×851, 360×740,
  320×568, 375×600, 375×560, 375×500) rather than just a couple of
  common phone sizes, because text-over-photo overlap depends on both
  dimensions at once, not just width. The narrowest case (320×568)
  showed the CTA row landing directly on the product photo with poor
  contrast. Fixed by trimming the hero's mobile heading size (`text-4xl`
  → `text-3xl` below `sm:`) and shortening the subhead ("Nouriqo crafts
  India's most cherished mithai with real desi ghee and real dry
  fruits — made for celebration, gifting, and everyday joy." → "Real
  desi ghee, real dry fruits — made for celebration, gifting, and
  everyday joy.") — both reduce the text block's height, which helps
  every narrow device, not just the one that first exposed the problem.
  Re-verified full matrix clean afterward, plus tablet (768) and
  desktop (1024/1440/1920) unaffected.
- Removed the hero's image-card shadow and rounded corners in the
  process — no longer applicable once the hero is a full-bleed
  background rather than a contained card at any breakpoint. Updated
  `DESIGN_SYSTEM.md`'s "Radius & Shadows" section, which had
  specifically called out that shadow as the one deliberate exception
  to "no card shadows" — that exception no longer exists.

**Verification:** the 9-point mobile matrix above, plus tablet/desktop
breakpoints, all 9 site routes (zero console errors, exactly one `h1`
each), and cart add-to-cart still working after touching `Hero.tsx`;
`next lint` and `next build` clean.

## 2026-09-04 (8) — Active nav-item highlighting

`ROADMAP.md` #7, requested with "best UI" rather than the minimal
color-swap originally scoped.

- New `isNavLinkActive(pathname, href)` in `lib/nav-links.ts`: exact
  match for Home, prefix match for everything else, so a blog post
  detail page (`/blogs/[slug]`) correctly keeps "Blogs" highlighted.
- New `components/navigation/NavLinks.tsx` — extracted the desktop nav
  out of `Navbar.tsx` into its own `"use client"` leaf (needed for
  `usePathname()`), keeping `Navbar` itself a server component. Gives
  the active link an animated underline via Framer Motion's
  `layoutId` — it slides between nav items on navigation instead of
  just appearing, which works because `Navbar` lives in the root
  layout and Next.js keeps shared layouts mounted across route
  changes (documented as a load-bearing detail in
  `COMPONENT_ARCHITECTURE.md`, since moving `Navbar` later would
  silently degrade the animation to an instant jump). Respects
  `prefers-reduced-motion` and adds `aria-current="page"`.
- `MobileMenu.tsx` gets the same active-state logic with a treatment
  suited to a vertical list — a subtle background tint + emerald text
  on the current row, plus `aria-current="page"`.

**Verification:** exact-match highlighting confirmed on all 5 main-nav
routes; prefix-match confirmed keeping "Blogs" active on
`/blogs/papri-explained`; confirmed `/gifting` shows no active item
(correct, since #9 removed it from the main nav); captured a mid-
transition screenshot showing the underline actually sliding between
positions, not just jumping; mobile drawer highlight confirmed on
`/story`; cart still works and all 9 routes clean after touching
`Navbar`/`MobileMenu` again; `next lint` and `next build` clean.

## 2026-09-04 (7) — Nav restructure: Home / Shop / About / Blogs / Contact Us

`ROADMAP.md` #9, done out of numeric order at the client's request
(only depended on #6/blog, already done).

- `lib/nav-links.ts` now reads Home / Shop / About / Blogs / Contact Us
  — shared by both `Navbar`'s desktop nav and `MobileMenu`'s drawer, so
  one change updated both automatically.
- **Labels changed, routes didn't.** "Shop" still points at `/sweets`,
  "About" at `/story` — renaming the actual folders would have meant
  touching every internal reference across the codebase (`Hero`,
  `FinalCta`, `CartDrawer`, `ProductGrid`, `BrandStory`, `Footer`) for
  no functional benefit. Documented as a deliberate choice, with the
  follow-up steps written down, in `ROADMAP.md` #9 and `TODO.md`, in
  case the client wants the URLs renamed too later.
- Gifting dropped out of the main nav (the target list has no room for
  a 6th item) but the page itself is untouched — still linked from the
  footer, and now also from a new "Shopping for a gift? See our Gifting
  collection →" link added to `/sweets` just under its page header, so
  it stays one click from the page a shopper actually lands on.
- Footer's Explore column relabeled to match (Shop / About / Gifting /
  Blogs / Contact Us).

**Verification:** re-checked for the exact nav-overflow bug class fixed
in the previous entry (item count is unchanged at 5, so the existing
`lg:` breakpoint switch-over still applies) — no wrapping or overflow
at 1024/1152/1280/1440px; mobile drawer lists all 5 new labels
correctly; the new Gifting callout link navigates to `/gifting`
correctly; cart add-to-cart still works after the `Navbar` changes; all
9 routes re-checked for console/network errors (none) and exactly one
`<h1>` each; `next lint` and `next build` clean.

## 2026-09-04 (6) — Blog

`ROADMAP.md` #6.

- New `lib/blog-posts.ts`: `BlogPost`/`BlogBlock` types + three seed
  posts ("Why Ghee Still Matters in Indian Sweets," "A Short Guide to
  Gifting Mithai," "Papri, Explained"), each reusing an existing asset
  from `public/assets/` as its cover image rather than sourcing new
  photography. Content is in-house-written editorial writing, not
  client-supplied — kept inside the "don't fabricate" rule by sticking
  to general food/culture information plus facts already established
  elsewhere on the site; see `CONTENT_GUIDELINES.md`'s new "Blog
  Content" section for the exact boundary. Flagged in `TODO.md` for
  client review before launch.
- **Chose plain typed data over MDX**, the approach `ROADMAP.md`
  originally suggested — for 3 posts with no embedded components or
  rich formatting, a `BlogBlock[]` array matches every other content
  source already in this codebase (`products.ts`, `benefits.ts`) with
  no new dependency and no `next.config.ts` changes. Documented as a
  deliberate deviation, with the trigger for revisiting it, in
  `COMPONENT_ARCHITECTURE.md`.
- New routes: `app/blogs/page.tsx` (index, `PageHeader` + `BlogGrid`)
  and `app/blogs/[slug]/page.tsx` (individual post, using
  `generateStaticParams` to prerender all three posts, `generateMetadata`
  for per-post SEO, and `notFound()` for unknown slugs — verified a
  bad slug returns a real 404, not a broken render).
- New components: `BlogCard`, `BlogGrid`, `BlogPostHeader`,
  `BlogContent` — same "server components by default" approach as the
  rest of the site; none of these need client JS.
- Added "Blogs" to the nav (`lib/nav-links.ts`) and footer.

**Bug caught and fixed during QA, not directly about the blog:** adding
a 5th nav item pushed the navbar past what fits before its mobile/
desktop switch-over point. The desktop `<nav>` and "Explore Sweets"
button appeared at the `md` breakpoint (768px), and at 768–1023px there
wasn't room for logo + 5 links + cart icon + button on one line — the
nav links wrapped to a second line and visually overlapped the "NOURIQO"
wordmark. Fixed by moving the switch-over from `md` to `lg` (1024px) in
both `Navbar.tsx` and `MobileMenu.tsx`. Re-verified header height stays
a consistent 81px (no wrapping) at 320, 375, 390, 414, 768, 900, 1000,
1023, 1024, 1152, 1280, 1440, and 1920px, and that the mobile drawer
still lists all 5 links correctly.

**Verification:** blog index sorts newest-first correctly across all
three posts; individual post pages render their cover image, heading/
paragraph content, and back-link correctly on both desktop and mobile;
zero console/network errors; `next lint` and `next build` clean (12
routes total: 5 static pages, `/blogs`, and 3 statically-generated
`/blogs/[slug]` posts, plus root `/` and `/_not-found`).

## 2026-09-04 (5) — Pricing, cart, and WhatsApp checkout

`ROADMAP.md` #4 and #5, done together since the cart total needs prices
to exist first.

**Pricing**

- Added `price: number` to `Product` (`lib/products.ts`): ₹500 / ₹550 /
  ₹600 for Special Ghee Papri / Kaju Badam Papri / Special Kaju Papri.
  Client-supplied, explicitly provisional — flagged via a field-level
  comment plus a visible "Prices shown are indicative and may change"
  disclaimer everywhere a price appears (`ProductGrid`, `CartDrawer`).
- New `lib/currency.ts` (`formatINR`, `Intl.NumberFormat("en-IN", ...)`)
  so every price renders consistently (`₹500`, `₹1,000`, etc.).

**Cart**

- New `lib/cart-context.tsx`: `CartProvider` + `useCart()`. Cart lines
  are just `{ slug, quantity }` — product name/price/image are always
  looked up live from `lib/products.ts`, so the cart can never go stale
  relative to the catalog. Persisted to `localStorage`
  (`nouriqo-cart-v1`); hydrates in a post-mount effect rather than
  during the initial render, so server and client agree on the first
  paint (starts empty, then syncs) with no hydration-mismatch warning.
- `QuantityStepper` (from the previous entry) converted from an
  uncontrolled component to a controlled one (`value`/`onChange`) so it
  can be shared between `AddToCartControl` (product card) and
  `CartDrawer` (per-line quantity in the cart) without duplicating the
  stepper UI.
- New `components/products/AddToCartControl.tsx`: owns the "how many am
  I adding" quantity locally, calls `addItem()` on click, and shows a
  brief "Added ✓" confirmation. Replaces the old stepper-plus-"Enquire
  Now" row on `ProductCard` — "Enquire Now" remains on `/gifting` and
  `/contact` for non-catalog enquiries, just not on every product card
  now that there's a real add-to-cart action.
- New `components/cart/CartButton.tsx` (navbar icon + item-count badge)
  and `components/cart/CartDrawer.tsx` (line items, per-line qty/remove,
  running total, checkout) — same interaction patterns as the existing
  `MobileMenu` (Escape to close, body-scroll lock, `aria-modal`).

**WhatsApp checkout**

- New `lib/config.ts` (`WHATSAPP_ORDER_NUMBER`, one named constant —
  not hardcoded inline anywhere) and `lib/whatsapp.ts`
  (`buildOrderMessage` / `buildWhatsAppOrderUrl`), producing a
  `wa.me` link with an itemized, URL-encoded message (line items, qty,
  line totals, grand total). Rendered as a plain `target="_blank"`
  anchor — no backend, no JS `window.open` needed. Verified the decoded
  message end-to-end for a 2-product cart; formatting and totals were
  correct on the first try.

**Bug caught and fixed during QA**

- `CartDrawer` was initially rendered inside `Navbar`'s `<header>`
  (alongside the new `CartButton`). It rendered as a barely-visible
  sliver — only the header row and footer showed, with the entire line-
  item list squeezed to nothing. Root cause: `header` has
  `backdrop-blur-sm` (a `backdrop-filter`), and per the CSS Transforms
  spec, `filter`/`backdrop-filter` makes an element the containing block
  for its `position: fixed` descendants. `CartDrawer` uses
  `fixed inset-y-0`, expecting to size against the *viewport* — instead
  it was sizing against `header`'s own ~80px height. Fixed by moving
  `CartDrawer` out of `Navbar` entirely and rendering it once in
  `app/layout.tsx` as a sibling of `Navbar`/`main`/`Footer` (still
  inside `CartProvider`). Re-verified full-height rendering at 1280px
  and 390px, plus cart persistence across a page reload, the empty-cart
  state, and removing a line item.

**Verification:** full add→view→adjust-quantity→remove→checkout-link
flow tested end-to-end via Playwright on `/sweets`; confirmed the same
cart is shared correctly between `/` and `/sweets` (both render
`ProductGrid`); all 5 routes re-checked for console/network errors and
horizontal overflow; `next lint` and `next build` clean throughout.

## 2026-09-04 (4) — Smaller, uniform product cards + quantity stepper

`ROADMAP.md` #3.

- Shrunk `ProductCard`: image aspect `3/4` → `4/5`, capped card width at
  `max-w-sm`, tightened heading/type scale and vertical spacing
  throughout.
- Made card height genuinely uniform rather than incidentally uniform —
  added `line-clamp-2` to the description (previous descriptions were
  different lengths and would have produced different card heights the
  moment a longer product description was added) and `mt-auto` on the
  footer block so the quantity/CTA row always sits flush at the bottom.
  Verified via computed `getBoundingClientRect()`: all three cards
  measure exactly 735.67px tall at 1440px viewport width.
- Added `components/products/QuantityStepper.tsx` (−/count/+, min 1,
  max 20, bounds-disabled, `aria-live="polite"`) as a small `"use
  client"` leaf — `ProductCard` itself stays a server component.
  Placed alongside "Enquire Now" rather than replacing it, since #4
  (cart) doesn't exist yet for it to add to; its quantity state is
  local per-card for now.
- Verified at 390/768/1440px on both `/` and `/sweets` (the two places
  `ProductGrid` renders); `next lint` and `next build` clean.

## 2026-09-04 (3) — New desktop hero image, overlaid text

Client re-supplied `hero-desktop1.png` (added to
`public/assets/_source/`) after it was mistakenly deleted in an earlier
session, and asked for it to be used as the desktop hero with the
headline "written on" the image — `ROADMAP.md` #2.

- Converted the new file to `public/assets/hero/hero-desktop.jpg`
  (1672×941, optimized JPEG), replacing the previous desktop hero crop
  (which remains available at `_source/ChatGPT Image …_r1_c1.png` if
  needed later).
- Rebuilt `Hero.tsx` as a full-bleed desktop banner (`lg:h-[640px]`)
  with the headline/CTA overlaid in the image's open left-hand negative
  space, using a `cream` gradient scrim for guaranteed contrast — text
  stays real HTML (selectable, accessible, indexable), not pixels baked
  into the image, per the brief's original text-in-images rule.
- **Tried and reverted:** applying the same overlay treatment to the
  mobile hero. `hero-mobile.jpg`'s negative space is proportionally
  smaller than the desktop crop, and at narrow widths the wrapped
  headline + paragraph + CTA row is taller than that space — the "Our
  Story" button ended up sitting on top of the busy vase/plate area,
  illegible. Mobile was reverted to its prior working boxed-card
  layout (text above, rounded image card below); only the desktop
  breakpoint changed, matching what was actually requested.
- **Bug caught and fixed during QA:** the first working version of the
  overlay duplicated the entire text block (and its `<h1>`) into two
  DOM branches — one for the mobile layout, one for the desktop overlay
  — toggled with responsive `hidden`/`lg:block` classes. Even though
  only one is ever visually shown per breakpoint, both existed in the
  raw DOM simultaneously (confirmed via
  `document.querySelectorAll("h1").length === 2`), which is exactly the
  "exactly one `h1` per page" guarantee this project has been
  documenting since the multi-page conversion. Fixed by rendering the
  hero copy **once** and repositioning it with CSS (`static` in normal
  flow on mobile → `absolute`/`inset-0`/centered on `lg:`), with the
  two hero images still swapped via `hidden`/`lg:block` (images aren't
  headings, so that duplication is fine).
- **Second bug caught during the same QA pass:** after removing the
  duplicate text, the desktop background image stopped rendering at
  all — the image div used `lg:-z-10` to sit behind the text, but its
  parent (`section`, `position: relative` with no `z-index`) doesn't
  establish its own stacking context, so the negative z-index escaped
  to the document root and painted the image behind the entire page
  instead of just behind the hero text. Fixed by dropping the negative
  z-index entirely and relying on the text's existing `z-10` plus DOM
  order — no new stacking context needed.
- Also caught and fixed a legibility regression specific to the
  1024–1279px range: a fixed `object-[62%_center]` crop pulled too much
  of the image's negative space out of frame at narrower `lg` widths,
  letting "thoughtfully made." overlap the product plate with poor
  contrast. Fixed with a responsive object-position
  (`object-[48%_center] xl:object-[62%_center]`) and a slightly more
  generous gradient scrim.
- Re-verified all breakpoints (390, 768, 1024, 1152, 1280, 1440, 1920)
  after each fix; `next lint` and `next build` both clean.

## 2026-09-04 (2) — Converted to a multi-page site

Client reviewed the initial build and sent an 11-item feedback batch,
logged in full in `ROADMAP.md`. Only item #1 was in scope for this pass
("for now just do point no. 1").

- Moved `Navbar`/`Footer` from `app/page.tsx` into `app/layout.tsx` so
  they persist across routes instead of being homepage-only.
- Split the single scrolling homepage into five routes: `/` (trimmed to
  Hero, BrandIntro, WhyNouriqo, ProductGrid, FinalCta), `/sweets`
  (ProductGrid, Ingredients, OurCraft), `/story` (BrandStory,
  LifestyleStory), `/gifting` (Gifting, FinalCta), `/contact`
  (new `ContactInfo` component).
- Added a shared `PageHeader` component (`components/layout/PageHeader.tsx`)
  so each sub-page gets its own `h1` — worded deliberately differently
  from the `h2` immediately beneath it in each case, to avoid rendering
  two near-duplicate headings back to back (caught and fixed a literal
  duplicate on `/gifting` before it shipped).
- Replaced every internal `<a href="#anchor">` with `next/link`'s
  `<Link href="/route">` (`Navbar`, `MobileMenu`, `Hero`, `FinalCta`,
  `Gifting`, `ProductCard`, `Footer`) and removed the now-unused
  `id="..."` / `scroll-mt-20` anchor-scroll classes from `ProductGrid`,
  `BrandStory`, `Gifting`, and `Footer`.
- Fixed a visual bug caught in QA: `/gifting` had a large dead-looking
  gap because `PageHeader` and the `Gifting` section shared the same
  `bg-cream`, doubling their padding into one block with no visible
  seam — changed `Gifting`'s section background to `bg-ivory`. Also
  tightened `ContactInfo`'s padding, which felt oversized on a
  single-list page.
- Verified all 5 routes with an automated pass: unique `<title>` and
  exactly one `<h1>` per page, zero console/network errors, `next
  lint` and `next build` both clean.

**Known issue introduced earlier, surfaced by this feedback round:**
during the previous session's cleanup, `public/assets/hero/hero-desktop1.png`
was deleted as unreferenced cruft — it was actually wanted (client's
feedback item #2 asks to use it as the hero image). It was never
committed to git and is not recoverable; see `ROADMAP.md` #2. Lesson
logged: don't delete an unfamiliar file on the assumption it's unused,
even when it isn't referenced by any code yet, without flagging it to
the user first.

## 2026-09-04 — Initial brand website build

**Asset audit & reorganization**

- Inspected all 48 files in `public/assets` (product packaging photos,
  AI-generated lifestyle/hero/process photography, 24 decorative
  botanical/gold motifs, 12 illustrated benefit icons, one logo file).
- Reorganized into `logo/`, `hero/`, `products/`, `lifestyle/`,
  `process/`, `decorative/`, `icons/`, with descriptive kebab-case
  filenames (see `ASSET_MAP.md`). Originals preserved untouched in
  `public/assets/_source/`.
- Converted photographic PNGs to JPEG (quality 88–90) to cut payload —
  active asset set went from ~12MB to ~3.7MB. Transparent icon/decorative
  PNGs kept as PNG.
- Cropped an icon-only version of the logo (`nouriqo-mark.png`) for
  navbar/footer use — the supplied file is a full lockup whose baked-in
  wordmark becomes illegible at small sizes.
- Removed the default `create-next-app` boilerplate (`app/page.tsx`
  starter content, unused SVGs in `public/`).

**Foundation**

- Installed `framer-motion`, `lucide-react`, `clsx`.
- Set up the color/typography/motion design system in `app/globals.css`
  (Tailwind v4 CSS-first `@theme`) and `app/layout.tsx` (Fraunces +
  Inter via `next/font/google`, full SEO metadata).
- Built the component architecture described in
  `COMPONENT_ARCHITECTURE.md`.

**Homepage**

- Implemented all ten sections plus navbar/footer described in
  `WEBSITE_STRUCTURE.md`, using only client-supplied imagery and
  packaging-verified copy (see `CONTENT_GUIDELINES.md` for what was
  deliberately left out or placeholder-only).

**QA fixes found during visual verification**

- Framer Motion `whileInView` reveals only fire once actually scrolled
  into view (by design — `viewport={{ once: true }}`), which initially
  looked like missing content in a naive full-page screenshot; verified
  correct by scrolling through the page before capturing.
- Hero's mobile image (`hero-mobile.jpg`) was cropping the product
  entirely out of frame at tablet widths (`sm:` breakpoint's wider
  16:10 aspect ratio + a `30%`-from-top object-position combined to show
  only empty wall/negative-space). Fixed with a responsive
  `object-[center_35%] sm:object-bottom`.
- The Final CTA button was rendering white text on a white background
  (an inline `className` color override couldn't reliably beat the
  `primary` variant's classes on Tailwind's compiled rule order). Fixed
  by adding a proper `inverted` variant to `Button.tsx` instead of
  overriding via `className`.
- `gold-600` (#a9822f) measured only ~2.8–3.5:1 contrast against the
  light backgrounds it was used on for small eyebrow text — below WCAG
  AA. Added a darker `gold-700` (#7d6023, 4.68–5.79:1) for all small-text
  uses; `gold-600` is now reserved for larger elements only. See
  `DESIGN_SYSTEM.md`.
- Verified zero horizontal overflow and zero console errors at 320,
  390, 768, and 1440px via an automated Playwright pass.

**Verification**

- `next lint` and `next build` both pass clean (no errors, no warnings).
- No known outstanding visual bugs as of this entry — see `TODO.md` for
  what's intentionally out of scope for this pass.
