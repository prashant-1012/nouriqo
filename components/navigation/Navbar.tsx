import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { NavLinks } from "@/components/navigation/NavLinks";
import { CartButton } from "@/components/cart/CartButton";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-ivory/90 backdrop-blur-sm">
      <Container className="relative flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Nouriqo home">
          <Image
            src="/assets/logo/nouriqo-mark.png"
            alt="Nouriqo"
            width={40}
            height={26}
            priority
            className="logo-blend h-9 w-auto object-contain"
          />
          <span className="font-display text-xl tracking-wide text-emerald-900">
            NOURIQO
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <CartButton />
          <Link
            href="/sweets"
            className="hidden rounded-full bg-emerald-800 px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-emerald-700 lg:inline-flex"
          >
            Explore Sweets
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
