// PropPilot Prisma Configuration (Prisma 7)
// Connection URLs live here, not in schema.prisma
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Pooled connection for app queries (Neon PgBouncer)
    url: process.env.DATABASE_URL ?? "",
    // Direct connection for migrations (bypasses PgBouncer)
    directUrl: process.env.DIRECT_URL,
  },
});
