import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SITE_URL } from "@/lib/config";
import { verifyPayuResponseHash, verifyPayuPayment, type PayuResponseFields } from "@/lib/payu";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const fields: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    fields[key] = String(value);
  }

  const { txnid, status, hash } = fields;

  if (!txnid || !status || !hash) {
    return NextResponse.redirect(`${SITE_URL}/checkout/failed`);
  }

  const hashIsValid = verifyPayuResponseHash(fields as PayuResponseFields);
  if (!hashIsValid) {
    console.error("PayU callback: hash verification failed", { txnid });
    return NextResponse.redirect(`${SITE_URL}/checkout/failed`);
  }

  const payment = await prisma.payment.findUnique({
    where: { providerTxnId: txnid },
    include: { order: true },
  });

  if (!payment) {
    console.error("PayU callback: unknown txnid", { txnid });
    return NextResponse.redirect(`${SITE_URL}/checkout/failed`);
  }

  // Reconcile with PayU's own system rather than trusting the redirect
  // payload alone, per PayU's own recommendation — the hash check above
  // only proves this specific response wasn't tampered with in transit.
  let finalStatus: "SUCCESS" | "FAILURE" = status === "success" ? "SUCCESS" : "FAILURE";
  try {
    const reconciliation = await verifyPayuPayment(txnid);
    if (reconciliation.status === "success") finalStatus = "SUCCESS";
    else if (reconciliation.status === "failure") finalStatus = "FAILURE";
    // "pending"/"unknown" — fall back to the hash-verified redirect status
    // above rather than blocking the customer on a network hiccup.
  } catch (error) {
    console.error("PayU verify_payment call failed, using redirect status", error);
  }

  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      status: finalStatus === "SUCCESS" ? "SUCCESS" : "FAILURE",
      providerPaymentId: fields.mihpayid ?? null,
      rawResponse: fields,
    },
  });

  await prisma.order.update({
    where: { id: payment.orderId },
    data: {
      paymentStatus: finalStatus === "SUCCESS" ? "PAID" : "FAILED",
    },
  });

  if (finalStatus === "SUCCESS") {
    return NextResponse.redirect(
      `${SITE_URL}/order-success?order=${payment.order.orderNumber}`
    );
  }
  return NextResponse.redirect(`${SITE_URL}/checkout/failed`);
}
