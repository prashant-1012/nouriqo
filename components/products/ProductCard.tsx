import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { Product } from "@/lib/products";
import { QuantityStepper } from "@/components/products/QuantityStepper";

const accentRing: Record<Product["accent"], string> = {
  gold: "group-hover:ring-gold-400/60",
  lilac: "group-hover:ring-lilac-200",
  rose: "group-hover:ring-rose-200",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group mx-auto flex h-full w-full max-w-sm flex-col">
      <div
        className={clsx(
          "relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white ring-1 ring-ink/5 ring-inset transition-all duration-300",
          accentRing[product.accent]
        )}
      >
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 24vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-700">
          {product.tagline}
        </p>
        <h3 className="mt-1 font-display text-lg text-ink">{product.name}</h3>
        <p className="mt-0.5 text-sm text-ink-soft">{product.variant}</p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {product.description}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {product.attributes.map((attribute) => (
            <li
              key={attribute}
              className="rounded-full border border-emerald-800/15 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800"
            >
              {attribute}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4">
          <p className="text-sm text-ink-soft">{product.weight}</p>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-ink/10 pt-3">
            <QuantityStepper />
            <Link
              href="/contact"
              className="text-sm font-medium text-emerald-800 underline underline-offset-4 decoration-emerald-800/30 hover:text-emerald-700"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
