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
  "Enquire Now," "Enquire About Gifting" — never "Buy Now" or "Add to
  Cart," because no checkout exists yet (see `TODO.md`).
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
- Delivery/shipping claims, return policy specifics, or pricing — none
  were supplied, so none appear. Product cards show weight (from
  packaging) but no price.

## Placeholder Convention

Where real information is missing but the site needs a slot for it
(contact email/phone/address in the footer), the placeholder is written
in **bracketed form** — `Email: [ to be added ]` — rather than a
plausible-looking fake value like `hello@nouriqo.com`. Brackets read
unambiguously as "not filled in yet" to both the client and any visitor
who inspects the source, avoiding the risk of a fabricated contact detail
shipping to production by accident.

## Product Copy

Each product's `description` in `lib/products.ts` describes only what the
packaging photography shows (ingredients, texture, finish) — it does not
claim taste superiority ("the best papri in India") or invent a recipe
story per-SKU beyond the shared "Since 1958" heritage line.
