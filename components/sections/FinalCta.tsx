import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Motif } from "@/components/decorative/Motif";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-emerald-900 py-20 text-center text-ivory sm:py-24">
      <Motif
        src="/assets/decorative/gold-sunburst.png"
        size={90}
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 opacity-50"
      />
      <Container>
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Bring home a piece of tradition.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ivory/80">
            Explore the Nouriqo collection and taste what real ghee, real
            dry fruits, and no shortcuts actually taste like.
          </p>
          <Button
            href="#sweets"
            variant="primary"
            className="mt-8 bg-ivory text-emerald-900 hover:bg-ivory/90"
          >
            Explore Our Sweets
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
