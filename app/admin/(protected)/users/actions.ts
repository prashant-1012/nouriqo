"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireSuperAdmin, hashPassword } from "@/lib/admin-auth";
import { Prisma, type AdminRole } from "@/generated/prisma/client";

export type CreateAdminUserInput = {
  name: string;
  phone: string;
  password: string;
  role: AdminRole;
};

export async function createAdminUser(
  input: CreateAdminUserInput
): Promise<{ error: string } | undefined> {
  await requireSuperAdmin();

  // The form's `pattern` attribute is a UX nicety, not a security boundary
  // — enforce the same "10 digits, no country code" rule server-side too.
  if (!/^[0-9]{10}$/.test(input.phone)) {
    return { error: "Phone must be exactly 10 digits, without the country code." };
  }

  try {
    const passwordHash = await hashPassword(input.password);
    await prisma.adminUser.create({
      data: { name: input.name, phone: input.phone, passwordHash, role: input.role },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { error: "A user with that phone number already exists." };
    }
    console.error("createAdminUser failed:", error);
    return { error: "Something went wrong creating the user." };
  }

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteAdminUser(id: string): Promise<{ error: string } | undefined> {
  const currentAdmin = await requireSuperAdmin();

  if (currentAdmin.id === id) {
    return { error: "You can't delete your own account while logged in." };
  }

  const target = await prisma.adminUser.findUnique({ where: { id } });
  if (target?.role === "SUPER_ADMIN") {
    const superAdminCount = await prisma.adminUser.count({ where: { role: "SUPER_ADMIN" } });
    if (superAdminCount <= 1) {
      return { error: "Can't delete the last Super Admin account." };
    }
  }

  const deleted = await prisma.adminUser.delete({ where: { id } }).catch((error) => {
    console.error("deleteAdminUser failed:", error);
    return null;
  });

  if (!deleted) {
    return { error: "Something went wrong deleting the user." };
  }

  revalidatePath("/admin/users");
}
