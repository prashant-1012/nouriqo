import type { Product } from "@/lib/products";

/**
 * Presentation fields that Wix Stores has no home for.
 *
 * Wix owns the commercial data — name, description, price per pack size,
 * images, stock. It has no concept of our accent colour, the "Since 1958"
 * ribbon, the ingredient badges, or the variant sub-label. Those live here.
 *
 * The rule (decided 2026-09-20, see docs/WIX_INTEGRATION.md): **defaults must
 * make any brand-new product look right with zero code changes.** When the
 * client adds a product in the Wix dashboard tomorrow, it appears on the site
 * fully styled — no missing badge, no blank ribbon, no colourless card.
 * Per-slug overrides below exist only to pin specific styling we care about.
 */

type Presentation = {
  variant: string;
  tagline: string;
  attributes: string[];
  accent: Product["accent"];
  /** Falls back to a generated alt when absent — see `presentationFor`. */
  imageAlt?: string;
};

/** True of every Nouriqo product, so safe for anything the client adds. */
const DEFAULTS: Omit<Presentation, "accent"> = {
  variant: "Traditional Recipe",
  tagline: "Since 1958",
  attributes: ["No Maida", "No Artificial Color", "No Preservatives"],
};

const ACCENTS: Product["accent"][] = ["gold", "lilac", "rose"];

/**
 * Per-slug overrides. Anything omitted falls back to DEFAULTS, so a partial
 * entry is fine — override just the tagline and the rest still fills in.
 *
 * Slugs match Wix exactly. If the client renames a slug in the dashboard the
 * override silently stops applying and the product falls back to defaults —
 * it degrades to "generic but correct", never to broken.
 */
const OVERRIDES: Record<string, Partial<Presentation>> = {
  "ghee-papri": {
    variant: "Classic Delicious",
    accent: "gold",
    imageAlt:
      "Nouriqo Ghee Papri box with a bowl of papri sweets topped with almonds and pistachios",
  },
  "kaju-badam-papri": {
    variant: "Cashew & Almond",
    accent: "lilac",
    imageAlt:
      "Nouriqo Kaju Badam Papri box with cashew and almond papri sweets served on a decorative brass plate",
  },
  "kaju-papri": {
    variant: "Classic Delicious",
    accent: "rose",
    imageAlt:
      "Nouriqo Kaju Papri box with cashew papri sweets served on a wooden tray",
  },
};

/**
 * Stable accent for a product with no override — same slug always yields the
 * same colour, so cards don't reshuffle between requests or deploys.
 */
function accentForSlug(slug: string): Product["accent"] {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return ACCENTS[Math.abs(hash) % ACCENTS.length];
}

export function presentationFor(
  slug: string,
  productName: string
): Required<Presentation> {
  const override = OVERRIDES[slug] ?? {};

  return {
    variant: override.variant ?? DEFAULTS.variant,
    tagline: override.tagline ?? DEFAULTS.tagline,
    attributes: override.attributes ?? DEFAULTS.attributes,
    accent: override.accent ?? accentForSlug(slug),
    imageAlt: override.imageAlt ?? `${productName} — Nouriqo Indian sweets`,
  };
}
