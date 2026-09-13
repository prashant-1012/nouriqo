import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { SITE_URL } from "@/lib/config";
import {
  PAYU_PAYMENT_URL,
  formatPayuAmount,
  generatePayuRequestHash,
  getPayuKey,
} from "@/lib/payu";
import { PayuAutoSubmitForm } from "@/components/checkout/PayuAutoSubmitForm";

export default async function PayuRedirectPage({
  searchParams,
}: PageProps<"/checkout/payu-redirect">) {
  const { txnid } = await searchParams;

  if (typeof txnid !== "string") {
    notFound();
  }

  const payment = await prisma.payment.findUnique({
    where: { providerTxnId: txnid },
    include: { order: { include: { items: true } } },
  });

  if (!payment) {
    notFound();
  }

  const { order } = payment;
  const productinfo = `Nouriqo order ${order.orderNumber} (${order.items.length} item${order.items.length === 1 ? "" : "s"})`;

  const fields = {
    key: getPayuKey(),
    txnid: payment.providerTxnId,
    amount: formatPayuAmount(payment.amount),
    productinfo,
    firstname: order.customerName,
    email: order.customerEmail,
    phone: order.customerPhone,
    address1: order.shippingAddressLine1,
    address2: order.shippingAddressLine2 ?? "",
    city: order.shippingCity,
    state: order.shippingState,
    zipcode: order.shippingPostalCode,
    country: order.shippingCountry,
    surl: `${SITE_URL}/api/payu/callback`,
    furl: `${SITE_URL}/api/payu/callback`,
    hash: generatePayuRequestHash({
      txnid: payment.providerTxnId,
      amount: payment.amount,
      productinfo,
      firstname: order.customerName,
      email: order.customerEmail,
    }),
  };

  return <PayuAutoSubmitForm action={PAYU_PAYMENT_URL} fields={fields} />;
}
