import { Hero } from "@/components/hero/Hero";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { WhyNouriqo } from "@/components/sections/WhyNouriqo";
import { ProductGrid } from "@/components/products/ProductGrid";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <WhyNouriqo />
      <ProductGrid />
      <FinalCta />
    </>
  );
}
