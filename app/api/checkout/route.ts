import { CheckoutError, createCheckoutUrl, type CheckoutLine } from "@/lib/wix-checkout";

/**
 * Turns the browser cart into a Wix cart and returns the hosted checkout URL.
 *
 * Gated behind WIX_CHECKOUT_ENABLED. nouriqo.com is live and currently sells
 * through WhatsApp; until the client connects a payment method in Wix, a
 * customer reaching Wix checkout would hit a dead end. The flag stays off in
 * production until that's done — see docs/WIX_INTEGRATION.md.
 */

function isEnabled() {
  return process.env.WIX_CHECKOUT_ENABLED === "true";
}

function parseLines(payload: unknown): CheckoutLine[] {
  if (!payload || typeof payload !== "object") return [];

  const { lines } = payload as { lines?: unknown };
  if (!Array.isArray(lines)) return [];

  return lines.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const { slug, weight, quantity } = entry as Record<string, unknown>;

    if (typeof slug !== "string" || typeof weight !== "string") return [];
    if (typeof quantity !== "number" || !Number.isFinite(quantity)) return [];

    return [{ slug, weight, quantity }];
  });
}

export async function POST(request: Request) {
  if (!isEnabled()) {
    return Response.json(
      { error: "Wix checkout is not enabled on this deployment." },
      { status: 503 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const lines = parseLines(payload);

  if (lines.length === 0) {
    return Response.json({ error: "Your cart is empty." }, { status: 400 });
  }

  try {
    const checkoutUrl = await createCheckoutUrl(lines);
    return Response.json({ checkoutUrl });
  } catch (error) {
    if (error instanceof CheckoutError) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    console.error("Wix checkout failed", error);
    return Response.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}
