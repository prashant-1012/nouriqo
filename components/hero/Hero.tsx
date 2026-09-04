import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Motif } from "@/components/decorative/Motif";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="relative z-10 max-w-xl">
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
            <Button href="#sweets" variant="primary">
              Explore Our Sweets
            </Button>
            <Button href="#story" variant="secondary">
              Our Story
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_35px_70px_-30px_rgba(14,44,34,0.45)] sm:aspect-[16/10] lg:aspect-[4/5]">
            <Image
              src="/assets/hero/hero-mobile.jpg"
              alt="Nouriqo papri sweets topped with almonds and pistachios, plated on a brass dish beside fresh jasmine flowers"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_35%] sm:object-bottom lg:hidden"
            />
            <Image
              src="/assets/hero/hero-desktop.jpg"
              alt="Nouriqo papri sweets topped with almonds and pistachios, plated on a brass dish beside fresh jasmine flowers"
              fill
              priority
              sizes="50vw"
              className="hidden object-cover lg:block"
            />
          </div>

          <Motif
            src="/assets/decorative/gold-sparkle-star.png"
            size={56}
            className="absolute -top-5 -right-3 hidden sm:block"
          />
          <Motif
            src="/assets/decorative/leaf-branch-medium.png"
            size={72}
            className="absolute -bottom-6 -left-6 hidden sm:block"
          />
        </div>
      </Container>
    </section>
  );
}
