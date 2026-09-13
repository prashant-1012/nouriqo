import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/db";
import { SHIPPING_CHARGE } from "@/lib/config";

export type CheckoutLine = {
  slug: string;
  weight: string;
  quantity: number;
};

export type CheckoutCustomer = {
  name: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
};

export class CheckoutError extends Error {}

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = randomBytes(2).toString("hex").toUpperCase();
  return `NRQ-${timestamp}-${random}`;
}

function generateTxnId(): string {
  return `NRQ${Date.now()}${randomBytes(4).toString("hex")}`;
}

/**
 * Creates an Order + OrderItems + an initial Payment row from a cart. Prices
 * are always re-read from the database here — the cart's displayed prices
 * come from the client and are never trusted for the actual charge amount.
 */
export async function createOrderFromCart(
  customer: CheckoutCustomer,
  lines: CheckoutLine[]
) {
  if (lines.length === 0) {
    throw new CheckoutError("Cart is empty.");
  }

  const products = await prisma.product.findMany({
    where: { slug: { in: lines.map((line) => line.slug) } },
    include: { weightOptions: true },
  });

  const orderItemsData = lines.map((line) => {
    const product = products.find((p) => p.slug === line.slug);
    const option = product?.weightOptions.find((o) => o.weight === line.weight);
    if (!product || !option) {
      throw new CheckoutError(
        `${line.slug} (${line.weight}) is no longer available.`
      );
    }
    return {
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      variant: product.variant,
      weight: option.weight,
      unitPrice: option.price,
      quantity: line.quantity,
      lineTotal: option.price * line.quantity,
    };
  });

  const subtotal = orderItemsData.reduce((sum, item) => sum + item.lineTotal, 0);
  const shippingCharge = SHIPPING_CHARGE;
  const total = subtotal + shippingCharge;

  const orderNumber = generateOrderNumber();
  const txnid = generateTxnId();

  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      shippingAddressLine1: customer.addressLine1,
      shippingAddressLine2: customer.addressLine2 || null,
      shippingCity: customer.city,
      shippingState: customer.state,
      shippingPostalCode: customer.postalCode,
      subtotal,
      shippingCharge,
      total,
      items: { create: orderItemsData },
      payments: {
        create: {
          providerTxnId: txnid,
          amount: total,
        },
      },
    },
  });

  return { order, txnid, total };
}
