import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { AddToCartControl } from "@/components/products/AddToCartControl";
import type { Product } from "@/lib/products";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <section className="bg-ivory py-12 sm:py-16">
      <Container>
        <Link
          href="/sweets"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-800 hover:text-emerald-700"
        >
          <ArrowLeft size={16} />
          Back to Our Sweets
        </Link>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-beige/40">
              <Image
                src={product.image.src}
                alt={product.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-700">
              {product.tagline}
            </p>
            <h1 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-ink-soft">{product.variant}</p>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              {product.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {product.attributes.map((attribute) => (
                <li
                  key={attribute}
                  className="rounded-full border border-ink/10 bg-beige/40 px-3 py-1 text-xs font-medium text-ink-soft"
                >
                  {attribute}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <AddToCartControl product={product} />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
