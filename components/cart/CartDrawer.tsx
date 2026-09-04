"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useCart, type CartLine } from "@/lib/cart-context";
import { getProductBySlug, type Product, type WeightOption } from "@/lib/products";
import { formatINR } from "@/lib/currency";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { QuantityStepper } from "@/components/products/QuantityStepper";

export function CartDrawer() {
  const { lines, isOpen, closeCart, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeCart]);

  type CartDisplayItem = { line: CartLine; product: Product; option: WeightOption };

  const items: CartDisplayItem[] = lines.flatMap((line) => {
    const product = getProductBySlug(line.slug);
    const option = product?.weightOptions.find((o) => o.weight === line.weight);
    return product && option ? [{ line, product, option }] : [];
  });

  const total = items.reduce(
    (sum, { line, option }) => sum + line.quantity * option.price,
    0
  );

  const whatsappUrl = buildWhatsAppOrderUrl(
    items.map(({ line, product, option }) => ({
      name: `${product.name} (${line.weight})`,
      quantity: line.quantity,
      price: option.price,
    }))
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-ink/40"
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-ivory shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-display text-xl text-ink">Your Cart</h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-ink/5"
              >
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-sm text-ink-soft">Your cart is empty.</p>
                <Link
                  href="/sweets"
                  onClick={closeCart}
                  className="text-sm font-medium text-emerald-800 underline underline-offset-4 decoration-emerald-800/30 hover:text-emerald-700"
                >
                  Explore Our Sweets
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
                  {items.map(({ line, product, option }) => (
                    <li
                      key={`${product.slug}-${line.weight}`}
                      className="flex gap-4 py-5"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-ink/5 ring-inset">
                        <Image
                          src={product.image.src}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-base text-ink">
                              {product.name}
                            </p>
                            <p className="mt-0.5 text-xs text-ink-soft">
                              {product.variant} &middot; {line.weight}
                            </p>
                          </div>
                          <p className="shrink-0 text-sm font-medium text-ink">
                            {formatINR(option.price)}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-end gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => removeItem(product.slug, line.weight)}
                            aria-label={`Remove ${product.name} (${line.weight}) from cart`}
                            className="text-ink-soft hover:text-emerald-800"
                          >
                            <Trash2 size={16} />
                          </button>
                          <QuantityStepper
                            value={line.quantity}
                            onChange={(next) =>
                              updateQuantity(product.slug, line.weight, next)
                            }
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-ink/10 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-ink-soft">Total</span>
                    <span className="font-display text-xl text-ink">
                      {formatINR(total)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs italic text-ink-soft/70">
                    Prices shown are indicative and may change.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center rounded-full bg-emerald-800 px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-emerald-700"
                  >
                    Checkout via WhatsApp
                  </a>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
