import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Motif } from "@/components/decorative/Motif";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { benefits } from "@/lib/benefits";

export function WhyNouriqo() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-beige/70 to-ivory py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="order-2 lg:order-1 lg:col-span-5">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/assets/process/process-cooking.jpg"
                alt="Hands stirring papri mixture in a brass kadhai over a flame"
                fill
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="object-cover"
              />
            </div>
            <div className="relative row-span-2 h-full w-full overflow-hidden rounded-2xl">
              <Image
                src="/assets/process/process-garnishing.jpg"
                alt="Hand garnishing a tray of papri with pistachios and almonds"
                fill
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/assets/process/process-shaping.jpg"
                alt="Hands shaping a ladoo by hand over a brass plate"
                fill
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <Motif
            src="/assets/decorative/gold-quatrefoil-pearl.png"
            size={40}
            className="mb-4"
          />
          <SectionHeading
            title="Why Nouriqo"
            description="Nouriqo exists to bring traditional Indian mithai back to its honest roots — real desi ghee, real dry fruits, and a recipe that hasn't needed to change since 1958."
          />

          <RevealGroup className="mt-10 space-y-8">
            {benefits.map((benefit) => (
              <RevealItem key={benefit.title} className="flex gap-4">
                <Image
                  src={benefit.icon}
                  alt=""
                  aria-hidden="true"
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0"
                />
                <div>
                  <h3 className="font-display text-lg text-ink">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {benefit.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
