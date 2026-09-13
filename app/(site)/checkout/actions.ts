"use server";

import { redirect } from "next/navigation";
import {
  createOrderFromCart,
  CheckoutError,
  type CheckoutCustomer,
  type CheckoutLine,
} from "@/lib/orders-db";

export async function submitOrder(
  customer: CheckoutCustomer,
  lines: CheckoutLine[]
): Promise<{ error: string } | undefined> {
  let txnid: string;

  try {
    const result = await createOrderFromCart(customer, lines);
    txnid = result.txnid;
  } catch (error) {
    if (error instanceof CheckoutError) {
      return { error: error.message };
    }
    console.error("Order creation failed:", error);
    return { error: "Something went wrong placing your order. Please try again." };
  }

  redirect(`/checkout/payu-redirect?txnid=${txnid}`);
}
