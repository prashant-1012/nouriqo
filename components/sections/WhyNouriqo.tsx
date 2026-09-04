import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { benefits } from "@/lib/benefits";

export function WhyNouriqo() {
  return (
    <section className="bg-beige/50 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Nouriqo"
          title="Indulgence, without the compromise"
          description="Every claim on our box is a promise we keep in the kitchen — not a marketing line."
        />

        <RevealGroup className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {benefits.map((benefit) => (
            <RevealItem
              key={benefit.label}
              className="flex flex-col items-center text-center"
            >
              <Image
                src={benefit.icon}
                alt=""
                aria-hidden="true"
                width={72}
                height={72}
                className="h-16 w-16 object-contain sm:h-[72px] sm:w-[72px]"
              />
              <p className="mt-4 text-sm font-medium leading-snug text-ink">
                {benefit.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
