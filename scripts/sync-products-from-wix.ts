import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { presentationFor } from "../lib/product-presentation";

/**
 * Mirrors the Wix Stores catalog into Postgres.
 *
 * Wix is the source of truth for products (docs/WIX_INTEGRATION.md). Postgres
 * is no longer on the storefront read path, but the PayU checkout and the
 * admin dashboard still read it, and they stay as the fallback until a real
 * payment has cleared through Wix.
 *
 * Those two catalogs drifted the moment Wix took over: Postgres still held
 * the old `classic-ghee-papri` slugs and had no 200 gram pack, so any cart
 * built from the live site failed PayU checkout with "<slug> (<weight>) is no
 * longer available". This script closes that gap.
 *
 * Run it after any structural catalog change in Wix:
 *   npx tsx --env-file=.env.local scripts/sync-products-from-wix.ts
 *
 * Replaces prisma/seed.ts, which seeded from the now-retired static array in
 * lib/products.ts. Catalog V1 endpoints only — this site is not on V3.
 */

const WIX_API = "https://www.wixapis.com";
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

type WixVariant = {
  id: string;
  choices: Record<string, string>;
  variant: { priceData?: { price: number }; weight?: number; visible?: boolean };
  stock?: { inStock?: boolean };
};

type WixProduct = {
  id: string;
  name: string;
  slug: string;
  visible?: boolean;
  description?: string;
  createdDate?: string;
  priceData?: { price: number };
  weight?: number;
  media?: { mainMedia?: { image?: { url?: string } } };
  variants?: WixVariant[];
};

/** Mirrors toPlainText() in lib/products-wix.ts — Wix stores rich HTML. */
function toPlainText(html: string | undefined): string {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/gi, "&")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function weightOptionsFor(product: WixProduct) {
  const fromVariants = (product.variants ?? [])
    .filter((entry) => entry.variant.visible !== false)
    .filter((entry) => entry.stock?.inStock !== false)
    .map((entry) => ({
      weight: Object.values(entry.choices)[0] ?? "",
      price: entry.variant.priceData?.price ?? 0,
      sortKey: entry.variant.weight ?? 0,
    }))
    .filter((option) => option.weight !== "")
    .sort((a, b) => a.sortKey - b.sortKey);

  if (fromVariants.length > 0) {
    return fromVariants.map(({ weight, price }) => ({ weight, price }));
  }

  return [
    {
      weight: product.weight ? `${product.weight} kg` : "Standard pack",
      price: product.priceData?.price ?? 0,
    },
  ];
}

async function fetchWixProducts(): Promise<WixProduct[]> {
  const clientId = process.env.WIX_CLIENT_ID;
  if (!clientId) throw new Error("WIX_CLIENT_ID is not set.");

  const tokenResponse = await fetch(`${WIX_API}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId, grantType: "anonymous" }),
  });
  if (!tokenResponse.ok) {
    throw new Error(`Token request failed: ${await tokenResponse.text()}`);
  }
  const { access_token: token } = (await tokenResponse.json()) as {
    access_token: string;
  };

  const productsResponse = await fetch(`${WIX_API}/stores/v1/products/query`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({ includeVariants: true, query: { paging: { limit: 100 } } }),
  });
  if (!productsResponse.ok) {
    throw new Error(`Product query failed: ${await productsResponse.text()}`);
  }

  const { products } = (await productsResponse.json()) as { products: WixProduct[] };
  return products
    .filter((product) => product.visible !== false)
    .sort((a, b) => (a.createdDate ?? "").localeCompare(b.createdDate ?? ""));
}

async function main() {
  const wixProducts = await fetchWixProducts();

  for (const product of wixProducts) {
    const presentation = presentationFor(product.slug, product.name);
    const options = weightOptionsFor(product);

    const fields = {
      name: product.name,
      variant: presentation.variant,
      tagline: presentation.tagline,
      description: toPlainText(product.description),
      attributes: presentation.attributes,
      imageSrc: product.media?.mainMedia?.image?.url ?? "",
      imageAlt: presentation.imageAlt,
      accent: presentation.accent.toUpperCase() as "GOLD" | "LILAC" | "ROSE",
    };

    const weightOptions = options.map((option, index) => ({
      weight: option.weight,
      price: option.price,
      sortOrder: index,
    }));

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        ...fields,
        // Replace wholesale: a pack size removed in Wix must disappear here
        // too, or PayU checkout would still accept an option Wix no longer has.
        weightOptions: { deleteMany: {}, create: weightOptions },
      },
      create: {
        slug: product.slug,
        ...fields,
        weightOptions: { create: weightOptions },
      },
    });

    console.log(
      `  ${product.slug} — ${options.map((o) => `${o.weight} ₹${o.price}`).join(", ")}`
    );
  }

  // Drop anything Wix no longer sells, so stale slugs can't linger in the
  // admin dashboard. Past OrderItems keep their snapshotted product details;
  // the schema sets their productId to null rather than cascading.
  const liveSlugs = wixProducts.map((product) => product.slug);
  const removed = await prisma.product.deleteMany({
    where: { slug: { notIn: liveSlugs } },
  });

  console.log(
    `\nSynced ${wixProducts.length} products from Wix; removed ${removed.count} stale.`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
