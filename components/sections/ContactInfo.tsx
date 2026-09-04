import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";

const details = [
  { label: "Email", value: "[ to be added ]" },
  { label: "Phone", value: "[ to be added ]" },
  { label: "Address", value: "[ to be added ]" },
];

export function ContactInfo() {
  return (
    <section className="bg-ivory py-12 sm:py-16">
      <Container className="max-w-2xl">
        <Reveal>
          <dl className="space-y-6 border-t border-ink/10 pt-8">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-6"
              >
                <dt className="text-xs font-medium uppercase tracking-[0.2em] text-gold-700">
                  {detail.label}
                </dt>
                <dd className="text-right text-base text-ink-soft">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
