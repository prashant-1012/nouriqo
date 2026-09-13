import { Hero } from "@/components/hero/Hero";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { WhyNouriqo } from "@/components/sections/WhyNouriqo";
import { Counters } from "@/components/sections/Counters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Certifications } from "@/components/sections/Certifications";
import { Partners } from "@/components/sections/Partners";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <BrandIntro />
      <WhyNouriqo />
      <Counters />
      <Certifications />
      <Partners />
      <FinalCta />
    </>
  );
}
