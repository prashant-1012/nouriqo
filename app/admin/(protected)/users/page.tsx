import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { requireSuperAdmin } from "@/lib/admin-auth";
import { CreateUserForm } from "@/components/admin/CreateUserForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteAdminUser } from "./actions";

export const metadata: Metadata = { title: "Users" };

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function AdminUsersPage() {
  // Belt and suspenders: the sidebar only shows this link to a Super Admin,
  // but the layout above only checks requireAdmin() (any role) — this page
  // must gate itself, since a direct URL visit would otherwise bypass the
  // role check entirely.
  const currentAdmin = await requireSuperAdmin();

  const users = await prisma.adminUser.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Users</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-ivory">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Added</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 text-ink">
                    {user.name}
                    {user.id === currentAdmin.id && (
                      <span className="ml-1.5 text-xs text-ink-soft">(you)</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-ink-soft">+91 {user.phone}</td>
                  <td className="px-4 py-3 text-ink-soft">
                    {user.role === "SUPER_ADMIN" ? "Super Admin" : "Admin / Manager"}
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{formatDate(user.createdAt)}</td>
                  <td className="px-4 py-3">
                    {user.id !== currentAdmin.id && (
                      <DeleteButton
                        action={deleteAdminUser.bind(null, user.id)}
                        confirmMessage={`Remove ${user.name}'s access? This cannot be undone.`}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CreateUserForm />
      </div>
    </div>
  );
}
