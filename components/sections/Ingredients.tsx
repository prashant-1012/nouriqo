import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Motif } from "@/components/decorative/Motif";
import { Reveal } from "@/components/motion/Reveal";

export function Ingredients() {
  return (
    <section className="bg-beige/50 py-20 sm:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="order-2 lg:order-1 lg:col-span-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold-600">
            Ingredients
          </p>
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            Only ingredients you can name.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            Cashews, almonds, pistachios, saffron, and real desi ghee — set
            out on the counter before every batch begins. Nothing hides
            behind an ingredient list you can&apos;t pronounce.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative order-1 lg:order-2 lg:col-span-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/9]">
            <Image
              src="/assets/process/process-ingredients.jpg"
              alt="Bowls of cashews, almonds, saffron, rice, and desi ghee laid out on a wooden table"
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover"
            />
          </div>
          <Motif
            src="/assets/decorative/leaf-single-large.png"
            size={60}
            className="absolute -top-6 -left-4 hidden sm:block"
          />
        </Reveal>
      </Container>
    </section>
  );
}
