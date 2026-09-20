import { revalidateTag } from "next/cache";
import { WIX_PRODUCTS_TAG } from "@/lib/wix-client";

/**
 * Flushes the cached Wix catalog on demand.
 *
 * The site reads products through a 60-second ISR window, so a dashboard edit
 * appears within a minute on its own. This endpoint exists for when that is
 * too slow — the client changes a price and wants to confirm it immediately,
 * or we need a deterministic flush after a bulk catalog change.
 *
 * Call it with the shared secret, either as a header or a query param:
 *
 *   curl -X POST https://www.nouriqo.com/api/revalidate \
 *     -H "x-revalidate-secret: $REVALIDATE_SECRET"
 *
 * Wiring this to a Wix "Product Changed" webhook for automatic flushing is a
 * later step — that needs JWT signature verification, not a shared secret.
 * See docs/WIX_INTEGRATION.md.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return Response.json(
      { error: "REVALIDATE_SECRET is not configured on this deployment." },
      { status: 500 }
    );
  }

  const provided =
    request.headers.get("x-revalidate-secret") ??
    new URL(request.url).searchParams.get("secret");

  if (provided !== secret) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  // `{ expire: 0 }` rather than the recommended "max" profile: the caller is
  // asking to see fresh data *now*, so the next request should block on a
  // real refetch instead of being served stale content while it happens.
  revalidateTag(WIX_PRODUCTS_TAG, { expire: 0 });

  return Response.json({
    revalidated: true,
    tag: WIX_PRODUCTS_TAG,
    at: new Date().toISOString(),
  });
}
