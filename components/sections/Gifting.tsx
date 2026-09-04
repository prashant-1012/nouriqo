import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Motif } from "@/components/decorative/Motif";
import { Reveal } from "@/components/motion/Reveal";

export function Gifting() {
  return (
    <section
      id="gifting"
      className="scroll-mt-20 relative overflow-hidden bg-cream py-20 sm:py-28"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="relative order-2 lg:order-1 lg:col-span-7">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/10]">
            <Image
              src="/assets/lifestyle/gifting-box.jpg"
              alt="Nouriqo papri sweets packed in a decorative green gift box with a gold ribbon"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <Motif
            src="/assets/decorative/gold-heart-leaf.png"
            size={64}
            className="absolute -bottom-6 -right-4 hidden sm:block"
          />
        </Reveal>

        <Reveal
          delay={0.1}
          className="order-1 lg:order-2 lg:col-span-4 lg:col-start-9"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold-700">
            Gifting
          </p>
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            Gifting, made graceful.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            A box of Nouriqo says more than words can — thoughtful,
            traditional, and finished with the kind of care that gets
            noticed.
          </p>
          <Button href="#contact" variant="primary" className="mt-7">
            Enquire About Gifting
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
