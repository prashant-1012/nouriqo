import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Motif } from "@/components/decorative/Motif";
import { Reveal } from "@/components/motion/Reveal";

export function BrandStory() {
  return (
    <section className="relative overflow-hidden bg-emerald-950 py-20 text-ivory sm:py-28">
      <Motif
        src="/assets/decorative/gold-lotus-dots.png"
        size={120}
        className="pointer-events-none absolute -top-6 right-6 opacity-40 sm:right-16"
      />

      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold-400">
            Our Story
          </p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            A recipe rooted in 1958.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ivory/80">
            Nouriqo carries forward a recipe for ghee papri that has been
            made the same way for generations — long before &quot;clean
            label&quot; was a phrase anyone needed. We simply kept doing what
            already worked: real ingredients, patient cooking, and sweets
            that taste like they were made for someone you love.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="relative lg:col-span-6 lg:col-start-7"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/10]">
            <Image
              src="/assets/lifestyle/rustic-plate-papri.jpg"
              alt="Nouriqo papri sweets served on a ceramic plate with pistachios and cashews"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
