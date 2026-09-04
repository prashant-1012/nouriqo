import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Motif } from "@/components/decorative/Motif";
import { Reveal } from "@/components/motion/Reveal";
import { certifications } from "@/lib/certifications";

/**
 * PLACEHOLDER LOGOS — DESIGN REFERENCE ONLY, see lib/certifications.ts.
 * Do not ship to a live/client-facing build without real, confirmed
 * certifications.
 */
export function Certifications() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-200/30 via-cream to-rose-200/20 py-16 sm:py-20">
      <Motif
        src="/assets/decorative/leaf-branch-small.png"
        size={90}
        className="pointer-events-none absolute -left-6 -top-6 opacity-30 sm:left-2 sm:top-2"
      />
      <Motif
        src="/assets/decorative/leaf-pair-small.png"
        size={80}
        className="pointer-events-none absolute -bottom-4 -right-4 rotate-12 opacity-30 sm:bottom-2 sm:right-4"
      />

      <Container className="relative">
        <Reveal className="text-center">
          <h2 className="font-display text-2xl text-emerald-900 sm:text-3xl">
            Certifications
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 rounded-2xl bg-white px-8 py-8 sm:gap-x-14 sm:px-12">
            {certifications.map((cert) => (
              <Image
                key={cert.name}
                src={cert.logo}
                alt={cert.name}
                width={150}
                height={75}
                className="h-9 w-auto object-contain sm:h-11"
              />
            ))}
          </div>
        </Reveal>

        <p className="mt-6 text-center text-xs italic text-ink-soft/70">
          Certification logos shown are placeholders for reference only,
          pending verified credentials.
        </p>
      </Container>
    </section>
  );
}
