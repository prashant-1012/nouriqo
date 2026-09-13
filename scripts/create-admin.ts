/**
 * Creates (or resets the password of) an AdminUser directly in the
 * database — the only way to create the first Super Admin, since there's
 * deliberately no public admin-signup page. Once a Super Admin exists,
 * every other admin/manager login gets created through the dashboard's
 * Users screen instead of this script.
 *
 * Usage:
 *   npx tsx scripts/create-admin.ts "<name>" <phone> <password> [SUPER_ADMIN|ADMIN_MANAGER]
 *
 * <phone> is the bare 10-digit number, no country code — the app treats
 * +91 as a fixed UI prefix, never stored (see ECOMMERCE_BUILDOUT.md
 * Phase 4, 2026-09-14).
 *
 * Example:
 *   npx tsx scripts/create-admin.ts "Prashant" 9876543210 "a-strong-password" SUPER_ADMIN
 *
 * Re-running with an existing phone number resets that account's password
 * (and role, if given) instead of failing — useful for a forgotten password.
 */
import { config } from "dotenv";
config({ path: ".env" });
config({ path: ".env.local", override: true });

async function main() {
  const [name, phone, password, roleArg] = process.argv.slice(2);

  if (!name || !phone || !password) {
    console.error(
      'Usage: npx tsx scripts/create-admin.ts "<name>" <phone> <password> [SUPER_ADMIN|ADMIN_MANAGER]'
    );
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }
  if (!/^[0-9]{10}$/.test(phone)) {
    console.error("Phone must be exactly 10 digits, no country code (e.g. 9876543210, not +919876543210).");
    process.exit(1);
  }

  const role = roleArg === "ADMIN_MANAGER" ? "ADMIN_MANAGER" : "SUPER_ADMIN";

  const { prisma } = await import("../lib/db");
  const bcrypt = (await import("bcryptjs")).default;

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: { phone },
    update: { name, passwordHash, role },
    create: { name, phone, passwordHash, role },
  });

  console.log(`\n✔ ${admin.role} "${admin.name}" (${admin.phone}) is ready to log in at /admin/login.\n`);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
