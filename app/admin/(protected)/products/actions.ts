"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { Prisma } from "@/generated/prisma/client";

export type ProductFormInput = {
  slug: string;
  name: string;
  variant: string;
  tagline: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  accent: "GOLD" | "LILAC" | "ROSE";
  attributes: string[];
  weightOptions: { weight: string; price: number }[];
};

function revalidateStorefront(slug?: string) {
  revalidatePath("/admin/products");
  revalidatePath("/sweets");
  revalidatePath("/");
  if (slug) revalidatePath(`/products/${slug}`);
}

export async function createProduct(
  input: ProductFormInput
): Promise<{ error: string } | undefined> {
  await requireAdmin();

  try {
    await prisma.product.create({
      data: {
        slug: input.slug,
        name: input.name,
        variant: input.variant,
        tagline: input.tagline,
        description: input.description,
        imageSrc: input.imageSrc,
        imageAlt: input.imageAlt,
        accent: input.accent,
        attributes: input.attributes,
        weightOptions: {
          create: input.weightOptions.map((option, index) => ({
            weight: option.weight,
            price: option.price,
            sortOrder: index,
          })),
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "A product with that slug already exists." };
    }
    console.error("createProduct failed:", error);
    return { error: "Something went wrong saving the product." };
  }

  revalidateStorefront(input.slug);
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  input: ProductFormInput
): Promise<{ error: string } | undefined> {
  await requireAdmin();

  try {
    await prisma.product.update({
      where: { id },
      data: {
        slug: input.slug,
        name: input.name,
        variant: input.variant,
        tagline: input.tagline,
        description: input.description,
        imageSrc: input.imageSrc,
        imageAlt: input.imageAlt,
        accent: input.accent,
        attributes: input.attributes,
        weightOptions: {
          deleteMany: {},
          create: input.weightOptions.map((option, index) => ({
            weight: option.weight,
            price: option.price,
            sortOrder: index,
          })),
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "A product with that slug already exists." };
    }
    console.error("updateProduct failed:", error);
    return { error: "Something went wrong saving the product." };
  }

  revalidateStorefront(input.slug);
  redirect("/admin/products");
}

export async function deleteProduct(id: string): Promise<{ error: string } | undefined> {
  await requireAdmin();

  const product = await prisma.product.delete({ where: { id } }).catch((error) => {
    console.error("deleteProduct failed:", error);
    return null;
  });

  if (!product) {
    return { error: "Something went wrong deleting the product." };
  }

  revalidateStorefront(product.slug);
}
