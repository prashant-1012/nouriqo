/**
 * As of 2026-09-13 (ECOMMERCE_BUILDOUT.md Phase 2), this file is the seed
 * source for the database (see prisma/seed.ts) — the live site reads
 * products from the database via lib/products-db.ts instead. Edit prices
 * or add products through the database (or the future admin dashboard),
 * not here; this file only matters again if you deliberately re-seed.
 */

export type WeightOption = {
  weight: string;
  /** Indicative price in INR for this pack size — provisional, see CONTENT_GUIDELINES.md */
  price: number;
  /**
   * Wix Stores variant ID for this pack size. Required to put the item in a
   * real Wix cart at checkout — Wix identifies what's being bought by variant,
   * not by our `weight` label. Absent on the legacy static array below.
   */
  variantId?: string;
};

export type Product = {
  slug: string;
  /**
   * Wix Stores product ID. Paired with a WeightOption's `variantId` to build
   * the `catalogReference` a Wix cart line needs. Absent on the legacy static
   * array below, which is no longer a live read path.
   */
  wixProductId?: string;
  name: string;
  variant: string;
  tagline: string;
  description: string;
  weightOptions: WeightOption[];
  attributes: string[];
  image: {
    src: string;
    alt: string;
  };
  accent: "gold" | "lilac" | "rose";
};

export const products: Product[] = [
  {
    slug: "classic-ghee-papri",
    name: "Special Ghee Papri",
    variant: "Classic Delicious",
    tagline: "Since 1958",
    description:
      "Our original recipe — layers of papri slow-cooked in desi ghee and finished with almonds and pistachios.",
    weightOptions: [
      { weight: "500 gram", price: 500 },
      { weight: "1 kg", price: 1000 },
    ],
    attributes: ["No Maida", "No Artificial Color", "No Preservatives"],
    image: {
      src: "/assets/products/classic-ghee-papri.jpg",
      alt: "Nouriqo Special Ghee Papri box, Classic Delicious variant, with a bowl of papri sweets topped with almonds and pistachios",
    },
    accent: "gold",
  },
  {
    slug: "kaju-badam-papri",
    name: "Kaju Badam Papri",
    variant: "Cashew & Almond",
    tagline: "Since 1958",
    description:
      "A velvety delicacy layered generously with cashews and almonds for a richer, nuttier bite.",
    weightOptions: [
      { weight: "500 gram", price: 550 },
      { weight: "1 kg", price: 1100 },
    ],
    attributes: ["No Maida", "No Artificial Color", "No Preservatives"],
    image: {
      src: "/assets/products/kaju-badam-papri.jpg",
      alt: "Nouriqo Kaju Badam Papri box with cashew and almond papri sweets served on a decorative brass plate",
    },
    accent: "lilac",
  },
  {
    slug: "special-kaju-papri",
    name: "Special Kaju Papri",
    variant: "Classic Delicious",
    tagline: "Since 1958",
    description:
      "Our signature cashew papri, finished with pistachio and a touch of rose for a lighter, fragrant finish.",
    weightOptions: [
      { weight: "500 gram", price: 600 },
      { weight: "1 kg", price: 1200 },
    ],
    attributes: ["No Maida", "No Artificial Color", "No Preservatives"],
    image: {
      src: "/assets/products/special-kaju-papri.jpg",
      alt: "Nouriqo Special Kaju Papri box with cashew papri sweets served on a wooden tray",
    },
    accent: "rose",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
