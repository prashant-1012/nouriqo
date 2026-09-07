import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialsColumn } from "@/components/ui/TestimonialsColumn";
import { testimonials } from "@/lib/testimonials";

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-ivory py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Customer Love"
          title="Loved, one box at a time"
          description="From weekday treats to Diwali gifting, here's what people are saying about Nouriqo."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            duration={19}
            className="hidden sm:block"
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            duration={17}
            className="hidden lg:block"
          />
        </div>
      </Container>
    </section>
  );
}
