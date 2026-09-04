import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/lib/products";

export function ProductGrid() {
  return (
    <section className="bg-ivory py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Sweets"
          title="A small collection, made large in flavour"
          description="Every Nouriqo box is finished by hand with real almonds, cashews, and pistachios."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <RevealItem key={product.slug}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
