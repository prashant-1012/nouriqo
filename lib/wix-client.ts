import "server-only";

/**
 * Thin REST client for the Wix Headless backend — see docs/WIX_INTEGRATION.md.
 *
 * Wix is the source of truth for the product catalog (and, from the checkout
 * work onward, carts and orders). We talk to it over plain REST rather than
 * the Wix JS SDK: the endpoints are stable, it keeps the dependency tree
 * small, and — most importantly — it lets responses flow through Next's own
 * fetch cache so `revalidateTag` can flush the catalog on demand.
 */

const WIX_API = "https://www.wixapis.com";

/** Cache tag for every catalog read. Revalidating this flushes the whole
 * catalog — products, prices, images, stock — in one call. */
export const WIX_PRODUCTS_TAG = "wix-products";

type TokenResponse = {
  access_token: string;
  /** Seconds until expiry. Wix issues 4-hour (14400s) visitor tokens. */
  expires_in: number;
};

/**
 * Module-level token cache. Deliberately in-memory rather than in Next's data
 * cache: an access token is a credential, not page data, and it has no
 * business being persisted to disk alongside cached responses. A recycled
 * serverless instance just fetches a fresh one, which is cheap.
 */
let cachedToken: { token: string; expiresAt: number } | null = null;
/** De-dupes concurrent token requests during a cold start, so ten parallel
 * product reads produce one token call rather than ten. */
let inFlightToken: Promise<string> | null = null;

async function requestVisitorToken(): Promise<string> {
  const clientId = process.env.WIX_CLIENT_ID;

  if (!clientId) {
    throw new Error(
      "WIX_CLIENT_ID is not set. Add it to .env.local (and to the Vercel " +
        "project's environment variables) — see docs/WIX_INTEGRATION.md."
    );
  }

  const response = await fetch(`${WIX_API}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId, grantType: "anonymous" }),
    // Never cached: we manage this token's lifetime ourselves, above.
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Wix visitor token request failed (${response.status}): ${await response.text()}`
    );
  }

  const data = (await response.json()) as TokenResponse;

  // Renew five minutes early so a token can't expire mid-request.
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 300) * 1000,
  };

  return cachedToken.token;
}

/** A valid anonymous visitor token, reused until shortly before it expires. */
export async function getVisitorToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  if (!inFlightToken) {
    inFlightToken = requestVisitorToken().finally(() => {
      inFlightToken = null;
    });
  }

  return inFlightToken;
}

type WixFetchOptions = {
  /** Present for POST/PATCH; omit for GET. */
  body?: unknown;
  method?: "GET" | "POST" | "PATCH";
  /** Next cache tags, for on-demand revalidation. */
  tags?: string[];
  /** Seconds. Matches the layout's existing ISR window by default. */
  revalidate?: number;
};

/**
 * Authenticated call against the Wix REST API.
 *
 * Note the bare `Authorization: <token>` header — Wix does *not* use a
 * `Bearer ` prefix here, and adding one returns 401.
 */
export async function wixFetch<T>(
  path: string,
  { body, method, tags, revalidate = 60 }: WixFetchOptions = {}
): Promise<T> {
  const token = await getVisitorToken();

  const response = await fetch(`${WIX_API}${path}`, {
    method: method ?? (body === undefined ? "GET" : "POST"),
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    next: { revalidate, tags },
  });

  if (!response.ok) {
    throw new Error(
      `Wix API ${path} failed (${response.status}): ${await response.text()}`
    );
  }

  return (await response.json()) as T;
}
