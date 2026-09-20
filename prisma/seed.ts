/**
 * ⚠️ OUTDATED — do not run against a live database.
 *
 * This seeds from the static array in lib/products.ts, which still holds the
 * pre-Wix catalog: old slugs (`classic-ghee-papri`, `special-kaju-papri`),
 * provisional prices, and no 200 gram pack. Running it would reintroduce
 * products that Wix no longer sells and break PayU checkout again with
 * "<slug> (<weight>) is no longer available".
 *
 * Wix is the source of truth for products as of 2026-09-20. To refresh
 * Postgres, use the mirror instead:
 *
 *   npx tsx --env-file=.env.local scripts/sync-products-from-wix.ts
 *
 * Kept only as a record of the original seed. See docs/WIX_INTEGRATION.md.
 */
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { products } from "../lib/products";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function accentToEnum(accent: "gold" | "lilac" | "rose") {
  return accent.toUpperCase() as "GOLD" | "LILAC" | "ROSE";
}

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        variant: product.variant,
        tagline: product.tagline,
        description: product.description,
        attributes: product.attributes,
        imageSrc: product.image.src,
        imageAlt: product.image.alt,
        accent: accentToEnum(product.accent),
        weightOptions: {
          deleteMany: {},
          create: product.weightOptions.map((option, index) => ({
            weight: option.weight,
            price: option.price,
            sortOrder: index,
          })),
        },
      },
      create: {
        slug: product.slug,
        name: product.name,
        variant: product.variant,
        tagline: product.tagline,
        description: product.description,
        attributes: product.attributes,
        imageSrc: product.image.src,
        imageAlt: product.image.alt,
        accent: accentToEnum(product.accent),
        weightOptions: {
          create: product.weightOptions.map((option, index) => ({
            weight: option.weight,
            price: option.price,
            sortOrder: index,
          })),
        },
      },
    });
  }

  console.log(`Seeded ${products.length} products from lib/products.ts.`);
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
