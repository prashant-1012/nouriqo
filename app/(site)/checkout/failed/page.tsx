import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Payment Failed",
};

export default function CheckoutFailedPage() {
  return (
    <section className="bg-ivory py-24">
      <Container className="max-w-md text-center">
        <h1 className="font-display text-3xl text-ink">Payment didn&apos;t go through</h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Your payment wasn&apos;t completed, and nothing was charged. Your
          cart is still saved — you can try again whenever you&apos;re ready.
        </p>
        <Link
          href="/checkout"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-emerald-800 px-7 py-3.5 text-sm font-medium text-ivory transition-colors hover:bg-emerald-700"
        >
          Try Again
        </Link>
      </Container>
    </section>
  );
}
