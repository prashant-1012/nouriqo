import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream lg:h-[640px]">
      <Container className="relative z-10 py-14 sm:py-20 lg:absolute lg:inset-0 lg:flex lg:items-center lg:py-0">
        <div className="max-w-xl lg:max-w-lg">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-gold-700">
            Since 1958 · Pride of India
          </p>
          <h1 className="font-display text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
            Traditional sweets,{" "}
            <span className="italic text-emerald-800">thoughtfully</span>{" "}
            made.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
            Nouriqo crafts India&apos;s most cherished mithai with real desi
            ghee and real dry fruits — made for celebration, gifting, and
            everyday joy.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/sweets" variant="primary">
              Explore Our Sweets
            </Button>
            <Button href="/story" variant="secondary">
              Our Story
            </Button>
          </div>
        </div>
      </Container>

      <div className="relative lg:absolute lg:inset-0">
        <Container className="lg:hidden">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_35px_70px_-30px_rgba(14,44,34,0.45)] sm:aspect-[16/10]">
            <Image
              src="/assets/hero/hero-mobile.jpg"
              alt="Nouriqo papri sweets on a brass plate beside pistachios and almonds, with jasmine flowers in the background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_35%] sm:object-bottom"
            />
          </div>
        </Container>

        <div className="relative hidden h-full w-full lg:block">
          <Image
            src="/assets/hero/hero-desktop.jpg"
            alt="Nouriqo papri sweets on a brass plate beside pistachios, almonds, and fresh jasmine flowers, set on a marble counter against a plain wall with generous open space to the left"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[48%_center] xl:object-[62%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/65 via-50% to-transparent to-85%"
          />
        </div>
      </div>
    </section>
  );
}
