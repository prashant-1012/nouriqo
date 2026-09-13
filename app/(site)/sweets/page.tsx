import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
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
      <div className="bg-cream pb-12 text-center">
        <Container>
          <Link
            href="/gifting"
            className="text-sm font-medium text-emerald-800 underline underline-offset-4 decoration-emerald-800/30 hover:text-emerald-700"
          >
            Shopping for a gift? See our Gifting collection →
          </Link>
        </Container>
      </div>
      <ProductGrid />
      <Ingredients />
      <OurCraft />
    </>
  );
}
