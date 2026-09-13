"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import type { OrderShipmentStatus } from "@/generated/prisma/client";

export async function updateShipmentStatus(
  orderId: string,
  status: OrderShipmentStatus
): Promise<{ error: string } | undefined> {
  await requireAdmin();

  try {
    await prisma.order.update({ where: { id: orderId }, data: { shipmentStatus: status } });
  } catch (error) {
    console.error("updateShipmentStatus failed:", error);
    return { error: "Something went wrong updating the shipment status." };
  }

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}
