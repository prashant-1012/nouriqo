import { cache } from "react";
import type { Product } from "@/lib/products";
import { presentationFor } from "@/lib/product-presentation";
import { WIX_PRODUCTS_TAG, wixFetch } from "@/lib/wix-client";

/**
 * Live product catalog, read from Wix Stores — see docs/WIX_INTEGRATION.md.
 *
 * Replaces the Prisma-backed `lib/products-db.ts` (2026-09-20). The exported
 * shape is deliberately identical to what that module returned, so the cart,
 * product grid and detail pages needed no changes beyond their import path.
 *
 * The Nouriqo site is on **Catalog V1**, not V3 — the endpoints and payload
 * shapes below are V1-only and will not work against a V3 store.
 */

/** Shown only when a Wix product has no image at all. The client should
 * always upload one; this exists so a missing image degrades to a generic
 * photo rather than crashing `next/image` with an empty src. */
const FALLBACK_IMAGE = "/assets/products/classic-ghee-papri.jpg";

type WixPrice = { price: number };

type WixVariant = {
  id: string;
  choices: Record<string, string>;
  variant: {
    priceData?: WixPrice;
    weight?: number;
    visible?: boolean;
  };
  stock?: { inStock?: boolean };
};

type WixProduct = {
  id: string;
  name: string;
  slug: string;
  visible?: boolean;
  description?: string;
  createdDate?: string;
  priceData?: WixPrice;
  weight?: number;
  manageVariants?: boolean;
  stock?: { inStock?: boolean };
  media?: {
    mainMedia?: { image?: { url?: string } };
  };
  variants?: WixVariant[];
};

type QueryProductsResponse = {
  products: WixProduct[];
  totalResults: number;
};

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

/** Wix stores descriptions as rich HTML; our UI renders plain text. */
function toPlainText(html: string | undefined): string {
  if (!html) return "";

  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/gi, (entity) => HTML_ENTITIES[entity.toLowerCase()] ?? entity)
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Pack sizes, derived from the product's Wix variants.
 *
 * The client models pack size as a Wix product option named "Weight", whose
 * choices are "200 gram" / "500 gram" / "1 kg". We sort by the variant's own
 * numeric weight rather than the label, so the order stays correct no matter
 * how the choices are named or reordered in the dashboard.
 *
 * Falls back to a single option built from the product-level price when a
 * product has no variants — which is what a product created in the dashboard
 * without options looks like.
 */
function toWeightOptions(product: WixProduct): Product["weightOptions"] {
  const variants = product.variants ?? [];

  const fromVariants = variants
    .filter((entry) => entry.variant.visible !== false)
    .filter((entry) => entry.stock?.inStock !== false)
    .map((entry) => ({
      weight: Object.values(entry.choices)[0] ?? "",
      price: entry.variant.priceData?.price ?? 0,
      sortKey: entry.variant.weight ?? 0,
    }))
    .filter((option) => option.weight !== "")
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ weight, price }) => ({ weight, price }));

  if (fromVariants.length > 0) {
    return fromVariants;
  }

  // No options configured in Wix — present the product as a single pack.
  const price = product.priceData?.price ?? 0;
  const weight = product.weight ? `${product.weight} kg` : "Standard pack";

  return [{ weight, price }];
}

function toProduct(product: WixProduct): Product {
  const presentation = presentationFor(product.slug, product.name);

  return {
    slug: product.slug,
    name: product.name,
    variant: presentation.variant,
    tagline: presentation.tagline,
    description: toPlainText(product.description),
    weightOptions: toWeightOptions(product),
    attributes: presentation.attributes,
    image: {
      src: product.media?.mainMedia?.image?.url ?? FALLBACK_IMAGE,
      alt: presentation.imageAlt,
    },
    accent: presentation.accent,
  };
}

/**
 * Every visible product, oldest first — matching the ordering the previous
 * database-backed implementation used.
 *
 * `cache()` de-dupes within a single request (the root layout and the page
 * both call this); the Next fetch cache inside `wixFetch` handles reuse
 * across requests, and is flushed by revalidating `WIX_PRODUCTS_TAG`.
 */
export const getProducts = cache(async (): Promise<Product[]> => {
  const { products } = await wixFetch<QueryProductsResponse>(
    "/stores/v1/products/query",
    {
      body: { includeVariants: true, query: { paging: { limit: 100 } } },
      tags: [WIX_PRODUCTS_TAG],
    }
  );

  return products
    .filter((product) => product.visible !== false)
    .sort((a, b) => (a.createdDate ?? "").localeCompare(b.createdDate ?? ""))
    .map(toProduct);
});

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | undefined> => {
    // V1 has no get-by-slug endpoint, and the catalog is small enough that
    // filtering the cached full list beats a second network round trip.
    const products = await getProducts();
    return products.find((product) => product.slug === slug);
  }
);
