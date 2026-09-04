import { Container } from "@/components/layout/Container";
import { Motif } from "@/components/decorative/Motif";
import { Reveal } from "@/components/motion/Reveal";

export function BrandIntro() {
  return (
    <section className="relative bg-ivory py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Motif
            src="/assets/decorative/gold-lotus-mini.png"
            size={48}
            className="mx-auto mb-6"
          />
          <h2 className="font-display text-3xl leading-snug text-ink sm:text-4xl lg:text-[2.5rem]">
            Sweetness, made the way it always should have been.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Nouriqo exists for one reason — to bring traditional Indian
            mithai back to its honest roots. No maida, no artificial colour,
            no preservatives. Just real desi ghee, real dry fruits, and a
            recipe that hasn&apos;t needed to change since 1958.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
