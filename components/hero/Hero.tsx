import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative h-dvh min-h-[560px] overflow-hidden bg-cream lg:h-[640px] lg:min-h-0">
      <div className="absolute inset-0">
        <Image
          src="/assets/hero/hero-mobile.jpg"
          alt="Nouriqo papri sweets on a brass plate beside pistachios and almonds, with jasmine flowers in the background"
          fill
          priority
          sizes="100vw"
          className="object-cover lg:hidden"
        />
        <Image
          src="/assets/hero/hero-desktop.jpg"
          alt="Nouriqo papri sweets on a brass plate beside pistachios, almonds, and fresh jasmine flowers, set on a marble counter against a plain wall with generous open space to the left"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-[48%_center] xl:object-[62%_center] lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-cream/95 via-cream/65 via-40% to-transparent to-68% lg:bg-gradient-to-r lg:from-cream/95 lg:via-cream/65 lg:via-50% lg:to-transparent lg:to-85%"
        />
      </div>

      <div className="absolute inset-0 lg:flex lg:items-center">
        <Container className="w-full pt-14 sm:pt-20 lg:pt-0">
          <div className="max-w-xl lg:max-w-lg">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold-700 sm:mb-5">
              Since 1958 · Pride of India
            </p>
            <h1 className="font-display text-3xl leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
              Traditional sweets,{" "}
              <span className="italic text-emerald-800">thoughtfully</span>{" "}
              made.
            </h1>
            <p className="mt-3 text-base leading-relaxed text-ink-soft sm:mt-6 sm:text-lg">
              Real desi ghee, real dry fruits — made for celebration,
              gifting, and everyday joy.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4">
              <Button href="/sweets" variant="primary">
                Explore Our Sweets
              </Button>
              <Button href="/story" variant="secondary">
                Our Story
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
