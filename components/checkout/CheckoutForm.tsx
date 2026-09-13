"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Lock } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatINR } from "@/lib/currency";
import { SHIPPING_CHARGE } from "@/lib/config";
import { submitOrder } from "@/app/(site)/checkout/actions";

const inputWrapClass =
  "mt-1.5 flex h-11 items-center rounded-full border border-ink/15 px-4 transition-colors focus-within:border-emerald-800 focus-within:ring-2 focus-within:ring-emerald-800/20";
const inputClass =
  "h-full w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft/60";

function Field({
  id,
  label,
  ...props
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className={inputWrapClass}>
        <input id={id} className={inputClass} {...props} />
      </div>
    </div>
  );
}

export function CheckoutForm() {
  const { lines, products } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const items = lines.flatMap((line) => {
    const product = products.find((p) => p.slug === line.slug);
    const option = product?.weightOptions.find((o) => o.weight === line.weight);
    return product && option ? [{ line, product, option }] : [];
  });

  const subtotal = items.reduce(
    (sum, { line, option }) => sum + line.quantity * option.price,
    0
  );
  const total = subtotal + SHIPPING_CHARGE;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-sm text-ink-soft">Your cart is empty.</p>
        <Link
          href="/sweets"
          className="text-sm font-medium text-emerald-800 underline underline-offset-4 decoration-emerald-800/30 hover:text-emerald-700"
        >
          Explore Our Sweets
        </Link>
      </div>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const form = new FormData(event.currentTarget);
    const result = await submitOrder(
      {
        name: String(form.get("name")),
        phone: String(form.get("phone")),
        email: String(form.get("email")),
        addressLine1: String(form.get("addressLine1")),
        addressLine2: String(form.get("addressLine2") || ""),
        city: String(form.get("city")),
        state: String(form.get("state")),
        postalCode: String(form.get("postalCode")),
      },
      lines
    );

    // A successful submission redirects server-side and never returns here.
    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5">
        <h2 className="font-display text-xl text-ink">Delivery Details</h2>

        <Field id="checkout-name" name="name" label="Full Name" required placeholder="Your full name" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="checkout-phone" name="phone" type="tel" label="Phone Number" required placeholder="Your phone number" />
          <Field id="checkout-email" name="email" type="email" label="Email Address" required placeholder="you@example.com" />
        </div>
        <Field id="checkout-address1" name="addressLine1" label="Address Line 1" required placeholder="House no., street" />
        <Field id="checkout-address2" name="addressLine2" label="Address Line 2 (optional)" placeholder="Landmark, apartment, etc." />
        <div className="grid gap-5 sm:grid-cols-3">
          <Field id="checkout-city" name="city" label="City" required placeholder="City" />
          <Field id="checkout-state" name="state" label="State" required placeholder="State" />
          <Field id="checkout-postal" name="postalCode" label="Postal Code" required placeholder="PIN code" />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-800 py-3.5 text-sm font-medium text-ivory transition-colors hover:bg-emerald-700 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Preparing payment...
            </>
          ) : (
            <>
              <Lock size={15} /> Pay {formatINR(total)}
            </>
          )}
        </button>
        <p className="text-center text-xs text-ink-soft/70">
          You&apos;ll be redirected to PayU to complete payment securely.
        </p>
      </form>

      <div className="lg:col-span-4 lg:col-start-9">
        <h2 className="font-display text-xl text-ink">Order Summary</h2>
        <ul className="mt-4 divide-y divide-ink/10 rounded-2xl border border-ink/10">
          {items.map(({ line, product, option }) => (
            <li key={`${product.slug}-${line.weight}`} className="flex gap-3 p-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-ink/5 ring-inset">
                <Image
                  src={product.image.src}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col text-sm">
                <span className="font-medium text-ink">{product.name}</span>
                <span className="text-xs text-ink-soft">
                  {line.weight} &middot; Qty {line.quantity}
                </span>
              </div>
              <span className="shrink-0 self-center text-sm font-medium text-ink">
                {formatINR(option.price * line.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 space-y-2 border-t border-ink/10 pt-4 text-sm">
          <div className="flex justify-between text-ink-soft">
            <span>Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-ink-soft">
            <span>Shipping</span>
            <span>{formatINR(SHIPPING_CHARGE)}</span>
          </div>
          <div className="flex justify-between pt-2 font-display text-lg text-ink">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>
        </div>
        <p className="mt-2 text-xs italic text-ink-soft/70">
          Prices shown are indicative and may change.
        </p>
      </div>
    </div>
  );
}
