import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Motif } from "@/components/decorative/Motif";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/5 bg-cream">
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
                src="/assets/logo/nouriqo-mark.png"
                alt="Nouriqo"
                width={40}
                height={26}
                className="logo-blend h-9 w-auto object-contain"
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
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold-700">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/sweets" className="text-ink-soft hover:text-emerald-800">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/story" className="text-ink-soft hover:text-emerald-800">
                  About
                </Link>
              </li>
              <li>
                <Link href="/gifting" className="text-ink-soft hover:text-emerald-800">
                  Gifting
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-ink-soft hover:text-emerald-800">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-ink-soft hover:text-emerald-800">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ink-soft hover:text-emerald-800">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold-700">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li>Email: sales1earth@gmail.com</li>
              <li>Phone: +91 99606 25495</li>
              <li>Pune, Maharashtra, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink/10 pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
            <p>© {new Date().getFullYear()} Nouriqo. All rights reserved.</p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href="/privacy-policy" className="hover:text-emerald-800">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-emerald-800">
                Terms of Service
              </Link>
              <Link href="/refund-policy" className="hover:text-emerald-800">
                Refund Policy
              </Link>
              <Link href="/shipping-policy" className="hover:text-emerald-800">
                Shipping Policy
              </Link>
            </nav>
          </div>
          <p>Images shown are representative and may differ from the actual product.</p>
        </div>
      </Container>
    </footer>
  );
}
