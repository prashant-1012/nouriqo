import { createHash, timingSafeEqual } from "node:crypto";

/**
 * PayU hosted-checkout integration (docs.payu.in). Sandbox by default —
 * PAYU_ENV must be explicitly set to "production" to switch to live
 * credentials/endpoint, which is the Phase 3 "cutover" step in
 * ECOMMERCE_BUILDOUT.md, not something that happens by accident.
 */

const PAYU_KEY = process.env.PAYU_KEY ?? "";
const PAYU_SALT = process.env.PAYU_SALT ?? "";
const IS_PRODUCTION = process.env.PAYU_ENV === "production";

export const PAYU_PAYMENT_URL = IS_PRODUCTION
  ? "https://secure.payu.in/_payment"
  : "https://test.payu.in/_payment";

const PAYU_POSTSERVICE_URL = IS_PRODUCTION
  ? "https://info.payu.in/merchant/postservice.php?form=2"
  : "https://test.payu.in/merchant/postservice.php?form=2";

function sha512(input: string): string {
  return createHash("sha512").update(input).digest("hex");
}

/** Formats a whole-rupee amount the way PayU expects ("500.00"). */
export function formatPayuAmount(amountInRupees: number): string {
  return amountInRupees.toFixed(2);
}

export type PayuTransactionInput = {
  txnid: string;
  amount: number;
  productinfo: string;
  firstname: string;
  email: string;
};

/** key|txnid|amount|productinfo|firstname|email|udf1..udf5||||||salt — we
 * don't use PayU's UDF fields, so those five slots stay empty. */
export function generatePayuRequestHash(input: PayuTransactionInput): string {
  const amount = formatPayuAmount(input.amount);
  const raw = [
    PAYU_KEY,
    input.txnid,
    amount,
    input.productinfo,
    input.firstname,
    input.email,
    "", "", "", "", "", // udf1-5
    "", "", "", "", "",
  ].join("|");
  return sha512(raw);
}

export function getPayuKey(): string {
  return PAYU_KEY;
}

export type PayuResponseFields = {
  status: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  hash: string;
  [key: string]: string;
};

/** salt|status|udf1..udf5(reversed, empty)|email|firstname|productinfo|amount|txnid|key
 * — the exact reverse of generatePayuRequestHash's field order, per PayU's
 * response-verification spec. Constant-time compare against the hash PayU
 * sent, since this is a security check, not just a data validation. */
export function verifyPayuResponseHash(fields: PayuResponseFields): boolean {
  const raw = [
    PAYU_SALT,
    fields.status,
    "", "", "", "", "", // udf5-1 reversed (all empty, we don't use UDFs)
    "", "", "", "", "",
    fields.email,
    fields.firstname,
    fields.productinfo,
    fields.amount,
    fields.txnid,
    PAYU_KEY,
  ].join("|");
  const expected = sha512(raw);

  const expectedBuf = Buffer.from(expected, "hex");
  const actualBuf = Buffer.from(fields.hash, "hex");
  if (expectedBuf.length !== actualBuf.length) return false;
  return timingSafeEqual(expectedBuf, actualBuf);
}

export type PayuVerifyPaymentResult = {
  status: "success" | "failure" | "pending" | "unknown";
  raw: unknown;
};

/**
 * Calls PayU's verify_payment API — a server-to-server reconciliation
 * PayU explicitly recommends running after the surl/furl redirect, rather
 * than trusting the browser round-trip alone (the reverse-hash check
 * above proves the redirect payload wasn't tampered with in transit, but
 * this confirms PayU's own system agrees the payment actually went
 * through).
 */
export async function verifyPayuPayment(
  txnid: string
): Promise<PayuVerifyPaymentResult> {
  const command = "verify_payment";
  const hash = sha512(`${PAYU_KEY}|${command}|${txnid}|${PAYU_SALT}`);

  const body = new URLSearchParams({
    key: PAYU_KEY,
    command,
    var1: txnid,
    hash,
  });

  const response = await fetch(PAYU_POSTSERVICE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const json = await response.json();
  const transaction = json?.transaction_details?.[txnid];
  const rawStatus = transaction?.status as string | undefined;

  const status: PayuVerifyPaymentResult["status"] =
    rawStatus === "success"
      ? "success"
      : rawStatus === "failure"
        ? "failure"
        : rawStatus === "pending"
          ? "pending"
          : "unknown";

  return { status, raw: json };
}
