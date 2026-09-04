import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Motif } from "@/components/decorative/Motif";

export function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 relative overflow-hidden border-t border-ink/5 bg-cream"
    >
      <Motif
        src="/assets/decorative/gold-branch-leaves.png"
        size={220}
        className="pointer-events-none absolute -bottom-10 -right-10 opacity-[0.15] sm:opacity-20"
      />

      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Nouriqo home">
              <Image
                src="/assets/logo/nouriqo-logo.png"
                alt="Nouriqo"
                width={40}
                height={40}
                className="logo-blend h-10 w-10 object-contain"
              />
              <span className="font-display text-xl tracking-wide text-emerald-900">
                NOURIQO
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
              Traditional Indian sweets, thoughtfully made — real desi ghee,
              real dry fruits, no shortcuts.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="#sweets" className="text-ink-soft hover:text-emerald-800">
                  Our Sweets
                </a>
              </li>
              <li>
                <a href="#story" className="text-ink-soft hover:text-emerald-800">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#gifting" className="text-ink-soft hover:text-emerald-800">
                  Gifting
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold-600">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li>Email: [ to be added ]</li>
              <li>Phone: [ to be added ]</li>
              <li>[ Address to be added ]</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink/10 pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nouriqo. All rights reserved.</p>
          <p>Images shown are representative and may differ from the actual product.</p>
        </div>
      </Container>
    </footer>
  );
}
