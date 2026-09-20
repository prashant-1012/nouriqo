import "server-only";
import { createFreshVisitorToken } from "@/lib/wix-client";
import { getProducts } from "@/lib/products-wix";
import { CANONICAL_SITE_HOST } from "@/lib/config";

/**
 * Hands a cart off to Wix's hosted checkout — see docs/WIX_INTEGRATION.md.
 *
 * The browser cart stays local (localStorage) while the customer shops, which
 * keeps "Add to Cart" instant and works offline. A real Wix cart is created
 * only at the moment they choose to check out. Wix still gives the client
 * abandoned-*checkout* recovery from that point on, which is the more useful
 * signal anyway — someone who started checkout is a warmer lead than someone
 * who merely added to cart.
 */

const WIX_API = "https://www.wixapis.com";

/** Wix Stores' fixed app ID — constant across every Wix site. */
const WIX_STORES_APP_ID = "215238eb-22a5-4c36-9e7b-e7c08025e04e";

/** Mirrors MAX_QUANTITY in lib/cart-context.tsx. */
const MAX_QUANTITY = 20;

export type CheckoutLine = {
  slug: string;
  weight: string;
  quantity: number;
};

export class CheckoutError extends Error {}

type CartResponse = { cart: { id: string } };
type CheckoutUrlResponse = { checkoutUrl: string };

async function wixPost<T>(path: string, token: string, body: unknown): Promise<T> {
  const response = await fetch(`${WIX_API}${path}`, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new CheckoutError(
      `Wix ${path} failed (${response.status}): ${await response.text()}`
    );
  }

  return (await response.json()) as T;
}

/**
 * Resolves cart lines against the live catalog and returns a Wix checkout URL.
 *
 * Lines arrive from the browser, so nothing in them is trusted. Each one is
 * re-resolved against the live Wix catalog by slug and pack size; anything
 * that no longer exists — a deleted product, a renamed pack size, a variant
 * gone out of stock — is dropped rather than guessed at. Prices are never
 * read from the request at all: Wix prices the cart from its own catalog, so
 * a tampered payload can't buy sweets cheaply.
 */
export async function createCheckoutUrl(lines: CheckoutLine[]): Promise<string> {
  if (lines.length === 0) {
    throw new CheckoutError("Cannot check out with an empty cart.");
  }

  const products = await getProducts();

  const catalogItems = lines.flatMap((line) => {
    const product = products.find((entry) => entry.slug === line.slug);
    const option = product?.weightOptions.find(
      (entry) => entry.weight === line.weight
    );

    if (!product?.wixProductId || !option?.variantId) return [];

    const quantity = Math.max(
      1,
      Math.min(MAX_QUANTITY, Math.floor(line.quantity))
    );

    return [
      {
        catalogReference: {
          appId: WIX_STORES_APP_ID,
          catalogItemId: product.wixProductId,
          // These products have `manageVariants: true`, so Wix identifies the
          // pack size by variantId. Passing option names instead returns
          // ITEM_NOT_FOUND_IN_CATALOG.
          options: { variantId: option.variantId },
        },
        quantity,
      },
    ];
  });

  if (catalogItems.length === 0) {
    throw new CheckoutError(
      "None of the items in your cart are available any more."
    );
  }

  const token = await createFreshVisitorToken();

  const { cart } = await wixPost<CartResponse>("/ecom/v2/carts", token, {
    catalogItems,
  });

  const { checkoutUrl } = await wixPost<CheckoutUrlResponse>(
    `/ecom/v2/carts/${cart.id}/get-checkout-url`,
    token,
    {}
  );

  assertNotOurOwnDomain(checkoutUrl);

  return checkoutUrl;
}

/**
 * Refuses to hand back a checkout URL pointing at our own domain.
 *
 * Wix builds hosted-page URLs from the site's connected domain, which is
 * nouriqo.com — but that domain resolves to Vercel, not Wix. The URL that
 * comes back therefore looks like `https://www.nouriqo.com/checkout?...` and
 * lands the customer on *this app's* legacy PayU checkout page, which then
 * fails confusingly while validating a Wix cart against Postgres.
 *
 * Failing loudly here beats redirecting a paying customer into that loop. The
 * real fix is a separate Wix pages domain (e.g. checkout.nouriqo.com) or the
 * free *.wixsite.com default — dashboard-only, it can't be set through the
 * API. See the Checkout section of docs/WIX_INTEGRATION.md.
 */
function assertNotOurOwnDomain(checkoutUrl: string) {
  let host: string;
  try {
    host = new URL(checkoutUrl).host;
  } catch {
    throw new CheckoutError(`Wix returned an unusable checkout URL: ${checkoutUrl}`);
  }

  if (host === CANONICAL_SITE_HOST) {
    throw new CheckoutError(
      "Wix checkout is not finished being set up: Wix is still serving its " +
        `checkout page from ${host}, which this site occupies. Set a Wix ` +
        "pages domain (Headless Settings → Manage URLs) before enabling checkout."
    );
  }
}
