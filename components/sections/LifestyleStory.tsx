import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Motif } from "@/components/decorative/Motif";
import { Reveal } from "@/components/motion/Reveal";

export function LifestyleStory() {
  return (
    <section className="bg-ivory py-20 sm:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="relative lg:col-span-7 lg:col-start-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/10]">
            <Image
              src="/assets/lifestyle/evening-chai-papri.jpg"
              alt="Nouriqo papri sweets served on a wooden tray beside a cup of chai and a bowl of saffron"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <Motif
            src="/assets/decorative/gold-swirl-leaf.png"
            size={64}
            className="absolute -bottom-6 -right-4 hidden sm:block"
          />
        </Reveal>

        <Reveal
          delay={0.1}
          className="lg:col-span-4 lg:col-start-9 lg:pl-2"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold-600">
            A Sweet Pause
          </p>
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            Best enjoyed slowly, with good company.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            Some of our best moments happen over a warm cup of chai and a
            plate of something sweet. Nouriqo is made to be shared —
            unhurried, familiar, and a little indulgent.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
