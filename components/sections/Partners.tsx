import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { partners } from "@/lib/partners";

export function Partners() {
  return (
    <section className="overflow-x-hidden bg-ivory py-16 sm:py-20">
      <Container>
        <h2 className="text-center font-display text-2xl text-emerald-900 sm:text-3xl">
          We&apos;re Also On
        </h2>
      </Container>

      <div className="mt-10 overflow-x-hidden py-1">
        <div className="flex w-max animate-marquee gap-6">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex h-24 w-40 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-white p-4"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="h-auto max-h-14 w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
