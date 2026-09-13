import { cache } from "react";
import { prisma } from "@/lib/db";
import type { Product } from "@/lib/products";
import type {
  Product as DbProduct,
  ProductWeightOption as DbProductWeightOption,
} from "@/generated/prisma/client";

type DbProductWithOptions = DbProduct & { weightOptions: DbProductWeightOption[] };

function toProduct(row: DbProductWithOptions): Product {
  return {
    slug: row.slug,
    name: row.name,
    variant: row.variant,
    tagline: row.tagline,
    description: row.description,
    weightOptions: [...row.weightOptions]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((option) => ({ weight: option.weight, price: option.price })),
    attributes: row.attributes,
    image: { src: row.imageSrc, alt: row.imageAlt },
    accent: row.accent.toLowerCase() as Product["accent"],
  };
}

/** Live product catalog, read from the database — see ECOMMERCE_BUILDOUT.md Phase 2.
 * Wrapped in React's cache() so multiple calls within one request (e.g. from
 * both the root layout and a page) only hit the database once. */
export const getProducts = cache(async (): Promise<Product[]> => {
  const rows = await prisma.product.findMany({
    include: { weightOptions: true },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(toProduct);
});

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | undefined> => {
    const row = await prisma.product.findUnique({
      where: { slug },
      include: { weightOptions: true },
    });
    return row ? toProduct(row) : undefined;
  }
);
