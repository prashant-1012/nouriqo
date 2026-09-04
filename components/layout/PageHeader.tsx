import { Container } from "@/components/layout/Container";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold-700">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
