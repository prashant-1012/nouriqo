import Image from "next/image";
import clsx from "clsx";
import type { Product } from "@/lib/products";
import { AddToCartControl } from "@/components/products/AddToCartControl";

const accentWash: Record<Product["accent"], string> = {
  gold: "bg-gold-400/10",
  lilac: "bg-lilac-200/40",
  rose: "bg-rose-200/40",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-ink/10 bg-ivory transition-colors duration-300 hover:border-ink/20">
      <div
        className={clsx(
          "relative aspect-square w-full overflow-hidden",
          accentWash[product.accent]
        )}
      >
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 24vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-ivory/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-gold-700 ring-1 ring-gold-700/20">
          {product.tagline}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg text-ink">{product.name}</h3>

        <div className="mt-auto pt-4">
          <AddToCartControl product={product} />
        </div>
      </div>
    </article>
  );
}
