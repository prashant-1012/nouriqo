"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifyPassword, createSession } from "@/lib/admin-auth";

export async function login(
  phone: string,
  password: string
): Promise<{ error: string } | undefined> {
  const admin = await prisma.adminUser.findUnique({ where: { phone } });

  // Same generic error whether the phone isn't registered or the password
  // is wrong — don't let a login form reveal which phone numbers exist.
  const invalid = { error: "Invalid phone number or password." };

  if (!admin) return invalid;

  const isValid = await verifyPassword(password, admin.passwordHash);
  if (!isValid) return invalid;

  await createSession(admin.id);
  redirect("/admin");
}
