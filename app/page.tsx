import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { WhyNouriqo } from "@/components/sections/WhyNouriqo";
import { ProductGrid } from "@/components/products/ProductGrid";
import { LifestyleStory } from "@/components/sections/LifestyleStory";
import { Ingredients } from "@/components/sections/Ingredients";
import { OurCraft } from "@/components/sections/OurCraft";
import { BrandStory } from "@/components/sections/BrandStory";
import { Gifting } from "@/components/sections/Gifting";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BrandIntro />
        <WhyNouriqo />
        <ProductGrid />
        <LifestyleStory />
        <Ingredients />
        <OurCraft />
        <BrandStory />
        <Gifting />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
