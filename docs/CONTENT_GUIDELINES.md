# Content Guidelines

## Tone

Confident, warm, unhurried. Short sentences. No exclamation points as a
crutch. Speaks like a person who's proud of the product, not like an ad.

**Good:** "Traditional sweets, thoughtfully made."
**Bad:** "🔥 India's #1 Premium Sweets Brand — Order Now!!!"

## Heading Style

- Headlines are statements, not questions, and rarely longer than 8 words.
- One italic word for emphasis is the ceiling per headline (see the hero)
  — don't stack multiple typographic tricks.
- Section eyebrows are short, uppercase, tracked-out labels ("Our Craft",
  "Gifting") — they name the section, they don't sell it.

## CTA Style

- Primary CTAs describe the action honestly: "Explore Our Sweets,"
  "Add to Cart," "Checkout via WhatsApp," "Enquire Now" (still used on
  `/gifting`/`/contact` for requests the cart doesn't cover). "Add to
  Cart" only became honest to use once a real cart existed
  (2026-09-04, `ROADMAP.md` #4) — before that it would have been exactly
  the kind of fake-functionality CTA this rule exists to prevent.
- Two CTA tiers max per section (one primary, optionally one secondary).

## What We Do NOT Claim Without Confirmation

Per the brief, none of the following are invented anywhere on the site:

- Certifications (organic, FSSAI, ISO, etc.)
- Specific health/nutritional claims ("boosts immunity," "low sugar," etc.)
- Ingredients beyond what is visible in the supplied photography (cashews,
  almonds, pistachios, saffron, ghee, rice)
- Awards or press mentions
- Customer reviews or testimonials — **the Trust/Testimonials section from
  the suggested homepage flow was deliberately omitted** rather than
  filled with placeholder reviews, since a fake review reads as real
  content to a visitor in a way a bracketed placeholder does not.
- Company history beyond "Since 1958" (sourced from the client's own
  packaging, not invented) — no founder story, no specific city/factory
  location, no founding narrative details.
- Delivery/shipping claims or return policy specifics — none were
  supplied, so none appear.
- **Pricing (updated 2026-09-04):** the client supplied placeholder
  prices (₹500/₹550/₹600) explicitly described as provisional, not
  final retail pricing. These now appear on `ProductCard` and in the
  cart, but always paired with a visible "Prices shown are indicative
  and may change" line — never presented as confirmed. See
  `lib/products.ts`'s `price` field and `ROADMAP.md` #5.

## Placeholder Convention

Where real information is missing but the site needs a slot for it
(contact email/phone/address in the footer), the placeholder is written
in **bracketed form** — `Email: [ to be added ]` — rather than a
plausible-looking fake value like `hello@nouriqo.com`. Brackets read
unambiguously as "not filled in yet" to both the client and any visitor
who inspects the source, avoiding the risk of a fabricated contact detail
shipping to production by accident.

## Blog Content

The `ROADMAP.md` #6 blog launched with three seed posts, written
in-house rather than supplied by the client. They stay inside the
"don't fabricate" rule by sticking to two kinds of content:

1. **General food/culture writing** not specific to Nouriqo (what ghee
   does to texture and flavour, when and how mithai gets gifted, what
   papri traditionally is as a category of sweet) — informational,
   verifiable-in-general, not a claim about this brand.
2. **Facts already established elsewhere on the site** when the post
   turns to Nouriqo specifically (real desi ghee, real dry fruits, no
   maida/preservatives, "since 1958") — never a new, blog-only claim
   that doesn't appear anywhere else and hasn't been confirmed.

What a blog post must NOT do: invent a specific technique/ingredient
detail about Nouriqo's own process that isn't shown in photography or
stated elsewhere, cite a study or statistic, or claim a customer
reaction. Per `ROADMAP.md` #6, these three posts should get client
review/sign-off before the site is treated as launch-ready — see
`TODO.md`.

## Product Copy

Each product's `description` in `lib/products.ts` describes only what the
packaging photography shows (ingredients, texture, finish) — it does not
claim taste superiority ("the best papri in India") or invent a recipe
story per-SKU beyond the shared "Since 1958" heritage line.
