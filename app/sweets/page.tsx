import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Ingredients } from "@/components/sections/Ingredients";
import { OurCraft } from "@/components/sections/OurCraft";

export const metadata: Metadata = {
  title: "Our Sweets",
  description:
    "Explore Nouriqo's collection of traditional Indian sweets — real desi ghee, real dry fruits, no maida, no preservatives.",
};

export default function SweetsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Our Sweets"
        description="Traditional Indian mithai, finished by hand with real desi ghee and real dry fruits."
      />
      <ProductGrid />
      <Ingredients />
      <OurCraft />
    </>
  );
}
