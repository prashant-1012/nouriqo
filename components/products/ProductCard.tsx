import Image from "next/image";
import clsx from "clsx";
import type { Product } from "@/lib/products";

const accentRing: Record<Product["accent"], string> = {
  gold: "group-hover:ring-gold-400/60",
  lilac: "group-hover:ring-lilac-200",
  rose: "group-hover:ring-rose-200",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col">
      <div
        className={clsx(
          "relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white ring-1 ring-ink/5 ring-inset transition-all duration-300",
          accentRing[product.accent]
        )}
      >
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-700">
          {product.tagline}
        </p>
        <h3 className="mt-1.5 font-display text-xl text-ink">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-ink-soft">{product.variant}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {product.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {product.attributes.map((attribute) => (
            <li
              key={attribute}
              className="rounded-full border border-emerald-800/15 px-3 py-1 text-xs font-medium text-emerald-800"
            >
              {attribute}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
          <span className="text-sm text-ink-soft">{product.weight}</span>
          <a
            href="#contact"
            className="text-sm font-medium text-emerald-800 underline underline-offset-4 decoration-emerald-800/30 hover:text-emerald-700"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </article>
  );
}
