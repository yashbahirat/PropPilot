// PropPilot Prisma Configuration (Prisma 7)
// Connection URLs live here, not in schema.prisma
import "dotenv/config"
import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    // Pooled connection for app queries (Neon PgBouncer)
    url: process.env.DATABASE_URL ?? "",
  },
})
