import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const craftSteps = [
  {
    image: "/assets/process/process-cooking.jpg",
    alt: "Hands stirring papri mixture in a brass kadhai over a flame",
    caption: "Slow-cooked in ghee, the traditional way.",
  },
  {
    image: "/assets/process/process-shaping.jpg",
    alt: "Hands shaping a ladoo by hand over a brass plate",
    caption: "Shaped by hand, batch after batch.",
  },
  {
    image: "/assets/process/process-garnishing.jpg",
    alt: "Hand garnishing a tray of papri with pistachios and almonds",
    caption: "Finished with real almonds and pistachio.",
  },
];

export function OurCraft() {
  return (
    <section className="bg-ivory py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Craft"
          title="Made with care, not shortcuts"
          description="Every tray still passes through the same hands, the same way it did in 1958."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {craftSteps.map((step) => (
            <RevealItem key={step.image}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {step.caption}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
