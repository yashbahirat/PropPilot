---
plan: 06-01
phase: 6
title: "Affiliate Redirect Route Handler"
wave: 1
depends_on: []
files_modified:
  - src/app/go/[slug]/route.ts
autonomous: true
requirements_addressed:
  - TRACK-01
  - TRACK-04
---

## Objective

Create the `/go/[slug]` Route Handler that looks up a firm by slug, asynchronously logs an `AffiliateClick` event to the database, and issues a 302 redirect to the firm's affiliate URL. Tracking must never block or fail the redirect — all logging is fire-and-forget using `unstable_after()` with a floating-promise fallback.

## Tasks

### Task 1: Create the `/go/[slug]` Route Handler

<read_first>
- `src/lib/db.ts` — Prisma singleton import pattern (`import { db } from "@/lib/db"`)
- `src/app/actions/reviews.ts` — Reference for Clerk → DB user ID lazy-sync pattern using `auth()` from `@clerk/nextjs/server`
- `prisma/schema.prisma` — `AffiliateClick` model fields: `firmId`, `offerId`, `userId`, `sessionId`, `referrer`, `userAgent`, `ipHash`, `createdAt`
- `src/components/firm/FirmHero.tsx` — Confirms `/go/${firm.slug}` is the link used (slug-based, not ID-based)
</read_first>

<action>
Create the file `src/app/go/[slug]/route.ts` with the following implementation:

```typescript
import { NextRequest, NextResponse } from "next/server"
import { after } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { createHash } from "crypto"
import { z } from "zod"

// Force Node.js runtime — Prisma cannot run on the Edge runtime
export const runtime = "nodejs"

const paramsSchema = z.object({
  slug: z.string().min(1).max(100),
})

async function logAffiliateClick(data: {
  firmId: string
  offerId: string | null
  userId: string | null
  ipHash: string | null
  userAgent: string | null
  referrer: string | null
}) {
  await db.affiliateClick.create({
    data: {
      firmId: data.firmId,
      offerId: data.offerId,
      userId: data.userId,
      sessionId: null, // Deferred to future phase per D-03
      ipHash: data.ipHash,
      userAgent: data.userAgent,
      referrer: data.referrer,
    },
  })
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Validate params
  const rawParams = await params
  const parsed = paramsSchema.safeParse(rawParams)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
  }
  const { slug } = parsed.data

  // Look up firm and its active offers
  const firm = await db.firm.findUnique({
    where: { slug },
    include: {
      offers: {
        where: { isActive: true },
        orderBy: { discountPercent: "desc" },
        take: 1,
      },
    },
  })

  if (!firm) {
    return NextResponse.json({ error: "Firm not found" }, { status: 404 })
  }

  // Resolve redirect URL: best active offer → firm-level affiliateUrl → 404
  const activeOffer = firm.offers[0] ?? null
  const redirectUrl = activeOffer?.affiliateUrl ?? firm.affiliateUrl

  if (!redirectUrl) {
    return NextResponse.json(
      { error: "No affiliate URL configured for this firm" },
      { status: 404 }
    )
  }

  // Collect tracking metadata from request headers
  const ipRaw =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    null
  const ipHash = ipRaw
    ? createHash("sha256").update(ipRaw).digest("hex")
    : null
  const userAgent = request.headers.get("user-agent") ?? null
  const referrer = request.headers.get("referer") ?? null

  // Resolve DB user ID from Clerk session (if logged in)
  let dbUserId: string | null = null
  try {
    const { userId: clerkId } = await auth()
    if (clerkId) {
      const dbUser = await db.user.findUnique({ where: { clerkId } })
      dbUserId = dbUser?.id ?? null
    }
  } catch {
    // Auth resolution failure must not block the redirect
  }

  const clickData = {
    firmId: firm.id,
    offerId: activeOffer?.id ?? null,
    userId: dbUserId,
    ipHash,
    userAgent,
    referrer,
  }

  // Log AffiliateClick asynchronously AFTER the response is sent
  // D-01: unstable_after() primary, floating-promise fallback on error
  try {
    after(async () => {
      try {
        await logAffiliateClick(clickData)
      } catch {
        // Silently swallow — tracking must never surface errors
      }
    })
  } catch {
    // unstable_after() not available in this runtime — fall back to floating promise
    Promise.resolve().then(async () => {
      try {
        await logAffiliateClick(clickData)
      } catch {
        // Silently swallow
      }
    })
  }

  // Issue the redirect immediately — tracking happens after
  return NextResponse.redirect(redirectUrl, { status: 302 })
}
```

Key implementation notes:
- `export const runtime = "nodejs"` is mandatory — Prisma requires Node.js runtime
- `after` is imported from `next/server` (Next.js 15 name for `unstable_after`)
- The outer try/catch around `after()` handles runtimes that don't support it, falling back to a floating promise
- `sessionId: null` is intentional per D-03 — no cookie-based session tracking in Phase 6
- IP is hashed with SHA-256 before storage — raw IP is never persisted (GDPR-safer)
- Auth failure is caught separately so it never blocks the redirect
</action>

<acceptance_criteria>
- File exists: `src/app/go/[slug]/route.ts`
- `route.ts` contains `export const runtime = "nodejs"`
- `route.ts` contains `after(` (the Next.js 15 async-after-response API)
- `route.ts` contains `Promise.resolve().then` (floating-promise fallback)
- `route.ts` contains `createHash("sha256")` (IP hashing — never store raw IP)
- `route.ts` contains `sessionId: null` (per D-03 decision)
- `route.ts` contains `NextResponse.redirect(redirectUrl, { status: 302 })`
- `route.ts` contains `export async function GET(`
- `route.ts` does NOT contain `export const runtime = "edge"` (would break Prisma)
- TypeScript compilation produces no errors in this file: `npx tsc --noEmit` exits 0
</acceptance_criteria>

## Security Threat Model

| Threat | Severity | Mitigation |
|--------|----------|------------|
| Click fraud / bot stuffing | Low | IP hash captured for dedup analysis; rate limiting deferred to Phase 8 |
| Raw PII (IP address) exposure | High | Raw IP never stored; SHA-256 hash only (`createHash("sha256")`) |
| Open redirect abuse | High | `redirectUrl` comes from DB only (never user input) — slug → DB lookup → DB URL |
| Prisma on Edge runtime crash | High | `export const runtime = "nodejs"` enforces Node.js runtime |
| Auth errors blocking redirect | Medium | Auth wrapped in try/catch; failure resolves `dbUserId = null` |
| Tracking errors blocking redirect | High | All logging inside `after()` with nested try/catch; outer catch falls back to floating promise |

## Verification

```bash
# File created
ls src/app/go/*/route.ts

# Runtime enforcement present
grep "runtime.*nodejs" src/app/go/*/route.ts

# Async logging pattern present
grep -n "after(\|Promise.resolve" src/app/go/*/route.ts

# IP hashing present (not raw IP)
grep "createHash" src/app/go/*/route.ts

# No TypeScript errors
npx tsc --noEmit 2>&1 | grep -c "go/\[slug\]/route" || echo "0 errors in route file"
```
