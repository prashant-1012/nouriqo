import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Edit Product" };

export default async function EditProductPage({
  params,
}: PageProps<"/admin/products/[id]/edit">) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { weightOptions: { orderBy: { sortOrder: "asc" } } },
  });

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Edit Product</h1>
      <div className="mt-6">
        <ProductForm
          product={{
            id: product.id,
            slug: product.slug,
            name: product.name,
            variant: product.variant,
            tagline: product.tagline,
            description: product.description,
            imageSrc: product.imageSrc,
            imageAlt: product.imageAlt,
            accent: product.accent,
            attributes: product.attributes,
            weightOptions: product.weightOptions.map((option) => ({
              weight: option.weight,
              price: option.price,
            })),
          }}
        />
      </div>
    </div>
  );
}
